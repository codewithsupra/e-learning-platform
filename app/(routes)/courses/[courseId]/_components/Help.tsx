import { Button } from "@/components/ui/button"
import Link from "next/link"

function Help() {
  return (
    <div className='font-mono flex flex-col items-center justify-center gap-6 p-10 border-6 border-zinc-700 bg-zinc-900/60 rounded-2xl shadow-xl mt-5'>
        <h2 className='text-3xl font-extrabold '>Need Help?</h2>
        <p>Ask questions in our community forum or contact support for assistance.</p>
        <Link href={'/support'}>
        <Button  className='text-2xl hover:bg-amber-600 cursor-pointer p-4' variant={'pixel'} size={'sm'}>Contact Support</Button>
        </Link>
      
    </div>
  )
}

export default Help
