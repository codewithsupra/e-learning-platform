import { ChaptersTable, CompletedExercisesTable, ExerciseTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();
    const user= await currentUser();
    const userId=user?.primaryEmailAddress?.emailAddress ?? "Sheldon_Cooper";

    console.log("Received:", courseId, chapterId, exerciseId);

    // 1. Validate chapter exists
    const chapterResult = await db
      .select()
      .from(ChaptersTable)
      .where(
        and(
          eq(ChaptersTable.courseId, courseId),
          eq(ChaptersTable.chapterId, chapterId)
        )
      );

    if (chapterResult.length === 0) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // 2. Fetch exercise (slug-based)
    const exerciseResult = await db
      .select()
      .from(ExerciseTable)
      .where(
        and(
          eq(ExerciseTable.courseId, courseId),
          eq(ExerciseTable.chapterId, chapterId),
          eq(ExerciseTable.exerciseId, exerciseId) // <— THIS IS CORRECT NOW
        )
      );

    if (exerciseResult.length === 0) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }
    //get completed exercise in that course/chapter/exercise for the user
    const completedExercisesUpdated=await db.select().from(CompletedExercisesTable).where(
      and(
        eq(CompletedExercisesTable.courseId,courseId),
        eq(CompletedExercisesTable.chapterId,chapterId),
        eq(CompletedExercisesTable.userId,userId),
      )
    );
    console.log("Completed Exercise:",completedExercisesUpdated);

    // 3. Return structured result
    return NextResponse.json({
      message: "Chapter fetched successfully",
      chapter: {
        ...chapterResult[0],
        exercise: exerciseResult[0],
        completedexercise:completedExercisesUpdated||[],
      },
    });
   
    
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(err) },
      { status: 500 }
    );
  }
}
