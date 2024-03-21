import styled from "styled-components";
import Character from "../common/Character.jsx"

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
    
`


const Signup2 = () => {
    return (
      <>
      <SignupText>회원가입</SignupText>
      <CategoryText>캐릭터</CategoryText>
        <Character></Character>
      
      
      
      </>
    );
};

export default Signup2;