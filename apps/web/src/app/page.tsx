import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { ArrowRight } from 'lucide-react'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale(ptBR)

interface Memory {
  id: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const { data } = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = data.memories as Memory[]

  if (!memories.length) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('DD[ de ]MMMM[, ]YYYY')}
          </time>

          {memory.coverUrl.includes('.mp4') ? (
            <video
              src={memory.coverUrl}
              controlsList="nodownload"
              className="aspect-video w-full rounded-lg bg-black object-cover"
            />
          ) : (
            <Image
              className="aspect-video w-full rounded-lg bg-black object-cover"
              src={memory.coverUrl}
              width={600}
              height={600}
              alt=""
              draggable={false}
            />
          )}

          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            href={`/memory/${memory.id}`}
            className="group flex items-center gap-1 text-sm text-gray-200 transition-colors hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4 transition-all ease-in-out group-hover:ml-1" />
          </Link>
        </div>
      ))}
    </div>
  )
}
