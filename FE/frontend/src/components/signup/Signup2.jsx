import styled from "styled-components";
import Character from "../common/Character.jsx";
import { useState } from "react";

const SignupText = styled.div`
    position: absolute;
    top: 28.13rem;
    left: 70.12rem;
    font-size : 5rem;
    z-index: 10; 
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
`;

const CharacterBoxPos = styled.div`
    position : absolute;
    top : 37.62rem;
    left : 59.75rem;
`;

const Dropdown = styled.select`
    position : absolute;
    width: 31.25rem;
    height: 5rem;
    top : ${props => props.top ||'57.62rem'};
    left : ${props => props.left ||'61.12rem'};
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.50);
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size: 1.5625rem;
    color: #6F6C6C;
    text-indent : 1rem;
`;

const Option = styled.option`
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
`;

const Signup2 = () => {

    const [selectedAge, setSelectedAge] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('')
    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
    };

    const handleGradeChange = (event) => {
      setSelectedGrade(event.target.value);
    }

    return (
        <>
            <SignupText>회원가입</SignupText>
            <CategoryText>캐릭터</CategoryText>
            <CharacterBoxPos>
                <Character />
            </CharacterBoxPos>
            <CategoryText top="55.37rem">나이</CategoryText>
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
            <CategoryText top="65.37rem">영어수준</CategoryText>
            <Dropdown top="67.63rem" value={selectedGrade} onChange={handleGradeChange}>
              <Option value="">영어수준을 선택해주세요</Option>
              <Option value="상">상(중등이상)</Option>
              <Option value="중">중(초등 3~초등 6)</Option>
              <Option value="하">하(초등 2 이하)</Option>
            </Dropdown>
    
        </>
    );
};

export default Signup2;
