import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
  const words = string.split("_");
  const parsed = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  return parsed.join(" ");
}
