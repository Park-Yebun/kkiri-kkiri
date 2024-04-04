import OpenAI from "openai";
import styled from "styled-components";
import Background from "../components/common/Background";
import Sentence from "../components/story/Sentence";
import background from "../assets/story/backimgstory.jpg";
import quill from "../assets/story/quill.png";
import { useState, useRef, useEffect } from "react";
// import  dummyjson  from '../pages/storydummy.json';
import gptimg from "../assets/main/simplebookshelf.png";
// import userimg from '../assets/user/profile_cat.png';
import StoryNameModal from "../components/Modal/StoryNameModal";
import useUserStore from "../components/Counter/UserStore";
import { useParams } from "react-router-dom";
import { color } from "framer-motion";
import { useNavigate } from "react-router-dom";
import closeBtn from "../assets/library/clear.png";
import LoadingModal from "../components/Modal/StoryLoadingModal.jsx";

const CloseBtn = styled.img`
  position: fixed;
  width: 10%;
  top: 0.5rem;
  right: 0.5rem;
`;

const StoryContainer = styled.div`
  max-width: 125rem;
  width: 70rem;
  height: 40rem;
  position: absolute;
  top: 7rem;
  border-radius: 2rem;
  background-color: #745e5ee5;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 2rem;
  box-sizing: border-box;
`;

const StoryTitlebox = styled.div`
  max-height: 4rem;
  height: 75%;
  width: 100%;
  /* background-color: red; */
  display: flex;
`;

const StoryTitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 300;
  font-size: 2rem;
  font-family: "Ttangsbudaejjigae OTF";
  color: #000;
  margin-top: 0.4rem;
  line-height: normal;
`;

const StoryScrollbox = styled.div`
  font-size: 6rem;
  width: 100%;
  height: 70%;
  background-color: pink;
  position: relative;
  border-radius: 1.5rem;
  background: #3a2e2e;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3rem;
    /* background-color: red; */
    border-radius: 2rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff7e7;
    border-radius: 1.5rem;
    background-clip: padding-box;
    border: 0.5rem solid transparent;
  }
  /* &::-webkit-sccollbar-track {} */
`;
const StoryInputBox = styled.div`
  width: 100%;
  height: 25%;
  /* background-color: red; */
  display: flex;
  margin-top: 1rem;
`;

const Sentence2 = styled(Sentence)`
  padding: 1.5rem 1.1rem 1.1rem 1.1rem;
  height: 9rem;
  width: 55rem;
  margin: 0;
  padding-bottom: 0;
  &.writingstyle {
    /* background-color: red; */
    filter: brightness(0.8);
  }
  &.stopwrite {
    filter: brightness(0.8);
  }
`;
const UserInput = styled.textarea`
  width: 60rem;
  background-color: transparent;
  overflow: visible;
  font-size: 1.5rem;
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  border: none;
  resize: none;
  /* background-color: aqua; */
  &:focus {
    outline: none;
    /* background-color: pink; */
  }
  &:disabled {
    filter: brightness(0.8);
  }
  &.stopwrite {
    pointer-events: none;
  }
`;
const StoryInput = styled.div`
  width: 104rem;
  height: 100%;
  /* background-color: yellow; */
  margin-right: 0;
  position: relative;
`;

const Capa = styled.div`
  position: absolute;
  /* background-color: aqua; */
  text-align: right;
  height: 3rem;
  width: 9rem;
  right: 4rem;
  bottom: 0;

  font-size: 1.3rem;
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  &::after {
    content: "/100";
  }
`;
const MiniBox = styled.div`
  width: 10rem;
  height: 100%;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Quill = styled.div`
  height: 10rem;
  width: 8rem;
  display: flex;
  flex-direction: row;
  font-size: 2.5rem;
  font-weight: 300;
  padding-left: 0.5rem;
  /* background-color: aqua; */
`;
const QuillImg = styled.img`
  height: 3.5rem;
  /* background-color: pink; */
`;
const QuillNum = styled.div`
  padding-top: 10px;
  &::before {
    content: "× ";
  }
`;

