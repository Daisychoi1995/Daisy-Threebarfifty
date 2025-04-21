'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase/config'

type UploadImageProps = {
  onUpload: (url: string) => Promise<void>;
}

export default function UploadImage({ onUpload }: UploadImageProps) {
  // state of file
  const [file, setFile] = useState<File | null>(null)
  // state of upload
  const [uploading, setUploading] = useState(false)
  // state of upload URL
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  // set selected file depending on change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async (): Promise<void> => {
    // when there is no file
    if (!file) {
      alert('Oops, No selected file!')
      return
    }

    // uploading
    setUploading(true)
    const storageRef = ref(storage, `images/${file.name}`)

    try {
      // upload file
      await uploadBytes(storageRef, file)

      // get download URL
      const url = await getDownloadURL(storageRef)

      // set the uploaded URL in state
      setUploadedUrl(url)

      // call the onUpload function and pass the URL
      await onUpload(url)

    } catch (error) {
      console.error('Error uploading the file', error)
    } finally {
      // after everything, change uploading state
      setUploading(false)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} className="cursor-pointer border-2 border-[#009B64] bg-[#009B64] text-white py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-[#009B64] hover:border-[#007a48] transform hover:scale-105">
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {uploadedUrl && (
        <div>
          <p >Uploaded image:</p>
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
