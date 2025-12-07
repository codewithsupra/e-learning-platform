"use client";

import axios from "axios";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export type Course = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  bannerImage: string;
  difficultyLevel: string;
  tags: string;
};

function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const GetAllCourses = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/course");
      setCourses(result.data.courses || []);
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllCourses();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="animate-spin h-12 w-12 border-4 border-gray-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg py-10">
        No courses found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all p-4 group"
        >
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={course.bannerImage}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform w-full h-[200px] rounded-t-lg"
            />
          </div>

          <h2 className="text-xl font-bold mt-4 font-pixelify-sans text-white">
            {course.title}
          </h2>

          <p className="text-gray-300 mt-2 line-clamp-3">
            {course.description}
          </p>

          <div className="mt-4 flex justify-between text-sm text-gray-200">
            <span className="px-3 py-1 rounded-full bg-primary border font-pixelify-mono border-white/20">
            <ChartNoAxesColumnIncreasingIcon className="inline-block mr-2 mb-1" size={16} />
              {course.difficultyLevel.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/40 border border-white/20">
              {course.tags}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
