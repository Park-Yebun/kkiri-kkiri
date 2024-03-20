import styled from "styled-components";

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
    align-items: center  ;
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
    top : 74.19rem;
    left : 93.44rem;
    background: #727272;
    border-radius: 2.5rem;
`

const Signup1 = () => {
    const gotoNext = () => {

    }
    return (
        <>
        <SignupText>회원가입</SignupText>
        <CategoryText>아이디</CategoryText>
        <Box>
             <InputBox type="text"></InputBox>
                <DoubleCheckBtn>
                    <BtnText>중복</BtnText>
                </DoubleCheckBtn>
        </Box>
        <Box>
        <CategoryText top="45.27rem">닉네임</CategoryText>
            <InputBox top = "47.62rem" type="text"></InputBox>
                <DoubleCheckBtn top="47.62rem">
                    <BtnText>중복</BtnText>
             </DoubleCheckBtn>
        </Box>
        <Box>
            <CategoryText top="55.27rem" >비밀번호</CategoryText>
            <InputBox top = "57.62rem" type="password"></InputBox>
        </Box>
        <Box>
            <CategoryText top="65.27rem">비밀번호 확인</CategoryText>
            <InputBox top = "67.62rem" type="password"></InputBox>
        </Box>
        <NextBtn onClick={gotoNext}>
            <BtnText><img src="src/assets/user/east.png" alt="" /></BtnText>
        </NextBtn>
        </>
    );
};

export default Signup1;