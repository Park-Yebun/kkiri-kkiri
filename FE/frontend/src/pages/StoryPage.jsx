import OpenAI from 'openai';
import styled from 'styled-components';
import Background from '../components/common/Background';
import Sentence from '../components/story/Sentence';
import background from '../assets/story/backimgstory.png';
import quill from '../assets/story/quill.png';
import { useState, useRef, useEffect } from 'react';
import  dummyjson  from '../pages/storydummy.json';
import gptimg from '../assets/main/simplebookshelf.png';
import userimg from '../assets/user/profile_dog.png';

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
	padding: 1.5rem;
	min-height: 90%;
	width: 95%;
	margin: 0;
	padding-bottom: 0;
	&.writingstyle {
		/* background-color: red; */
		/* pointer-events: none; */
		filter: brightness(0.8);
	}

	&.stopwrite {
		/* /* pointer-events: none; */
		filter: brightness(0.8); */
	}
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
text-align: right;
height: 3rem;
width: 9rem;
right: 4rem;
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
&.writingstyle {
	/* box-shadow: none; */
	filter: brightness(0.8);
	/* background-color: red; */
}
&.stopwrite {
	pointer-events: none;
	filter: brightness(0.5);

}
`

const SendBtn = styled.div`
	position: absolute;
	top: 90%;
	margin-top: 0.5rem;
	width: 20rem;
	height: 4rem;
	border-radius: 1rem;
	/* background-color: grey; */
	text-align: center;
	line-height: 4rem;
	background-color: #29C325;
	font-family: "Ttangsbudaejjigae OTF";
	font-size: 2rem;
	font-style: normal;
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
`

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
`
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
`

const WriterImg = styled.img`
	margin-top: 0.5rem;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background-color: white;
	/* border: 1px solid grey; */
`

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
`
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }



let convUser = [
	{
		"role": "system",
		"content": "나는 10살 한국 아이로, 동화를 좋아해. 그리고 너는 아이들을 좋아하고 동화를 만드는 창의적이고 동화작가야"
	},
	{
		"role": "system",
		"content": "너의 100글자를 넘지 않도록 한국어로 대답해야 해."
	},
	{
		"role": "system",
		"content": "지금부터 나와 함께 동화를 만들어보자.내가 먼저 한 문장 길이의 동화를 입력하면, 너는 그 동화를 이어서 대답하는거야."
	},
	];


const StoryPage = () => {
	// console.log("찰초공")
	const [userName, setUserName]	= useState("짱짱맨");
	const [gptName, setGptName]	= useState("끼리코");

	const openaiUser = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
	const isWriting = useRef(false);
	const scrollBoxRef = useRef();
	const [messages, setMessages] = useState([
		
	]);
	// const {conv, setConv} = setState([]);
	const translateChat = async (input) => {
		const translation = await openaiUser.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "Translate the following input into English"
				},
				{
					role: "user",	
					content: input
				},
			],
			model: "gpt-3.5-turbo",
			// max_tokens: 200,
			temperature: 0.7
		});
		return translation.choices[0].message.content;
	};
	const descriptChat = async (input) => {
		const description = await openaiUser.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "Write an image description to be used for image generation AI based on the following input."
				},
				{
					role: "system",
					content: "your image description should be 100 characters or less in English. also, write the image description one sentence of noun form"
				},
				{
					role: "user",	
					content: input
				},
			],
			model: "gpt-3.5-turbo",
			max_tokens: 25,
			temperature: 0.7
		});
		return "lvngvncnt, " + description.choices[0].message.content;
	}


	const chatWithGpt = async (input) => {
		convUser.push({role: "user", content: input})
		// console.log(quillNum)
		// if (quillNum === 0) { 
		if (quillNum.current === 0) { 
			convUser = [{role: "assistant", content: "이 동화를 100글자 이내로 마무리 해줘 "}, ... convUser]
		}
		// let xxxx = [1234]
		// console.log(xxxx)
		// sleep(50);
		// setConv(xxxx);
		const completionUser = await openaiUser.chat.completions.create({
			messages: convUser,
			model: "gpt-3.5-turbo",
			max_tokens: 150,
			temperature: 0.7
		});
		const responseUser = completionUser.choices[0].message.content;
		// const translated= await translateChat(responseUser);
		convUser.push({role: "assistant", content: responseUser})
		
		return responseUser;
		}
		// console.log("대화록:", input);}

		
