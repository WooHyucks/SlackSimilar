import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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
  top: 92%;
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

const MainTitle = styled.span`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SlackChatting() {
  const { Id } = useParams();
  const now = new Date();
  let amOrPm = now.getHours() >= 12 ? "오후" : "오전";
  const SetTime =
    amOrPm + now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
  const [modal, setModal] = useState(false);
  const [chatting, setChatting] = useState("");
  const [chattings, setChattings] = useState([]);

  useEffect(() => {
    setChattings([]);
  }, [Id]);

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

  const getChattings = localStorage.getItem(Id);

  function saveChattings() {
    localStorage.setItem(Id, JSON.stringify(chattings));
    if (getChattings !== null) {
      const parseChattings = JSON.parse(getChattings);
      parseChattings.forEach((item) => {
        console.log(parseChattings);
      });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <MessgeBoxInput>
          <Input
            onChange={onChange}
            value={chatting}
            type="text"
            placeholder={`${Id}에 메세지 보내기`}
          />
          <InputButton>보내기</InputButton>
        </MessgeBoxInput>
      </form>
      <div>
        <MainTitle>{Id}</MainTitle>
        <br></br>
        <MainTitle>
          고객님만 사용하는 스페이스입니다.
          <br /> 메시지 초안을 작성하거나 할 일 목록을 열거하거나 링크 및 파일을
          간편하게 보관해보세요. <br />
          또한 여기에서 혼잣말을 할 수도 있지만 혼자서 대화를 주고받으셔야
          한다는 점에 유의하세요.
        </MainTitle>
      </div>
      <MessgeList as="ul">
        {chattings.map((item, index) => (
          <ChatMessge key={index}>
            {Id} : {item}
            &nbsp; &nbsp;
            {saveChattings()}
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
