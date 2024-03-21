import styled from "styled-components";

const CharacterBox = styled.div`
    position : relative;
    width: 39.875rem;
    background-color : #A7A7A7;
    height : 15rem;
    border-radius : 2rem;
    opacity : 50%;
    z-index : 11;
    
`
const ImgFormat1 = styled.img`
    position : absolute;
    left : ${props => props.left || '2.06rem'};
    top : 0.62rem;
    width : 6.25rem;
    height : 6.25rem;

`

const Character = () => {
    return (
       <>
       <CharacterBox>
            <ImgFormat1 src="src/assets/user/profile_dog.png"></ImgFormat1>
            <ImgFormat1 src="src/assets/user/profile_tiger.png"></ImgFormat1>
            <ImgFormat1 src="src/assets/user/profile_pig.png"></ImgFormat1>
            <ImgFormat1 src="src/assets/user/profile_giraffe.png"></ImgFormat1>
            <ImgFormat1 src="src/assets/user/profile_eagle.png"></ImgFormat1>
        </CharacterBox> 
       </>
    );
};

export default Character;