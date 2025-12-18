import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import {
  CompletedExercisesTable,
  Enrollment,
  usersTable,
} from "@/config/schema";
import { and, eq, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId =
    user.primaryEmailAddress?.emailAddress ?? "Sheldon_Cooper";

  // 🔒 CHECK IF ALREADY COMPLETED
  const existing = await db
    .select() 
    .from(CompletedExercisesTable)
    .where(
      and(
        eq(CompletedExercisesTable.userId, userId),
        eq(CompletedExercisesTable.courseId, courseId),
        eq(CompletedExercisesTable.chapterId, chapterId),
        eq(CompletedExercisesTable.exerciseId, exerciseId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      {
        message: "Exercise already completed",
        completedExercise: existing[0],
      },
      { status: 200 }
    );
  }

  // ✅ INSERT COMPLETION
  const [completedExercise] = await db
    .insert(CompletedExercisesTable)
    .values({
      courseId,
      chapterId,
      exerciseId,
      userId,
    })
    .returning();

  // ✅ UPDATE ENROLLMENT XP (CORRECT WAY)
  await db
    .update(Enrollment)
    .set({
      xpEarned: sql`${Enrollment.xpEarned} + ${xpEarned}`,
    })
    .where(
      and(
        eq(Enrollment.courseId, courseId),
        eq(Enrollment.userId, userId)
      )
    );

  // ✅ UPDATE USER POINTS (CORRECT WAY)
  await db
    .update(usersTable)
    .set({
      points: sql`${usersTable.points} + ${xpEarned}`,
    })
    .where(eq(usersTable.email, userId));

  return NextResponse.json({
    message: "Exercise marked as complete",
    completedExercise,
  });
}
