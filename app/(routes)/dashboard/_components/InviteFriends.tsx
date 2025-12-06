import Image from 'next/image'

function InviteFriends() {
  return (
    <div className='mt-6 flex flex-col items-center gap-3 border rounded-2xl p-7 bg-zinc-800 mx-auto '>
      <Image  src="/mail.png" alt="Invite Friends" width={40} height={40} />
      <h2 className='text-lg font-pixelify-sans font-bold'>Invite Friends</h2>
      <p>Having fun? Invite your friends to join the learning journey!</p>
      <div className='flex gap-1'>
        <input type="email" placeholder="harry@example.com" className='px-3 py-2  rounded-l-md outline-none border-2 border-black shadow-[3px_3px_0_0_#000] '/>
        <button className='px-4 py-2 text-black cursor-pointer hover:bg-red/50 hover:text-white bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none font-bold rounded-r-md'>Send Invite</button>
      </div>

    </div>
  )
}

export default InviteFriends
