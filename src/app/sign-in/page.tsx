'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/lib/firebase/config'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({res});
        sessionStorage.setItem('user', 'true')
        setEmail('');
        setPassword('');
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-[#009B64] p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-white rounded outline-none text-[#009B64]"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-white rounded outline-none text-[#009B64]"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 rounded text-white bg-[#2a7a5e] hover:bg-[#22473a]"
        >
          Sign In
        </button>
      <Link href="/sign-up" className="text-white font-bold">
        Create an account to admin
      </Link>
      </div>
    </div>
  );
};

export default SignIn;