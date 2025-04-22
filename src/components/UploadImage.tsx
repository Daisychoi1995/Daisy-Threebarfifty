'use client'

import Image from 'next/image'
import { useState } from 'react'

type UploadImageProps = {
  onUpload: (url: string) => Promise<void>
}

export default function UploadImage({ onUpload }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      alert('Oops, No selected file!')
      return
    }

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)


    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log('Upload response:', data)
      if (data.secure_url) {
        setUploadedUrl(data.secure_url)
        await onUpload(data.secure_url)
      } else {
        throw new Error('No secure_url returned from Cloudinary')
      }
    } catch (error) {
      console.error('Error uploading the file to Cloudinary', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="cursor-pointer border-2 border-[#009B64] bg-[#009B64] text-white py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-[#009B64] hover:border-[#007a48] transform hover:scale-105"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {uploadedUrl && (
        <div>
          <p>Uploaded image:</p>
          <Image
            src={uploadedUrl}
            alt="Uploaded image"
            width={500}
            height={500}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  )
}
