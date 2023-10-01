'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { Video } from './Video'

interface MediaPickerProps {
  isVideo: boolean
  setIsVideo: (isVideo: boolean) => void
}

export function MediaPicker({ isVideo, setIsVideo }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const previewURL = URL.createObjectURL(files[0])
    const isVideo = files[0].type.includes('video')

    setIsVideo(isVideo)
    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="midia"
        name="coverUrl"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />

      {preview &&
        (isVideo ? (
          <Video src={preview} />
        ) : (
          <Image
            src={preview}
            alt=""
            width={200}
            height={200}
            className="aspect-video w-full rounded-lg object-cover"
          />
        ))}
    </>
  )
}
