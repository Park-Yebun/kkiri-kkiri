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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-evenly;
`
const ImgFormat = styled.img`
    /* position : absolute; */
    left : ${props => props.left || '2.06rem'};
    top : ${props => props.top ||'0.62rem'};
    width : 6.25rem;
    height : 6.25rem;
    outline : ${props => props.clicked ? '#29C325 solid 7px': 'none'}; 
    border-radius : 5rem;
    margin: 0 0.2rem;
`

const Character = ({onCharacterSelect}) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);


    const clickImg = (imageId) => {
        setSelectedCharacter(imageId);
        onCharacterSelect(imageId);

    }

    return (
       <>
       <CharacterBox>
            <ImgFormat onClick={()=> clickImg(1)} src={profileDog} clicked={selectedCharacter === 1}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(2)} src={profileTiger} clicked={selectedCharacter === 2}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(3)} src={profilePig} clicked={selectedCharacter === 3}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(4)} src={profileDear} clicked={selectedCharacter === 4}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(5)} src={profileEagle} clicked={selectedCharacter === 5}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(6)} src={profileSquirrel} clicked={selectedCharacter === 6}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(7)} src={profileRabbit} clicked={selectedCharacter === 7}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(8)} src={profileFox} clicked={selectedCharacter === 8}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(9)} src={profileGiraffe} clicked={selectedCharacter === 9}></ImgFormat>
            <ImgFormat onClick={()=> clickImg(10)} src={profileCat} clicked={selectedCharacter === 10}></ImgFormat>
            
        </CharacterBox> 
       </>
    );
};

export default Character;