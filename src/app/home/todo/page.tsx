import { CreateTodoButton } from "@/components/home/create-todo";
import TodoCardWrapper from "@/components/home/todocard-wrapper";
import { TodosSkeleton } from "@/components/skeletons/todos-skeleton";
import { ArrowUpCircle, CheckCircle2, Circle } from "lucide-react";
import { Suspense } from "react";

const TodoPage = () => {
  return (
    <div className="max-h-[calc(100vh-64px)] overflow-x-scroll overscroll-none flex justify-between gap-4 p-4 md:p-8">
      {/* TODOS */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-2">
          <h1 className="flex items-center font-bold text-2xl">
            <Circle className="mr-2 h-5 w-5" />
            Todo
          </h1>
          <CreateTodoButton status="open" />
        </div>
        <Suspense fallback={<TodosSkeleton completed={false} />}>
          <TodoCardWrapper status="open" />
        </Suspense>
      </div>

      {/* IN PROGRESS */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-2">
          <h1 className="flex items-center font-bold text-2xl">
            <ArrowUpCircle className="mr-2 h-5 w-5" />
            In Progress
          </h1>
          <CreateTodoButton status="in_progress" />
        </div>
        <Suspense fallback={<TodosSkeleton completed={false} />}>
          <TodoCardWrapper status="in_progress" />
        </Suspense>
      </div>

      {/* DONE */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-2">
          <h1 className="flex items-center font-bold text-2xl">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Completed
          </h1>
          {/* <CreateTodoButton status="completed" /> */}
        </div>
        <Suspense fallback={<TodosSkeleton completed />}>
          <TodoCardWrapper status="completed" />
        </Suspense>
      </div>
    </div>
  );
};

export default TodoPage;
