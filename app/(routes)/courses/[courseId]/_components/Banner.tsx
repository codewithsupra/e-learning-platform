"use client";
import Image from "next/image";
import type { CourseType } from "../page";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

 export type BannerProps = {
  loading: boolean;
  courseDetail: CourseType | null;
};

function Banner({ loading, courseDetail }: BannerProps) {
  return (
    <div>
      {loading || !courseDetail ? (
        <div className="flex flex-col space-y-4">

          {/* IMAGE SKELETON */}
          <Skeleton
            className="h-[220px] w-full rounded-xl bg-neutral-700/70 animate-pulse"
          />

          {/* TEXT SKELETONS */}
          <Skeleton className="h-4 w-[70%] bg-neutral-700/70 animate-pulse" />
          <Skeleton className="h-4 w-[50%] bg-neutral-700/70 animate-pulse" />
          <Skeleton className="h-4 w-[40%] bg-neutral-700/70 animate-pulse" />

        </div>
      ) : (
        <div className="relative">
        <Image
          src={courseDetail.bannerImage}
          alt={courseDetail.title}
          width={1400}
          height={300}
          className="rounded-xl object-cover h-[400px] w-full"
        />
        <div className="font-pixelify-sans  flex flex-col items-center space-y-4 pt-24 absolute top-0 p-10 md:px-24 lg:px-32 xl:px-48 bg-linear-to-r from-black/70 to-white-50/50 h-full">
        <h2 className="text-6xl">{courseDetail.title}</h2>
        <p className="text-3xl font-extralight text-gra">{courseDetail.description}</p>
        <Button variant="pixel" className="mt-3 text-2xl" size={'lg'}>Enroll Now</Button>
        </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
