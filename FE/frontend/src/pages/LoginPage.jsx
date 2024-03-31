import styled from 'styled-components';
// 나중이 화면 크기 바뀔일이 생기면 px -> % 로 고쳐야함
import { useNavigate} from 'react-router-dom';
import 'animate.css';
import Background from '../components/common/Background';
import background from '../assets/user/backimg.png';
import rabbit from '../assets/user/rabbit.png'
import dog from '../assets/user/dog.png'
import tiger from '../assets/user/tiger.png'
import fox from '../assets/user/fox.png'
import squirrel from '../assets/user/squirrel.png'
import sketchbook from '../assets/user/reallogin.png'
import { useState } from 'react';
import useUserStore from '../components/Counter/UserStore';

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
  width: 12.9rem;
  top : 36rem;
  left : 4.5rem;
  animation-delay: 0.4s;
`
const DogImg = styled.img`
    position : absolute;
    width: 6.5rem;
    top : 34rem;
    width : 10.5rem;
    height : 10.03rem;
    left : 19rem;
    animation-delay: 0s;
`
const TigerImg = styled.img`
    position : absolute;
    height: 12rem;
    top : 37rem;
    left : 51rem;
    animation-delay: 0.7s;
`
const SquirrelImg = styled.img`
    position : absolute;
    height: 5.6rem;
    top : 12.5rem;
    left : 21rem;
`
const FoxImg = styled.img`
    position : absolute;
    width: 10.7rem;
    top : 35em;
    left : 61.8rem;
    animation-delay: 0.2s;
`

const LoginText = styled.div`
  position: absolute;
  top: 15.01rem;
  left: 38.35rem;
  font-size : 2.668rem;
  font-weight : 500;

`;

const IDText = styled.div`
  position : absolute;
  top : 21.61rem;
  left : 33.28rem;
  font-size : 1.17rem;
  font-weight : 300;
`

const PWText = styled.div`
  position : absolute;
  top : 26.45rem;
  left : 32.32rem;
  font-size : 1.17rem;
  font-weight : 300;
`
const IDinput = styled.input`
  position : absolute;
  z-index : 10;
  width: 14.8rem;
  height: 2.9rem;
  top : 20.84rem;
  left : 37.95rem;
  border-radius: 1.005rem;
  border: 1px solid #A7A7A7;
  background: rgba(167, 167, 167, 0.40);
  font-size : 1.63rem;
  font-weight : 300;
  font-family: 'Ttangsbudaejjigae OTF';
  text-indent : 1rem;
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
  width: 14.8rem;
  height: 2.9rem;
  top : 25.68rem;
  left : 37.92rem;
  border-radius: 1.005rem;
  border: 1px solid #A7A7A7;
  background: rgba(167, 167, 167, 0.40);
  font-size : 1.63rem;
  font-weight : 300;
  font-family: 'Ttangsbudaejjigae OTF';
  text-indent : 1rem;
`
const BtnText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center  ;
  width: 100%; 
  height: 100%; 
  font-weight: 500;
  font-size: 1.334rem;
  font-weight : 500;
  color : white;
  padding-top : 0.3rem;
`;

const LoginBtn = styled.div` 
  width: 10rem;
  height: 3.33rem;
  border-radius: 1.334rem;
  top: 31.48rem;
  left: 37.69rem;
  position: absolute;
  background: #727272;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
`;

const SignupBox = styled.div`
  display : flex;
`
const SignQuest = styled.div`
  top : 37.12rem;
  left : 34.05rem;
  font-size: 1.005rem;
  font-weight: 300;
  position : absolute;
  font-weight : 300;
  color: #646464;
  
`
const SignupLink = styled.div`
  top : 37.02rem;
  left : 46.66rem;
  font-size: 1.17rem;
  font-weight: 500;
  z-index : 10;
  position : absolute;
  font-weight : 300;
  
`

const SketchBookImg = styled.img`
    position : relative;
    width: 27rem;
    height:33rem;
`

const LoginPage = () => {

  const [userId, setUserId] = useState(null);
  // const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState(null);
  const userStore = useUserStore();
  

  let navigate = useNavigate();

  // 쿠키 저장하는 함수
  function setCookie(name, value) {
    // 옵션의 기본값 설정
    const options = {
      path: '/',
      maxAge: 86400,
      secure: true
    };
    // 쿠키 문자열 구성
    let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    // 옵션을 문자열에 추가
    for (let key in options) {
      cookieString += "; " + key;
      let optionValue = options[key];
      if (optionValue !== true) {
        // true가 아닌 경우, 값을 추가
        cookieString += "=" + optionValue;
      } else {

      }
    }
    // 쿠키 설정
    document.cookie = cookieString;
  }

  const handleId = (event) => {
     const id = event.target.value;
     setUserId(id);
  };

  const handlePassword = (event) => {
    const pw = event.target.value;
    setPassword(pw);
  };

  const gotoLogin = () => {
    console.log('click');
    const data = {loginId : userId, 
                  password: password};
    const fetchData = async () => {
      try {
        const response = await fetch('https://kkirikkiri.shop/api/members/login',{
          method : 'POST',
          headers : {
            'Content-type' : 'application/json'
          },
          body : JSON.stringify(data)
        });
        const info = await response.json();
        userStore.fetchUser(info.id);
        setCookie('memberId', info.id);
        setCookie('loginId', info.loginId);
        navigate('/');
  
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };
    fetchData();
};


  const gotoSignup = () => {
    navigate('/signup');
  };

  return (
    <Background backgroundimage={background}>
        <SketchBookImg src={sketchbook} alt="스케치북" />
        <RabbitImg className="animate__animated animate__bounce animate__infinite" src={rabbit} alt="토끼"/>
        <DogImg className="animate__animated animate__bounce animate__infinite" src={dog}/>
        <TigerImg className="animate__animated animate__bounce animate__infinite" src={tiger}/>
        <SquirrelImg className="animate__animated animate__bounce animate__fast animate__infinite" src={squirrel}/>
        <FoxImg className="animate__animated animate__bounce animate__infinite" src={fox}/>
        <LoginText>로그인</LoginText>
        <IDBox> 
          <IDText>아이디</IDText>
          <IDinput onChange={handleId} type="text">
          </IDinput>
        </IDBox>
        <PWBox>
          <PWText>비밀번호</PWText>
          <PWInput onChange={handlePassword} type="password"></PWInput>
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
 