const WriteBtn = styled.div`
  position: relative;
  display: flex;
  height: 10rem;
  width: 9rem;
  justify-content: center;
  align-items: center;
  padding-top: 0.7rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background: #29c325;
  box-shadow: 0px 0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25);
  color: #000;
  font-size: 2.8rem;
  font-style: normal;
  font-weight: 300;
  &:active {
    box-shadow: none;
    filter: brightness(0.8);
  }
  &.writingstyle {
    /* box-shadow: none; */
    filter: brightness(0.8);
    /* background-color: red; */
  }
  &.stopwrite {
    pointer-events: none;
    filter: brightness(0.5);
  }
`;

const SendBtn = styled.div`
  position: absolute;
  bottom: 1.5rem;
  margin-top: 0.5rem;
  width: 20rem;
  height: 4rem;
  border-radius: 1rem;
  /* background-color: grey; */
  text-align: center;
  line-height: 4.4rem;
  background-color: #29c325;
  font-size: 2rem;
  font-weight: 300;
  filter: brightness(0.6);
  box-shadow: 0px 0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  &:active {
    box-shadow: none;
  }
  &.writingstyle {
    /* box-shadow: none; */
    pointer-events: auto;
    filter: brightness(1);
    /* background-color: red; */
  }
`;

// const Sentences = messagesdummy.map((message) => {
// 	return (
// 		// eslint-disable-next-line react/jsx-key
// 		<Sentence>{message}</Sentence>
// 	)
// })

const WriterDiv = styled.div`
  margin-left: 1.5rem;
  height: 8rem;
  width: 6rem;
  /* background-color: red; */
  /* opacity: 0.5; */
  margin-right: 2rem;
`;
const WriterName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  height: 2rem;
  width: 100%;
  /* background-color: yellow; */
  /* overflow: visible; */
  /* text-align: center; */
  white-space: nowrap;
`;

const WriterImg = styled.img`
  margin-top: 0.5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: white;
`;

const WriterText = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  /* height: 5rem; */
  min-height: 6rem;
  height: auto;
  width: 85%;
  /* background-color: blue; */
  /* opacity: 0.5; */
  padding-top: 1rem;
  padding-right: 1rem;
`;
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const ModalTitle = styled.div`
  /* position: relative; */
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`;
const ModalTextBox = styled.div`
  width: 28rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: #f1cdcd;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalCloseButton = styled.div`
  /* position: absolute; */
  margin-top: 1rem;
  font-size: 1.8rem;
  top: 41rem;
  left: 60rem;
  /* margin-top: 1rem; */
  width: 8rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: #49d84e;
  box-shadow: 0px 0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 500;
  &:active {
    box-shadow: none;
    filter: brightness(0.8);
  }
`;
const StoryTitle = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  vertical-align: middle;
  line-height: 4.5rem;
  /* line-height: 1rem; */
  /* transform: translateY(-2rem); */
  /* background-color: transparent; */
  /* background-color: red; */
  background-color: transparent;
  overflow: visible;
  white-space: nowrap;
  font-size: 2rem;
  font-family: "Ttangsbudaejjigae OTF";
  font-weight: 300;
  border: none;
  &:focus {
    outline: none;
    /* background-color: blue; */
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StateBox = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Checkmark = styled.span`
  height: 2rem;
  width: 2rem;
  background-color: #eee;
  border-radius: 0.5rem;
  display: inline-block;
  position: relative; // 포지션을 relative로 설정하여 ::after의 위치 기준점을 만듭니다.

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 0.4rem;
    bottom: 0.4rem;
    width: 1rem;
    height: 1.5rem;
    border: solid #ffffff; // 체크 색상을 지정합니다.
    border-width: 0 0.4rem 0.4rem 0;
    transform: rotate(45deg);
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  display: none; // 실제 체크박스는 숨깁니다.
  &:checked + ${Checkmark} {
    background-color: #00b909;
    &:after {
      display: block; // 체크박스가 체크될 때 ::after 콘텐츠를 표시합니다.
    }
  }
`;

const LabelText = styled.span`
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-top: 0.3rem;
`;

// 공개 및 비공개 영역 스타일 조정을 위한 컴포넌트
const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  padding: 0.5rem;
  border-radius: 10px;
`;
const Check = styled.input`
  width: 1;

  input[type="checkbox"] {
    accent-color: #00c421;
  }
`;

