import styled from "styled-components";
import Modal from "./SlackModal";
import SlackChatting from "./SlackChatting";
import Members from "../TestApi/Memder";
import { Link } from "react-router-dom";
const Container = styled.div``;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(82, 38, 83);
  padding: 20px;
  border-bottom: solid 1px white;
`;

const LeftSideBar = styled.div`
  height: 100%;
  width: 230px;
  position: absolute;
  background-color: rgb(82, 38, 83);
  overflow-y: auto;
  @media (max-width: 1000px) {
    display: none;
  }
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

const Search = styled.button`
  border: none;
  border-radius: 6px;
  width: 600px;
  height: 30px;
  background-color: #b996b9;
`;

const Title = styled.span`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: white;
`;

const SideDiv = styled.div`
  border-bottom: 1px solid rgb(112, 100, 100);
  padding: 20px;
`;

function Slack() {
  // 모의로 비동기 통신을 한다
  // cosnt [Members ,setMembers] = useState([])
  // useEffect(()=>{
  //  async()=>{ const fetchData = await (await fetch(https://api/Members)).json
  //  setMembers(fetchData)}()},[])
  return (
    <Container>
      <Header>
        <Search>
          <Title fontSize="15px" fontWeight="nomal">
            검색
          </Title>
        </Search>
      </Header>
      <LeftSideBar>
        <SideDiv>
          <Title fontSize="20px" fontWeight="bold">
            코딩딥다이빙
          </Title>
        </SideDiv>
        <SideDiv>
          <ul>
            <Messge>🙏 스레드</Messge>
            <Messge>👨🏻‍💻 나중에</Messge>
            <Messge>📎 멘션 및 반응</Messge>
            <Messge>📨 초안 및 전송됨</Messge>
            <Messge>🔍 더 보기</Messge>
          </ul>
        </SideDiv>
        <SideDiv as="details">
          <Messge as="summary">채널</Messge>
          <Modal />
        </SideDiv>
        <SideDiv as="details">
          <Messge as="summary"> 다이렉트 메시지</Messge>
          <ul>
            {Members.map((member) => (
              <Messge key={member.id}>
                <Link to={`/${member.name}`}>{member.name}</Link>
              </Messge>
            ))}
          </ul>
        </SideDiv>
      </LeftSideBar>
      <SlackChatting />
    </Container>
  );
}

export default Slack;
