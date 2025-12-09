"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import type { CourseType } from "../page";

type Props = {
  courseDetail: CourseType | null;
};

function CourseStatus({ courseDetail }: Props) {
  // ---------------------------------------------
  // EXERCISE COUNTING (correct version)
  // ---------------------------------------------
  function calculateExerciseCounts() {
    if (!courseDetail?.chapters) return { completed: 0, totalExercises: 0 };

    let completed = 0;
    let totalExercises = 0;

    for (const chapter of courseDetail.chapters) {
      for (const exercise of chapter.exercises) {
        console.log("Exercise:", exercise); //total no of exercises in each chapter
        totalExercises++;

        // TODO: Replace with real "completed" logic later.
        const isCompleted = false;
        if (isCompleted) completed++;
      }
    }

    return { completed, totalExercises };
  }

  // ---------------------------------------------
  // XP LOGIC (correct & separated)
  // ---------------------------------------------
  function calculateXP() {
    if (!courseDetail?.chapters) return { earned: 0, totalXP: 0 };

    let earned = 0;
    let totalXP = 0;

    for (const chapter of courseDetail.chapters) {
      for (const exercise of chapter.exercises) {
        totalXP += exercise.xp;

        // TODO: Replace with real completion logic
        const isCompleted = false;
        if (isCompleted) {
          earned += exercise.xp;
        }
      }
    }

    return { earned, totalXP };
  }

  const { completed, totalExercises } = calculateExerciseCounts();
  const { earned, totalXP } = calculateXP();

  const exerciseProgress =
    totalExercises === 0 ? 0 : (completed / totalExercises) * 100;

  const xpProgress = totalXP === 0 ? 0 : (earned / totalXP) * 100;

  return (
    <div
      className="font-pixelify-sans p-6 border-4 rounded-2xl border-zinc-700 
                 bg-zinc-900/60 shadow-2xl w-full space-y-6"
    >
      <h2 className="text-4xl mb-2 tracking-wide underline">Course Progress</h2>

      {/* ----------- EXERCISES COMPLETED ---------- */}
      <div className="flex items-center gap-6">
        <div className="p-3 rounded-xl">
          <Image
            src="/book.png"
            alt="Course Progress"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="flex justify-between text-xl md:text-2xl">
            Exercises Completed:
            <span className="font-bold text-green-400">
              {completed} / {totalExercises}
            </span>
          </h2>

          <Progress
            value={exerciseProgress}
            className="h-4 bg-zinc-800 border border-zinc-700"
          />

          <p className="text-sm text-zinc-400 mt-1">
            Keep going! You are leveling up fast. 🔥
          </p>
        </div>
      </div>

      {/* ---------------- XP EARNED ---------------- */}
      <div className="flex items-center gap-6">
        <div className="p-3 rounded-xl">
          <Image
            src="/star.png"
            alt="XP Earned"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="flex justify-between text-xl md:text-2xl">
            XP Earned:
            <span className="font-bold text-yellow-400">
              {earned} / {totalXP}
            </span>
          </h2>

          <Progress
            value={xpProgress}
            className="h-4 bg-zinc-800 border border-zinc-700"
          />

          <p className="text-sm text-zinc-400 mt-1">
            You are re building XP like a boss! ⚡
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseStatus;
