import TodoCardWrapper from "@/components/home/todocardwrapper";
import { TodosSkeleton } from "@/components/skeletons/todos-skeleton";
import { Suspense } from "react";

const TodoPage = () => {
  return (
    <div className="flex flex-col p-8">
      <h1 className="font-bold text-2xl">Todos</h1>
      <Suspense fallback={<TodosSkeleton />}>
        <TodoCardWrapper />
      </Suspense>
    </div>
  );
};

export default TodoPage;
