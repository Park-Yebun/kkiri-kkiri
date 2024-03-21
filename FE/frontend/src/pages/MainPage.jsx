import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import 'animate.css';
import Background from '../components/common/Background';
import background from '../assets/main/backimg.png';
import storyicon from '../assets/main/storyicon.svg'
import bookshelficon from '../assets/main/bookshelficon.svg'
import libraryicon from '../assets/main/libraryicon.svg'
import Description from '../components/main/Description.jsx'


const Container = styled.div`
  position: absolute;
  width: 120rem;
  height: 70rem;
  display: flex;
  /* background-color: red; */
`
const Descriptionbox = styled.div`
  position: absolute;
  width: 120rem;
  height: 40rem;
  display: flex;
  background-color: blue;
`
const Menu = styled.div`
  position: absolute;
  justify-content: space-between;
  bottom: 0;
  width: 120rem;
  height: 25rem;
  display: flex;
  /* background-color: yellow; */
`
const Menubox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  bottom: 0;
  width: 30rem;
  height: 25rem;
  border-radius: 4rem;
  background-color: rgba(198, 198, 198, 0.8);
  `

const Menuicon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13rem;
  height: 13rem;
`
const Menuname = styled.div`
  color: #000;
  font-family: "Ttangsbudaejjigae OTF";
  font-size: 3rem;
  font-style: normal;
  font-weight: 300;
`
const MainPage = () => {
  return (
    <Background backgroundimage={background}>
      <Container>
        <Descriptionbox>
          <Description />
        </Descriptionbox>
        <Menu>
          <Menubox>
            <Menuicon src={storyicon}/>
            <Menuname>내 이야기 쓰러가기</Menuname>
          </Menubox>
          <Menubox>
            <Menuicon src={bookshelficon} style={{ width: '16rem'}}/>
            <Menuname>내 책장으로 가기</Menuname>
          </Menubox> 
          <Menubox>
            <Menuicon src={libraryicon}/>
            <Menuname>도서관으로 가기</Menuname>
          </Menubox>
        </Menu> 
      </Container>
    </Background>
  );
};

export default MainPage;