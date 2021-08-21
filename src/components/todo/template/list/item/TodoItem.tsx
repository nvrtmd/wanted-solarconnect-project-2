import { useState } from "react";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled, { css } from "styled-components";
import { Modal, Button } from "antd";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ababab;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.4s ease 0s;

  &:hover {
    box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    /* background: #33bb77; */
    color: #119955;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const TodoText = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 18px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const DueDate = styled(TodoText)`
  font-size: 13px;
`;

const TodoItemInfo = styled.div`
  flex: 1;
  font-size: 16px;
  color: #119955;
`;

const ModalText = styled.p`
  font-size: 16px;
  text-align: center;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    if (todo.done) {
      removeTodo(todo.id);
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    removeTodo(todo.id);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <TodoItemInfo>
        <TodoText done={todo.done}>{todo.text}</TodoText>
        <DueDate done={todo.done}>~{todo.dueDate}</DueDate>
      </TodoItemInfo>
      <Remove onClick={handleRemove}>
        <DeleteOutlined />
      </Remove>
      <Modal
        title="Delete"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>취소</Button>,
          <Button type="primary" onClick={handleOk}>
            삭제
          </Button>,
        ]}
      >
        <ModalText>
          "{todo.text}"는 아직 완료하지 않은 할일입니다. 정말로
          삭제하시겠습니까?
        </ModalText>
      </Modal>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
