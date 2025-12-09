"use client";

import Image from "next/image";
import type { CourseType } from "../page";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export type BannerProps = {
  loading: boolean;
  courseDetail: CourseType | null;
  refreshData: () => void;
};

function Banner({ loading, courseDetail, refreshData }: BannerProps) {
  const [loadingState, setLoadingState] = useState(false);

  const enrollNow = useCallback(async () => {
    if (!courseDetail?.courseId) {
      toast.error("Invalid course details.");
      return;
    }

    try {
      setLoadingState(true);

      const res = await axios.post("/api/enroll-course", {
        courseId: courseDetail.courseId,
      });

      console.log("Enroll Response:", res.data.enrollment);
      toast.success("Enrolled in course successfully!");

      // Refresh to show "Enrolled" UI state
      refreshData();
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Failed to enroll in course.");
      refreshData();
    } finally {
      setLoadingState(false);
    }
  }, [courseDetail, refreshData]);

  // -------------------------------------------------------
  //                LOADING SKELETON
  // -------------------------------------------------------
  if (loading || !courseDetail) {
    return (
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-[220px] w-full rounded-xl bg-neutral-700/70 animate-pulse" />
        <Skeleton className="h-4 w-[70%] bg-neutral-700/70 animate-pulse" />
        <Skeleton className="h-4 w-[50%] bg-neutral-700/70 animate-pulse" />
        <Skeleton className="h-4 w-[40%] bg-neutral-700/70 animate-pulse" />
      </div>
    );
  }

  // -------------------------------------------------------
  //                MAIN BANNER CONTENT
  // -------------------------------------------------------
  return (
    <div className="relative">
      <Image
        src={courseDetail.bannerImage}
        alt={courseDetail.title}
        width={1400}
        height={400}
        className="rounded-xl object-cover h-[400px] w-full"
      />

      <div className="font-pixelify-sans flex flex-col items-center space-y-4 pt-24 absolute top-0 p-10 md:px-24 lg:px-32 xl:px-48 bg-linear-to-r from-black/70 to-white-50/50 h-full">
        <h2 className="text-6xl">{courseDetail.title}</h2>
        <p className="text-3xl font-extralight">{courseDetail.description}</p>

        {/* Only show button if NOT enrolled */}
        {!courseDetail.isEnrolled ? (
          <Button
            disabled={loadingState}
            onClick={enrollNow}
            variant="pixel"
            className="mt-3 text-2xl font-black border-4 border-black hover:bg-amber-500 cursor-pointer p-5"
            size="lg"
          >
            {loadingState ? <Loader2Icon className="animate-spin" /> : "Enroll Now"}
          </Button>
        ) : (
          <div className="text-3xl font-bold mt-4 text-green-400">
            ✓ You are enrolled!
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;
