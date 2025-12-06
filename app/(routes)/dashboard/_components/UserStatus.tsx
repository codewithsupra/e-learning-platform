"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'


function UserStatus() {
    const{user}=useUser();
  return (
    <div className='p-6 border-4 shadow-2xl rounded-2xl bg-zinc-800 '>
        <div className='flex items-center gap-2 '>
      <Image src={"/alex_walk.gif"} alt="User Status" width={70} height={70} />
      <h2 className='text-primary font-extrabold font-sans text-lg'>Email:- {user?.primaryEmailAddress?.emailAddress}</h2>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex items-center gap-2 mt-4 border-2 p-3 rounded-lg bg-zinc-800 shadow-md hover:bg-amber-500/20'>
            <Image src={"/star.png"} alt="User Level" width={35} height={35} />
            <div>
                <h2 className='text-primary text-2xl font-pixelify-sans'>20</h2>
                <h2 className='text-primary text-2xl font-pixelify-sans'>Total rewards</h2>
            </div>
        </div>
        <div className='flex items-center gap-2 mt-4 border-2 p-3 rounded-lg bg-zinc-800 shadow-md hover:bg-amber-500/20'>
            <Image src={"/badge.png"} alt="User Level" width={35} height={35} />
            <div>
                <h2 className='text-primary text-2xl font-pixelify-sans'>3</h2>
                <h2 className='text-primary text-2xl font-pixelify-sans'>Badge Count</h2>
            </div>
        </div>
        <div className='flex items-center gap-2 mt-4 border-2 p-3 rounded-lg bg-zinc-800 shadow-md hover:bg-amber-500/20'>
            <Image src={"/fire.png"} alt="User Level" width={35} height={35} />
            <div>
                <h2 className='text-primary text-2xl font-pixelify-sans'>10</h2>
                <h2 className='text-primary text-2xl font-pixelify-sans'>Daily streak</h2>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserStatus
