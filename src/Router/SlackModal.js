import React, { useState } from "react";
import styled from "styled-components";

const ModalBox = styled.dialog`
  border-radius: 15px;
`;

const Messge = styled.li`
  color: white;
  padding: 5px;
  &:hover {
    a {
      background: #cec0c0;
    }
  }
`;

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState("");
  const [chaneels, setChannels] = useState([]);
  const channelChange = (event) => setChannel(event.target.value);
  const channelSubmit = (event) => {
    event.preventDefault();
    if (channel === "") {
      return;
    }
    setChannel("");
    setChannels((setChannelsArray) => [channel, ...setChannelsArray]);
  };

  const deleteBtn = (index) => {
    setChannels(
      chaneels.filter((item, chaneelsIndex) => index !== chaneelsIndex)
    );
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ul>
        {chaneels.map((data, index) => (
          <Messge key={index}>
            # {data}
            <button onClick={() => deleteBtn(index)}>삭제하기</button>
          </Messge>
        ))}
      </ul>
      <button onClick={openModal}>채널 추가</button>
      {isOpen && (
        <ModalBox open>
          <div>
            <form onSubmit={channelSubmit}>
              <input
                onChange={channelChange}
                value={channel}
                type="text"
                placeholder="#채널명을 입력해주세요"
              />
              <button>추가하기</button>
            </form>
            <button onClick={closeModal}>닫기</button>
          </div>
        </ModalBox>
      )}
    </div>
  );
}

export default Modal;
