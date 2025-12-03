import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;

  const existingUsers = await db
    .select()
    .from(usersTable)
    //@ts-expect-error eq is clearly defined
    .where(eq(usersTable.email, email));

  // If user doesn't exist → create new one
  if (!existingUsers.length) {
    const data = {
      name: user.fullName || "Sheldon Cooper",
      email: email || "sheldon.cooper@example.com",
      points: 0,
      subscription: "free",
    };

    const result = await db
      .insert(usersTable)
      .values(data)
      .returning();

    return NextResponse.json({
      message: "User created",
      user: result[0],
    });
  }

  // If user exists → return it
  return NextResponse.json({
    message: "User already exists",
    user: existingUsers[0],
  });
}
