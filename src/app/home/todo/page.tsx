import TodoCardWrapper from "@/components/home/todocardwrapper";
import { TodosSkeleton } from "@/components/skeletons/todos-skeleton";
import { Suspense } from "react";

const TodoPage = () => {
  return (
    <div className="max-h-[calc(100vh-64px)] w-full flex justify-between gap-8 p-8">
      {/* TODOS */}
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-2xl">Todos</h1>
        <Suspense fallback={<TodosSkeleton />}>
          <TodoCardWrapper />
        </Suspense>
      </div>

      {/* IN PROGRESS */}
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-2xl">In Progress</h1>
        <Suspense fallback={<TodosSkeleton />}>
          <TodoCardWrapper />
        </Suspense>
      </div>

      {/* DONE */}
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-2xl">Done</h1>
        <Suspense fallback={<TodosSkeleton />}>
          <TodoCardWrapper />
        </Suspense>
      </div>
    </div>
  );
};

export default TodoPage;
