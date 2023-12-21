"use server";

// all data fetching functions go in this file
import { unstable_noStore as noStore } from "next/cache";

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
