import { Button } from '@/components/ui/button'
import Image from 'next/image'




function Hero() {
  return (
    <div className="w-full relative h-screen overflow-hidden">
  
  {/* Background Image behind everything */}
  <Image 
    className="absolute inset-0 w-full h-full object-cover -z-10"
    src="/codingstation.avif"
    alt="Hero Image"
    width={1000}
    height={1000}
  />

  {/* Hero text ABOVE the background but BELOW dropdown */}
  <div className="absolute w-full flex flex-col items-center mt-20 z-10">
    <h2 className='font-extrabold text-7xl font-pixelify-sans'>Start</h2>
    <h2
      className='p-3 font-bold text-7xl font-pixelify-sans text-yellow-400'
      style={{ textShadow:"2px 2px 0 #000, 4px 4px 0 #c69405" }}
    >
      Your next coding adventure starts now
    </h2>
    <h2 className='text-4xl font-pixelify-sans mt-4'>
      Beginner friendly projects
    </h2>
    <Button className='text-xl mt-6 cursor-pointer p-5 font-bold hover:bg-amber-500' variant={'pixel'}>
      Get Started
    </Button>
  </div>

</div>
  )
}

export default Hero
