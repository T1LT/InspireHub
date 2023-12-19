import clsx from "clsx";
import { Square } from "lucide-react";

export function TodoCardSkeleton({ completed }: { completed: boolean }) {
  return (
    <div className="relative flex justify-between items-center min-w-[275px] w-[30vw] my-2 px-6 py-4 border rounded-md shadow-sm motion-safe:animate-pulse motion-reduce:animate-none">
      <div className="flex flex-col gap-2 w-[90%]">
        <h1 className="w-[12em] lg:w-[15em] xl:w-[18.5em] h-8 rounded-md bg-gray-200">
          {/* TITLE */}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="w-24 h-6 text-white rounded-md px-2 py-1 text-sm bg-gray-200">
            {/* PRIORITY */}
          </p>
          <p
            className={clsx("w-36 h-6 rounded-md bg-gray-200", {
              hidden: completed,
            })}
          >
            {/* DUE DATE */}
          </p>
        </div>
      </div>
      {/* CHECKBOX */}
      <div className="flex justify-center items-center w-[10%]">
        <div className="p-2">
          <Square className="h-8 w-8 text-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function TodosSkeleton({ completed }: { completed: boolean }) {
  return (
    <div className="flex flex-col overflow-y-scroll px-4 py-2 border rounded-md shadow-sm">
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
      <TodoCardSkeleton completed={completed} />
    </div>
  );
}
