import { Todo } from "@/lib/todo_data";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface TodoCardProps {
  todo: Todo;
  key: number;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const parseTime = (time: string) => {
    dayjs.extend(relativeTime);
    return dayjs().to(dayjs(time));
  };

  return (
    <div className="flex justify-between items-center min-w-[275px] my-2 px-6 py-4 border rounded-md shadow-sm hover:bg-gray-50 hover:shadow-lg cursor-pointer transition">
      <div className="flex flex-col gap-4 w-[90%]">
        <h1 className="font-semibold text-lg truncate">{todo.title}</h1>
        <div className="flex flex-col gap-2">
          <p
            className={clsx(
              "w-max text-white rounded-md px-2 py-1 text-sm",
              { "bg-red-500": todo.priority === "High" },
              { "bg-orange-500": todo.priority === "Medium" },
              { "bg-green-500": todo.priority === "Low" },
            )}
          >
            {todo.priority}
          </p>
          <p>{`⏰ Due ${parseTime(todo.due_date)}`}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-[10%]">
        <input
          type="checkbox"
          className="w-8 h-8 accent-blue-600 cursor-pointer transition"
          defaultChecked={todo.status === "completed"}
        />
      </div>
    </div>
  );
}
