import Image from 'next/image'
import CourseList from './_components/CourseList'

function Page() {
  return (
    <div>

      {/* HERO BANNER */}
      <div className="relative w-full h-[300px]">
        <Image 
          src="/course-banner.gif" 
          alt="Courses Hero" 
          fill 
          className="object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center gap-2
          bg-gradient-to-r from-black/80 to-white/20 z-10 px-4">
          
          <h2 className="font-pixelify-sans text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black]">
            Explore all courses
          </h2>

          <p className="font-mono text-xl text-white drop-shadow-[2px_2px_0px_black]">
            Enroll to learn today and enhance your skills
          </p>

        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="mt-10 px-10">
        <h2 className='font-mono text-4xl mb-4 text-center underline' >All courses</h2>
        <CourseList />
      </div>

    </div>
  )
}

export default Page

