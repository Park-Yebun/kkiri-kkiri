import styled from "styled-components";
import 'animate.css';
import Background from "../components/common/Background";
import background from '../assets/user/backimg.png';
import SketchBookImg from '../assets/user/sketchbookImg.png';
import pig from '../assets/user/pig.png';
import dear from '../assets/user/dear.png';
import cat from '../assets/user/cat.png';
import eagle from '../assets/user/eagle.png'
import giraffe from '../assets/user/giraffe.png'
import { useState } from "react";
import { useEffect } from "react";
import Character from "../components/common/Character";

const Sketchbook = styled.div`
  background-image :url(${SketchBookImg});
  background-size : contain;
  background-repeat : no-repeat;
  background-position : center;
  width : 31.26vw;
  height : 62.5vh;
  /* background-color : pink; */
  display: flex;
  flex-direction : column;
  align-items : center;

`
const TitleArea = styled.div`
  display : flex;
  justify-content : center;
  margin-bottom : 0.68rem;
`
const SignupText = styled.div`
  display : flex;
  justify-content : center;
  margin-top : 5rem;
  width : 12.45vw;
  height : 9.56vh;
  /* background-color : skyblue; */
  align-items : center;
  font-size : 3.1vw;
  line-height : 9.56vh;

`
const MemberInfoArea = styled.div`
  height : 37.26vh;
  width : 24.84vw;
  /* background-color : gray;  */
  display : flex;
  flex-direction : column;
  margin-left : 2rem;
  `
const CategoryText = styled.div`
  width : 24.84vw;
  height : 7.25vh;
  /* border : 1px solid blue; */
  margin-bottom : 1.47rem;

`
const CategoryTitle = styled.div`
  width : 8vw;
  height : 1.9vh;
  margin-bottom : 0.3rem;
  /* background-color : lightcoral; */
`

const Box = styled.div`
  height : 5vh;
  width : 24.84vw;
  /* background-color : lightcyan; */
  display : flex;
  
`
const InputBox = styled.input`
 height : 5vh;
 width : 17.52vw;
 background: rgba(167, 167, 167, 0.40);
 margin-right : 0.23rem;
 border-radius: 1.875rem;
 text-indent : 0.7rem;
 font-family: 'Ttangsbudaejjigae OTF';
 font-size : 1vw;
 &::placeholder {
        color: #6F6C6C;
        font-family: 'Ttangsbudaejjigae OTF';
        font-size: 1vw;
        font-weight: 300;
    }

  
`
const DoubleCheckBtn =  styled.div`
  display : flex;
  width : 5.03vw;
  height : 5vh;
  background-color : #727272;
  border-radius: 1.334rem;
  
`
const BtnText = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  font-size  : 1.3vw;
  width : 5.86vw;
  height : 4.99vh;
  background-color : #727272;
  border-radius: 1.334rem;

`
const NextBtn = styled.div`
  background: ${props => props.match ? '#29C325' : '#727272'};
  border-radius: 1.334rem;
  cursor: pointer;
`

const ErrorId = styled.div`
  color : red;
  font-size : 1vw;
  margin-left : 6vw;
  
`

const Dropdown = styled.select`
  
`
const Option = styled.option`
  
`
const CharacterBoxPos = styled.div`
`
const Modal = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    position : fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    z-index : 1000;
    background-color : #8C6E6E;
    opacity : 91%;
    border-radius : 2rem;
    width: 40.397vw;
    height: 55.8125vh; 
    color : black;
  
`
const Button = styled.div`
  width : 80px;
  height : 80px;
  background-color : pink;
  
`


const SignupPage1 = () => {
  const [validUserId, setValidUserId] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleIdChange = (event) => {

    const id = event.target.value;
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    setValidUserId(regex.test(id));
    setUserId(id);   
  }

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  
}
useEffect(() => {
  if(password && confirmPassword && password === confirmPassword){
      setPasswordMatch(true);

  } else{
      setPasswordMatch(false);
  }
},[password, confirmPassword]);

useEffect(() => {
  console.log("Password match:", passwordMatch);
}, [passwordMatch]); 


const handleConfirmPasswordChange = (event) => {
  console.log("비밀번호 확인:", event.target.value);
  setConfirmPassword(event.target.value);
  setPasswordMatch(event.target.value === password);
  console.log(passwordMatch)
};

