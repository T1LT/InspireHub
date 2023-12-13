import TodoCard from "@/components/home/todocard";
import { todo_data } from "@/lib/todo_data";

const TodoPage = () => {
  return (
    <div className="flex flex-col p-8">
      <h1 className="font-bold text-2xl">Todos</h1>
      <div>
        {todo_data.map((todo) => (
          <TodoCard todo={todo} key={todo.todo_id} />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
