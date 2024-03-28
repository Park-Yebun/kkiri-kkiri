import Background from '../components/common/Background';
import background from '../assets/main/backimg.png';
import sketchbook from '../assets/user/sketchbookImg2.png'
import styled from 'styled-components';
import Character from '../components/common/Character';
import downbtn from '../assets/user/downicon.png';
import { useState } from 'react';


const SketchbookImg = styled.img`
    position : relative;
    width: 27rem;
    height: 45rem;
`   
const Container = styled.div`
    position : relative;
    display: flex;
    justify-content: center;
    width: 27rem;
    height: 45rem; 
`
const MypageText = styled.div`
    position: absolute;
    top: 4.2rem;

    font-size : 2.7rem;
    font-weight : 700;
`;

const CharacterBox  = styled.div`
    position : absolute;
    top : 8rem;

`
const CategoryText = styled.div`
    position: absolute;
    z-index: 10;
    top: ${props => props.top || '18rem'};
    left: 2rem;
    font-size: 1rem;
    font-weight: 300;
`;

const Box = styled.div`
    display : flex;
    position : absolute;
    top : ${props => props.top ||'19.5rem'};
    left : 2rem;
`

const InputBox = styled.input`
    position : absolute;
    width: 17rem;
    height: 2.6rem;
    border-radius: 1rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.40);
    font-size : 0.9rem;
    font-family : 'Ttangsbudaejjigae OTF';
    font-weight : 300;
    text-indent : 1rem;
    &::placeholder {
        color:#6F6C6C;
        font-size: 0.9rem;
        font-weight: 300
    }
`

const DoubleCheckBtn = styled.div`
    position : absolute;
    z-index : 10;
    left : 18rem;
    width: 4rem;
    height: 3rem;
    border-radius: 1.5rem;
    background: #727272;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-left : 0.5rem;
`
const BtnText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100%; 
    font-weight: 500;
    font-size: 1.1rem;
    font-family : 'Ttangsbudaejjigae OTF';
    color : ${props => props.color ||'white'};
    padding-top : 0.1rem;
`
const Dropdown = styled.select`
    position : absolute;
    width: 17.5rem;
    height: 2.75rem;
    top : ${props => props.top ||'30.5rem'};
    left : ${props => props.left ||'2rem'};
    border-radius: 1rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.50) url(${downbtn}) no-repeat;
    background-position: right 1rem center;
    background-size: 2rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size: 0.9rem;
    color: #6F6C6C;
    text-indent : 1rem;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
`;

const Option = styled.option`
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
`;

const SaveBtn = styled.div`
    position : absolute;
    font-weight: 500;
    width: 10rem;
    height: 3rem;
    top : 40rem;
    left : 8rem;
    border-radius: 2.5rem;
    background-color : #29C325;    
`
const SignOut = styled.span`
    position : absolute;
    font-weight: 300;
    font-size: 1.3rem;
    width: 10rem;
    top : 41.5rem;
    left : 20rem;
`

const MypagePage = () => {
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('')
    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
    };
    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
      }

    return (
        <Background backgroundimage={background}>
            <Container>
                <SketchbookImg src={sketchbook}></SketchbookImg>
                <MypageText >회원정보 수정 </MypageText >
                <CharacterBox>
                    <Character></Character>
                </CharacterBox>
                <CategoryText>닉네임</CategoryText>
                <Box>    
                    <InputBox  type="text" placeholder="사용하실 별명을 설정해주세요"></InputBox>
                    <DoubleCheckBtn >
                        <BtnText>중복</BtnText>
                    </DoubleCheckBtn>
                </Box>
                <CategoryText top="23.5rem">비밀번호</CategoryText>
                <Box top="25rem"> 
                    <InputBox  type="password"  placeholder="8~15자리, 특수문자 사용, 숫자 포함"></InputBox>
                </Box>
                <CategoryText top="29rem">나이</CategoryText>
                <Dropdown value={selectedAge} onChange={handleAgeChange}>
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
                <CategoryText top="34.5rem">영어 수준</CategoryText>
                <Dropdown top="36rem" value={selectedGrade} onChange={handleGradeChange}>
                    <Option value="">영어수준을 선택해주세요</Option>
                    <Option value="상">상(중등이상)</Option>
                    <Option value="중">중(초등 3~초등 6)</Option>
                    <Option value="하">하(초등 2 이하)</Option>
                </Dropdown>
                <SaveBtn>
                    <BtnText color="black">수정</BtnText>
                </SaveBtn>
                <SignOut>회원탈퇴</SignOut>
            </Container>
        </Background>
    );
};

export default MypagePage;