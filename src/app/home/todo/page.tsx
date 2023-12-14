import TodoCardWrapper from "@/components/home/todocardwrapper";
import { TodosSkeleton } from "@/components/skeletons/todos-skeleton";
import { Suspense } from "react";

const TodoPage = () => {
  return (
    <div className="max-h-[calc(100vh-64px)] overflow-x-scroll overscroll-none flex justify-between gap-4 p-4 md:p-8">
      {/* TODOS */}
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-2xl">Todos</h1>
        <Suspense fallback={<TodosSkeleton />}>
          <TodoCardWrapper status="open" />
        </Suspense>
      </div>

      {/* IN PROGRESS */}
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-2xl">In Progress</h1>
        <Suspense fallback={<TodosSkeleton />}>
          <TodoCardWrapper status="in_progress" />
        </Suspense>
      </div>

      {/* DONE */}
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-2xl">Done</h1>
        <Suspense fallback={<TodosSkeleton />}>
          <TodoCardWrapper status="completed" />
        </Suspense>
      </div>
    </div>
  );
};

export default TodoPage;
