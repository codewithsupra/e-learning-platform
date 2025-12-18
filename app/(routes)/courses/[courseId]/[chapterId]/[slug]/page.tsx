"use client"

import SplitterLayout from 'react-splitter-layout';
import { useParams } from 'next/navigation';
//@ts-expect-error ts respects the rules lol
import 'react-splitter-layout/lib/index.css';
import axios from 'axios';
import { useState, useEffect,  } from 'react';
import ContentSection from './_components/ContentSection';
import CodeEditor from './_components/CodeEditor';
import type { CompletedExerciseType } from '../../page';

export type ExerciseContentType = {
  content: string;
  task: string;
  hint: string;
  starterCode: Record<string, string>;
  regex: string;
  output: string;
  hintXp: number;
};

export type ExerciseDBRow = {
  id: number;
  exerciseId: string;
  exerciseName: string;
  courseId: number;
  userId: string | null;
  chapterId: number;
  content: ExerciseContentType;
};

export type ExerciseType = {
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
  completedexercise: CompletedExerciseType[] | null;
};

export type ExerciseAPIResponse = {
  message: string;
  chapter: ChapterWithExercise;
};

function Playground() {
  const { courseId, chapterId, slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState<ChapterWithExercise | null>(null);
  const [exInfo, setExInfo] = useState<ExerciseType | null>(null);

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

 useEffect(() => {
   const GetExerciseDetail=()=>{
    const exerciseInfo=chapter?.exercises.find((ex)=>ex.slug===slug);
    setExInfo(exerciseInfo || null);
    const xPOfExercise=exerciseInfo?.xp || 0;
    return xPOfExercise;
  }
    GetExerciseDetail();
 },[ chapter, slug]
  );
  return (
    <div className='h-screen w-screen overflow-hidden bg-neutral-950'>
      <SplitterLayout 
        percentage 
        primaryMinSize={25} 
        secondaryInitialSize={60}
        customClassName="h-full"
      >
        <div className="h-full overflow-hidden">
          <ContentSection loading={loading} chapter={chapter!} />
        </div>
        <div className="h-full overflow-hidden">
          <CodeEditor exInfo={exInfo!} loading={loading} chapter={chapter!} />
        </div>
      </SplitterLayout>
    </div>
  );
}

export default Playground;