import TodoCard from "./todocard";
import { Todo, todo_data } from "@/lib/todo_data";

export default async function TodoCardWrapper() {
  const todos = todo_data;

  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoCard todo={todo} key={todo.todo_id} />
      ))}
    </div>
  );
}
