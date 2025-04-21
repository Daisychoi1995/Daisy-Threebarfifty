'use client'
import { auth } from '@/lib/firebase/config'
import ContactUsForm from '@/components/ContactUsForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import React from 'react'
import Link from 'next/link'

 const ContactUs = () => {
  const [user] = useAuthState(auth)
  return (
    <div className='bg-[#f7f7f7]'>
      {user && <p className='text-red-600 font-bold text-[20px] text-center'><Link href="/contact-us/admin">Manage Contact Us</Link></p>}
      <h1 className='text-[30px] text-center  font-bold mt-10'>Contact us</h1>
      <ContactUsForm />
      

    </div>
  )
}
export default ContactUs