import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import 'animate.css';
import Background from '../components/common/Background';
import background from '../assets/user/backimg.png';


const Container = styled.div`
  position: absolute;
  width: 120rem;
  height: 70rem;
  display: flex;
  background-color: red;
`
const Description = styled.div`
  position: absolute;
  width: 120rem;
  height: 40rem;
  display: flex;
  background-color: blue;
`
const Menu = styled.div`
  position: absolute;
  bottom: 0;
  width: 120rem;
  height: 25rem;
  display: grid;
  background-color: yellow;
`

const MainPage = () => {
  return (
    <Background backgroundimage={background}>
      <Container>
        <Description />
        <Menu />
      </Container>
    </Background>
  );
};

export default MainPage;