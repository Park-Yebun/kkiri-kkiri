import styled from "styled-components";
import profileDog from "../../assets/user/profile_dog.png"
import profileTiger from "../../assets/user/profile_tiger.png"
import profilePig from "../../assets/user/profile_pig.png"
import profileDear from "../../assets/user/profile_dear.png"
import profileEagle from "../../assets/user/profile_eagle.png"
import profileSquirrel from '../../assets/user/profile_squirrel.png'
import profileRabbit from '../../assets/user/profile_rabbit.png'
import profileFox from '../../assets/user/profile_fox.png'
import profileGiraffe from '../../assets/user/profile_giraffe.png'
import profileCat from '../../assets/user/profile_cat.png'
import { useState } from "react";

const CharacterBox = styled.div`
    position : relative;
    width: 39.875rem;
    background-color : #A7A7A7;
    height : 15.6rem;
    border-radius : 2rem;
    opacity : 85%;
    z-index : 11;
    
`
const ImgFormat = styled.img`
    position : absolute;
    left : ${props => props.left || '2.06rem'};
    top : ${props => props.top ||'0.62rem'};
    width : 6.25rem;
    height : 6.25rem;
    border : ${props => props.clicked ? '#29C325 solid 5px': 'none'};
    border-radius : 5rem;
    


`

const Character = () => {
    const [clickedImg, setClickedImg] = useState(null);

    const clickImg = (imageId) => {
        setClickedImg(imageId);

    }

    return (
       <>
       <CharacterBox>
            <ImgFormat onClick={()=> clickImg(1)} src={profileDog} clicked={clickedImg === 1}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(2)} left="9.75rem" src={profileTiger} clicked={clickedImg === 2}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(3)} left="17.44rem" src={profilePig} clicked={clickedImg === 3}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(4)} left="25.13rem" src={profileDear} clicked={clickedImg === 4}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(5)} left="32.82rem" src={profileEagle} clicked={clickedImg === 5}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(6)} top="8.35rem" src={profileSquirrel} clicked={clickedImg === 6}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(7)} top="8.35rem"  left="9.75rem" src={profileRabbit} clicked={clickedImg === 7}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(8)} top="8.35rem"  left="17.44rem" src={profileFox} clicked={clickedImg === 8}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(9)} top="8.35rem"  left="25.13rem" src={profileGiraffe} clicked={clickedImg === 9}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(10)} top="8.35rem"  left="32.82rem" src={profileCat} clicked={clickedImg === 10}></ImgFormat>
            
        </CharacterBox> 
       </>
    );
};

export default Character;