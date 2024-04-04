import styled, { keyframes } from 'styled-components';
import { Link, useNavigate  } from 'react-router-dom';
import Background from "../components/common/Background";
import background from "../assets/error/backimg.jpg";
import kkiri from '../assets/error/errorkkiri.png';

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20%); 
  }
  100% {
    transform: translateY(0);
  }
`;

const Error = styled.img`
  position: absolute;
  height: 50%;
  top: 35%;
  animation: ${moveUpDown} 3s ease-in-out infinite;
`
const ErrorMsg = styled.div`
  position: absolute;
  font-size: 4rem;
  top: 20%;
  text-align: center;
  color: #ffffff;
  -webkit-text-stroke-width: 2.5px;
  -webkit-text-stroke-color: #000;
`
const Errorbtn = styled.div`
  position: absolute;
  display: flex;
  width: 37%;
  left: 33.4%;
  bottom: 15.7%;
  justify-content: space-evenly;
`
const Homebtn = styled(Link)`
  font-size: 2rem;
  left: 10%;
  text-decoration:none;
  /* background-color: yellow; */
  color: black;
  padding: 10px 8px;
`
const Backbtn = styled.div`
  font-size: 2rem;
  /* background-color: yellow; */
  padding: 10px 8px;
`
const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  }; 

  return (
      <Background backgroundimage={background}>
        <Error src={kkiri}/>
        <ErrorMsg>여기가 아니야! 주소를 다시 확인해봐!</ErrorMsg>
        <Errorbtn>
          <Homebtn to="/">메인화면으로</Homebtn>
          <Backbtn onClick={handleBack}>이전화면으로</Backbtn>
        </Errorbtn>

      </Background>
  );
};

export default ErrorPage;