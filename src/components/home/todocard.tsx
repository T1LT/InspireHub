import { Todo } from "@/lib/todo_data";
import { capitalize } from "@/lib/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MarkStatusButton from "./markstatusbutton";

interface TodoCardProps {
  todo: Todo;
  key: string;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const parseTime = (time: number) => {
    dayjs.extend(relativeTime);
    return dayjs().to(dayjs.unix(time));
  };

  return (
    <div className="flex justify-between items-center min-w-[275px] my-2 px-6 py-4 border rounded-md shadow-sm hover:bg-gray-50 hover:shadow-lg cursor-pointer motion-safe:transition motion-reduce:transition-none">
      <div className="flex flex-col gap-4 w-[90%]">
        <h1
          className={clsx("font-semibold text-lg truncate", {
            "line-through": todo.completed === "completed",
          })}
        >
          {todo.title}
        </h1>
        <div className="flex flex-col gap-2">
          <p
            className={clsx(
              "w-max text-white rounded-md px-2 py-1 text-sm",
              { "bg-red-500": todo.priority === "high" },
              { "bg-orange-500": todo.priority === "medium" },
              { "bg-green-500": todo.priority === "low" },
              { "line-through": todo.completed === "completed" },
            )}
          >
            {capitalize(todo.priority)}
          </p>
          <p
            className={clsx({
              "line-through hidden": todo.completed === "completed",
            })}
          >{`⏰ Due ${parseTime(todo.due_date)}`}</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-full w-[10%]">
        {todo.completed === "open" && (
          <MarkStatusButton todo={todo} markAs="completed" />
        )}
        {todo.completed === "in_progress" && (
          <MarkStatusButton todo={todo} markAs="completed" />
        )}
        {todo.completed === "completed" && (
          <MarkStatusButton todo={todo} markAs="open" />
        )}
      </div>
    </div>
  );
}
