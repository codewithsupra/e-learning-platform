/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useSandpack } from "@codesandbox/sandpack-react";
import SplitterLayout from "react-splitter-layout";
import { levelUp } from "@codesandbox/sandpack-themes";
// @ts-expect-error css import
import "react-splitter-layout/lib/index.css";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { CompletedExercisesTable } from "@/config/schema";
import axios from "axios";

import type { ChapterWithExercise } from "../page";
import type { ExerciseType } from "../page";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCheckIcon,  } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  loading: boolean;
  chapter: ChapterWithExercise;
  exInfo: ExerciseType | null;
};

/* TOP TOOLBAR */

function CodeEditorChildren({onCompleteExercise,disabled}:any) {
  const { sandpack } = useSandpack();
  const{courseId}=useParams();
  

  return (
    <div className="font-pixelify-sans flex gap-3 p-3 border-b border-neutral-700 bg-zinc-900">
      <Button
        variant="pixel"
        size="lg"
        className="text-xl bg-amber-400! cursor-pointer text-black hover:bg-amber-500 hover:scale-105 transition-transform"
        onClick={() => {
          sandpack.runSandpack();
          toast.success("Code executed!", { duration: 1500 });
        }}
      >
        Run Code
      </Button>

      <Button
        variant="pixel"
        disabled={disabled}
        size="lg"
        className="text-xl bg-green-500! cursor-pointer text-black hover:bg-green-600 hover:scale-105 transition-transform"
        onClick={()=>onCompleteExercise()}
      >
        <CheckCheckIcon />
        {disabled ? "Completed" : "Mark Complete"}
      </Button>
      <Link href={'/courses/'+courseId}>
      <Button className="text-xl cursor-pointer font-pixelify-sans bg-white" variant="pixel" size="lg">
        Go back
        </Button>
        </Link>
    
    </div>
  );
}

function CodeEditor({ loading, chapter, exInfo }: Props) {
    const{slug}=useParams();
    const router=useRouter();

    const slugName=slug as string;
    const[completedEx,setCompletedEx]=useState<InferSelectModel<typeof CompletedExercisesTable> | null>(null);
    async function CompleteExercise() {
      // Simulate marking exercise as complete
      
      const exerciseIndex=chapter.exercises.findIndex((ex)=>ex.slug===slugName);
      if(exerciseIndex===-1){
        toast.error("Exercise not found!", { duration: 2000 });
        return;
      }
      const apiResponse=await axios.post("/api/exercise/complete",{
        chapterId:chapter.chapterId,
        exerciseId:exerciseIndex+1,
        courseId:chapter.courseId,
        xpEarned:exInfo?.xp || 0,
      });
      const completed = apiResponse.data.completedExercise;
     setCompletedEx(completed);
     
      toast.success(`${completed?.completedAt} time duration`, { duration: 2000 });
      
    }
    function PrevFunction(){
      // Navigate to previous exercise or chapter
      toast("Navigating to previous exercise (not implemented)", { duration: 2000 });
      //get current exercise index
      const currentExerciseIndex=chapter.exercises.findIndex((ex)=>ex.slug===slugName);

      const prevExercise=chapter.exercises[currentExerciseIndex-1].slug;
      if(!prevExercise){
        toast.error("This is the first exercise in this chapter.", { duration: 2000 });
        return;
      }
    
        //redirect to that exercise
        router.push('/courses/'+chapter.courseId+'/'+chapter.chapterId+'/'+prevExercise);
    }
    function NextFunction(){
      // Navigate to next exercise or chapter
      toast("Navigating to next exercise (not implemented)", { duration: 2000 });
      const currIdx=chapter.exercises.findIndex((ex)=>ex.slug===slugName);
      const nextExercise=chapter.exercises[currIdx+1].slug;
      if(!nextExercise){
        toast.error("This is the last exercise in this chapter.", { duration: 2000 });
        return;
      }
      router.push('/courses/'+chapter.courseId+'/'+chapter.chapterId+'/'+nextExercise);
    }
  

  return (
    <div className="h-full relative">
      <SandpackProvider
        template="static"
        theme={levelUp}
        files={chapter?.exercise.content.starterCode}
        options={{
          autorun: false,
          autoReload: false,
            
        }}
      >
        <SplitterLayout
          percentage
          primaryMinSize={30}
          secondaryMinSize={30}
          secondaryInitialSize={50}
        >
          {/* LEFT — EDITOR */}
          <div className="h-full flex flex-col bg-zinc-950 relative">
            {/* TOP BAR */}
            <CodeEditorChildren onCompleteExercise={CompleteExercise} disabled={completedEx !== null} />

            {/* CODE EDITOR - takes all remaining space */}
            <div className="flex-1 min-h-0 relative pb-20">
              <SandpackCodeEditor
                showTabs
                showRunButton={false}
                style={{ height: "100%" }}
              />
              
              {/* FLOATING PREV/NEXT BUTTONS - positioned at bottom of editor */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-between items-center px-6 z-50">
                <Button 
                  variant={'pixel'} 
                  onClick={()=>PrevFunction()}
                  className="text-xl cursor-pointer font-pixelify-sans shadow-2xl hover:scale-105 transition-transform" 
                  size={'lg'}
                >
                  <ArrowLeft /> Prev
                </Button>
                <div className="flex gap-2 items-center text-white text-lg border-4 font-pixelify-sans rounded-2xl px-4 py-2 shadow-xl">
                    <Image src="/star.png" alt="Star" height={40} width={20}/>
                    <h2>Earn {exInfo?.xp || 0} XP Now</h2>
                </div>

                <Button
                  variant="pixel"
                  size="lg"
                  className="text-xl font-pixelify-sans cursor-pointer hover:bg-blue-600 shadow-2xl hover:scale-105 transition-transform"
                  onClick={NextFunction}
                >
                  Next <ArrowRight />
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT — PREVIEW */}
          <SandpackPreview
            style={{ height: "100%" }}
            showNavigator
            showOpenInCodeSandbox={false}
          />
        </SplitterLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;