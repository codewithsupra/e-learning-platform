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
} from "@/components/ui/tooltip"
import { LockIcon, ScanFaceIcon } from "lucide-react";

type ComponentProps = {
  loading: boolean;
  courseDetail: CourseType | null;
};

function CourseChapters({ loading, courseDetail }: ComponentProps) {
  if (loading || !courseDetail || courseDetail.chapters?.length === 0) {
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
                {chapter.exercises.map((exercise, i) => (
                  <div
                    key={i}
                    className="p-4 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 transition-all border-4 border-zinc-700"
                  >
                    <div className="flex items-center justify-center gap-6 font-mono">
                      <h2 className="text-lg underline font-bold">
                        Exercise {index*chapter.exercises.length + i + 1}
                      </h2>
                      <h2 className="text-lg">{exercise.name}</h2>
                    </div>

                    {/* <Button
                      variant={"pixel"}
                      size={"lg"}
                      className="font-mono text-sm"
                    > */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                     <Button
                      variant={"pixelDisabled"}
                      size={"lg"}
                      className="font-mono text-sm"
                    >
                      <LockIcon />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent className="font-pixelify-sans bg-red-400 text-center flex items-center gap-2 font-mono">
                        <ScanFaceIcon />
                      This exercise is locked.
                    </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default CourseChapters;
