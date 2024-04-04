import styled from "styled-components";
import profileDog from "../../assets/user/profile_dog.png";
import profileTiger from "../../assets/user/profile_tiger.png";
import profilePig from "../../assets/user/profile_pig.png";
import profileDear from "../../assets/user/profile_dear.png";
import profileEagle from "../../assets/user/profile_eagle.png";
import profileSquirrel from "../../assets/user/profile_squirrel.png";
import profileRabbit from "../../assets/user/profile_rabbit.png";
import profileFox from "../../assets/user/profile_fox.png";
import profileGiraffe from "../../assets/user/profile_giraffe.png";
import profileCat from "../../assets/user/profile_cat.png";
import { useState } from "react";

const CharacterBox = styled.div`
  position: relative;
  width: 22.5rem;
  background-color: #a7a7a7;
  height: 9rem;
  border-radius: 1rem;
  opacity: 85%;
  z-index: 11;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-evenly;
  background: ${(props) => {
    if (props.selectedCharacter === null || props.selectedCharacter === undefined) {
      return "rgba(167, 167, 167, 0.4)";
    } else if (props.selectedCharacter) {
      return "rgb(169, 249, 255)";
    }
  }};
`;
const ImgFormat = styled.img`
  /* position : absolute; */
  left: ${(props) => props.left || "2.06rem"};
  top: ${(props) => props.top || "0.62rem"};
  width: 3.8rem;
  height: 3.8rem;
  outline: ${(props) => (props.clicked ? "#29C325 solid 4px" : "none")};
  border-radius: 5rem;
  margin: 0 0.2rem;
`;

const Character = ({ onCharacterSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const clickImg = (characterName) => {
    setSelectedCharacter(characterName);
    onCharacterSelect(characterName);
  };

  return (
    <>
      <CharacterBox selectedCharacter={selectedCharacter}>
        <ImgFormat
          onClick={() => clickImg("Dog")}
          src={profileDog}
          clicked={selectedCharacter === "Dog"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Tiger")}
          src={profileTiger}
          clicked={selectedCharacter === "Tiger"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Pig")}
          src={profilePig}
          clicked={selectedCharacter === "Pig"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Dear")}
          src={profileDear}
          clicked={selectedCharacter === "Dear"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Eagle")}
          src={profileEagle}
          clicked={selectedCharacter === "Eagle"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Squirrel")}
          src={profileSquirrel}
          clicked={selectedCharacter === "Squirrel"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Rabbit")}
          src={profileRabbit}
          clicked={selectedCharacter === "Rabbit"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Fox")}
          src={profileFox}
          clicked={selectedCharacter === "Fox"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Giraffe")}
          src={profileGiraffe}
          clicked={selectedCharacter === "Giraffe"}
        ></ImgFormat>
        <ImgFormat
          onClick={() => clickImg("Cat")}
          src={profileCat}
          clicked={selectedCharacter === "Cat"}
        ></ImgFormat>
      </CharacterBox>
    </>
  );
};

export default Character;
