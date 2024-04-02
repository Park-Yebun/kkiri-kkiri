import Background from "../components/common/Background";
import background from "../assets/main/backimg.jpg";
import sketchbook from "../assets/user/sketchbookImg2.png";
import styled from "styled-components";
import downbtn from "../assets/user/downicon.png";
import backbtn from "../assets/user/backicon.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nicknamecheck from "../components/api/checkNicknameAPI";
import useUserStore from "../components/Counter/UserStore";
import profileDog from "../assets/user/profile_dog.png";
import profileTiger from "../assets/user/profile_tiger.png";
import profilePig from "../assets/user/profile_pig.png";
import profileDear from "../assets/user/profile_dear.png";
import profileEagle from "../assets/user/profile_eagle.png";
import profileSquirrel from "../assets/user/profile_squirrel.png";
import profileRabbit from "../assets/user/profile_rabbit.png";
import profileFox from "../assets/user/profile_fox.png";
import profileGiraffe from "../assets/user/profile_giraffe.png";
import profileCat from "../assets/user/profile_cat.png";

const SketchbookImg = styled.img`
  position: relative;
  width: 30rem;
  height: 45rem;
  margin-left: 0.5rem;
`;
const Container = styled.div`
  position: absolute;
  height: 42rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* background-color: yellow; */
`;
const MypageText = styled.div`
  position: absolute;
  top: 4rem;
  font-size: 2.7rem;
  font-weight: 700;
`;

const CharacterBox = styled.div`
  position: absolute;
  top: 8rem;
  width: 25rem;
  background-color: #a7a7a7;
  height: 9rem;
  border-radius: 1rem;
  opacity: 85%;
  z-index: 11;
  padding: 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-evenly;
  outline: ${(props) => {
    if (props.selectedCharacter === null || props.selectedCharacter === undefined) {
      return "1px solid #a7a7a7";
    } else if (props.selectedCharacter) {
      return "4px solid #29C325";
    }
  }};
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 19rem;
  width: 87%;
  justify-content: center;
  /* background-color: green; */
`;
const BoxSet = styled.div`
  display: flex;
  flex-direction: column;
  /* position : absolute; */
  height: 4.5rem;
  width: 100%;
  /* background-color: green; */
`;

const CategoryText = styled.div`
  font-size: 1rem;
  font-weight: 300;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputBox = styled.input`
  width: 100%;
  height: 2.4rem;
  border-radius: 1rem;
  border: 1px solid #a7a7a7;
  background: ${(props) => {
    if (!props.valid === undefined) {
      return "rgba(167, 167, 167, 0.4)";
    } else if (props.valid === false) {
      return "rgba(255, 0, 0, 0.4)";
    } else {
      return "rgba(167, 167, 167, 0.4)";
    }
  }};
  outline: ${(props) => {
    if (!props.valid === false) {
      return "3px solid #29C325";
    } else {
      return "none";
    }
  }};
  font-size: 3rem;
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  text-indent: 1rem;

  &::placeholder {
    position: absolute;
    color: #6f6c6c;
    font-size: 0.9rem;
    font-weight: 300;
    display: flex;
    top: 0.8rem;
  }
`;
const ErrorPW = styled.div`
  position: absolute;
  color: red;
  margin: 0.1rem 0 0 14rem;
  font-size: 0.8rem;
`;
const DoubleCheckBtn = styled.div`
  /* position: absolute; */
  z-index: 10;
  left: 18rem;
  width: 6rem;
  height: 2.8rem;
  border-radius: 1.5rem;
  background: #727272;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-left: 0.5rem;
`;
const BtnText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 1.3rem;
  font-family: "Ttangsbudaejjigae OTF";
  padding-top: 0.1rem;
`;
const Dropdown = styled.select`
  height: 2.687rem;
  border-radius: 1rem;
  border: 1px solid #a7a7a7;
  background: rgba(167, 167, 167, 0.5);
  outline: ${(props) => {
    if (props.valid === "") {
      return "2px solid rgba(167, 167, 167, 0.4)"; // outline 스타일 수정
    } else if (props.valid !== "") {
      return "2px solid #29C325";
    }
  }};
  font-size: 1.3rem;
  background-image: url(${downbtn});
  background-position: right 0.2rem center;
  background-size: 2rem;
  background-repeat: no-repeat;
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  font-size: 0.9rem;
  color: #6f6c6c;
  text-indent: 1rem;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  margin-left: ${(props) => props.marginLeft || "0%"};
`;

