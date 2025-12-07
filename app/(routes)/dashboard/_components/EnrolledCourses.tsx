"use client"
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EnrolledCourses() {
  const[courses,setCourses]=useState([]);
  return (
    <div className="mt-8 ">
      <h1 className=" text-3xl font-sans font-bold  underline mb-6">Enrolled Courses</h1>
      {courses.length===0?(
        <div className="flex flex-col items-center gap-3 border rounded-2xl p-7  bg-zinc-800  mx-auto">
         <Image src="/book.png" alt="No Courses" width={90} height={390} />
         <h2 className="text-2xl font-pixelify-sans">No courses enrolled yet! </h2>
         <Link href="/courses">
         <Button variant={'pixel'} size={'lg'} className="font-pixelify-sans text-md cursor-pointer hover:shadow-2xl">Browse All Courses</Button>
          </Link>
          </div>
      ):(
        <div>
          {/* Render enrolled courses here */}
        </div>
      )}
      
    </div>
  )
}

export default EnrolledCourses;
