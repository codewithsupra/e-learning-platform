"use client";
import { useParams } from 'next/navigation';
import Banner from './_components/Banner';
import axios from 'axios';
import {  useEffect, useState } from 'react';
import CourseChapters from './_components/CourseChapters';
import CourseStatus from './_components/CourseStatus';
import Upgrade from '../../dashboard/_components/Upgrade';
import Help from './_components/Help';
import { is } from 'drizzle-orm';

export type CourseType = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  bannerImage: string;
  difficultyLevel: string;
  tags: string;
  chapters?: ChapterType[];
  isEnrolled?: boolean;
  courseEnrolledInfo?: EnrollmentType | null;
};
export type ExerciseType = {
  name: string;
  slug: string;
  xp: number;
  difficulty: string;
};

export type ChapterType = {
  id: number;
  courseId: number;
  chapterId: number;
  name: string;
  desc: string;
  exercises: ExerciseType[];
};
export type EnrollmentType = {
  id: number;
  courseId: number;
  userId: string;
  progress: number; // percentage completed
  enrolledDate: string; // ISO timestamp string
  xpEarned: number;
};



function  Coursedetail() {
    const [courseDetail,setCourseDetail]=useState<CourseType | null>(null);
    const[loading,setLoading]=useState<boolean>(true);
    const {courseId} = useParams();
    async function fetchCourseDetail(){
        try{
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1200));
            const result=await axios.get('/api/course?courseId='+courseId);
            console.log("Course Detail:",result.data.course);
            setCourseDetail(result.data.course);
       
        }catch(error){
            console.log("Error fetching course detail:",error);
        }finally{
            setLoading(false);
        }
    }  
    useEffect(()=>{
        function call(){    
        fetchCourseDetail();
        }
        if(courseId) {
        call();
        }
    },[courseId]);
        
  return (
    <div>
     <Banner loading={loading} courseDetail={courseDetail!} refreshData={() => fetchCourseDetail()} />
     <div className='grid grid-cols-3 p-10 md:px-24 lg:px-32 xl:px-48 gap-7'>
        <div className='col-span-2'>
            <CourseChapters loading={loading} courseDetail={courseDetail}  />

        </div>
        <div className='col-span-1'>
           <CourseStatus  courseDetail={courseDetail} />
           <Upgrade />
           <Help />

        </div>

     </div>
    </div>
  )
}

export default Coursedetail;
