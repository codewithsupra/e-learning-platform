
"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'


function WelcomeBanner() {
    const{user}=useUser();
  return (
    <div className='flex items-center gap-3 '>
      <Image  src={'/machine.webp'} alt="Machine" width={120} height={120} />
      <h2 className='text-white text-4xl font-pixelify-sans p-2 border-2 shadow-md bg-zinc-800 rounded-lg rounded-bl-none'> Welcome Back <span className='font-pixelify-sans text-4xl'>{user?.firstName}</span>, <span className='text-yellow-500 text-2xl'>resume your learning journey</span></h2>
    </div>
    //empty state when no courses completed yet
  )
}

export default WelcomeBanner