const hnadleCharacterSelection = (charactedrId) => {
  setSelectedCharacter(charactedrId);
};

const handleNicknameChange = (event) => {
  setNickname(event.target.value);
}


const isAllConditionsSatisfied = validUserId && password && confirmPassword && password === confirmPassword;

const gotoNext = () => { 
  if (isAllConditionsSatisfied) {
      console.log("모든 조건이 만족하여 다음 단계로 이동합니다.");
      setModalOpen(true);
  } else {
      console.log("조건을 충족하지 못하여 다음 단계로 이동할 수 없습니다.");
  }
};

const handleSubmit = async () => {
  const userData = {
    loginId: userId,
    password: password,
    nickname: nickname,
    age: selectedAge,
    level: selectedGrade,
    thumbnail: `profile${selectedCharacter}.png`
  };

  try {
    const response = await fetch('http://j10c104.p.ssafy.io:8080/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log('회원가입이 완료되었습니다.');
    } else {
      console.error('회원가입에 실패했습니다.');
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
};

  return(
    <Background backgroundimage={background}>
      <Sketchbook>
        <TitleArea>
          <SignupText>회원가입</SignupText>
        </TitleArea>
        <MemberInfoArea>
          <CategoryText>
            <CategoryTitle>아이디</CategoryTitle>
            <Box>
              <InputBox onChange={handleIdChange} type="text" placeholder="5~10자리 영어, 특수문자 불가"/>
              <DoubleCheckBtn>
                <BtnText>중복</BtnText>
              </DoubleCheckBtn>
            </Box>
            {!validUserId && userId.length > 0 && <ErrorId>사용할 수 없는 아이디입니다.</ErrorId>}
          </CategoryText>
          <CategoryText>
            <CategoryTitle>닉네임</CategoryTitle>
            <Box>
            <InputBox onChange = {handleNicknameChange} type="text" placeholder="사용하실 별명을 설정해주세요"/>
              <DoubleCheckBtn>
              <BtnText>중복</BtnText>
              </DoubleCheckBtn>
            </Box>
          </CategoryText>
          <CategoryText>
             <CategoryTitle>비밀번호</CategoryTitle>
             <InputBox onChange={handlePasswordChange} type="password" placeholder="8~15자리, 특수문자 사용, 숫자 포함"/>
          </CategoryText>
          <CategoryText>
              <CategoryTitle>비밀번호 확인</CategoryTitle>
              <InputBox onChange={handleConfirmPasswordChange}  type="password" placeholder="비밀번호를 재입력하세요"/>
          </CategoryText>
        </MemberInfoArea>
        <NextBtn onClick={gotoNext} match={isAllConditionsSatisfied}>
         <BtnText><img src="src/assets/user/east.png" /></BtnText>
        </NextBtn>

      </Sketchbook>

      {modalOpen && isAllConditionsSatisfied && (
        <Modal>
          <CategoryText>프로필 이미지 선택</CategoryText>
          <CharacterBoxPos>
            <Character onCharacterSelect={hnadleCharacterSelection}/>
          </CharacterBoxPos>
          <CategoryText>나이</CategoryText>
          <Dropdown value={selectedAge} onChange={(event) => setSelectedAge(event.target.value)}>
            <Option value="">나이를 선택해주세요</Option>
            <Option value="6세">6세</Option>
            <Option value="7세">7세</Option>
            <Option value="8세">8세</Option>
            <Option value="9세">9세</Option>
            <Option value="10세">10세</Option>
            <Option value="11세">11세</Option>
            <Option value="12세">12세</Option>
            <Option value="13세">13세</Option>
          </Dropdown>
          <CategoryText>영어수준</CategoryText>
          <Dropdown value={selectedGrade} onChange={(event) => setSelectedGrade(event.target.value)}>
            <Option value="">영어수준을 선택해주세요</Option>
            <Option value="상">상(중등이상)</Option>
            <Option value="중">중(초등 3~초등 6)</Option>
            <Option value="하">하(초등 2 이하)</Option>
          </Dropdown>
          <Button onClick={handleSubmit}>가입하기</Button>
        </Modal>
      )}
    </Background>
  )
}

export default SignupPage1;