/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  var nextIdState = 0;

  useEffect(() => {
    loadData();
    console.log(todoState);
  }, []);

  useEffect(() => {
    saveData();
    console.log(todoState);
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) => [
      ...prevState.filter((todo: Itodo) => todo.id !== id),
      ...prevState
        .filter((todo: Itodo) => todo.id === id)
        .map((item) => {
          item.done = !item.done;
          return item;
        }),
    ]);
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    let lastIdIdx = todoState.length - 1;
    if (lastIdIdx < 0) {
      setTodoState((prevState) =>
        prevState.concat({
          ...todo,
          id: 1,
        })
      );
      return;
    }
    const nextId = todoState[lastIdIdx].id + 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
  };

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data!);
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
