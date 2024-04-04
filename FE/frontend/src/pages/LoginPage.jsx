import styled from 'styled-components';
// 나중이 화면 크기 바뀔일이 생기면 px -> % 로 고쳐야함
import { useNavigate} from 'react-router-dom';
import 'animate.css';
import Background from '../components/common/Background';
import background from '../assets/user/backimg.jpg';
import rabbit from '../assets/user/rabbit.png'
import dog from '../assets/user/dog.png'
import tiger from '../assets/user/tiger.png'
import fox from '../assets/user/fox.png'
import squirrel from '../assets/user/squirrel.png'
import sketchbook from '../assets/user/reallogin.png'
import { useState } from 'react';
import useUserStore from '../components/Counter/UserStore';
import { redirect } from 'react-router-dom';
import FailLoginModal from '../components/Modal/FailLoginModal';

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
    top : 39rem;
    left : 52rem;
    animation-delay: 0.7s;
`
const SquirrelImg = styled.img`
    position : absolute;
    height: 5.6rem;
    top : 18rem;
    left : 20.2rem;
`
const FoxImg = styled.img`
    position : absolute;
    width: 10.7rem;
    top : 35em;
    left : 61.8rem;
    animation-delay: 0.2s;
`
const LoginForm = styled.div`
    position : absolute;
    height: 30rem;
    width: 30rem;
    display: flex;
    flex-direction: column;
    align-items:center;
`;
const LoginText = styled.div`
  margin: 4rem 0 2rem;
  font-size : 3.5rem;
  font-weight : 500;
`;

const IDText = styled.div`
  position : relative;
  font-size : 1.6rem;
  font-weight : 300;
  margin-right: 0.5rem;
  width:5rem;
`

const PWText = styled.div`
  position : relative;
  font-size : 1.6rem;
  font-weight : 300;
  margin-right: 0.5rem;
`
const IDinput = styled.input`
  z-index : 10;
  width: 16rem;
  height: 3rem;
  margin-left: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #A7A7A7;
  background: rgba(167, 167, 167, 0.40);
  font-size : 1.63rem;
  font-weight : 300;
  text-indent : 1rem;
  font-family : 'Ttangsbudaejjigae OTF';
`

const IDBox = styled.div`
  position: relative;
  display : flex;
  align-items:center;
  margin-right: -1.4rem; 
  margin-bottom: 1.9rem;
`
const PWBox = styled.div`
  position: relative;
  display : flex;
  align-items: center;
  margin-bottom: 2rem;
`

const PWInput = styled.input`
  z-index : 10;
  width: 16rem;
  height: 3rem;
  border-radius: 1rem;
  border: 1px solid #A7A7A7;
  background: rgba(167, 167, 167, 0.40);
  font-size : 3rem;
  font-weight : 300;
  margin-left: 0.5rem;
  text-indent : 1rem;
`
const BtnText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%; 
  font-size: 2rem;
  font-weight : 500;
  color : white;
  cursor: pointer;
  padding-top : 0.2rem;
`;

const LoginBtn = styled.div` 
  width: 11rem;
  height: 4rem;
  border-radius: 1.5rem;
  background: #727272;
  box-shadow: 4px 5px 5px 0px rgba(0, 0, 0, 0.25);
  
`;

const SignupBox = styled.div`
  display : flex;
  position: relative;
  margin-top: 1.5rem;
`
const SignQuest = styled.div`
  font-size: 1.3rem;
  font-weight : 300;
  color: #646464;
`
const SignupLink = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  z-index : 10;
  cursor: pointer;
  margin-left: 1rem;

`

const SketchBookImg = styled.img`
    position : relative;
    width: 31.2rem;
    height: 33rem;
    margin-left: 0.5rem;
`

const LoginPage = () => {

  const [userId, setUserId] = useState(null);
  // const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const sleep = ms => new Promise(res => setTimeout(res, ms));


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
        if (response.ok){
            const info = await response.json();
            userStore.fetchUser(info.id);
            setCookie('memberId', info.id);
            setCookie('loginId', info.loginId);
            await sleep(200);
            navigate('/');
            console.log('이동성공');

        } else{
          console.error('로그인 실패', error)
          setIsModalOpen(true);
        }
  
      } catch (error) {
        console.error('오류 발생:', error);
        setIsModalOpen(true);
      }
    };
    fetchData();
    
};


  const gotoSignup = () => {
    navigate('/signup');
  };

  const closeModal = () => {
    setIsModalOpen(false);

  }

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      gotoLogin();
    }
  }

  return (
    <Background backgroundimage={background}>
        <SketchBookImg src={sketchbook}></SketchBookImg>
        <RabbitImg className="animate__animated animate__bounce animate__infinite" src={rabbit} alt="토끼"/>
        <DogImg className="animate__animated animate__bounce animate__infinite" src={dog}/>
        <TigerImg className="animate__animated animate__bounce animate__infinite" src={tiger}/>
        <SquirrelImg className="animate__animated animate__bounce animate__fast animate__infinite" src={squirrel}/>
        <FoxImg className="animate__animated animate__bounce animate__infinite" src={fox}/>
        <LoginForm>
          <LoginText>로그인</LoginText>
          <IDBox> 
            <IDText>아이디</IDText>
            <IDinput onChange={handleId} type="text">
          </IDinput>
        </IDBox>
        <PWBox>
          <PWText>비밀번호</PWText>
          {/* <PWInput onChange={handlePassword} type="password"></PWInput> */}
          <PWInput onChange={handlePassword} type="password" onKeyDown={handleOnKeyDown}></PWInput>
        </PWBox>
        <LoginBtn onClick={gotoLogin}>
          <BtnText>로그인</BtnText>
        </LoginBtn>
        <SignupBox>
          <SignQuest>아직 계정이 없으신가요?</SignQuest>
          <SignupLink onClick={gotoSignup}>회원가입</SignupLink>
        </SignupBox>
          <FailLoginModal isOpen={isModalOpen} onClose={closeModal} >

          </FailLoginModal>
        </LoginForm>

    </Background>
    
  );
};

export default LoginPage;
 