const Public = styled.div`
  /* width: 40%; */
  background-color: beige;
  position: relative;
  display: flex;
  align-items: center;
`;

const Private = styled.div`
  /* width: 60%; */
  position: relative;
  display: flex;
  align-items: center;
  background-color: blueviolet;
`;

// 130자 정도로 글자수를 넘겨버리는 경우를 고려해서 프롬프트는 70자로 정해주었음
let convUser = [
  {
    role: "system",
    content: `나는 한국의 10살 아이로, 동화를 좋아해. 그리고 너는 아이들을 좋아하고 동화를 만드는 창의적이고 동화작가야`,
  },
  {
    role: "system",
    content:
      "지금부터 나와 함께 동화를 만들어보자.내가 먼저 한 문장 길이의 동화를 입력하면, 너는 그 동화를 이어서 대답하는거야.",
  },
  {
    role: "system",
    content: "너는 공백포함 70자를 넘지 않도록 한국어로 문장을 끝내야 해. ",
  },
  {
    role: "system",
    content: "내가 동화와 관련없는 말을 하더라도, 너는 끝까지 이야기를 완성해야만 해.",
  },
];

const StoryPage = () => {
  const regex = /^[ㄱ-ㅎ가-힣0-9.,?'"!~|{\}/\n\t\"\']+$/;
  const navigate = useNavigate();
  const storyIdRef = useRef(0);
  const quillNum = useRef(5);
  const [ql, setql] = useState(5);
  const params = useParams();
  // console.log(params.story_id);
  const userInfo = useUserStore((state) => state.userInfo);
  // const userimg = `../assets/user/${userInfo.profileImage}`;
  const userimg = `../assets/user/profile_cat.png`;
  // const userimg = '../jhc.jpg';
  const [gptName, setGptName] = useState("끼리코");
  const [storyId, setstoryId] = useState(13);
  const openaiUser = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });
  const isWriting = useRef(false);
  const scrollBoxRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  // useEffect(() => {console.log("유즈이펙트")}, [quillNum.current]);
  useEffect(() => {
    setstoryId(storyIdRef.current);
  }, [storyIdRef]);
  useEffect(() => {
    const fetchData = async () => {
      if (parseInt(params.story_id)) {
        try {
          storyIdRef.current = params.story_id;
          const response = await fetch(`https://kkirikkiri.shop/api/books/${params.story_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          setstoryId(params.story_id);
          // storyIdRef.current = params.story_id;
          const data = await response.json();
          // console.log(data.contents.length)
          setql(5 - parseInt(data.contents.length / 2));
          // quillNum.current = 5 - parseInt(data.contents.length / 2);
          // console.log("작성가능횟수",quillNum.current);
          // console.log(data.contents);
          setMessages(
            data.contents.map((msg) => {
              return {
                storyId: msg.storyId,
                lineId: msg.lineId,
                koreanSentence: msg.koreanSentence,
                translatedsentence: msg.translatedSentence,
              };
            })
          );
        } catch (error) {
          // console.log('데이터로드실패', error);
        }
      }
    };
    fetchData();
    // console.log("이어 작성하기.");
  }, []);

  const translateChat = async (input) => {
    const translation = await openaiUser.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "you have to translate it into a sentence that has a vocabulary level appropriate for my age. Below are examples of English sentences by age.",
        },
        {
          role: "system",
          content:
            "Concept: 'The cat is hiding because it is scared of the dog.' Age 7: 'The kitty is playing hide and seek because it's afraid of the doggy.' Age 10: 'The cat is hiding because it's scared of the dog.' Age 13: 'The cat has concealed itself due to its fear of the canine.'",
        },
        {
          role: "system",
          content: "Translate the following input into English.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-3.5-turbo",
      // max_tokens: 280,
      temperature: 0.7,
    });
    return translation.choices[0].message.content;
  };
  const descriptChat = async (input) => {
    const description = await openaiUser.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Write an image description to be used for image generation AI based on the following input.",
        },
        {
          role: "system",
          // content: "your image description should be 100 characters or less in English. also, write the image description one sentence of noun form"
          content:
            "your image description should be 50 characters or less in English. also, this image description must be simple and easy to understand.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 50,
      temperature: 0.7,
    });
    return "detailed, clear, best quality, " + description.choices[0].message.content;
  };
  const summaryStory = async (story) => {
    const story2 = await story.map((msg) => msg.koreanSentence).join(" ");
    let arrMsg = [];
    arrMsg.push({ role: "user", content: story2 });
    arrMsg = [
      // {
      // 	role: "system",
      // 	content: "나는 10살 한국 아이로, 동화를 좋아해. 그리고 너는 아이들을 좋아하고 동화를 만드는 창의적이고 동화작가야"
      // },
      {
        role: "assistant",
        content: "동화를 공백포함 70자 이내로 짧게 요약해줘",
      },
      ...arrMsg,
    ];
    // console.log("스토리2:", story2)
    const completionUser = await openaiUser.chat.completions.create({
      messages: arrMsg,
      model: "gpt-3.5-turbo",
      // max_tokens: 100,
      temperature: 0.7,
    });
    const responseUser = completionUser.choices[0].message.content;
    // console.log("요약된 스토리:", responseUser + "...")
    return responseUser;
  };

  const chatWithGpt = async (input) => {
    convUser.push({ role: "user", content: input });
    // console.log(quillNum)
    // if (quillNum === 0) {
    if (quillNum.current === 0 || ql === 0) {
      convUser = [
        { role: "assistant", content: "이 동화를 공백포함 80자 이내로 마무리 해줘 " },
        ...convUser,
      ];
    }
    const completionUser = await openaiUser.chat.completions.create({
      messages: convUser,
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      seed: 429,
    });
    const responseUser = completionUser.choices[0].message.content;
    convUser.push({ role: "assistant", content: responseUser });

    return responseUser;
  };

  const writeGptStory = async (input) => {
    const gptResponse = await chatWithGpt(input);
    // console.log("gpt의 대답:", gptResponse)
    const translatedSentence = await translateChat(gptResponse);
    const imageDescription = await descriptChat(gptResponse);
    const lineId = (6 - quillNum.current) * 2 - 2;
    // await sleep(5000);

    //
    const fetchStoryData = async () => {
      try {
        const response = await fetch(`https://kkirikkiri.shop/api/books/contents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              // "writer": "끼리코",
              // "storyId": storyId,
              storyId: storyIdRef.current,
              lineId: lineId,
              // "koreanSentence": gptResponse,
              koreanSentence: gptResponse,
              translatedSentence: translatedSentence,
              imageDescription: imageDescription,
            },
          ]),
        });
      } catch (error) {
        console.error("에러발생", error);
      }
    };
    await fetchStoryData();
    const fetchTtsData = async () => {
      try {
        const response = await fetch(`https://kkirikkiri.shop/api/books/contents/voice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              // "writer": "끼리코",
              // "storyId": storyId,
              storyId: storyIdRef.current,
              lineId: lineId,
              // "koreanSentence": gptResponse,
              koreanSentence: gptResponse,
              translatedSentence: translatedSentence,
              imageDescription: imageDescription,
            },
          ]),
        });
      } catch (error) {
        console.error("에러발생", error);
      }
    };
    await fetchTtsData();
    //
    setMessages((messages) => [
      ...messages,
      {
        // "writer": "끼리코",
        // "storyId": storyId,
        storyId: storyIdRef.current,
        lineId: lineId,
        // "koreanSentence": gptResponse,
        koreanSentence: gptResponse,
        translatedSentence: translatedSentence,
        imageDescription: imageDescription,
      },
    ]);
    // console.log("메세지: ", messages);
    userInputRef.current.focus();
  };

  const writeStory = async () => {
    if (!isWriting.current && quillNum.current > 0 && ql > 0) {
      userInputRef.current.disabled = true;
      isWriting.current = true;
      buttonRef.current = true;
      const lineId = (6 - quillNum.current) * 2 - 1;
      // console.log("입력메세지: ", inputUser)
      const translatedSentence = await translateChat(inputUser);
      const imageDescription = await descriptChat(inputUser);
      // console.log(translatedSentence)

      const newUserMessage = {
        // 형찬 추가 코드
        storyId: storyIdRef.current,
        lineId: (6 - quillNum.current) * 2 - 1, // 사용자 메시지의 lineId 계산
        koreanSentence: inputUser,
        translatedSentence: "", // 번역된 문장은 이후에 업데이트
        imageDescription: "", // 이미지 설명은 이후에 업데이트
      };

      // Messages 상태 업데이트
      setMessages((messages) => [...messages, newUserMessage]);

      //
      const fetchStoryData = async () => {
        try {
          const response = await fetch(`https://kkirikkiri.shop/api/books/contents`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              {
                // "writer": "끼리코",
                // "storyId": storyId,
                storyId: storyIdRef.current,
                lineId: lineId,
                // "koreanSentence": gptResponse,
                koreanSentence: inputUser,
                translatedSentence: translatedSentence,
                imageDescription: imageDescription,
              },
            ]),
          });
        } catch (error) {
          console.error("에러발생", error);
        }
      };
      // await fetchStoryData();
      const fetchTtsData = async () => {
        try {
          const response = await fetch(`https://kkirikkiri.shop/api/books/contents/voice`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              {
                // "writer": "끼리코",
                // "storyId": storyId,
                storyId: storyIdRef.current,
                lineId: lineId,
                // "koreanSentence": gptResponse,
                koreanSentence: inputUser,
                translatedSentence: translatedSentence,
                imageDescription: imageDescription,
              },
            ]),
          });
        } catch (error) {
          console.error("에러발생", error);
        }
      };
      // await fetchTtsData();
      await Promise.all([fetchStoryData(), fetchTtsData()]);

      // 형찬 삭제 코드
      // setMessages(messages => [...messages,
      // 							{
      // 							// "writer": userName,
      // 							// "storyId": storyId,
      // 							"storyId": storyIdRef.current,
      // 							"lineId": lineId,
      // 							"koreanSentence": inputUser,
      // 							"translatedSentence":translatedSentence,
      // 							"imageDescription": imageDescription
      // 							}
      // 						]
      // 			);
      // console.log("메세지: ", messages);
      userInputRef.current.value = "";
      setInputLength(0);
      userInputRef.current.focus();
      setInputUser("");
      // if (quillNum > 0) {
      if (quillNum.current > 0 && ql > 0) {
        // setQuillNum(quillNum - 1);
        quillNum.current--;
        setql(ql - 1);
        // console.log("현재 퀼넘:", quillNum.current);
      } else {
        // console.log(messages);
      }

      await writeGptStory(inputUser);
      userInputRef.current.disabled = false;
      isWriting.current = false;
      buttonRef.current = false;
    }
  };

  const beforeWriteStory = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const getStoryId = async (paramsStoryId) => {
        if (paramsStoryId) {
          // 이어서 작성할 때
          const fetchData = async () => {
            try {
              storyIdRef.current = paramsStoryId;
              const response = await fetch(`https://kkirikkiri.shop/api/books/${params.story_id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              setstoryId(paramsStoryId);
              setql(5 - parseInt(data.contents.length / 2));
              setMessages(
                data.contents.map((msg) => {
                  return {
                    storyId: msg.storyId,
                    lineId: msg.lineId,
                    koreanSentence: msg.koreanSentence,
                    translatedsentence: msg.translatedSentence,
                  };
                })
              );
            } catch (error) {
              console.error("데이터로드실패", error);
            }
          };
          fetchData();
        } else {
          // 처음 작성할 때
          const fetchStoryData = async () => {
            try {
              const response = await fetch(`https://kkirikkiri.shop/api/books`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  loginId: userInfo.loginId,
                  title: "",
                  openState: "PUBLIC",
                  summary: "",
                }),
              });
              const localStoryId = await response.json();
              storyIdRef.current = localStoryId;
            } catch (error) {
              console.error("에러발생", error);
            }
          };
          fetchStoryData();
        }
      };

      if (quillNum.current === 5) {
        await getStoryId(parseInt(params.story_id));
      }
      await writeStory();
    } catch (error) {
      console.error("beforeWriteStory error:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // const beforeWriteStory = async () => {
  // 	const getStoryId = async (paramsStoryId) => {
  // 		if (paramsStoryId) {	// 이어서 작성할 때
  // 			const fetchData = async () => {
  // 				try{
  // 					storyIdRef.current = paramsStoryId;
  // 					const response = await fetch(`https://kkirikkiri.shop/api/books/${params.story_id}`, {
  // 						method: 'GET',
  // 						headers: {
  // 						'Content-Type': 'application/json',
  // 						},
  // 					});
  // 					setstoryId(paramsStoryId);
  // 					// storyIdRef.current = params.story_id;
  // 					const data = await response.json();
  // 					// console.log(data.contents.length)
  // 					setql(5 - parseInt(data.contents.length / 2));
  // 					// quillNum.current = 5 - parseInt(data.contents.length / 2);
  // 					// console.log("작성가능횟수",quillNum.current);
  // 					// console.log(data.contents);
  // 									setMessages(data.contents.map((msg) => {return {
  // 										"storyId": msg.storyId,
  // 										"lineId": msg.lineId,
  // 										"koreanSentence": msg.koreanSentence,
  // 										"translatedsentence": msg.translatedSentence,
  // 					 }}))
  // 				} catch (error) {
  // 					console.log('데이터로드실패', error);
  // 				}
  // 			};
  // 			fetchData();
  // 			console.log("이어 작성하기.");
  // 		} else {	// 처음 작성할 때
  // 			// console.log("아마여기서문제가발생할것")
  // 			const fetchStoryData = async () => {
  // 				try{
  // 					const response = await fetch(`https://kkirikkiri.shop/api/books`, {
  // 						method: "POST",
  // 						headers: {
  // 							"Content-Type": "application/json",
  // 							},
  // 						body: JSON.stringify(
  // 							{
  // 							"loginId": userInfo.loginId,
  // 							"title": "",
  // 							"openState": "PUBLIC",
  // 							"summary": ""
  // 							}
  // 						)
  // 					})
  // 					const localStoryId = await response.json()
  // 					console.log("로컬스토리ID:", localStoryId)
  // 					storyIdRef.current = localStoryId
  // 					// setstoryId(localStoryId)
  // 					console.log("바뀐값", localStoryId)
  // 					// storyIdRef.current = localStoryId
  // 				} catch (error) {
  // 			console.error('에러발생', error);
  // 			}
  // 		}
  // 		fetchStoryData();
  // 		}
  // 	}
  // 	if (quillNum.current === 5 ) {
  // 		const promiseStoryId = await getStoryId(parseInt(params.story_id))
  // 		// console.log("858", promiseStoryId)
  // 		// promiseStoryId.then(()=> writeStory())
  // 		await writeStory();
  // 	} else {
  // 		await writeStory();
  // 	}
  // }

  const [inputUser, setInputUser] = useState("");
  const [inputLength, setInputLength] = useState(0);
  const userInputRef = useRef();
  const buttonRef = useRef(false);
  const [isWitten, setIsWritten] = useState(false);
  useEffect(() => {
    scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    userInputRef.current.focus();
  }, [messages]);
  // useEffect(() => {setConvUser([...convUser,{role: "user", content: input}])}, [inputUser]);
  // useEffect(() => console.log("정열맨"), [inputUser]);
  const CheckLength = (e) => {
    if (inputLength >= 100) {
      e.target.value = e.target.value.slice(0, 100);
      setInputUser(e.target.value);
      setInputLength(e.target.value.length);
      return;
    }
    setInputUser(e.target.value);
    setInputLength(e.target.value.length);
  };
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (userInputRef.current.value.length) {
        beforeWriteStory();
      } else {
        setTestModal2(() => true);
        // console.log("입력의 길이:",userInputRef.current.value.length)
      }
    }
  };
  const handleOnKeyDown2 = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // console.log("대퍼팀파이팅")
      await finale();
      // navigate(`/bookshelf`)
    }
  };
  const finale = async () => {
    const finale2 = async () => {
      const xxx = await summaryStory(messages);
      // console.log("xxx", xxx);
      // console.log("새제목:",storyTitleRef.current.value);
      // console.log("아이디:", storyIdRef.current);
      const titleSummary = async () => {
        try {
          const openStateValue = isPrivate ? "PRIVATE" : isPublic ? "PUBLIC" : "PRIVATE";
          const response = await fetch(`https://kkirikkiri.shop/api/books/${storyIdRef.current}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: storyTitleRef.current.value,
              // "summary": xxx + "..."
              summary: xxx,
              openState: openStateValue,
            }),
          });
        } catch (error) {
          console.log("에러발생", error);
        }
      };
      await titleSummary();
    };
    await finale2();

    const makeLearnedData = async () => {
      const makeLearnedData1 = async () => {
        try {
          const response = await fetch(`https://kkirikkiri.shop/api/learn`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              storyId: storyIdRef.current,
              memberId: userInfo.id,
            }),
          });
        } catch (error) {
          console.log("에러발생", error);
        }
      };
      await makeLearnedData1();
    };
    await makeLearnedData();

    navigate(`/bookshelf`);
  };

  // const sendStory = () => {
  // 	// const fs = require('fs');
  // 	// fs.writeFile('story.json', JSON.stringify(messages), (err) => {
  // 	// 	if (err) {
  // 	// 		console.log(err);
  // 	// 	}

  // 	// });
  // 	console.log(JSON.stringify(messages));
  // }
  // const {isModalOpen, setIsModalOpen} = useState(true);

  // const openModal = () => {
  // 	setIsModalOpen(true);
  // };
  // const closeModal = () => {
  // 	setIsModalOpen(false);
  // };
  const [testModal, setTestModal] = useState(false);
  const [testModal2, setTestModal2] = useState(false);
  const storyTitleRef = useRef();
  const [isPrivate, setIsPrivate] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  // useEffect(() => {storyTitleRef.current.focus()}, [storyTitleRef.current.value]);

  const handlePublicChange = () => {
    setIsPublic(!isPublic);
    setIsPrivate(false);
  };

  const handlePrivateChange = () => {
    setIsPrivate(!isPrivate);
    setIsPublic(false);
  };

  return (
    <Background backgroundimage={background}>
      {isLoading && <LoadingModal isOpen={isLoading} />}
      <StoryContainer>
        <StoryTitlebox>
          <StoryTitleText>{userInfo.nickname} & 끼리코가 만드는 이야기</StoryTitleText>
        </StoryTitlebox>
        <StoryScrollbox ref={scrollBoxRef}>
          {messages.map((message, index) => {
            return (
              <Sentence key={index}>
                <WriterDiv>
                  {/* <WriterName>{message.lineId}</WriterName> */}
                  <WriterName>{message.lineId % 2 ? userInfo.nickname : gptName}</WriterName>
                  <WriterImg src={message.lineId % 2 ? userInfo.thumbnail : gptimg}></WriterImg>
                  {/* <WriterImg src={(message.lineId % 2) ?  userimg : gptimg}></WriterImg> */}
                </WriterDiv>
                <WriterText>{message.koreanSentence}</WriterText>
                {/* <WriterText>{message.koreanSentence}{message.translatedSentence}{message.imageDescription}</WriterText> */}
                {/* <WriterText></WriterText> */}
                {/* <WriterText>{message}</WriterText> */}
              </Sentence>
            );
          })}
        </StoryScrollbox>
        <StoryInputBox>
          <StoryInput>
            {/* <Sentence2 className={`${ userInputRef.current.disabled ? "writingstyle":""}`}> */}
            {/* <Sentence2 className={`${ isWriting.current ? "writingstyle":"", quillNum.current?"":"stopwrite" }`}> */}
            <Sentence2
              className={`${isWriting.current ? "writingstyle" : ""} ${
                quillNum.current > 0 && ql > 0 ? "" : "stopwrite"
              }`}
            >
              <UserInput
                className={`${quillNum.current > 0 && ql > 0 ? "" : "stopwrite"}`}
                onChange={CheckLength}
                ref={userInputRef}
                onKeyDown={handleOnKeyDown}
              ></UserInput>
            </Sentence2>
            {/* <Capa style={{color: inputLength > 100 ? "red" : "black"}} ref={capaRef}>{inputLength}</Capa> */}
            <Capa>{inputLength}</Capa>
          </StoryInput>
          <MiniBox>
            <Quill>
              <QuillImg src={quill}></QuillImg>
              {/* <QuillNum>{quillNum.current}</QuillNum> */}
              <QuillNum>{ql}</QuillNum>
            </Quill>
            {/* <WriteBtn onClick={writeStory} ref={buttonRef} className={`${ isWriting.current ? "writingstyle":""}`}>작성</WriteBtn> */}
            <WriteBtn
              className={`${
                (isWriting.current ? "writingstyle" : "",
                quillNum.current > 0 && ql > 0 ? "" : "stopwrite")
              }`}
              ref={buttonRef}
              onClick={() => {
                userInputRef.current.value.length ? beforeWriteStory() : setTestModal2(() => true);
              }}
            >
              작성
            </WriteBtn>
          </MiniBox>
          {/* <ModalCloseButton onClick={() => setTestModal(true)}>모달열기</ModalCloseButton> */}
        </StoryInputBox>
      </StoryContainer>
      {/* <StoryNameModal isOpen={testModal} onClose={(e) => {setTestModal(false); e.stopPropagation()}}> */}
      <StoryNameModal
        isOpen={testModal}
        onClose={(e) => {
          setTestModal(false);
          e.stopPropagation();
        }}
      >
        {/* <StoryNameModal isOpen={testModal} onClose={() => setTestModal(false)}> */}
        <ModalTitle>동화의 제목을 지어줄래??</ModalTitle>
        {/* <div src={{closeBtn}} style={{height: '4rem', width: "4rem", backgroundColor: "blue"}} ></div> */}
        {/* <CloseBtn src={closeBtn} onClick={()=>{console.log("모달끈다"); setTestModal(false)}}></CloseBtn> */}
        <CloseBtn
          src={closeBtn}
          onClick={() => {
            setTestModal(false);
          }}
        ></CloseBtn>
        <ModalTextBox>
          <StoryTitle ref={storyTitleRef} onKeyDown={handleOnKeyDown2} maxLength="15" />
        </ModalTextBox>
        <StateBox>
          <OptionContainer>
            <CheckboxContainer>
              <Checkbox checked={isPublic} onChange={handlePublicChange} />
              <Checkmark />
              <LabelText>공개</LabelText>
            </CheckboxContainer>
          </OptionContainer>
          <OptionContainer>
            <CheckboxContainer>
              <Checkbox checked={isPrivate} onChange={handlePrivateChange} />
              <Checkmark />
              <LabelText>비공개</LabelText>
            </CheckboxContainer>
          </OptionContainer>
        </StateBox>
        {/* <ModalCloseButton onClick={() => setTestModal(false)}>작성</ModalCloseButton> */}
        {/* <ModalCloseButton onClick={(e) => {console.log("사용자정보:",userInfo); e.stopPropagation()}}>작성</ModalCloseButton> */}
        <ModalCloseButton
          onClick={(e) => {
            finale();
            {
              e.stopPropagation();
            }
          }}
        >
          완료
        </ModalCloseButton>
      </StoryNameModal>
      <StoryNameModal
        isOpen={testModal2}
        onClose={(e) => {
          setTestModal(false);
          e.stopPropagation();
        }}
      >
        <ModalTitle>끼리코는 너의 이야기를 듣고싶어..</ModalTitle>
        {/* <div src={{closeBtn}} style={{height: '4rem', width: "4rem", backgroundColor: "blue"}} ></div> */}
        {/* <CloseBtn src={closeBtn} onClick={()=>{console.log("모달끈다"); setTestModal(false)}}></CloseBtn> */}
        <CloseBtn
          src={closeBtn}
          onClick={() => {
            setTestModal2(false);
          }}
        ></CloseBtn>
        <img src={gptimg} style={{ width: "10rem", height: "10rem" }}></img>
      </StoryNameModal>
      {/* <SendBtn className={`${ quillNum.current?"":"writingstyle"}`} onClick={sendStory}>{quillNum.current?"이야기 계속하기":"이야기 작성하기"}</SendBtn> */}
      <SendBtn
        className={`${quillNum.current > 0 && ql > 0 ? "" : "writingstyle"}`}
        onClick={() => setTestModal(true)}
      >
        {quillNum.current > 0 && ql > 0 ? "이야기 계속하기" : "책으로 만들기"}
      </SendBtn>
    </Background>
  );
};

export default StoryPage;
