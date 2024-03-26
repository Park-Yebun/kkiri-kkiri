import styled from 'styled-components';
import 'animate.css';
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
    width: 15rem;
    top : 16rem;
    left : 11rem;
`
const DearImg = styled.img`
    position : absolute;
    width: 22rem;
    top : 72rem;
    left : 41rem;
    animation-delay: 0.3s;
`
const GiraffeImg = styled.img`
    position : absolute;
    width: 16rem;   
    top : 61.3rem;
    left : 126rem;
    animation-delay: 0.1s;
`
const CatImg = styled.img`
    position : absolute;
    width: 20rem;
    top : 67rem;
    left : 103rem;
    animation-delay: 0.8s;
`
const PigImg = styled.img`
    position : absolute;
    width: 25rem;
    top : 68rem;
    left : 7rem;
    animation-delay: 0.5s;
`
const SignupPage = () => {
    return (
        <Background backgroundimage={background}>
            <SketchBookImg src={sketchbook}  />
            <EagleImg className="animate__animated animate__bounce animate__fast animate__infinite" src={eagle}/>
            <DearImg className="animate__animated animate__bounce animate__infinite" src={dear}/>
            <PigImg className="animate__animated animate__bounce animate__infinite" src={pig}/>
            <GiraffeImg className="animate__animated animate__bounce animate__infinite" src={giraffe}/>
            <CatImg className="animate__animated animate__bounce animate__infinite" src={cat}/>
            {/* <Singup1></Singup1> */}
            <Singup2></Singup2>
        </Background>
    );
};

export default SignupPage;