"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import type { CourseType } from "../page";

type Props = {
  courseDetail: CourseType | null;
};

function CourseStatus({ courseDetail }: Props) {
  if (!courseDetail) return null;

  const enrollment = courseDetail.courseEnrolledInfo;

  // SAFETY: No enrollment means no progress.
  const progressPercent = enrollment?.progress ?? 0;
  const xpEarned = enrollment?.xpEarned ?? 0;

  // -------------------------------------------------------
  // COUNT TOTAL EXERCISES & TOTAL POSSIBLE XP
  // -------------------------------------------------------
  let totalExercises = 0;
  let totalXP = 0;

  if (courseDetail.chapters) {
    for (const chapter of courseDetail.chapters) {
      totalExercises += chapter.exercises.length;
      for (const exercise of chapter.exercises) {
        totalXP += exercise.xp;
      }
    }
  }

  // -------------------------------------------------------
  // CALCULATE COMPLETED EXERCISES FROM PERCENTAGE
  // (because your DB only stores progress %)
  // -------------------------------------------------------
  const completedExercises = Math.round((progressPercent / 100) * totalExercises);

  // XP progress
  const xpProgress = totalXP === 0 ? 0 : (xpEarned / totalXP) * 100;

  return (
    <div className="font-pixelify-sans p-6 border-4 rounded-2xl border-zinc-700 bg-zinc-900/60 shadow-2xl w-full space-y-6">
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
              {completedExercises} / {totalExercises}
            </span>
          </h2>

          <Progress
            value={progressPercent}
            className="h-3 bg-zinc-900 border border-zinc-700"
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
            <span className="font-bold text-green-400">
              {xpEarned} / {totalXP}
            </span>
          </h2>

          <Progress
            value={xpProgress}
            className="h-3 bg-zinc-900 border border-zinc-700"
          />

          <p className="text-sm text-zinc-400 mt-1">
            You are rebuilding XP like a boss! ⚡
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseStatus;
