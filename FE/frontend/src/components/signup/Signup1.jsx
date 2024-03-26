import styled from "styled-components";
import { useState, useEffect} from "react";

const SignupText = styled.div`
    position: absolute;
    top: 28.13rem;
    left: 70.12rem;
    font-size : 5rem;
    z-index: 11; 
    font-family : 'Ttangsbudaejjigae OTF';
    font-weight : 700;

`;
const CategoryText = styled.div`
    position: absolute;
    z-index: 10;
    top: ${props => props.top || '35.37rem'};
    left: 60.19rem;
    font-size: 1.875rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    
`
const InputBox = styled.input`
    position : absolute;
    z-index : 10;
    width: 31.25rem;
    height: 5rem;
    top : ${props => props.top || '37.62rem'};
    left : 60.19rem;
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.40);
    font-size : 2.1875rem;
    font-family : 'Ttangsbudaejjigae OTF';
    font-weight : 300;
    text-indent : 2.8rem;
    &::placeholder {
        color:#6F6C6C;
        font-family : 'Ttangsbudaejjigae OTF';
        font-size: 1.5625rem;
        font-weight: 300;
      

        
    }
`
const Box = styled.div`
    display : flex;
`


const DoubleCheckBtn = styled.div`
    position : absolute;
    z-index : 10;
    width: 8.0625rem;
    height: 5rem;
    border-radius: 2.5rem;
    background: #727272;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    top : ${props => props.top || '37.62rem'};
    left : 91.88rem;
    margin-left : 0.5rem;

`

const BtnText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100%; 
    font-weight: 500;
    font-size: 2.1875rem;
    font-family : 'Ttangsbudaejjigae OTF';
    font-weight : 500;
    color : white;
    padding-top : 0.3rem;
    
`
const NextBtn = styled.div`
    position : absolute;
    z-index : 10;
    width: 9.375rem;
    height: 5rem;
    top : 73.5rem;
    left : 92.5rem;
    background: ${props => props.match ?  '#29C325': '#727272' };
    border-radius: 2.5rem;
`

const ErrorId = styled.div`
    font-size: 1.5625rem;
    top : 43.44rem;
    left : 72.25rem;
    font-family : 'Ttangsbudaejjigae OTF';
    font-weight : 300;
    color: #ED4040;
    position : absolute;

    
    
`

const Signup1 = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [userId, setUserId] = useState('');
    const [validUserId, setValidUserId] = useState(true);

    const handleIdChange = (event) => {
        const id = event.target.value;
        const regex = /^[a-zA-Z0-9]{5,10}$/;
        setValidUserId(regex.test(id));
        setUserId(id);   //만족하면 UserId를 id로 바꿔줌
    }

    useEffect(() => {
        if(password && confirmPassword && password === confirmPassword){
            setPasswordMatch(true);

        } else{
            setPasswordMatch(false);
        }
    },[password, confirmPassword]);
 

    const handlePasswordChange = (event) => {
        console.log("비밀번호:", event.target.value);
        setPassword(event.target.value);
        
    };
    
    const handleConfirmPasswordChange = (event) => {
        console.log("비밀번호 확인:", event.target.value);
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === password);
        console.log(passwordMatch)
    };

    const gotoNext = () => { 
        if (validUserId && password && confirmPassword && password === confirmPassword) {
    
            console.log("모든 조건이 만족하여 다음 단계로 이동합니다.");
        } else {
            console.log("조건을 충족하지 못하여 다음 단계로 이동할 수 없습니다.");
        }
    };
    

    return (
        <>
        <SignupText>회원가입</SignupText>
        <CategoryText>아이디</CategoryText>
        <Box>
             <InputBox onChange={handleIdChange} type="text" placeholder="5~10자리 영어, 특수문자 불가"></InputBox>
             {!validUserId && userId.length > 0 && <ErrorId>사용할 수 없는 아이디입니다.</ErrorId>}
                <DoubleCheckBtn>
                    <BtnText>중복</BtnText>
                </DoubleCheckBtn>
        </Box>
        <Box>
        <CategoryText top="45.27rem">닉네임</CategoryText>
            <InputBox top = "47.62rem" type="text" placeholder="사용하실 별명을 설정해주세요"></InputBox>
                <DoubleCheckBtn top="47.62rem">
                    <BtnText>중복</BtnText>
             </DoubleCheckBtn>
        </Box>
        <Box>
            <CategoryText top="55.27rem" >비밀번호</CategoryText>
            <InputBox onChange={handlePasswordChange} top = "57.62rem" type="password"  placeholder="8~15자리, 특수문자 사용, 숫자 포함"></InputBox>
        </Box>
        <Box>
            <CategoryText top="65.27rem">비밀번호 확인</CategoryText>
            <InputBox onChange={handleConfirmPasswordChange}  top = "67.62rem" type="password" placeholder="비밀번호를 재입력하세요"></InputBox>
        </Box>
        <NextBtn onClick={gotoNext} match={passwordMatch}>
            <BtnText><img src="src/assets/user/east.png" style={{ width: '50%', height: 'auto', margin: '0 0 0.5rem' }} /></BtnText>
        </NextBtn>
        
        </>
    );
};

export default Signup1;