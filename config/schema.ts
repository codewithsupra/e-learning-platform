import { integer, pgTable, varchar } from "drizzle-orm/pg-core";


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