import TodoCardWrapper from "@/components/home/todocardwrapper";
import { TodosSkeleton } from "@/components/skeletons/todos-skeleton";
import { ArrowUpCircle, CheckCircle2, Circle } from "lucide-react";
import { Suspense } from "react";

const TodoPage = () => {
  return (
    <div className="max-h-[calc(100vh-64px)] overflow-x-scroll overscroll-none flex justify-between gap-4 p-4 md:p-8">
      {/* TODOS */}
      <div className="flex flex-col w-full">
        <h1 className="flex items-center font-bold text-2xl mb-2">
          <Circle className="mr-2 h-5 w-5" />
          Todos
        </h1>
        <Suspense fallback={<TodosSkeleton completed={false} />}>
          <TodoCardWrapper status="open" />
        </Suspense>
      </div>

      {/* IN PROGRESS */}
      <div className="flex flex-col w-full">
        <h1 className="flex items-center font-bold text-2xl mb-2">
          <ArrowUpCircle className="mr-2 h-5 w-5" />
          In Progress
        </h1>
        <Suspense fallback={<TodosSkeleton completed={false} />}>
          <TodoCardWrapper status="in_progress" />
        </Suspense>
      </div>

      {/* DONE */}
      <div className="flex flex-col w-full">
        <h1 className="flex items-center font-bold text-2xl mb-2">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Done
        </h1>
        <Suspense fallback={<TodosSkeleton completed />}>
          <TodoCardWrapper status="completed" />
        </Suspense>
      </div>
    </div>
  );
};

export default TodoPage;
