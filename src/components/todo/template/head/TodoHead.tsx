import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 45px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #119955;
`;

const DateInfo = styled.div`
  font-size: 18px;
  color: #119955;
  margin-top: 10px;
`;

export type Time = {
  koreaTime: string;
};

let initialTime = {
  koreaTime: "",
};

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const dayString = "Tuesday";
  const dateString = "July 20, 2021";

  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    clock();
  }, []);

  setInterval(() => {
    clock();
  }, 60000);

  const clock = () => {
    const today = new Date();
    const utc = today.getTime() + today.getTimezoneOffset() * 60 * 1000;
    const timeGapKr = 9 * 60 * 60 * 1000;
    const koreaTime = new Date(utc + timeGapKr);

    const koreaTimeFormat = new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(koreaTime);

    setTime((prev) => ({
      ...prev,
      koreaTime: koreaTimeFormat,
    }));
  };

  return (
    <TodoHeadBlock>
      <Title>To Do List</Title>
      <DateInfo>{time.koreaTime}</DateInfo>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
