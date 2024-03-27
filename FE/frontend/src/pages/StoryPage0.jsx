import OpenAI from 'openai';
import styled from 'styled-components';
import Background from '../components/common/Background';
import Sentence from '../components/story/Sentence';
import background from '../assets/story/backimgstory.png';
import quill from '../assets/story/quill.png';
import { useState, useRef } from 'react';
import  dummyjson  from '../pages/storydummy.json';
// const messagesdummy = [
//   "어느 날 덕수는 친구와 구슬놀이를 하고 있었습니다.",
//   "그때 갑자기 하늘에서 반짝이는 별이 떨어졌어요.",
//   "별에서 나타난 것은 오징어외계인 오돌이 였습니다. 덕수와 구슬놀이를 하기 위해 머나먼 곳에서 찾아온 것이었지요.",
//   "오돌이는 귀여운 모습으로 덕수를 놀라게 했어요.",
//   "새로운 친구라면 언제나 환영이야\" 반갑게 오돌이를 맞이하는 덕수는 함께놀던 친구 호철이와 셋이서 슈퍼 구슬치기를 하기로 했습니다."
// ];


const StoryContainer = styled.div`
	max-width: 125rem;
	width: 78.125%;
	height: 75rem;
	position: absolute;
	top: 14rem;
	/* left: 17.5rem; */
	border-radius: 3.75rem;
	background-color: #745E5EE5;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0rem 2rem;
	box-sizing: border-box;
`


const StoryTitlebox = styled.div`
 max-height: 14rem;
 height: 75%;
 width: 100%;
 /* background-color: red; */
 display: flex;
 justify-content: center;
`

const StoryTitleText = styled.div`
	/* position: absolute; */
	/* height: 14rem */
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	/* height	: 10%; */
	font-weight: 300;
	font-size: 4rem;
	font-family: "Ttangsbudaejjigae OTF";
	color: #000;
	line-height: normal;
`




const StoryScrollbox = styled.div`
	font-size: 6rem;
	width: 100%;
	height: 43.75rem;
	background-color: pink;
	position: relative;
	/* top: 11.56rem;
	left: 3.13rem; */
	border-radius: 2rem;
	background: #3A2E2E;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 1.5rem;




	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 6rem;
		background-color: #3A2E2E;
		margin: 1rem;
		border-radius: 2rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #FFF7E7;
		border-radius: 3rem;
		background-clip: padding-box;
		border: 1.5rem solid transparent;
		/* border: 1rem solid transparent; */
	}
	/* &::-webkit-sccollbar-track {} */
	`

	/* flex-shrink: 0; */


const StoryInputBox = styled.div`
	width: 100%;
	height: 15rem;
	/* background-color: red; */
	display: flex;
	margin-top: 1rem;
	/* flex-direction: row-reverse; */
`

const Sentence2 = styled(Sentence)`
	min-height: 100%;
	margin: 0;
	padding-bottom: 0;
`
const UserInput = styled.textarea`
	width: 100%;
	Height: 10rem;
	background-color: transparent;
	overflow: visible;
	font-size: 2.5rem;
	font-family: "Ttangsbudaejjigae OTF";
	font-weight: 300;
	border: none;
	&:focus {
		outline: none;
		/* background-color: pink; */
	}
`
const TextInput = styled.div`
width: 104rem;
height: 100%;
/* background-color: yellow; */
margin-right: 0;
position: relative;
`

