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
  if (loading || !chapter) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="space-y-4 w-full max-w-2xl">
          <Skeleton className="h-10 w-64 rounded-xl bg-neutral-700/50" />
          <Skeleton className="h-6 w-full rounded-lg bg-neutral-700/40" />
          <Skeleton className="h-6 w-5/6 rounded-lg bg-neutral-700/40" />
          <Skeleton className="h-6 w-3/4 rounded-lg bg-neutral-700/40" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-linear-to-b from-neutral-900 to-neutral-950">
      <div className="max-w-4xl mx-auto p-6 space-y-6 pb-12">
        {/* Title */}
        <header className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-700 pb-3 mb-4 -mx-6 px-6 pt-6">
          <h2 className="font-pixelify-sans text-3xl text-center tracking-wide bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {chapter.exercise.exerciseName.toLocaleUpperCase()}
          </h2>
        </header>

        {/* Main Content */}
        <section
          className="
            prose prose-invert prose-sm max-w-none
            leading-relaxed
            bg-neutral-800/50
            border border-neutral-700/50
            rounded-xl
            p-5
            shadow-xl
            hover:border-neutral-600/50
            transition-colors
            backdrop-blur-sm
          "
          dangerouslySetInnerHTML={{
            __html: htmlcontent || "<p>No content available.</p>",
          }}
        />

        {/* Task */}
        <section className="bg-linear-to-br from-blue-900/20 to-neutral-900/70 border border-blue-500/30 rounded-xl p-5 shadow-xl space-y-3 hover:border-blue-500/50 transition-all">
          <h3 className="font-pixelify-sans text-2xl bg-linear-to-r from-blue-500 to-cyan-500 text-center text-white tracking-wide py-2 rounded-lg flex items-center justify-center gap-2">
            🎯 Task
          </h3>

          <div
            className="
              prose prose-invert prose-sm max-w-none
              bg-neutral-800/70
              border border-neutral-600/50
              rounded-lg
              p-4
              backdrop-blur-sm
            "
            dangerouslySetInnerHTML={{
              __html: chapter.exercise.content.task,
            }}
          />
        </section>

        {/* Hint */}
        <section className="bg-linear-to-br from-yellow-900/20 to-neutral-900/70 border border-yellow-500/30 rounded-xl p-5 shadow-xl space-y-3 hover:border-yellow-500/50 transition-all">
          <h3 className="font-pixelify-sans text-2xl text-white text-center bg-linear-to-r from-yellow-500 to-amber-500 tracking-wide py-2 rounded-lg flex items-center justify-center gap-2">
            <LightbulbIcon className="w-6 h-6" />
            Hint
          </h3>

          <div
            className="
              prose prose-invert prose-sm max-w-none
              bg-neutral-800/70
              border border-yellow-400/20
              rounded-lg
              p-4
              backdrop-blur-sm
            "
            dangerouslySetInnerHTML={{
              __html:
                chapter.exercise.content.hint ||
                "<p>No hints available.</p>",
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default ContentSection;