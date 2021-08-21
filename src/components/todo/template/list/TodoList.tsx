import React, { useState, useEffect } from "react";
import { Itodo } from "components/todo/TodoService";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const SortBlock = styled.div`
  /* display: flex;
  flex-direction: row-reverse; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  select {
    border: none;
    color: #919191;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SortButton = styled.img`
  width: 20px;
`;

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList = ({ toggleTodo, removeTodo, todos }: TodoListProps) => {
  const [todoList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleSortChange = (e: any) => {
    if (e.target.value === "미완료 할일") {
      setTodoList(() => todos.filter((item) => item.done === false));
    } else if (e.target.value === "완료 할일") {
      setTodoList(() => todos.filter((item) => item.done === true));
    } else {
      setTodoList(todos);
    }
  };

  return (
    <TodoListBlock>
      <SortBlock>
        <SortButton src="https://ifh.cc/g/CbWQQv.png" alt="" />
        <select onChange={handleSortChange}>
          <option>전체 할일</option>
          <option>미완료 할일</option>
          <option>완료 할일</option>
        </select>
      </SortBlock>
      {todoList &&
        todoList.map((todo) => (
          <TodoItem
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