const Capa = styled.div`
position: absolute;
/* background-color: aqua; */
height: 4rem;
width: 12rem;
right: 0;
bottom: 0;

font-size: 2rem;
font-family: "Ttangsbudaejjigae OTF";
font-weight: 300;
&::after {
	content: "/ 100";

}
`
const MiniBox = styled.div`
width: 12rem;
height: 100%;
/* background-color: blue; */
margin-left: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Quill = styled.div`
height: 30%;
/* width: 50%; */
margin-top:1rem;
/* background-color: green; */
display: flex;
flex-direction: row;
font-size: 2.5rem;
font-family: "Ttangsbudaejjigae OTF";
font-weight: 300;
padding-left: 1rem;
/* &::before {
	content: "x ";
} */
`
const QuillImg = styled.img`
/* background-color: pink; */
`
const QuillNum = styled.div`
/* margin-left: auto; */
/* width: 50%; */
/* background-color: lavender; */
/* top: 50%; */
padding-top: 10px;
&::before {
	content: "× ";

}`

const WriteBtn = styled.div`
height: 50%;
width: 100%;
margin-bottom: 1rem;
/* background-color: magenta; */
border-radius: 1.875rem;
background: #29C325;
box-shadow: 0px 0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25);

color: #000;

text-align: center;
/* display: inline-block; */
/* vertical-align: baseline; */
/* padding-top */
/* height: 120px; */
line-height: 9rem;
font-family: "Ttangsbudaejjigae OTF";
font-size: 4rem;
font-style: normal;
font-weight: 300;
/* line-height: normal; */
&:active {
	box-shadow: none;
	filter: brightness(0.8);
}
`

const SendBtn = styled.div``

// const Sentences = messagesdummy.map((message) => {
// 	return (
// 		// eslint-disable-next-line react/jsx-key
// 		<Sentence>{message}</Sentence>
// 	)
// })


const StoryPage0 = () => {
	const [writer, setWriter]	= useState("짱짱맨");
	const openaiUser = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
	const openaiGPT = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
	const [conversationUser, setConversationUser]	= useState([
		{
			"role": "system",
    //   "content": "Please echo message and translate it. Additionally, please write an image description to be used for image generation AI in English with a length of approximately 100 bytes each."
			"content": "주어진 문장에 대한 다음 규칙을 만족하는 문자열을 반환해줘. koreanSentence는 입력된 한국어 문장, \
	  			translatedSentense는 koreanSentence를 영어로 번역한 문장, \
				imageDescription은 translatedSentense를 영어로 서술한 거야."
		},
		{
			"role": "system",
      "content": 'The output format is koreanSentence=; translatedSentense=; imageDescription=;'
		},
		// {
		// 	"role": "system",
		// 	"content": "for example, when messagge is \"강아지 모모는 낮잠을 자고 있었습니다.\", your output is koreanSentence=강아지 모모는 낮잠을 자고 있었습니다.; translatedSentense=The puppy Momo was taking a nap.; imageDescription=A cute puppy named Momo is sleeping in a cozy bed.;"
		// }
	]);

	const [conversationGPT, setConversationGPT]	= useState([
		{
			"role": "system",
			"content": "user is 10 years old children."
		},
		{
			"role": "system",
			// "content": "You are a creative taleteller who kind and appropriate for children. when you heard a sentence of tale, respond with the next sentence of the tale."
			"content": "You are a creative taleteller who kind and appropriate for children. when you received a message, respond with the next sentence of the tale."
		},
		{
			"role": "system",
			"content": "addtionally, translate it and write an image description to be used for image generation AI in English with a length of approximately 100 bytes. each"
		},
		{
		"role": "system",
		// "content": 'The output format is korGPT=; engGPT=; descGPT=;'
		"content": 'The output format is koreanSentence=; translatedSentense=; imageDescription=;'
		},
		// {
		// 	"role": "system",
		// 	"content": "for example, when messagge is \"강아지 모모는 낮잠을 자고 있었습니다.\", your output is koreanSentence=그런데 어떤 달콤한 냄새에 모모는 잠에서 깨고 말았어요.; translatedSentense=But Momo woke up from sleep because of a sweet smell.; imageDescription=A puppy awakened by a sweel smell;"
		// }
	]);
	const {storyId, setStoryId} = useState(1);
	const {lineId, setLineId} = useState(1);
	// let lineId = 1;
	const writeStory = async (message) => {
	// const writeStory = (message) => {
		console.log("들어온 문장: ",message)
		setConversationUser([...conversationUser, {"role": "user", "content": message}]);
		setConversationGPT([...conversationGPT, {"role": "user", "content": message}]);

		// const completionUser = openaiUser.chat.completions.create({
		const completionUser = await openaiUser.chat.completions.create({
			messages: conversationUser,
			model: "gpt-3.5-turbo",
			// max_tokens: 50,
			temperature: 0.7
		});
		// const completionGPT = openaiGPT.chat.completions.create({
		const completionGPT = await openaiGPT.chat.completions.create({
			messages: conversationGPT,
			model: "gpt-3.5-turbo",
			// max_tokens: 50,
			temperature: 0.7
		});

		const responseUser = completionUser.choices[0].message;
		console.log("사용자대답",responseUser.content)
		console.log(storyId)
		setConversationUser([...conversationUser, {"role": "assistant", "content": responseUser.content}]);
		console.log(conversationUser)
		const responseGPT = completionGPT.choices[0].message;
		console.log("GPT대답",responseGPT.content)
		console.log(storyId)
		setConversationGPT([...conversationGPT, {"role": "assistant", "content": responseGPT.content}]);
		console.log(conversationGPT)

		const arrayUser = responseUser.content.split(";").reduce((result, pair) => {
			const [key, value] = pair.split('=');
			result[key] = value;
      return result;
			}, {"storyId": storyId, "lineId": 1
		});

		const arrayGPT = responseGPT.content.split(";").reduce((result, pair) => {
			const [key, value] = pair.split('=');
      result[key] = value;
      return result;
			}, {"storyId": storyId, "lineId": 99
		});
		console.log(arrayUser);
		console.log(arrayGPT);
	}





  const [quillNum, setQuillNum] = useState(10);
	const [messages, setMessages] = useState([]);

  const WriteSentence = () => {
		console.log(inputMessage)
		writeStory(inputMessage);
		setMessages([...messages, inputMessage]);
		inputX.current.value = "";
		setInputLength(0);
		inputX.current.focus();
		setInputMessage("");
		if (quillNum > 0) {
			setQuillNum(quillNum - 1);
		}
		else {
			console.log("우리의 이야기는 여기까지.");
		}
	}

	const [inputMessage, setInputMessage] = useState("");
	const [inputLength, setInputLength] = useState(0);
	const inputX = useRef();
	const buttonRef = useRef();

	const CheckLength = (e) => {
		if (inputLength > 100) {
			e.target.value = e.target.value.slice(0, 100);
			setInputMessage(e.target.value)
			setInputLength(e.target.value.length);
			return;
		}
		setInputMessage(e.target.value)
		setInputLength(e.target.value.length);
	}
	const handleOnKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			WriteSentence();
		}
	}

  return (
		<Background backgroundimage={background}>
			<StoryContainer>
				<StoryTitlebox>
					<StoryTitleText>짱짱맨과 끼리코가 만드는 이야기</StoryTitleText>
				</StoryTitlebox>	
				<StoryScrollbox>
					{messages.map((message,index) => {
						return (
							<Sentence key={index}>
								{message}
							</Sentence>
						)
					})}
				</StoryScrollbox>
				<StoryInputBox>
					<TextInput>
						<Sentence2>
							<UserInput onChange={CheckLength} ref={inputX} onKeyDown={handleOnKeyDown}></UserInput>
						</Sentence2>
						{/* <Capa style={{color: inputLength > 100 ? "red" : "black"}} ref={capaRef}>{inputLength}</Capa> */}
						<Capa>{inputLength}</Capa>
					</TextInput>
					<MiniBox>
						<Quill>
							<QuillImg src={quill}></QuillImg>
							<QuillNum>{quillNum}</QuillNum>
						</Quill>
						<WriteBtn onClick={WriteSentence} ref={buttonRef}>작성</WriteBtn>
					</MiniBox>
				</StoryInputBox>
			</StoryContainer>
			<SendBtn></SendBtn>
		</Background>
  );
};

export default StoryPage0;