const Option = styled.option`
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  background: rgba(167, 167, 167, 1);
`;

const SaveBtn = styled.div`
  position: relative;
  font-weight: 500;
  width: 12rem;
  height: 3rem;
  bottom: 1%;
  margin-right: 1.5rem;
  border-radius: 2.5rem;
  /* background-color: #29c325; */
  background-color: ${(props) => {
    console.log(props.valid);
    if (props.valid === true) {
      return "#29c325";
    } else if (props.valid === false || props.valid === undefined) {
      return "rgba(255, 0, 0, 0.4)";
    }
  }};
  cursor: ${(props) => {
    console.log(props.valid);
    if (props.valid === true) {
      return "pointer";
    } else if (props.valid === false || props.valid === undefined) {
      return "not-allowed";
    }
  }};
`;

const BackBtn = styled.img`
  position: relative;
  width: 3.5rem;
  bottom: 0.3rem;
  cursor: pointer;
`;
const SignOut = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  width: 5rem;
  height: 2rem;
  border-radius: 2.5rem;
  background-color: #ff0000;
  color: #ffffff;
  cursor: pointer;
`;

const InPutNicknametBox = styled.input`
  width: 100%;
  height: 2.4rem;
  border-radius: 1rem;
  border: 1px solid #a7a7a7;
  font-size: 3rem;
  background: ${(props) => {
    if (props.valid === undefined) {
      return "rgba(167, 167, 167, 0.4)";
    } else if (props.valid === true) {
      return "rgba(255, 0, 0, 0.4)";
    } else {
      return "rgba(167, 167, 167, 0.4)";
    }
  }};
  outline: ${(props) => {
    if (props.valid === false) {
      return "3px solid #29C325";
    } else {
      return "none";
    }
  }};
  font-size: 1.3rem;
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  text-indent: 1rem;

  &::placeholder {
    color: #6f6c6c;
    font-size: 0.9rem;
    font-weight: 300;
  }
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
  cursor: pointer;
`;
const BottomBtn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem;
  /* background-color:aqua; */
`;

