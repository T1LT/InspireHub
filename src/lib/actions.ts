"use server";

// all data mutating actions go in this file
import { revalidatePath } from "next/cache";
import { Todo } from "./todo_data";
import { z } from "zod";

const TodoSchema = z.object({
  todo_id: z.string(),
  user_id: z.string(),
  title: z.string({
    required_error: "Please enter a title.",
  }),
  body: z.string().optional(),
  due_date: z.coerce
    .date()
    .min(new Date(), { message: "Due date cannot be in the past." }),
  completed: z.enum(["open", "in_progress", "completed"], {
    required_error: "Please select a status.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority.",
  }),
});

export type State = {
  errors?: {
    title?: string[];
    body?: string[];
    due_date?: string[];
    completed?: string[];
    priority?: string[];
  };
  message?: string | null;
};

const CreateTodo = TodoSchema.omit({ todo_id: true, user_id: true });

export async function editTodo(id: string, newTodo: Todo) {
  try {
    await fetch(`https://657b6c9d394ca9e4af145532.mockapi.io/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTodo),
    });
  } catch (error) {
    return { message: "Failed to update Todo." };
  }
  revalidatePath("/home/todo");
}

export async function createTodo(prevState: State, formData: FormData) {
  const validatedFields = CreateTodo.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Todo.",
    };
  }

  const todoData = validatedFields.data;
  // add user_id here
  // parse date based on how its stored

  try {
    await fetch("https://657b6c9d394ca9e4af145532.mockapi.io/api/todos", {
      method: "POST",
      body: JSON.stringify(todoData),
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to create Todo.",
    };
  }

  revalidatePath("/home/todo");
}
