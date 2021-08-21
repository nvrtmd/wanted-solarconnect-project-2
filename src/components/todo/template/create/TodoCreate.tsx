import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import { DatePicker } from "antd";
import moment from "moment";

const CircleButton = styled.button<{ activate: string }>`
  background: #ababab;
  width: 50px;
  height: 50px;
  margin-top: 5px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease 0s;
  ${(props) =>
    props.activate &&
    css`
      cursor: pointer;
      &:hover {
        box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
        background: #33bb77;
        color: #fff;
      }
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  transition: all 0.4s ease 0s;

  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
  &:focus,
  :hover {
    border: 1px solid #33bb77;
  }
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId,
}: TodoCreateProps) => {
  const today = new Date();
  const parsedToday =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState(parsedToday);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleChangeDate = (date: any, dateString: string) => {
    if (dateString.length > 0) {
      setDueDate(dateString);
      return;
    }
    setDueDate(parsedToday);
  };

  const disabledDate = (current: any) => {
    return current && current <= today.setHours(0, 0, 0, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    if (value) {
      // 할일 미입력 시 item 추가되지 않도록
      createTodo({
        id: nextId,
        text: value,
        done: false,
        dueDate: dueDate,
      });
      incrementNextId(); // nextId 하나 증가
      setValue(""); // input 초기화
    }
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />
          <DatePicker
            onChange={handleChangeDate}
            disabledDate={disabledDate}
            placeholder="Due date"
          />

          <CircleButton activate={value}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
