import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'

import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Memory } from '../src/components/Memory'

dayjs.locale(ptBR)

export interface IMemory {
  id: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<IMemory[]>([])

  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const { data } = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const memories = data.memories.map((memory: IMemory) => ({
      ...memory,
      coverUrl: memory.coverUrl.replace('localhost', '192.168.1.10'),
    }))

    setMemories(memories)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              className="h-10 w-10 items-center justify-center rounded-full bg-green-500"
            >
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <Memory
            key={memory.id}
            id={memory.id}
            coverUrl={memory.coverUrl}
            createdAt={memory.createdAt}
            excerpt={memory.excerpt}
          />
        ))}
      </View>
    </ScrollView>
  )
}
