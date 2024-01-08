import TodoList from "@/components/home/todo/todo-list";

const TodoPage = () => {
  return (
    <div className="h-full overflow-x-scroll overscroll-none flex justify-between gap-4 p-4 md:p-8">
      <TodoList title="Todo" status="open" />
      <TodoList title="In Progress" status="in_progress" />
      <TodoList title="Completed" status="completed" />
    </div>
  );
};

export default TodoPage;
