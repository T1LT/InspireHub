"use client";

import { ArrowUpCircle, CheckCircle2, Circle, LucideIcon } from "lucide-react";
import FilterTodoButton from "./filter-todo";
import { CreateTodoButton } from "./create-todo";
import { useState } from "react";
import TodoCardWrapper from "./todocard-wrapper";

interface TodoListProps {
  title: string;
  status: "open" | "in_progress" | "completed";
}

let Icon: LucideIcon;

export default function TodoList({ title, status }: TodoListProps) {
  if (status === "open") Icon = Circle;
  if (status === "in_progress") Icon = ArrowUpCircle;
  if (status === "completed") Icon = CheckCircle2;

  const [filters, setFilters] = useState<string[] | undefined>();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="flex items-center font-bold text-2xl">
          <Icon className="mr-2 h-5 w-5" />
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <FilterTodoButton filters={filters} setFilters={setFilters} />
          {status !== "completed" && <CreateTodoButton status={status} />}
        </div>
      </div>
      <TodoCardWrapper status={status} filters={filters} />
    </div>
  );
}
