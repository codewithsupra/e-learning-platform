/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/config/db";
import { ChaptersTable, CompletedExercisesTable, CourseTable, Enrollment } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  // If requesting a specific course
  if (courseId) {
    const numericId = parseInt(courseId);

    // Fetch course
    const result = await db
      .select()
      .from(CourseTable)
      .where(eq(CourseTable.courseId, numericId));

    if (result.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Fetch chapters
    const chapters = await db
      .select()
      .from(ChaptersTable)
      .where(eq(ChaptersTable.courseId, numericId));

    // Get user
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    let isEnrolled = false;
    let enrollmentInfo = null;
    
    let completedExercises: any[] = [];

    // If logged in → check enrollment + completed exercises
    if (userEmail) {
      const enrollment = await db
        .select()
        .from(Enrollment)
        .where(
          and(
            eq(Enrollment.courseId, numericId),
            eq(Enrollment.userId, userEmail)
          )
        );

      isEnrolled = enrollment.length > 0;
      enrollmentInfo = enrollment.length > 0 ? enrollment[0] : null;

      // Fetch completed exercises
      completedExercises = await db
        .select()
        .from(CompletedExercisesTable)
        .where(
          and(
            eq(CompletedExercisesTable.courseId, numericId),
            eq(CompletedExercisesTable.userId, userEmail)
          )
        ).orderBy(desc(CompletedExercisesTable.completedAt),desc(CompletedExercisesTable.courseId),desc(CompletedExercisesTable.exerciseId));
    }

    return NextResponse.json({
      course: {
        ...result[0],
        chapters,
        isEnrolled,
        courseEnrolledInfo: enrollmentInfo,
        completedExercises, // ← your completed history added!
      },
    });
  }

  // Fetch ALL courses
  const allCourses = await db.select().from(CourseTable);
  return NextResponse.json({ courses: allCourses });
}
