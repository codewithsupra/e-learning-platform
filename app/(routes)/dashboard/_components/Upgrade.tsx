import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


function Upgrade() {
  return (
    <div className="flex flex-col items-center gap-4 border rounded-2xl p-6 bg-zinc-800 mt-8 ">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <h2 className="text-lg font-pixelify-sans ">Upgrade your plan</h2>
        <p className="font-pixelify-sans text-center text-gray-500 text-2xl">Unlock premium features</p>
        <Link href="/pricing">
        <Button variant={"pixel"} size={"lg"} className=" w-full font-pixelify-sans cursor-pointer hover:bg-amber-700 text-md">Upgrade Now</Button>
        </Link>


  
      
    </div>
  )
}

export default Upgrade
