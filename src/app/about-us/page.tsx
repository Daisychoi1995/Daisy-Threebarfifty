'use client'
import React from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

const AboutUs = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row mx-4 lg:h-[500px]">
      <div className="flex w-full items-center ">
        <CldImage src="Logo_juzkwh" alt="logo" className="w-full h-full object-contain items-center scale-75" width="960"
          height="600"/>
      </div>
      <article className="relative w-full justify-center text-center flex flex-col gap-4 bg-[#f7f7f7] p-10">
        <h2 className='text-[30px] text-[#009B64]'>About us</h2>
        <p>
          Our journey commenced in a snug abode marked by Threebarfifty. Through
          the challenging time of COVID, we turned to baking as a source of joy
          and delight, savouring the happiness that came with each bite of those
          delectable cookies. <br />These cookies were baked with care using
          high-quality ingredients, not merely as sweet treats to share with our
          beloved family and friends, but also as symbols of our journey. This
          journey inspired us to share these desserts across New Zealand, giving
          rise to our emblematic logo, Threebarfifty. <br />We convey sincerity to our
          guests, engage in communication, and consistently pursue new flavors
          and experiences. We provide desserts that uniquely reinterpret global
          ingredients and cultures in our distinctive Threebarfifty style.
        </p>

        <Link href="/menu">Click the menu</Link>
      </article>
    </div>
  )
}

export default AboutUs
