import { db } from "@/config/db";
import { ChaptersTable, CourseTable, Enrollment } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
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

    // Enrollment
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    let isEnrolled = false;
    let enrollmentInfo = null;

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
    }

    return NextResponse.json({
      course: {
        ...result[0],
        chapters,
        isEnrolled,
        courseEnrolledInfo: enrollmentInfo,
      },
    });
  }

  // Fetch ALL courses
  const allCourses = await db.select().from(CourseTable);
  return NextResponse.json({ courses: allCourses });
}
