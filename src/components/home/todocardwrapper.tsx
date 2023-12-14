import TodoCard from "./todocard";
import { Todo, todo_data } from "@/lib/todo_data";

// for testing data loading
const delayData = async (data: Todo[]) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};

export default async function TodoCardWrapper({ status }: { status: string }) {
  // const todos = todo_data;
  const todos = await delayData(todo_data);

  return (
    <div className="overflow-y-scroll px-4 py-2 border rounded-md shadow-sm">
      {todos
        .filter((el) => el.status === status)
        .map((todo: Todo) => (
          <TodoCard todo={todo} key={todo.todo_id} />
        ))}
    </div>
  );
}
