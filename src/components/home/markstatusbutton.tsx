"use client";

import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";

async function handleClick(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  todo: Todo,
  status: string,
) {
  e.stopPropagation();
  const newTodo = { ...todo, completed: status };
  await editTodo(todo.todo_id, newTodo);
}

export default function MarkStatusButton({
  todo,
  markAs,
}: {
  todo: Todo;
  markAs: string;
}) {
  const Icon = markAs === "completed" ? FaRegSquare : FaCheckSquare;
  return (
    <div
      className="flex flex-col h-full p-2"
      onClick={(e) => handleClick(e, todo, markAs)}
    >
      <Icon className="text-3xl text-neutral-500 hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
    </div>
  );
}
