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
  sortBy: string[] | undefined;
  sortOrders: string[];
}

export default function TodoCardWrapper({
  status,
  filters,
  sortBy,
  sortOrders,
}: TodoCardWrapperProps) {
  // const todos = todo_data;
  // const todos = await delayData(todo_data);

  const [todos, setTodos] = useState<Todo[] | null>(null);

  const sortByState = (a: Todo, b: Todo) => {
    if (!sortBy) return 0;

    let value = 0;
    const priorities = { low: 0, medium: 1, high: 2 };

    for (const sortProp of sortBy) {
      if (sortProp === "due_date") {
        if (sortOrders[0] === "asc") {
          value ||= a.due_date - b.due_date;
        } else {
          value ||= b.due_date - a.due_date;
        }
      } else if (sortProp === "priority") {
        if (sortOrders[1] === "asc") {
          value ||= priorities[a.priority] - priorities[b.priority];
        } else {
          value ||= priorities[b.priority] - priorities[a.priority];
        }
      } else {
        if (sortOrders[2] === "asc") {
          value ||= a.title.localeCompare(b.title);
        } else {
          value ||= b.title.localeCompare(a.title);
        }
      }
    }

    return value;
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
        .sort(sortByState)
        .map((todo: Todo) => (
          <TodoCard todo={todo} key={todo.todo_id} />
        ))}
    </div>
  );
}
