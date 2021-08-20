import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";

const TodoContainer = () => {
  const {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    removeDoneItems,
    removeAll,
  } = useTodo();

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        <TodoCreate
          nextId={nextIdState}
          createTodo={createTodo}
          incrementNextId={incrementNextId}
        />
        <TodoList
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          todos={todoState}
        />
        <TodoFooter
          todos={todoState}
          removeDoneItems={removeDoneItems}
          removeAll={removeAll}
        />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
