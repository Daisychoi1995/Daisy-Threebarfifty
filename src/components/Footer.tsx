'use client'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

 const Footer = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  return (
    <div>
    {!user ? (
      <Link href="/sign-in" className="text-green-700 font-bold">
        Admin
      </Link>
    ) : (
      <button
        onClick={() => {
          signOut(auth)
          router.push('/')
        }}
        className="text-red-600 font-bold cursor-pointer"
      >
        Log out
      </button>
    )}
    
</div>




  )
}

export default Footer