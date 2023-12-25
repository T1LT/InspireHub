import TodoList from "@/components/home/todo/todo-list";
import TodoCardWrapper from "@/components/home/todo/todocard-wrapper";

const TodoPage = () => {
  return (
    <div className="max-h-[calc(100vh-64px)] overflow-x-scroll overscroll-none flex justify-between gap-4 p-4 md:p-8">
      <TodoList title="Todo" status="open">
        <TodoCardWrapper status="open" />
      </TodoList>
      <TodoList title="In Progress" status="in_progress">
        <TodoCardWrapper status="in_progress" />
      </TodoList>
      <TodoList title="Completed" status="completed">
        <TodoCardWrapper status="completed" />
      </TodoList>
    </div>
  );
};

export default TodoPage;
