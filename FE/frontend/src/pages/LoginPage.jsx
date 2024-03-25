import styled from 'styled-components';
// 나중이 화면 크기 바뀔일이 생기면 px -> % 로 고쳐야함
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import Background from '../components/common/Background';
import background from '../assets/user/backimg.png';
import rabbit from '../assets/user/rabbit.png'
import dog from '../assets/user/dog.png'
import tiger from '../assets/user/tiger.png'
import fox from '../assets/user/fox.png'
import squirrel from '../assets/user/squirrel.png'
import sketchbook from '../assets/user/sketchbookImg.png'

// const LoginContainer = styled.div`
//   width : 160rem;
//   height : 100rem;  
//   position : relative;
//   background-image: url('src/assets/backimg.png');
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   display: flex;
//   justify-content: center;
//   align-items: center; 
// `;

const RabbitImg = styled.img`
  position : absolute;
  width: 26rem;
  top : 66rem;
  left : 8rem;
  animation-delay: 0.4s;
`
const DogImg = styled.img`
    position : absolute;
    width: 17rem;
    top : 65rem;
    left : 36rem;
    animation-delay: 0s;
`
const TigerImg = styled.img`
    position : absolute;
    height: 23rem;
    top : 70rem;
    left : 95rem;
    animation-delay: 0.7s;
`
const SquirrelImg = styled.img`
    position : absolute;
    width: 10.5rem;
    height: 10.375rem;
    top : 23.5rem;
    left : 39.2rem;
`
const FoxImg = styled.img`
    position : absolute;
    width: 20rem;
    top : 66rem;
    left : 115rem;
    animation-delay: 0.2s;
`
const SketchBookImg = styled.img`
    position : absolute;
    width : 50rem;
    height : 62.5rem;
    top : 18.75rem;
    left : 55rem;
    
`
const LoginText = styled.div`
  position: absolute;
  top: 28.06rem;
  left: 72.56rem;
  font-size : 5rem;
  z-index: 10; 
  font-weight : 500;

`;

const IDText = styled.div`
  position : absolute;
  z-index : 10;
  top : 40.75rem;
  left : 62.37rem;
  font-size : 2.1875rem;
  font-weight : 300;
`

const PWText = styled.div`
  position : absolute;
  z-index : 10;
  top : 49.81rem;
  left : 60.56rem;
  font-size : 2.1875rem;
  font-weight : 300;
`
const IDinput = styled.input`
  position : absolute;
  z-index : 10;
  width: 27.75rem;
  height: 5.5rem;
  top : 39.31rem;
  left : 71.12rem;
  border-radius: 1.875rem;
  border: 1px solid #A7A7A7;
  background: rgba(167, 167, 167, 0.40);
  font-size : 2.1875rem;
  font-weight : 300;
`

const IDBox = styled.div`
  display : flex;

`
const PWBox = styled.div`
  display : flex;
`

const PWInput = styled.input`
  position : absolute;
  z-index : 10;
  width: 27.75rem;
  height: 5.5rem;
  top : 48.38rem;
  left : 71.06rem;
  border-radius: 1.875rem;
  border: 1px solid #A7A7A7;
  background: rgba(167, 167, 167, 0.40);
  font-size : 2.1875rem;
  font-weight : 300;
`
const BtnText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center  ;
  width: 100%; 
  height: 100%; 
  font-weight: 500;
  font-size: 2.5rem;
  font-weight : 500;
  color : white;
  padding-top : 0.3rem;
`;

const LoginBtn = styled.div` 
  width: 18.75rem;
  height: 6.25rem;
  border-radius: 2.5rem;
  top: 59rem;
  left: 70.62rem;
  z-index: 10;
  position: absolute;
  background: #727272;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
`;

const SignupBox = styled.div`
  display : flex;
`
const SignQuest = styled.div`
  top : 69.59rem;
  left : 63.81rem;
  font-size: 1.875rem;
  font-weight: 300;
  z-index : 10;
  position : absolute;
  font-weight : 300;
  color: #646464;
  
`
const SignupLink = styled.div`
  top : 69.37rem;
  left : 87.44rem;
  font-size: 2.1875rem;
  font-weight: 500;
  z-index : 10;
  position : absolute;
  font-weight : 300;
  
`

const LoginPage = () => {

  let navigate = useNavigate();

  const gotoLogin = () => {
    console.log('click')

  };

  const gotoSignup = () => {
    navigate('/signup');
  };

  return (
    <Background backgroundimage={background}>
        <SketchBookImg src={sketchbook} alt="" />
        <RabbitImg className="animate__animated animate__bounce animate__infinite" src={rabbit} alt="토끼"/>
        <DogImg className="animate__animated animate__bounce animate__infinite" src={dog}/>
        <TigerImg className="animate__animated animate__bounce animate__infinite" src={tiger}/>
        <SquirrelImg className="animate__animated animate__bounce animate__fast animate__infinite" src={squirrel}/>
        <FoxImg className="animate__animated animate__bounce animate__infinite" src={fox}/>
        <LoginText>로그인</LoginText>
        <IDBox> 
          <IDText>아이디</IDText>
          <IDinput type="text">
          </IDinput>
        </IDBox>
        <PWBox>
          <PWText>비밀번호</PWText>
          <PWInput type="password"></PWInput>
        </PWBox>
        <LoginBtn onClick={gotoLogin}>
          <BtnText>로그인</BtnText>
        </LoginBtn>
        <SignupBox>
          <SignQuest>아직 계정이 없으신가요?</SignQuest>
          <SignupLink onClick={gotoSignup}>회원가입</SignupLink>
        </SignupBox>
    </Background>
    
  );
};

export default LoginPage;
 