const MypagePage = () => {
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [nickname, setNickname] = useState("");
  const [validCheckNickname, setvalidCheckNickname] = useState(false);
  const [validPassword, setValidPassword] = useState();
  const userInfo = useUserStore((state) => state.userInfo);
  const [validSignUp, setValidSignup] = useState();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    (async () => {
      try {
        let isLogin = document.cookie.match(
          new RegExp(
            "(?:^|; )" + "memberId".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
          )
        );
        if (!isLogin) {
          navigate("/login");
        } else {
          console.log("로그인 상태 확인됨");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    })();
  }, [navigate]);

  console.log(userInfo);
  useEffect(() => {
    setNickname(userInfo.nickname);
    setvalidCheckNickname(false);
    setSelectedAge(userInfo.age);
    setSelectedGrade(userInfo.level);
  }, []);

  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };
  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const clickImg = (characterName) => {
    setSelectedCharacter(characterName);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    setvalidCheckNickname();
  };

  const checkNickname = async () => {
    if (nickname === userInfo.nickname) {
      setvalidCheckNickname(false);
    } else {
      const NicknameCheckValid = await Nicknamecheck(nickname);
      setvalidCheckNickname(NicknameCheckValid);
    }
  };
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,15}$/;
    setValidPassword(regex.test(password));
    setPassword(password);
  };

  const handleSubmit = async () => {
    const userData = {
      password: password,
      nickname: nickname,
      age: selectedAge,
      level: selectedGrade,
      thumbnail: `https://kkiri-kkiri.s3.ap-northeast-2.amazonaws.com/profile_${selectedCharacter}.png`,
    };

    try {
      const response = await fetch(`https://kkirikkiri.shop/api/members/${userInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("회원정보 수정이 완료되었습니다.");
        navigate("/login");
      } else {
        console.error("회원정보 수정에 실패했습니다.");
        console.log(userData);
      }
    } catch (error) {
      console.log(userData);
      console.error("오류 발생:", error);
    }
  };

  const signOutSubmit = async () => {
    console.log("탈퇴API 호출");
    try {
      const response = await fetch(`https://kkirikkiri.shop/api/members/${userInfo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("회원탈퇴가 완료되었습니다.");
        navigate("/login");
      } else {
        console.error("회원탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const isValid = selectedAge !== "" ? "true" : "";
  const isValid2 = selectedGrade !== "" ? "true" : "";
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (
      password &&
      validPassword &&
      selectedCharacter &&
      selectedAge &&
      selectedGrade &&
      validCheckNickname === false
    ) {
      setValidSignup(true);
    } else {
      setValidSignup(false);
    }
    console.log(validPassword, selectedCharacter, selectedAge, selectedGrade, validCheckNickname);
    console.log(validSignUp);
  }, [validPassword, selectedCharacter, selectedAge, selectedGrade, validCheckNickname]);

  return (
    <Background backgroundimage={background}>
      <SketchbookImg src={sketchbook}></SketchbookImg>
      <Container>
        <MypageText>회원정보 수정 </MypageText>
        <CharacterBox selectedCharacter={selectedCharacter}>
          <ImgFormat
            onClick={() => clickImg("dog")}
            src={profileDog}
            clicked={selectedCharacter === "dog"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("tiger")}
            src={profileTiger}
            clicked={selectedCharacter === "tiger"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("pig")}
            src={profilePig}
            clicked={selectedCharacter === "pig"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("dear")}
            src={profileDear}
            clicked={selectedCharacter === "dear"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("eagle")}
            src={profileEagle}
            clicked={selectedCharacter === "eagle"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("squirrel")}
            src={profileSquirrel}
            clicked={selectedCharacter === "squirrel"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("rabbit")}
            src={profileRabbit}
            clicked={selectedCharacter === "rabbit"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("fox")}
            src={profileFox}
            clicked={selectedCharacter === "fox"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("giraffe")}
            src={profileGiraffe}
            clicked={selectedCharacter === "giraffe"}
          ></ImgFormat>
          <ImgFormat
            onClick={() => clickImg("cat")}
            src={profileCat}
            clicked={selectedCharacter === "cat"}
          ></ImgFormat>
        </CharacterBox>
        <InputContainer>
          <BoxSet>
            <CategoryText>닉네임</CategoryText>
            <Box>
              <InPutNicknametBox
                onChange={handleNicknameChange}
                type="text"
                placeholder="사용하실 별명을 설정해주세요(최대5글자)"
                maxLength="5"
                valid={validCheckNickname}
                value={nickname}
              ></InPutNicknametBox>
              <DoubleCheckBtn onClick={checkNickname}>
                <BtnText>중복</BtnText>
              </DoubleCheckBtn>
            </Box>
          </BoxSet>
          <BoxSet>
            <CategoryText>비밀번호</CategoryText>
            {!validPassword && password.length > 0 && (
              <ErrorPW>사용할 수 없는 비밀번호입니다.</ErrorPW>
            )}
            <Box>
              <InputBox
                onChange={handlePasswordChange}
                type="password"
                placeholder="8~15자리, 특수문자 사용, 숫자 포함"
                valid={validPassword}
              ></InputBox>
            </Box>
          </BoxSet>
          <BoxSet>
            <CategoryText>나이</CategoryText>
            <Dropdown width="90%" value={selectedAge} onChange={handleAgeChange} valid={isValid}>
              <Option value="">나이를 선택해주세요</Option>
              <Option value="6">6세</Option>
              <Option value="7">7세</Option>
              <Option value="8">8세</Option>
              <Option value="9">9세</Option>
              <Option value="10">10세</Option>
              <Option value="11">11세</Option>
              <Option value="12">12세</Option>
              <Option value="13">13세</Option>
            </Dropdown>
          </BoxSet>
          <BoxSet>
            <CategoryText>영어 수준</CategoryText>
            <Dropdown
              width="100%"
              value={selectedGrade}
              onChange={handleGradeChange}
              valid={isValid2}
            >
              <Option value="">영어수준을 선택해주세요</Option>
              <Option value="ADVANCED">상(중등이상)</Option>
              <Option value="INTERMEDIATE">중(초등 3~초등 6)</Option>
              <Option value="BEGINNER">하(초등 2 이하)</Option>
            </Dropdown>
          </BoxSet>
        </InputContainer>

        <BottomBtn>
          <SignOut onClick={signOutSubmit}>회원탈퇴</SignOut>
          <SaveBtn
            onClick={() => {
              if (validSignUp) {
                handleSubmit();
              } else {
                alert("모든 항목을 올바르게 입력하고 캐릭터를 선택해주세요.");
              }
            }}
            valid={validSignUp}
          >
            <BtnText color="black">수정</BtnText>
          </SaveBtn>
          <BackBtn src={backbtn} onClick={handleBack} />
        </BottomBtn>
      </Container>
    </Background>
  );
};

export default MypagePage;
