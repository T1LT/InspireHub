"use client";

import { SquareIcon, CheckSquare2Icon } from "lucide-react";
import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";

async function handleClick(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  todo: Todo,
  status: "open" | "in_progress" | "completed",
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
  markAs: "open" | "in_progress" | "completed";
}) {
  const Icon = markAs === "completed" ? SquareIcon : CheckSquare2Icon;
  return (
    <div className="p-2" onClick={(e) => handleClick(e, todo, markAs)}>
      <Icon className="h-8 w-8 text-neutral-500 hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
    </div>
  );
}
