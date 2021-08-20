/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  dueDate: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  var nextIdState = 0;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) =>
      prevState.map((item) => {
        return item.id === id ? { ...item, done: !item.done } : item;
      })
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const removeDoneItems = (arr: any) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => arr.includes(todo))
    );
  };

  const removeAll = () => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => !todo.text));
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
    removeDoneItems,
    removeAll,
  };
};
