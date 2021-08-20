import React, { useState } from "react";
import { Itodo } from "components/todo/TodoService";
import styled from "styled-components";
import { Modal, Button } from "antd";

const TodoFooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const LeftText = styled.div`
  color: #33bb77;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  width: 45%;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalText = styled.p`
  font-size: 16px;
  text-align: center;
`;

interface HooksTodoHeadProps {
  todos: Itodo[];
  removeDoneItems: (arr: any) => void;
  removeAll: () => void;
}

const Todofooter = ({
  todos,
  removeDoneItems,
  removeAll,
}: HooksTodoHeadProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const undoneTasks = todos.filter((todo) => !todo.done);

  const handleRemoveDoneItemsClick = () => {
    removeDoneItems(undoneTasks);
  };

  const handleRemoveAllClick = () => {
    if (undoneTasks.length) {
      setIsModalVisible(true);
      return;
    }
    removeAll();
  };

  const handleOk = () => {
    removeAll();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TodoFooterBlock>
      <LeftText className="tasks-left">
        {undoneTasks.length} items left
      </LeftText>
      <ButtonContainer>
        <Button onClick={handleRemoveDoneItemsClick}>완료한 할일 지우기</Button>
        <Button onClick={handleRemoveAllClick}>모두 지우기</Button>
      </ButtonContainer>

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
          아직 완료하지 않은 할일이 있습니다. 정말로 삭제하시겠습니까?
        </ModalText>
      </Modal>
    </TodoFooterBlock>
  );
};

export default React.memo(Todofooter);
