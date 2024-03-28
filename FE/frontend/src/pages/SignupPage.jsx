import styled from 'styled-components';
import Background from '../components/common/Background';
import Character from '../components/common/Character';
import downbtn from '../assets/user/downicon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SketchBookImg = styled.img`
    position: absolute;
    width: 50rem;
    height: 62.5rem;
    top: 18.75rem;
    left: 55rem;
`;

const EagleImg = styled.img`
    position: absolute;
    width: 15rem;
    top: 16rem;
    left: 11rem;
`;

const DearImg = styled.img`
    position: absolute;
    width: 22rem;
    top: 72rem;
    left: 41rem;
    animation-delay: 0.3s;
`;

const GiraffeImg = styled.img`
    position: absolute;
    width: 16rem;
    top: 61.3rem;
    left: 126rem;
    animation-delay: 0.1s;
`;

const CatImg = styled.img`
    position: absolute;
    width: 20rem;
    top: 67rem;
    left: 103rem;
    animation-delay: 0.8s;
`;

const PigImg = styled.img`
    position: absolute;
    width: 25rem;
    top: 68rem;
    left: 7rem;
    animation-delay: 0.5s;
`;

const SignupText = styled.div`
    position: absolute;
    top: 28.13rem;
    left: 70.12rem;
    font-size: 5rem;
    z-index: 11;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 700;
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
    position: absolute;
    top: 37.62rem;
    left: 59.75rem;
`;

const Dropdown = styled.select`
    position: absolute;
    width: 31.25rem;
    height: 5rem;
    top: ${props => props.top || '57.62rem'};
    left: ${props => props.left || '61.12rem'};
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.50) url(${downbtn}) no-repeat;
    background-position: right 1rem center;
    background-size: 3rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size: 1.5625rem;
    color: #6F6C6C;
    text-indent: 1rem;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
`;

const Option = styled.option`
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
`;

const InputBox = styled.input`
    position: absolute;
    z-index: 10;
    width: 31.25rem;
    height: 5rem;
    top: ${props => props.top || '37.62rem'};
    left: 60.19rem;
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.40);
    font-size: 2.1875rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    text-indent: 2.8rem;
    &::placeholder {
        color: #6F6C6C;
        font-family: 'Ttangsbudaejjigae OTF';
        font-size: 1.5625rem;
        font-weight: 300;
    }
`;

const Box = styled.div`
    display: flex;
`;

const DoubleCheckBtn = styled.div`
    position: absolute;
    z-index: 10;
    width: 8.0625rem;
    height: 5rem;
    border-radius: 2.5rem;
    background: #727272;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    top: ${props => props.top || '37.62rem'};
    left: 91.88rem;
    margin-left: 0.5rem;
`;

const BtnText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 2.1875rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 500;
    color: white;
    padding-top: 0.3rem;
`;

const NextBtn = styled.div`
    position: absolute;
    z-index: 10;
    width: 9.375rem;
    height: 5rem;
    top: 73.5rem;
    left: 92.5rem;
    background: ${props => props.match ? '#29C325' : '#727272'};
    border-radius: 2.5rem;
`;

const ErrorId = styled.div`
    font-size: 1.5625rem;
    top: 43.44rem;
    left: 72.25rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    color: #ED4040;
    position: absolute;
`;

const SignupPage = () => {
    const [signupStep, setSignupStep] = useState(1);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [userId, setUserId] = useState('');
    const [validUserId, setValidUserId] = useState(true);
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const navigate = useNavigate();

    const handleIdChange = (event) => {
        const id = event.target.value;
        const regex = /^[a-zA-Z0-9]{5,10}$/;
        setValidUserId(regex.test(id));
        setUserId(id);
    };

    const handleSignup1Complete = () => {
        setSignupStep(2);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === password);
    };

    const gotoNext = () => {
        if (validUserId && password && confirmPassword && password === confirmPassword) {
            console.log("모든 조건이 만족하여 다음 단계로 이동합니다.");
            setSignupStep(2); // Signup2로 이동
        } else {
            console.log("조건을 충족하지 못하여 다음 단계로 이동할 수 없습니다.");
        }
    };

    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
    };

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    return (
        <Background>
            <SketchBookImg />
            <EagleImg />
            <DearImg />
            <PigImg />
            <GiraffeImg />
            <CatImg />
            {signupStep === 1 && (
                <>
                    <SignupText>회원가입</SignupText>
                    <CategoryText>아이디</CategoryText>
                    <Box>
                        <InputBox onChange={handleIdChange} type="text" placeholder="5~10자리 영어, 특수문자 불가" />
                        {!validUserId && userId.length > 0 && <ErrorId>사용할 수 없는 아이디입니다.</ErrorId>}
                        <DoubleCheckBtn>
                            <BtnText>중복</BtnText>
                        </DoubleCheckBtn>
                    </Box>
                    <Box>
                        <CategoryText>닉네임</CategoryText>
                        <InputBox type="text" placeholder="사용하실 별명을 설정해주세요" />
                        <DoubleCheckBtn>
                            <BtnText>중복</BtnText>
                        </DoubleCheckBtn>
                    </Box>
                    <Box>
                        <CategoryText>비밀번호</CategoryText>
                        <InputBox onChange={handlePasswordChange} type="password" placeholder="8~15자리, 특수문자 사용, 숫자 포함" />
                    </Box>
                    <Box>
                        <CategoryText>비밀번호 확인</CategoryText>
                        <InputBox onChange={handleConfirmPasswordChange} type="password" placeholder="비밀번호를 재입력하세요" />
                    </Box>
                    <NextBtn onClick={gotoNext} match={passwordMatch}>
                        <BtnText><img src="src/assets/user/east.png" style={{ width: '50%', height: 'auto', margin: '0 0 0.5rem' }} /></BtnText>
                    </NextBtn>
                </>
            )}
            {signupStep === 2 && (
                <>
                    <SignupText>회원가입</SignupText>
                    <CategoryText>캐릭터</CategoryText>
                    <CharacterBoxPos>
                        <Character />
                    </CharacterBoxPos>
                    <CategoryText>나이</CategoryText>
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
                    <CategoryText>영어수준</CategoryText>
                    <Dropdown value={selectedGrade} onChange={handleGradeChange}>
                        <Option value="">영어수준을 선택해주세요</Option>
                        <Option value="상">상(중등이상)</Option>
                        <Option value="중">중(초등 3~초등 6)</Option>
                        <Option value="하">하(초등 2 이하)</Option>
                    </Dropdown>
                </>
            )}
        </Background>
    );
};

export default SignupPage;