//   const [quillNum, setQuillNum] = useState(5);
  const quillNum = useRef(5);

	const writeGptStory = async (input) => {
		console.log("배고파")
		const gptResponse = await chatWithGpt(input);
		console.log("gpt의 대답:", gptResponse)
		const translatedSentence = await translateChat(gptResponse);
		const imageDescription = await descriptChat(gptResponse);
		// await sleep(5000);
		
		setMessages(messages => [...messages, 
									{ 
									"writer": "끼리코", 
									// "koreanSentence": gptResponse, 
									"koreanSentence": gptResponse, 
									"translatedSentence": translatedSentence,
									"imageDescription": imageDescription
									}
								]
					);
		console.log("메세지: ", messages);	
	userInputRef.current.focus();
	// scrollBoxRef.current.scrollTop = await scrollBoxRef.current.scrollHeight;
	
	// console.log(scrollBoxRef.current.scrollHeight);
	}
	

  const writeStory = async () => {
		// console.log("버튼레퍼런스:", isWriting)
		if (!isWriting.current && quillNum.current) {
		userInputRef.current.disabled = true;
		isWriting.current = true;
		buttonRef.current = true;

		console.log("입력메세지: ", inputUser)
		const translatedSentence = await translateChat(inputUser);
		const imageDescription = await descriptChat(inputUser);
		console.log(translatedSentence)
		setMessages(messages => [...messages, 
									{ 
									"writer": userName, 
									"koreanSentence": inputUser, 
									"translatedSentence":translatedSentence,
									"imageDescription": imageDescription
									}
								]
					);
		// console.log("메세지: ", messages);
		userInputRef.current.value = "";
		setInputLength(0);
		userInputRef.current.focus();
		setInputUser("");
		// if (quillNum > 0) {
		if (quillNum.current > 0) {
			// setQuillNum(quillNum - 1);
			quillNum.current--;
			console.log("현재 퀼넘:", quillNum.current);
		}
		else {
			console.log(messages);
		}

		await writeGptStory(inputUser);
		userInputRef.current.disabled = false;
		isWriting.current = false;
		buttonRef.current = false;}
		
		
	}

	

	const [inputUser, setInputUser] = useState("");
	const [inputLength, setInputLength] = useState(0);
	const userInputRef = useRef();
	const buttonRef = useRef(false);
	useEffect(() => {scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
					userInputRef.current.focus();}, [messages]);
	// useEffect(() => {setConvUser([...convUser,{role: "user", content: input}])}, [inputUser]);
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
				<StoryScrollbox ref={scrollBoxRef}>
					{messages.map((message,index) => {
						return (
							<Sentence key={index}>
								<WriterDiv>
									<WriterName>{message.writer}</WriterName>
									<WriterImg src={message.writer === userName ?  userimg: gptimg}></WriterImg>
								</WriterDiv>
								<WriterText>{message.koreanSentence}</WriterText>
								{/* <WriterText>{message.koreanSentence}{message.translatedSentence}{message.imageDescription}</WriterText> */}
								{/* <WriterText>{message.KoreanSentence}</WriterText> */}
								{/* <WriterText></WriterText> */}
								{/* <WriterText>{message}</WriterText> */}
								
							</Sentence>
						)
					})}
				</StoryScrollbox>
				<StoryInputBox>
					<StoryInput>
						{/* <Sentence2 className={`${ userInputRef.current.disabled ? "writingstyle":""}`}> */}
						<Sentence2 className={`${ isWriting.current ? "writingstyle":"", quillNum.current?"":"stopwrite" }`}>
							<UserInput onChange={CheckLength} ref={userInputRef} onKeyDown={handleOnKeyDown}></UserInput>
						</Sentence2>
						{/* <Capa style={{color: inputLength > 100 ? "red" : "black"}} ref={capaRef}>{inputLength}</Capa> */}
						<Capa>{inputLength}</Capa>
					</StoryInput>
					<MiniBox>
						<Quill>
							<QuillImg src={quill}></QuillImg>
							<QuillNum>{quillNum.current}</QuillNum>
						</Quill>
						{/* <WriteBtn onClick={writeStory} ref={buttonRef} className={`${ isWriting.current ? "writingstyle":""}`}>작성</WriteBtn> */}
						<WriteBtn className={`${ isWriting.current? "writingstyle":"", quillNum.current?"":"stopwrite"}`} ref={buttonRef} onClick={writeStory}>작성</WriteBtn>
					</MiniBox>
				</StoryInputBox>
			</StoryContainer>
			{/* <SendBtn className={`${ quillNum.current?"":"writingstyle"}`} onClick={console.log(messages)}>{quillNum.current?"이야기 계속하기":"이야기 작성하기"}</SendBtn> */}
			<SendBtn className={`${ quillNum.current?"":"writingstyle"}`}>{quillNum.current?"이야기 계속하기":"이야기 작성하기"}</SendBtn>
		</Background>
  );
};

export default StoryPage;