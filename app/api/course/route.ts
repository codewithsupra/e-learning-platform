import { db } from "@/config/db";
import { CourseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    //fetch all courses from the database
    const result=await db.select().from(CourseTable);
    console.log(result);
    return NextResponse.json({courses:result});

}