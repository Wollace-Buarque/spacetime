import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import Icon from '@expo/vector-icons/Feather'

import * as ImagePicker from 'expo-image-picker'
import * as SecureStorage from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Video, ResizeMode } from 'expo-av'
import { api } from '../src/lib/api'

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [content, setContent] = useState('')
  const [preview, setPreview] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isVideo, setIsVideo] = useState(false)

  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })

    if (!result.canceled) {
      setPreview(result.assets[0].uri)
      setIsVideo(result.assets[0].type === 'video')
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStorage.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: isVideo ? 'video.mp4' : 'image.jpg',
        type: isVideo ? 'video/mp4' : 'image/jpg',
      } as any)

      const { data } = await api.post('/upload', FormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = data.fileUrl
    }

    await api.post(
      '/memory',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            className="rotate-180"
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372560' }}
            thumbColor={isPublic ? '#9B79EA' : '#9E9EA0'}
          />

          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          onPress={openImagePicker}
          activeOpacity={0.7}
          className={`items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20 ${
            preview ? 'h-60' : 'h-32'
          }`}
        >
          {preview ? (
            isVideo ? (
              <Video
                source={{ uri: preview }}
                resizeMode={ResizeMode.COVER}
                isLooping
                isMuted
                shouldPlay
                className="h-full w-full rounded-lg"
              />
            ) : (
              <Image
                source={{ uri: preview }}
                alt="Prévia da imagem de capa"
                resizeMode="cover"
                className="h-full w-full rounded-lg"
              />
            )
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" size={14} color="#FFF" />

              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="font-bod p-0 text-lg text-gray-50"
          selectionColor="#04D361"
          placeholderTextColor="#56565A"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          textAlignVertical="top"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-4 items-center self-end rounded-full bg-green-500 px-5 py-3"
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
