"use client";

import { Todo } from "@/lib/todo_data";
import { editTodo } from "@/lib/actions";
import { Square, CheckSquare2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const Icon = markAs === "completed" ? Square : CheckSquare2;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="p-2" onClick={(e) => handleClick(e, todo, markAs)}>
            <Icon className="h-8 w-8 text-neutral-500 hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {todo.completed === "completed"
              ? "Mark as Todo"
              : "Mark as Completed"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
