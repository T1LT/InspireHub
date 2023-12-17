"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo } from "@/lib/todo_data";
import { Plus } from "lucide-react";
import CreateForm from "./create-form";

export function CreateTodoButton({ status }: { status: Todo["completed"] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus className="h-5 w-5 cursor-pointer hover:text-blue-600 motion-safe:transition motion-reduce:transition-none" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle tw="text-xl font-semibold">Create Todo</DialogTitle>
        </DialogHeader>
        <CreateForm status={status} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
