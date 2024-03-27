import OpenAI from 'openai';
import styled from 'styled-components';
import Background from '../components/common/Background';
import Sentence from '../components/story/Sentence';
import background from '../assets/story/backimgstory.png';
import quill from '../assets/story/quill.png';
import { useState, useRef, useEffect } from 'react';
import  dummyjson  from '../pages/storydummy.json';


const StoryContainer = styled.div`
	max-width: 125rem;
	width: 80%;
	height: 75%;
	position: absolute;
	top: 15%;
	/* left: 17.5rem; */
	/* border-radius: 3.75rem; */
	border-radius: 2rem;
	background-color: #745E5EE5;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0rem 2rem;
	box-sizing: border-box;
`


const StoryTitlebox = styled.div`
 max-height: 4rem;
 height: 75%;
 width: 100%;
 /* background-color: red; */
 display: flex;
 /* justify-content: center; */
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
	font-size: 2rem;
	font-family: "Ttangsbudaejjigae OTF";
	color: #000;
	line-height: normal;
`




const StoryScrollbox = styled.div`
	font-size: 6rem;
	width: 100%;
	/* height: 43.75rem; */
	height: 70%;
	background-color: pink;
	position: relative;
	/* top: 11.56rem;
	left: 3.13rem; */
	border-radius: 1.5rem;
	background: #3A2E2E;
	/* display: flex; */
	flex-direction: column;
	align-items: center;
	padding-left: 1rem;




	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 3rem;
		/* background-color: red; */
		/* background-color: #3A2E2E; */
		/* margin: 1rem; */
		border-radius: 2rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #FFF7E7;
		border-radius: 1.5rem;
		background-clip: padding-box;
		border: 0.5rem solid transparent;
		/* border: 1rem solid transparent; */
	}
	/* &::-webkit-sccollbar-track {} */
	`

	/* flex-shrink: 0; */


const StoryInputBox = styled.div`
	width: 100%;
	/* height: 15rem; */
	height: 25%;
	/* background-color: red; */
	display: flex;
	margin-top: 1rem;
	/* flex-direction: row-reverse; */
`

const Sentence2 = styled(Sentence)`
	min-height: 90%;
	width: 95%;
	margin: 0;
	padding-bottom: 0;
`
const UserInput = styled.textarea`
	width: 100%;
	/* Height: 10rem; */
	/* Height: 10rem; */
	background-color: transparent;
	overflow: visible;
	font-size: 1.5rem;
	font-family: "Ttangsbudaejjigae OTF";
	font-weight: 300;
	border: none;
	&:focus {
		outline: none;
		/* background-color: pink; */
	}
	&:disabled {
		filter: brightness(0.8);
	}
`
const StoryInput = styled.div`
width: 104rem;
height: 100%;
/* background-color: yellow; */
margin-right: 0;
position: relative;
`

