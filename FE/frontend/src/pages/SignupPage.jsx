import styled from 'styled-components';
import Singup1 from '../components/Signup1.jsx'
// import Singup2 from '../components/Signup2.jsx'



const SignupContainer = styled.div`
  width : 160rem;
  height : 100rem;  
  position : relative;
  background-image: url('/assets/backimg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const SketchBookImg = styled.img`
    position : absolute;
    width : 50rem;
    height : 62.5rem;
    top : 18.75rem;
    left : 55rem;
    
`
const EagleImg = styled.img`
    position : absolute;
    width: 14.6875rem;
    height: 13.4375rem;
    top : 16.44rem;
    left : 10.75rem;
    
`
const DearImg = styled.img`
    position : absolute;
    width: 23.625rem;
    height: 22.125rem;
    top : 74.19rem;
    left : 29.19rem;
    
`
const GiraffeImg = styled.img`
    position : absolute;
    width: 17.625rem;   
    height: 21.375rem;
    top : 67.62rem;
    left : 123rem;
    
`
const CatImg = styled.img`
    position : absolute;
    width: 19.625rem;
    height: 20.875rem;
    top : 74.19rem;
    left : 98.81rem;
    
`
const PigImg = styled.img`
    position : absolute;
    width: 23.8125rem;
    height: 23.8125rem;
    top : 66.88rem;
    left : 3.5rem;
    
`
const SignupPage = () => {
    return (
        <SignupContainer>
            <SketchBookImg src="/assets/sketchbookImg.png" alt="" />
            <EagleImg src="/assets/eagle.png"/>
            <DearImg src="/assets/dear.png"/>
            <PigImg src="/assets/pig.png"/>
            <GiraffeImg src="/assets/giraffe.png"/>
            <CatImg src="/assets/cat.png"/>
            <Singup1></Singup1>
            {/* <Singup2></Singup2> */}
        </SignupContainer>
    );
};

export default SignupPage;