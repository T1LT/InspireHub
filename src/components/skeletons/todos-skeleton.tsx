import { shimmer } from "./shimmer";

export function TodoCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex justify-between items-center my-2 px-6 py-4 border rounded-md shadow-sm`}
    >
      <div className="flex flex-col gap-4">
        <h1 className="h-8 w-96 rounded-md bg-gray-200">{/* TITLE */}</h1>
        <div className="flex flex-col gap-2">
          <p className="w-24 h-6 text-white rounded-md px-2 py-1 text-sm bg-gray-200">
            {/* PRIORITY */}
          </p>
          <p className="w-36 h-6 rounded-md bg-gray-200">{/* DUE DATE */}</p>
        </div>
      </div>
      {/* CHECKBOX w8 h8 */}
      <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
    </div>
  );
}

export function TodosSkeleton() {
  return (
    <div className="overflow-y-scroll p-4 border rounded-md shadow-sm">
      <TodoCardSkeleton />
      <TodoCardSkeleton />
      <TodoCardSkeleton />
      <TodoCardSkeleton />
      <TodoCardSkeleton />
      <TodoCardSkeleton />
      <TodoCardSkeleton />
      <TodoCardSkeleton />
    </div>
  );
}
