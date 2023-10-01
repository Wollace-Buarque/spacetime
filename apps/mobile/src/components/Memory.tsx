import dayjs from 'dayjs'

import { Link } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { IMemory } from '../../app/memories'

export function Memory(props: IMemory) {
  return (
    <View key={props.id} className="space-y-4">
      <View className="flex-row items-center gap-2">
        <View className="h-px w-5 bg-gray-50" />

        <Text className="font-body text-xs text-gray-100">
          {dayjs(props.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </Text>
      </View>

      <View className="space-y-4 px-8">
        <Image
          source={{ uri: props.coverUrl }}
          className="aspect-video w-full rounded-lg"
          alt=""
        />

        <Text className="font-body text-base leading-relaxed text-gray-100">
          {props.excerpt}
        </Text>

        <Link href={`/memories/${props.id}`} asChild>
          <TouchableOpacity className="flex-row items-center gap-2">
            <Text className="font-body text-sm text-gray-200">Ler mais</Text>
            <Icon name="arrow-right" size={16} color="#9e9ea8" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
