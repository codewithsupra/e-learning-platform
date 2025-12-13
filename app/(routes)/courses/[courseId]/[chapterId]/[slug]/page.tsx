"use client"

import SplitterLayout from 'react-splitter-layout';
import { useParams } from 'next/navigation';
//@ts-expect-error ts respects the rules lol
import 'react-splitter-layout/lib/index.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import ContentSection from './_components/ContentSection';

type ExerciseContentType = {
  content: string;
  task: string;
  hint: string;
  starterCode: Record<string, string>;
  regex: string;
  output: string;
  hintXp: number;
};

type ExerciseDBRow = {
  id: number;
  exerciseId: string;        // slug
  exerciseName: string;
  courseId: number;
  userId: string | null;
  chapterId: number;
  content: ExerciseContentType;
};

type ExerciseType = {
  name: string;
  slug: string;
  xp: number;
  difficulty: string;
};

export type ChapterWithExercise = {
  id: number;
  courseId: number;
  chapterId: number;
  name: string;
  desc: string;
  exercises: ExerciseType[];
  exercise: ExerciseDBRow;
};

type ExerciseAPIResponse = {
  message: string;
  chapter: ChapterWithExercise;
};



function Playground() {
  const{courseId,chapterId,slug}=useParams();
  const[loading,setLoading]=useState(false);
  const[chapter,setChapter]=useState<ChapterWithExercise|null>(null);
  console.log("Params:",courseId,chapterId,slug); //these are the url params that we can use to fetch the exercise details
    useEffect(() => {
    if (!courseId || !chapterId || !slug) return;

    async function fetchExercise() {
      try {
        const res = await axios.post<ExerciseAPIResponse>("/api/exercise", {
          courseId: Number(courseId),
          chapterId: Number(chapterId),
          exerciseId: slug,
        });
        setChapter(res.data.chapter);
        console.log("Fetched Exercise:", res.data.chapter);

       
      
      } catch (error) {
        console.error("Failed to fetch exercise:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExercise();
  }, [courseId, chapterId, slug]);


  return (
    <div className='border-t-10 rounded-2xl'>
     <SplitterLayout percentage  primaryMinSize={25} secondaryInitialSize={60}>
        <div><ContentSection loading ={loading}chapter={chapter!} /></div>
        <div >Code Editor</div>
      </SplitterLayout>
    </div>
  )
}

export default Playground;
