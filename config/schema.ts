import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { json } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().notNull().default(0),
  subscription: varchar({ length: 50 }).notNull().default("free"),
});
export const CourseTable=pgTable("courses",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId:integer().notNull().unique(),
    title:varchar({length:255}).notNull(),
    description:varchar({length:1000}).notNull(),
    bannerImage:varchar({length:500}).notNull(),
    difficultyLevel:varchar({length:50}).notNull().default("beginner"),
    tags:varchar({length:255}).notNull(),

})
export const ChaptersTable=pgTable("chapters",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId:integer().notNull(),
    chapterId:integer().notNull(),
    name:varchar({length:255}).notNull(),
    desc:varchar({length:1000}).notNull(),
    exercises:json(), // Storing exercises as JSON
 
})
export const Enrollment=pgTable("enrollments",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId:integer().notNull(),
    userId:varchar({length:255}).notNull(),
    progress:integer().default(0), //percentage of course completed
    enrolledDate:timestamp().notNull().defaultNow(),
    xpEarned:integer().notNull().default(0),

})
export const  CompletedExercisesTable=pgTable("completed_exercises",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId:integer().notNull(),
    chapterId:integer().notNull(),
    exerciseId:integer().notNull(),
    userId:varchar({length:255}).notNull(),
    completedAt:timestamp().notNull().defaultNow(),
    
    


})
