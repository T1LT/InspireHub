import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconLabelProps {
  icon: LucideIcon;
  check?: string;
  value: string;
  label: string;
}

export default function IconLabel({
  icon,
  value,
  check,
  label,
}: IconLabelProps) {
  const Icon = icon;
  return (
    <div className="flex items-center">
      <Icon
        className={cn(
          "mr-2 h-4 w-4",
          !check && "opacity-100",
          check &&
            "group-hover:opacity-100 motion-safe:transition motion-reduce:transition-none",
          check && check === value && "opacity-100",
          check && check !== value && "opacity-40",
          value === "low" && "text-green-600",
          value === "medium" && "text-orange-500",
          value === "high" && "text-red-600",
        )}
      />
      <span>{label}</span>
    </div>
  );
}
