"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { Todo } from "./todo_data";

export async function fetchTodos() {
  noStore();

  try {
    const res = await fetch(
      "https://657b6c9d394ca9e4af145532.mockapi.io/api/todos",
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch Todo data.");
  }
}

export async function editTodo(id: string, newTodo: Todo) {
  noStore();

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
