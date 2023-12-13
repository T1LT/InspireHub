import TodoCard from "./todocard";
import { Todo, todo_data } from "@/lib/todo_data";

// for testing data loading
const delayData = async (data: Todo[]) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};

export default async function TodoCardWrapper() {
  // const todos = todo_data;
  const todos = await delayData(todo_data);

  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoCard todo={todo} key={todo.todo_id} />
      ))}
    </div>
  );
}
