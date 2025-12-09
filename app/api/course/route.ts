import { db } from "@/config/db";
import { ChaptersTable, CourseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function GET(request:NextRequest){
    const{searchParams}=new URL(request.url);
    const courseId=searchParams.get("courseId");
    if(courseId){
        //fetch specific course from the database
        const result=await db.select().from(CourseTable).where(eq(CourseTable.courseId,parseInt(courseId)));
        console.log(result); //result is an array
        const chapters=await db.select().from(ChaptersTable).where(eq(ChaptersTable.courseId,parseInt(courseId)));
         return NextResponse.json({
      course: {
        ...result[0],
        chapters: chapters
      }
    });
           
    }else{
    //fetch all courses from the database
    const result=await db.select().from(CourseTable);
    console.log(result);
    return NextResponse.json({courses:result});
    }

}