const Capa = styled.div`
position: absolute;
/* background-color: aqua; */
height: 3rem;
width: 9rem;
right: 0;
bottom: 0;

font-size: 1.5rem;
font-family: "Ttangsbudaejjigae OTF";
font-weight: 300;
&::after {
	content: "/100";

}
`
const MiniBox = styled.div`
width: 8rem;
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
/* margin-top:1rem; */
/* background-color: green; */
display: flex;
flex-direction: row;
font-size: 2.5rem;
font-family: "Ttangsbudaejjigae OTF";
font-weight: 300;
/* padding-right: 1rem; */
padding-left: 0.5rem;
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
border-radius: 1rem;
background: #29C325;
box-shadow: 0px 0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25);

color: #000;

text-align: center;
/* display: inline-block; */
/* vertical-align: baseline; */
/* padding-top */
/* height: 120px; */
line-height: 6rem;
font-family: "Ttangsbudaejjigae OTF";
font-size: 2.5rem;
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let convUser = [
	{
		"role": "system",
		"content": "나는 10살 한국 아이로, 동화를 좋아해."
	},
	{
		"role": "system",
		"content": "너는 아이들을 좋아하고 동화를 만드는 창의적이고 동화작가야."
	},
	{
		"role": "system",
		"content": "지금부터 나와 함께 동화를 만들어보자.내가 먼저 한 문장 길이의 동화를 입력하면, 너는 그 동화를 이어서 대답하는거야."
	},
	{
		"role": "system",
		"content": "함께 만들 동화는 10 번의 정도의 대화를 오가면서 만들어질거야. 내가 끝이라고 말하면, 동화를 마무리 지어줘"
	},
	{
		"role": "system",
		"content": "너의 대답은 100글자를 넘지 않아야 하고, 공손해야 해."
	},
	// {
	// 	"role": "system",
	// 	"content": ""
	// },
	// {
	// 	"role": "system",
	// 	"content": ""
	// },
	// const {convUser, setConvUser} = useState([
		// {
		// 	"role": "system",
		// 	"content": "user is a 10 years old korean child who loves fairy tales."
		// },
		// {
		// 	"role": "system",
		// 	"content": "you are a fairy tale writer who loves children and makes fairy tales with user."
		// },
		// {
		// 	"role": "system",
		// 	"content": "당신은 창의적인 동화작가입니다."
		// },
		// {
		// 	"role": "system",
		// 	"content": "user의 한 문장의 동화를 듣고, 그에 대한 이야기를 100byte를 넘지 않는 분량으로 만들어주세요."
		// },
		// {
		// 	"role": "system",
		// 	"content": "user는 영어를 잘 못하므로, user와 대화할 때는 한국어로 대화해야 합니다."
		// },
		// // {
		// // 	"role": "system",
		// // 	"content": "당신의 대답은 100 글자를 넘지 않아야 합니다."
		// // },
		// {
		// 	"role": "system",
		// 	// "content": 'The output format is korGPT=; engGPT=; descGPT=;'
		// 	"content": '당신은 이런 형식으로 답합니다. koreanSentence=; translatedSentense=; imageDescription=;'
		// },
		// {
		// 	"role": "system",
		// 	"content": "예를 들어, user가 \"옛날옛날에 작은 하마는 작은 장난감 기차를 가지고 있었습니다.\" 라고 입력하면, \
		// 	다음과 같은 형식으로 답하십시오. \
		// 	koreanSentence=어느 날, 작은 하마는 작은 장난감 기차를 타고 바다로 놀러가기로 했어요; \
		// 	translatedSentence=One day, the little hippo decided to take a small toy train to the sea for a picnic; \
		// 	imageDescription=The little hippo is riding a small toy train to the sea."
		// }
	// ]);
	];


const StoryPage = () => {
	// console.log("찰초공")
	const [writer, setWriter]	= useState("짱짱맨");
	const openaiUser = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
	
	const [messages, setMessages] = useState([
		
	]);
	// const {conv, setConv} = setState([]);

	const chatWithGpt = async (ii) => {
		convUser.push({role: "user", content: ii})
		console.log(quillNum)
		if (quillNum === 0) { 
			convUser = [{role: "assistant", content: "이 동화를 100글자 이내로 마무리 해줘 "}, ... convUser]
		}
		// let xxxx = [1234]
		// console.log(xxxx)
		sleep(50);
		// setConv(xxxx);
		const completionUser = await openaiUser.chat.completions.create({
			messages: convUser,
			model: "gpt-3.5-turbo",
			// max_tokens: 50,
			temperature: 0.7
		});
		const responseUser = completionUser.choices[0].message.content;
		convUser.push({role: "assistant", content: responseUser})
		return responseUser;
		}
		// console.log("대화록:", ii);}

		
  const [quillNum, setQuillNum] = useState(5);

	const writeGptStory = async () => {
		console.log("배고파")
		const xx = await chatWithGpt(inputUser);
		// await sleep(3000);
	setMessages(messages => [...messages, xx]);
	}
	

  const writeStory = () => {
		inputX.current.disabled = true;
		console.log("입력메세지: ", inputUser)
		setMessages(messages => [...messages, inputUser]);
		// useEffect(() => {setMessages([...messages, inputUser])}, [messages]);
		console.log("메세지: ", messages);
		inputX.current.value = "";
		setInputLength(0);
		inputX.current.focus();
		setInputUser("");
		if (quillNum > 0) {
			setQuillNum(quillNum - 1);
		}
		else {
			console.log("우리의 이야기는 여기까지.");
		}

		writeGptStory();
		inputX.current.disabled = false;
	}

	

	const [inputUser, setInputUser] = useState("");
	const [inputLength, setInputLength] = useState(0);
	const inputX = useRef();
	const buttonRef = useRef();
	// useEffect(() => {setConvUser([...convUser,{role: "user", content: ii}])}, [inputUser]);
	// useEffect(() => console.log("정열맨"), [inputUser]);
	const CheckLength = (e) => {
		if (inputLength > 100) {
			e.target.value = e.target.value.slice(0, 100);
			setInputUser(e.target.value)
			setInputLength(e.target.value.length);
			return;
		}
		setInputUser(e.target.value)
		setInputLength(e.target.value.length);
	}
	const handleOnKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			writeStory();
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
					<StoryInput>
						<Sentence2>
							<UserInput onChange={CheckLength} ref={inputX} onKeyDown={handleOnKeyDown}></UserInput>
						</Sentence2>
						{/* <Capa style={{color: inputLength > 100 ? "red" : "black"}} ref={capaRef}>{inputLength}</Capa> */}
						<Capa>{inputLength}</Capa>
					</StoryInput>
					<MiniBox>
						<Quill>
							<QuillImg src={quill}></QuillImg>
							<QuillNum>{quillNum}</QuillNum>
						</Quill>
						<WriteBtn onClick={writeStory} ref={buttonRef}>작성</WriteBtn>
					</MiniBox>
				</StoryInputBox>
			</StoryContainer>
			<SendBtn></SendBtn>
		</Background>
  );
};

export default StoryPage;