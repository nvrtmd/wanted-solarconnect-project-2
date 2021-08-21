import React, { useState } from "react";
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
  const [sort, setSort] = useState("날짜 오름차순");

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
    console.log(sort);
  };

  return (
    <TodoListBlock>
      <SortBlock>
        <SortButton src="https://ifh.cc/g/CbWQQv.png" alt="" />
        <select onChange={handleSortChange}>
          <option>날짜 오름차순</option>
          <option>날짜 내림차순</option>
        </select>
      </SortBlock>
      {todos &&
        todos.map((todo) => (
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
