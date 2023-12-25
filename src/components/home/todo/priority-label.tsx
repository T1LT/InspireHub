import { capitalize } from "@/lib/utils";
import clsx from "clsx";

export default function PriorityBadge({
  priority,
}: {
  priority: "low" | "medium" | "high";
}) {
  return (
    <p
      className={clsx(
        "w-max text-white rounded-md px-2 py-1 text-sm",
        { "bg-red-500": priority === "high" },
        { "bg-orange-500": priority === "medium" },
        { "bg-green-500": priority === "low" },
      )}
    >
      {capitalize(priority)}
    </p>
  );
}
