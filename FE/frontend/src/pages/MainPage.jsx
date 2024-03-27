import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import 'animate.css';
import { Link } from 'react-router-dom';
import Background from '../components/common/Background';
import background from '../assets/main/backimg.png';
import storyicon from '../assets/main/storyicon.svg'
import bookshelficon from '../assets/main/bookshelficon.svg'
import libraryicon from '../assets/main/libraryicon.svg'
import Explain from '../components/main/Explain.jsx'



const Container = styled.div`
  position: absolute;
  margin-top: 2rem;
  width: 69rem;
  height: 40rem;
  display: flex;
  /* background-color: red; */
`
const Descriptionbox = styled.div`
  position: absolute;
  width: 69rem;
  height: 25rem;
  display: flex;
  /* background-color: white; */
`
const Menu = styled.div`
  position: absolute;
  justify-content: space-between;
  bottom: 0;
  width: 69rem;
  height: 13rem;
  display: flex;
  /* background-color: yellow; */
`
const Menubox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  bottom: 0;
  width: 18rem;
  height: 13rem;
  border-radius: 2rem;
  background: rgba(240, 240, 240, 0.5);
  box-shadow: 4px -4px 4px 0px rgba(198, 194, 194, 0.5) inset, -4px 4px 4px 0px rgba(255, 255, 255, 0.5) inset;
  backdrop-filter: blur(0.4rem);
  text-decoration: none;
`

const Menuicon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
`
const Menuname = styled.div`
  color: #000;
  font-family: "Ttangsbudaejjigae OTF";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
`
const MainPage = () => {
  return (
    <Background backgroundimage={background}>
      <Container>
        <Descriptionbox>
          <Explain />
        </Descriptionbox>
        <Menu>
          <Menubox as={Link} to="/story/{id}">
            <Menuicon src={storyicon}/>
            <Menuname>내 이야기 쓰러가기</Menuname>
          </Menubox>
          <Menubox as={Link} to="/bookshelf">
            <Menuicon src={bookshelficon} style={{ width: '16rem'}}/>
            <Menuname>내 책장으로 가기</Menuname>
          </Menubox> 
          <Menubox as={Link} to="/library">
            <Menuicon src={libraryicon}/>
            <Menuname>도서관으로 가기</Menuname>
          </Menubox>
        </Menu> 
      </Container>
    </Background>
  );
};

export default MainPage;