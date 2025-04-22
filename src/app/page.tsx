'use client'
import { CldImage } from 'next-cloudinary'

const Home = () => {
  return (
    <div>
      <div className="relative w-full h-[600px]">
        <CldImage
          src="Main-Stripe_gsnsuy"
          alt="main-cake"
          fill
          crop="fill"
          gravity="auto"
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="flex gap-12 my-12  mx-20 justify-between">
        <div className="bg-[#009B64] text-white w-1/2 h-[500px] px-20 flex flex-col gap-10 justify-center py-4">
          <h1 className="text-[50px] font-bold">Seeking Fulfillment</h1>
          <p className="text-[20px] font-bold text-customGreen">
            Threebarfifty`s motto,`Seeking Fulfillment,` drives us to
            continuously elevate our desserts. We use premium ingredients such
            as New Zealand butter and French chocolate to create exceptional
            treats that exceed our customers` expectations.
          </p>
        </div>
        <div className="w-1/2 relative aspect-[4/3] h-[500px]">
          <CldImage
            src="Main-Cake_leby0z"
            alt="main-cake"
            fill
            crop="fill"
            gravity="auto"
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
