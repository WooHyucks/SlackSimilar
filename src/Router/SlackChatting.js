import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MessgeBox = styled.div`
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 70%;
  position: absolute;
  padding: 20px;
  height: 75px;
  left: 20%;
  background-color: white;
`;

const MessgeBoxInput = styled(MessgeBox)`
  border: 2px solid rgb(220, 221, 225);
  top: 80%;
  border-radius: 6px;
`;

const MessgeList = styled(MessgeBox)`
  height: 500px;
`;

const ChatMessge = styled.li`
  padding: 15px;
`;

const InputButton = styled.button``;

const Input = styled.input`
  border: none;
  height: 23px;
  width: -webkit-fill-available;
`;

const Parmas = styled.span`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

function SlackChatting() {
  const now = new Date();
  let amOrPm = now.getHours() >= 12 ? "오후" : "오전";
  const SetTime =
    amOrPm + now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
  const [modal, setModal] = useState(false);
  const [chatting, setChatting] = useState("");
  const [chattings, setChattings] = useState([]);
  const onChange = (event) => setChatting(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (chatting === "") {
      return;
    }
    setChatting("");
    setChattings((chattingArray) => [
      ...chattingArray,
      chatting + "   " + SetTime,
    ]);
  };

  const deleteBtn = (index) => {
    setChattings(
      chattings.filter((item, chattingsIndex) => index !== chattingsIndex)
    );
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  const { Id } = useParams();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <MessgeBoxInput>
          <Input
            onChange={onChange}
            value={chatting}
            type="text"
            placeholder="#에 메세지 보내기~~~~~~"
          />
          <InputButton>보내기</InputButton>
        </MessgeBoxInput>
      </form>
      <MessgeList as="ul">
        <Parmas>{Id}</Parmas>
        {chattings.map((item, index) => (
          <ChatMessge key={index}>
            {Id} : {item}
            &nbsp; &nbsp;
            <button onClick={() => deleteBtn(index)}>메세지 삭제하기</button>
            &nbsp;
            <button onClick={openModal}>수정하기</button>
          </ChatMessge>
        ))}
        {modal && (
          <dialog open>
            <div>
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  value={chatting}
                  type="text"
                  placeholder="메세지 입력"
                />
                <button>메세지 수정</button>
              </form>
              <button onClick={closeModal}>닫기</button>
            </div>
          </dialog>
        )}
      </MessgeList>
    </div>
  );
}

export default SlackChatting;
