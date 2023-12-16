import { capitalize } from "@/lib/utils";
import clsx from "clsx";

export default function PriorityLabel({
  priority,
  completed,
}: {
  priority: "low" | "medium" | "high";
  completed?: "open" | "in_progress" | "completed";
}) {
  return (
    <p
      className={clsx(
        "w-max text-white rounded-md px-2 py-1 text-sm",
        { "bg-red-500": priority === "high" },
        { "bg-orange-500": priority === "medium" },
        { "bg-green-500": priority === "low" },
        { "line-through": completed === "completed" },
      )}
    >
      {capitalize(priority)}
    </p>
  );
}
