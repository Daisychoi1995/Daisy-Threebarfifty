'use client'

import { db } from '@/lib/firebase/config'
import { ContactUs } from '@/models/Model'
import { addDoc, collection } from '@firebase/firestore'
import { useState } from 'react'

const ContactUsForm = () => {
  const [form, setForm] = useState<ContactUs>({
    name: '',
    email: '',
    subject: '',
    description: '',
    date: new Date(),
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form) {
      return alert('All fields are required!')
    }

    try {
      await addDoc(collection(db, 'contactUs'), form)
      alert('Submitted!')
      setForm({
        name: '',
        email: '',
        subject: '',
        description: '',
        date: new Date(),
      })
    } catch (error) {
      console.error('Error submitting contactUs', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
      <div className='flex w-[500px] flex-col justify-center'>
      <label htmlFor="name">Name *</label>
      <input
        type="text"
        id="name"
        name="name"
        value={form?.name}
        onChange={handleChange}
        required
        className='w-[500px] border-b-2 border-gray-400 focus:outline-none focus:border-green-500'
      />
      </div>

      <div className='flex w-[500px] flex-col justify-center'>
      <label htmlFor="email">Email *</label>
      <input
        type="text"
        id="email"
        name="email"
        value={form?.email}
        onChange={handleChange}
        required
        className='w-[500px] border-b-2 border-gray-400 focus:outline-none focus:border-green-500'
      />
      </div>

      <div className='flex w-[500px] flex-col justify-center'>
      <label htmlFor="subject">Subject *</label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={form?.subject}
        onChange={handleChange}
        required
        className='w-[500px] border-b-2 border-gray-400 focus:outline-none focus:border-green-500'
      />
      </div>

      <div className='flex w-[500px] flex-col justify-center'>
      <label htmlFor="description">Description *</label>
      <input
        type="text"
        id="description"
        name="description"
        value={form?.description}
        onChange={handleChange}
        required
        className='w-[500px] border-b-2 border-gray-400 focus:outline-none focus:border-green-500'
      />
      </div>
      <button type="submit" className=' w-[500px] bg-[#009B64] text-white h-[50px] cursor-pointer'>SUBMIT</button>
    </form>
  )
}

export default ContactUsForm
