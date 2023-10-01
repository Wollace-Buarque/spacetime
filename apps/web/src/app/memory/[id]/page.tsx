import { api } from '@/lib/api'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

dayjs.locale(ptBR)

interface MemoryProps {
  params: {
    id: string
  }
}

interface IMemory {
  id: string
  content: string
  coverUrl: string
  createdAt: string
  isPublic: boolean
}

export default async function Memory({ params }: MemoryProps) {
  const token = cookies().get('token')?.value

  let memory = {} as IMemory
  let isVideo = false

  try {
    const { data } = await api.get(`/memory/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    memory = data.memory as IMemory
    isVideo = memory.coverUrl.includes('.mp4')
  } catch (error: any) {
    if (error?.response?.status === 401) {
      console.log('unauthorized')
    }

    console.log(error)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex w-fit items-center gap-1 text-sm text-gray-200 transition-colors hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('DD[ de ]MMMM[, ]YYYY')}
        </time>

        {isVideo ? (
          <video
            src={memory.coverUrl}
            controls
            controlsList="nodownload"
            autoPlay
            loop
            className="aspect-video w-full rounded-lg bg-black object-cover transition-transform hover:scale-[1.01]"
          />
        ) : (
          <Image
            className="aspect-video w-full rounded-lg bg-black object-cover transition-transform hover:scale-[1.01]"
            src={memory.coverUrl}
            width={600}
            height={600}
            alt=""
            draggable={false}
          />
        )}

        <p className="whitespace-pre-line text-justify leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </div>
    </div>
  )
}
