'use client'

import { ContactUs } from '@/app/models/Model'
import { collection, getDocs, Timestamp } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/config'

type ContactUsTimestamp = {
  name: string
  email: string
  subject: string
  description: string
  createdAt: string
}

const ContactUsAdmin = () => {
  const [contactUs, setContactUs] = useState<ContactUsTimestamp[]>([])

  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        const res = await fetch('/api/contact-us', {
          method: 'GET',
        })
        if (!res.ok) {
          throw new Error('Failed to fetch menu items')
        }
        const data = await res.json()
        console.log(data)
        const formattedData = data.map((item: any) => ({
          ...item,
          createdAt: new Date(item.created_at).toLocaleString(),
        }))
        setContactUs(formattedData)
      } catch (error) {
        console.error('Error fetching received contact us:', error)
      }
    }
    fetchContactUs()
  }, [])
  return (
    <div className="text-center px-4 md:px-10 py-6">
      <h1 className="text-[28px] md:text-[40px] text-[#009B64] font-bold mb-6">
        Received Message
      </h1>

      <div className="hidden md:flex flex-row gap-8 justify-between text-[20px] font-semibold border-b pb-2">
        <p className="w-1/4 text-left">Subject</p>
        <p className="w-1/4 text-left">Description</p>
        <p className="w-1/4 text-left">Name</p>
        <p className="w-1/4 text-left">Email</p>
        <p className="w-1/4 text-left">Received Date</p>
      </div>
      {contactUs.map((item) => (
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 justify-between border-b pb-4 text-[16px] md:text-[18px]">
          <p className="w-full md:w-1/4 text-left">
            <span className="md:hidden font-semibold">Subject: </span>
            {item.subject}
          </p>
          <p className="w-full md:w-1/4 text-left">
            <span className="md:hidden font-semibold">Description: </span>
            {item.description}
          </p>
          <p className="w-full md:w-1/4 text-left">
            <span className="md:hidden font-semibold">Name: </span>
            {item.name}
          </p>
          <p className="w-full md:w-1/4 text-left">
            <span className="md:hidden font-semibold">Email: </span>
            {item.email}
          </p>
          <p className="w-full md:w-1/4 text-left">
            <span className="md:hidden font-semibold">Email: </span>
            {item.createdAt}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ContactUsAdmin
