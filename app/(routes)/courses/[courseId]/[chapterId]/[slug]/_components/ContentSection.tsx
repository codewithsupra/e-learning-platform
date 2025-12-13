import { Skeleton } from "@/components/ui/skeleton";
import type { ChapterWithExercise } from "../page";
import { LightbulbIcon } from "lucide-react";

type Props = {
  chapter: ChapterWithExercise | null;
  loading?: boolean;
};

function ContentSection({ chapter, loading }: Props) {
  const htmlcontent = chapter?.exercise.content.content;

  // Loading skeleton
  if (loading && !chapter) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-56 bg-neutral-700/60 rounded-xl" />
        <Skeleton className="h-6 w-full bg-neutral-700/60 rounded-xl" />
        <Skeleton className="h-6 w-4/5 bg-neutral-700/60 rounded-xl" />
        <Skeleton className="h-6 w-3/5 bg-neutral-700/60 rounded-xl" />
      </div>
    );
  }

  if (!chapter) {
    return <div className="p-4 text-red-500">Failed to load content.</div>;
  }

  return (
    <div className="p-8 overflow-y-auto h-full space-y-8">

      {/* Title */}
      <h2 className="font-pixelify-sans text-4xl text-primary  underline tracking-wide">
        {chapter.exercise.exerciseName}
      </h2>

      {/* Main content */}
      <section
        className="prose prose-invert max-w-none leading-relaxed bg-neutral-900/40 p-6 rounded-2xl border border-neutral-700 shadow-lg"
        dangerouslySetInnerHTML={{
          __html: htmlcontent || "<p>No content available.</p>",
        }}
      />

      {/* Task Section */}
      <section className="bg-neutral-900/60 p-6 rounded-2xl border border-primary/40 shadow-lg space-y-4">
        <h3 className="font-pixelify-sans text-3xl text-primary underline">
          Task
        </h3>

        <div
          className="prose prose-invert p-4 bg-zinc-600 max-w-none rounded-2xl leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: chapter.exercise.content.task,
          }}
        />
        <h3 className="font-pixelify-sans  text-yellow-400 text-3xl flex gap-2 items-center underline">
          <LightbulbIcon />  Hint
        </h3>

        <div
          className="prose prose-invert p-4 bg-zinc-600 max-w-none rounded-2xl leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: chapter.exercise.content.hint || "<p>No hints available.</p>",
          }}
        />
      </section>

    </div>
  );
}

export default ContentSection;
