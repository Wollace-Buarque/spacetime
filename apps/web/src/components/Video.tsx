'use client'

import { Pause } from 'lucide-react'
import { useRef, useState } from 'react'

interface VideoProps {
  src: string
}

export function Video(props: VideoProps) {
  const video = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(true)

  function handleClick() {
    setIsPaused((state) => {
      const newPausedState = !state

      if (!video.current) return state

      if (newPausedState) {
        video.current.pause()
      } else {
        video.current.play()
      }

      return newPausedState
    })
  }

  return (
    <div className="relative">
      <video
        ref={video}
        src={props.src}
        controlsList="nodownload"
        onClick={handleClick}
        className="aspect-video w-full rounded-lg object-cover"
      />

      <Pause
        color="#FFF"
        fill="#FFF"
        className={`${
          isPaused ? 'opacity-100' : 'opacity-0'
        } pointer-events-none absolute left-1/2 top-1/2 box-content h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 transition-opacity ease-in`}
      />
    </div>
  )
}
