export function TodoCardSkeleton() {
  return (
    <div className="relative flex justify-between items-center min-w-[275px] my-2 px-6 py-4 border rounded-md shadow-sm motion-safe:animate-pulse motion-reduce:animate-none">
      <div className="flex flex-col gap-4 w-[90%]">
        <h1 className="w-[18em] h-8 rounded-md bg-gray-200">{/* TITLE */}</h1>
        <div className="flex flex-col gap-2">
          <p className="w-24 h-6 text-white rounded-md px-2 py-1 text-sm bg-gray-200">
            {/* PRIORITY */}
          </p>
          <p className="w-36 h-6 rounded-md bg-gray-200">{/* DUE DATE */}</p>
        </div>
      </div>
      {/* CHECKBOX */}
      <div className="flex justify-center items-center w-[10%]">
        <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
      </div>
    </div>
  );
}

export function TodosSkeleton() {
  return (
    <div className="overflow-y-scroll px-4 py-2 border rounded-md shadow-sm">
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
