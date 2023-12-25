"use client";

import { fetchTodos } from "@/lib/data";
import TodoCard from "./todocard";
import { Todo, todo_data } from "@/lib/todo_data";
import { useEffect, useState } from "react";
import { TodosSkeleton } from "@/components/skeletons/todos-skeleton";

// for testing data loading
// const delayData = async (data: Todo[]) => {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return data;
// };

export default function TodoCardWrapper({ status }: { status: string }) {
  // const todos = todo_data;
  // const todos = await delayData(todo_data);

  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTodos();
      setTodos(data);
    })();
  }, []);

  if (!todos) return <TodosSkeleton completed={status === "completed"} />;

  return (
    <div className="flex flex-col items-center overflow-y-scroll px-4 py-2 border rounded-md shadow-sm">
      {todos
        .filter((el: Todo) => el.completed === status)
        .map((todo: Todo) => (
          <TodoCard todo={todo} key={todo.todo_id} />
        ))}
    </div>
  );
}
