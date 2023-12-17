"use server";

// all data mutating actions go in this file
import { revalidatePath } from "next/cache";
import { Todo } from "./todo_data";

export async function createTodo(todoData: Omit<Todo, "todo_id">) {
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

export async function deleteTodo(id: string) {
  try {
    await fetch(`https://657b6c9d394ca9e4af145532.mockapi.io/api/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return { message: "Failed to delete Todo." };
  }

  revalidatePath("/home/todo");
}
