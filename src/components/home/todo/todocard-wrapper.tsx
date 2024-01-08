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

interface TodoCardWrapperProps {
  status: string;
  filters: string[] | undefined;
  sortBy: string | undefined;
}

export default function TodoCardWrapper({
  status,
  filters,
  sortBy,
}: TodoCardWrapperProps) {
  // const todos = todo_data;
  // const todos = await delayData(todo_data);

  const [todos, setTodos] = useState<Todo[] | null>(null);

  const sortByField = (a: Todo, b: Todo) => {
    if (!sortBy) return 0;

    const [field, order] = sortBy.split(" ");
    const priorities = { low: 0, medium: 1, high: 2 };

    if (field === "due_date") {
      if (order === "asc") return a.due_date - b.due_date;
      else return b.due_date - a.due_date;
    } else if (field === "priority") {
      if (order === "asc")
        return priorities[a.priority] - priorities[b.priority];
      else return priorities[b.priority] - priorities[a.priority];
    } else {
      return a.title.localeCompare(b.title);
    }
  };

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
        .filter((el: Todo) => {
          if (filters && filters.length) {
            return filters?.includes(el.priority);
          } else return true;
        })
        .sort(sortByField)
        .map((todo: Todo) => (
          <TodoCard todo={todo} key={todo.todo_id} />
        ))}
    </div>
  );
}
