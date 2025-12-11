import { db } from "@/config/db";
import { Enrollment } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { courseId } = await request.json();
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: "User email missing" }, { status: 400 });
    }

    // 1. Check if user is already enrolled
    const existing = await db
      .select()
      .from(Enrollment)
      .where(
        and(
          eq(Enrollment.courseId, Number(courseId)),
          eq(Enrollment.userId, userEmail)
        )
      );

    if (existing.length > 0) {
      return NextResponse.json({
        message: "Already enrolled",
        enrollment: existing[0],
      });
    }

    // 2. Insert new enrollment
    const result = await db
      .insert(Enrollment)
      .values({
        courseId: Number(courseId),
        userId: userEmail,
        xpEarned: 0,
      })
      .returning();

    return NextResponse.json({
      message: "Enrollment successful",
      enrollment: result[0],
    });
  } catch (error) {
    console.error("Enrollment request failed:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
