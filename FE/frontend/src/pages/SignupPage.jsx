import styled from 'styled-components';
// import Singup1 from '../components/signup/Signup1.jsx'
import Singup2 from '../components/signup/Signup2.jsx'
import Background from '../components/common/Background';
import background from '../assets/user/backimg.png';
import sketchbook from '../assets/user/sketchbookImg.png';
import pig from '../assets/user/pig.png';
import dear from '../assets/user/dear.png';
import cat from '../assets/user/cat.png';
import eagle from '../assets/user/eagle.png'
import giraffe from '../assets/user/giraffe.png'

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
        <Background backgroundimage={background}>
            <SketchBookImg src={sketchbook}  />
            <EagleImg src={eagle}/>
            <DearImg src={dear}/>
            <PigImg src={pig}/>
            <GiraffeImg src={giraffe}/>
            <CatImg src={cat}/>
            {/* <Singup1></Singup1> */}
            <Singup2></Singup2> /
        </Background>
    );
};

export default SignupPage;