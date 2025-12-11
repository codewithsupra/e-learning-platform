"use client";

import { Button } from "@/components/ui/button";
import type { CourseType } from "../page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LockIcon, PlayIcon, RefreshCwIcon, ReplyAllIcon, ScanFaceIcon, SmileIcon, TicketCheckIcon } from "lucide-react";
import { toast } from "sonner";

type ComponentProps = {
  loading: boolean;
  courseDetail: CourseType | null;
};

function CourseChapters({ loading, courseDetail }: ComponentProps) {
  // Check if exercise is completed
  function isExerciseCompleted(chapterId: number, exerciseId: number) {
    return (
      courseDetail?.completedExercises?.some(
        (x) => x.chapterId === chapterId && x.exerciseId === exerciseId
      ) ?? false
    );
  }

  // Enable/disable logic (kept exactly as you had it)
  const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number,
    chapterExercisesLength: number
  ) => {
    const completed = courseDetail?.completedExercises;

    // If nothing is completed, enable FIRST exercise ONLY
    if (!completed || completed.length === 0) {
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    // Last completed exercise
    const last = completed[completed.length - 1];

    // Convert to global exercise number
    const currentExerciseNumber =
      chapterIndex * chapterExercisesLength + exerciseIndex + 1;

    const lastCompletedNumber =
      (last.chapterId - 1) * chapterExercisesLength + last.exerciseId;

    return currentExerciseNumber === lastCompletedNumber + 2;
  };

  if (loading || !courseDetail || courseDetail.chapters?.length === 0) {
    toast.info("Course chapters are loading...");
    return (
      <div className="space-y-3 text-neutral-400">
        <div className="h-6 w-40 bg-neutral-700/50 animate-pulse rounded-md" />
        <div className="h-6 w-56 bg-neutral-700/50 animate-pulse rounded-md" />
        <div className="h-6 w-44 bg-neutral-700/50 animate-pulse rounded-md" />
      </div>
    );
  }

  return (
    <div className="border border-zinc-700 bg-zinc-900/60 p-6 rounded-2xl shadow-xl space-y-6">
      {courseDetail.chapters?.map((chapter, index) => (
        <Accordion
          key={index}
          type="single"
          collapsible
          className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800/50"
        >
          <AccordionItem value={`item-${chapter.chapterId}`}>
            <AccordionTrigger className="p-4 font-mono text-xl flex items-center gap-6 hover:bg-zinc-700/60 transition-all">
              <div className="flex items-center gap-4">
                <h2 className="h-12 w-12 bg-zinc-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  {index + 1}
                </h2>
                <h2 className="text-xl">{chapter.name}</h2>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="p-6 bg-zinc-900 border-t border-zinc-700 space-y-4">
                {chapter.exercises.map((exercise, i) => {
                  const exerciseId = i + 1; // your schema uses 1-based exerciseId
                  const globalExerciseNumber =
                    index * chapter.exercises.length + exerciseId;

                  const completed = isExerciseCompleted(
                    chapter.chapterId,
                    exerciseId
                  );

                  const enabled = EnableExercise(
                    index,
                    i,
                    chapter.exercises.length
                  );

                  return (
                    <div
                      key={i}
                      className="p-4 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 transition-all border-4 border-zinc-700"
                    >
                      <div className="flex items-center justify-center gap-6 font-mono">
                        <h2 className="text-lg underline font-bold">
                          Exercise {globalExerciseNumber}
                        </h2>
                        <h2 className="text-lg">{exercise.name}</h2>
                      </div>

                      {/* MUTUALLY EXCLUSIVE: Completed -> Start -> Locked */}
                      {completed ? (
                        <Button
                          variant={"pixel"}
                          size="lg"
                          className="font-pixelify-sans bg-green-500"
                        >
                          <SmileIcon/>Completed
                        </Button>
                      ) : enabled ? (
                        <Button
                          variant={"pixel"}
                          size={"lg"}
                          className="font-pixelify-sans underline text-sm"
                        >
                          <PlayIcon />Play Now
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"pixelDisabled"}
                              size={"lg"}
                              className="font-mono text-sm flex gap-2 p-2"
                            >
                              <LockIcon /> <span>Locked</span>
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent className="font-pixelify-sans bg-red-400 rounded-t-lg text-center flex flex-col items-center gap-2 ">
                            <ScanFaceIcon />
                            <h2 className="text-sm text-black">
                              This exercise is locked.
                            </h2>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default CourseChapters;
