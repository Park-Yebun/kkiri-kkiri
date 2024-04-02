import OpenAI from 'openai';
import styled from 'styled-components';
import Background from '../components/common/Background';
import Sentence from '../components/story/Sentence';
import background from '../assets/story/backimgstory.jpg';
import quill from '../assets/story/quill.png';
import { useState, useRef, useEffect } from 'react';
// import  dummyjson  from '../pages/storydummy.json';
import gptimg from '../assets/main/simplebookshelf.png';
// import userimg from '../assets/user/profile_cat.png';
import StoryNameModal from '../components/Modal/StoryNameModal';
import useUserStore from "../components/Counter/UserStore";
import { useParams } from 'react-router-dom';
import { color } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import closeBtn from '../assets/library/clear.png'


const CloseBtn = styled.img`
	position: fixed;
    width : 2.9vw;
    height : 3.9vh;
    /* margin-top : 1vh;
    margin-left : 55vw; */
	top: 0.5rem;
	right: 0.5rem;
`

const StoryContainer = styled.div`
	max-width: 125rem;
	width: 70rem;
	height: 40rem;
	position: absolute;
	top: 7rem;
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
	margin-top: 0.4rem;
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
	padding: 1.5rem 1.1rem 1.1rem 1.1rem;
	height: 9rem;
	width: 55rem;
	margin: 0;
	padding-bottom: 0;
	&.writingstyle {
		/* background-color: red; */
		/* pointer-events: none; */
		filter: brightness(0.8);
	}

	&.stopwrite {
		/* /* pointer-events: none; */
		filter: brightness(0.8);
	}
`
const UserInput = styled.textarea`
	width: 60rem;
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
	&.stopwrite {
	pointer-events: none;
	/* filter: brightness(0.5); */
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

font-size: 1.3rem;
font-family: "Ttangsbudaejjigae OTF";
font-weight: 300;
&::after {
	content: "/100";

}
`
const MiniBox = styled.div`
width: 10rem;
height: 100%;
/* background-color: blue; */
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Quill = styled.div`
height: 10rem;
width: 8rem;
display: flex;
flex-direction: row;
font-size: 2.5rem;
font-weight: 300;
padding-left: 0.5rem;
/* background-color: aqua; */
`
const QuillImg = styled.img`
height: 3.5rem;
/* background-color: pink; */
`
const QuillNum = styled.div`

padding-top: 10px;
&::before {
	content: "× ";

}`

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
background: #29C325;
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
`

const SendBtn = styled.div`
	position: absolute;
	bottom:1.8rem;
	margin-top: 0.5rem;
	width: 20rem;
	height: 4rem;
	border-radius: 1rem;
	/* background-color: grey; */
	text-align: center;
	line-height: 4.4rem;
	background-color: #29C325;
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

const ModalTitle = styled.div`
	/* position: relative; */
	margin-top: 2.5rem;
	margin-bottom: 1rem;
`
const ModalTextBox = styled.div`
	width: 28rem;
	height: 4rem;
	border-radius: 1rem;
	background-color: #F1CDCD;
	display: flex;
	align-items: center;
	justify-content: center;
`
const ModalCloseButton = styled.div`
/* position: absolute; */
	margin-top: 1rem;
	font-size: 1.5rem;
	top:41rem;
	left: 60rem;
	/* margin-top: 1rem; */
	width: 7rem;
	height: 3rem;
	border-radius: 1rem;
	background-color: #8C6D6D;
	box-shadow: 0px 0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25);
	align-items: center;
	justify-content: center;
	display: flex;
&:active {
	box-shadow: none;
	filter: brightness(0.8);
}
`
const StoryTitle = styled.textarea`
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
`

let convUser = [
	{
		"role": "system",
		"content": `나는 한국의 10살 아이로, 동화를 좋아해. 그리고 너는 아이들을 좋아하고 동화를 만드는 창의적이고 동화작가야`
	},
	{
		"role": "system",
		"content": "너는 120글자를 넘지 않도록 한국어로 대답해야 해."
	},
	{
		"role": "system",
		"content": "지금부터 나와 함께 동화를 만들어보자.내가 먼저 한 문장 길이의 동화를 입력하면, 너는 그 동화를 이어서 대답하는거야."
	},
	];


const StoryPage = () => {
	const navigate = useNavigate();
	const storyIdRef = useRef(0);
	const quillNum = useRef(5);
	const [ql, setql] = useState(5);
	const params = useParams();
	console.log(params.story_id);
	const userInfo = useUserStore(state => state.userInfo);
	// const userimg = `../assets/user/${userInfo.profileImage}`; 
	const userimg = `../assets/user/profile_cat.png`; 
	// const userimg = '../jhc.jpg'; 
	const [userName, setUserName]	= useState("짱짱맨");
	const [gptName, setGptName]	= useState("끼리코");
	const [storyId, setstoryId] = useState(13);
	const openaiUser = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
	const isWriting = useRef(false);
	const scrollBoxRef = useRef();
	const [messages, setMessages] = useState([
		
	]);
	useEffect(() => {console.log("유즈이펙트")}, [quillNum.current]);
	useEffect(() => {setstoryId(storyIdRef.current)}, [storyIdRef]);
	useEffect(() => {
		const fetchData = async () => {
			if (parseInt(params.story_id)) {
				try{
					storyIdRef.current = params.story_id;
					const response = await fetch(`https://kkirikkiri.shop/api/books/${params.story_id}`, {
						method: 'GET',
						headers: {
						'Content-Type': 'application/json',
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
									setMessages(data.contents.map((msg) => {return {
										"storyId": msg.storyId,
										"lineId": msg.lineId,
										"koreanSentence": msg.koreanSentence,
										"translatedsentence": msg.translatedSentence,
					 }}))
				} catch (error) {
					console.log('데이터로드실패', error);
				}
			}
		};
		fetchData();
		console.log("이어 작성하기.");
	}, []);

	const translateChat = async (input) => {
		const translation = await openaiUser.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "you have to translate it into a sentence that has a vocabulary level appropriate for my age. Below are examples of English sentences by age.",
				},
				{
					role: "system",
					content: "Concept: 'The cat is hiding because it is scared of the dog.' Age 7: 'The kitty is playing hide and seek because it's afraid of the doggy.' Age 10: 'The cat is hiding because it's scared of the dog.' Age 13: 'The cat has concealed itself due to its fear of the canine.'"
				},
				{
					role: "system",
					content: "Translate the following input into English.",
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
					// content: "your image description should be 100 characters or less in English. also, write the image description one sentence of noun form"
					content: "your image description should be 50 characters or less in English. also, this image description must be simple and easy to understand."
				},
				{
					role: "user",	
					content: input
				},
			],
			model: "gpt-3.5-turbo",
			max_tokens: 50,
			temperature: 0.7
		});
		return "detailed, clear, best quality, " + description.choices[0].message.content;
	}
	const summaryStory = async (story) => {
		const story2 = await story.map(msg=>msg.koreanSentence).join(" ")
		let arrMsg = []
		arrMsg.push({role: "user", content: story2})
		arrMsg = [
			// {
			// 	role: "system",
			// 	content: "나는 10살 한국 아이로, 동화를 좋아해. 그리고 너는 아이들을 좋아하고 동화를 만드는 창의적이고 동화작가야"
			// },
			{
				role: "assistant", 
				content: "동화를 150글자 이내로 짧게 요약해줘"
			}, ... arrMsg]
		// console.log("스토리2:", story2)
		const completionUser = await openaiUser.chat.completions.create({
			messages: arrMsg,
			model: "gpt-3.5-turbo",
			max_tokens: 100,
			temperature: 0.7
		});
		const responseUser = completionUser.choices[0].message.content;
		// console.log("요약된 스토리:", responseUser + "...")
		return responseUser;
		}

	const chatWithGpt = async (input) => {
		convUser.push({role: "user", content: input})
		// console.log(quillNum)
		// if (quillNum === 0) { 
		if (quillNum.current === 0) { 
			convUser = [{role: "assistant", content: "이 동화를 80글자 이내로 마무리 해줘 "}, ... convUser]
		}
		const completionUser = await openaiUser.chat.completions.create({
			messages: convUser,
			model: "gpt-3.5-turbo",
			max_tokens: 120,
			temperature: 0.7
		});
		const responseUser = completionUser.choices[0].message.content;
		convUser.push({role: "assistant", content: responseUser})
		
		return responseUser;
		}
	

	const writeGptStory = async (input) => {
		console.log("배고파")
		const gptResponse = await chatWithGpt(input);
		console.log("gpt의 대답:", gptResponse)
		const translatedSentence = await translateChat(gptResponse);
		const imageDescription = await descriptChat(gptResponse);
		const lineId = (6 - quillNum.current) * 2 - 2;
		// await sleep(5000);
		
		//
		const fetchStoryData = async () => {
			try{
				const response = await fetch(`https://kkirikkiri.shop/api/books/contents`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						[{ 
							// "writer": "끼리코", 
							// "storyId": storyId,
							"storyId": storyIdRef.current,
							"lineId": lineId,
							// "koreanSentence": gptResponse, 
							"koreanSentence": gptResponse, 
							"translatedSentence": translatedSentence,
							"imageDescription": imageDescription
							}]
					)
				});
			} catch (error) {
				console.error('에러발생', error);
			}
		};
		await fetchStoryData();
		const fetchTtsData = async () => {
			try{
				const response = await fetch(`https://kkirikkiri.shop/api/books/contents/voice`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						[{ 
							// "writer": "끼리코", 
							// "storyId": storyId,
							"storyId": storyIdRef.current,
							"lineId": lineId,
							// "koreanSentence": gptResponse, 
							"koreanSentence": gptResponse, 
							"translatedSentence": translatedSentence,
							"imageDescription": imageDescription
							}]
					)
				});
			} catch (error) {
				console.error('에러발생', error);
			}
		};
		await fetchTtsData();
		//
		setMessages(messages => [...messages, 
									{ 
									// "writer": "끼리코", 
									// "storyId": storyId,
									"storyId": storyIdRef.current,
									"lineId": lineId,
									// "koreanSentence": gptResponse, 
									"koreanSentence": gptResponse, 
									"translatedSentence": translatedSentence,
									"imageDescription": imageDescription
									}
								]
					);
		console.log("메세지: ", messages);	
	userInputRef.current.focus();
	}
	

	const writeStory = async () => {		
		if (!isWriting.current && quillNum.current) {
		userInputRef.current.disabled = true;
		isWriting.current = true;
		buttonRef.current = true;
		const lineId = (6 - quillNum.current) * 2 - 1;
		console.log("입력메세지: ", inputUser)
		const translatedSentence = await translateChat(inputUser);
		const imageDescription = await descriptChat(inputUser);
		console.log(translatedSentence)
		
		//
		const fetchStoryData = async () => {
			try{
				const response = await fetch(`https://kkirikkiri.shop/api/books/contents`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						[{ 
							// "writer": "끼리코", 
							// "storyId": storyId,
							"storyId": storyIdRef.current,
							"lineId": lineId,
							// "koreanSentence": gptResponse, 
							"koreanSentence": inputUser, 
							"translatedSentence": translatedSentence,
							"imageDescription": imageDescription
							}]
					)
				});
			} catch (error) {
				console.error('에러발생', error);
			}
		};
		await fetchStoryData();
		const fetchTtsData = async () => {
			try{
				const response = await fetch(`https://kkirikkiri.shop/api/books/contents/voice`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						[{ 
							// "writer": "끼리코", 
							// "storyId": storyId,
							"storyId": storyIdRef.current,
							"lineId": lineId,
							// "koreanSentence": gptResponse, 
							"koreanSentence": inputUser, 
							"translatedSentence": translatedSentence,
							"imageDescription": imageDescription
							}]
					)
				});
			} catch (error) {
				console.error('에러발생', error);
			}
		};
		await fetchTtsData();

		//



		setMessages(messages => [...messages, 
									{ 
									// "writer": userName, 
									// "storyId": storyId,
									"storyId": storyIdRef.current,
									"lineId": lineId,
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
			setql(ql - 1);
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

	

	const beforeWriteStory = async () => {
		const getStoryId = async (paramsStoryId) => {
			if (paramsStoryId) {	// 이어서 작성할 때
				const fetchData = async () => {
					try{
						storyIdRef.current = paramsStoryId;
						const response = await fetch(`https://kkirikkiri.shop/api/books/${params.story_id}`, {
							method: 'GET',
							headers: {
							'Content-Type': 'application/json',
							},
						});
						setstoryId(paramsStoryId);  
						// storyIdRef.current = params.story_id;                                               
						const data = await response.json();
						// console.log(data.contents.length)
						setql(5 - parseInt(data.contents.length / 2));
						// quillNum.current = 5 - parseInt(data.contents.length / 2);
						// console.log("작성가능횟수",quillNum.current);
						// console.log(data.contents);
										setMessages(data.contents.map((msg) => {return {
											"storyId": msg.storyId,
											"lineId": msg.lineId,
											"koreanSentence": msg.koreanSentence,
											"translatedsentence": msg.translatedSentence,
						 }}))
					} catch (error) {
						console.log('데이터로드실패', error);
					}
				};
				fetchData();
				console.log("이어 작성하기.");
			} else {	// 처음 작성할 때
				// console.log("아마여기서문제가발생할것")
				const fetchStoryData = async () => {
					try{
						const response = await fetch(`https://kkirikkiri.shop/api/books`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								},
							body: JSON.stringify(
								{ 
								"loginId": userInfo.loginId,
								"title": "427제목",
								"openState": "PUBLIC",
								"summary": "427요약"
								}
							)		
						})
						const localStoryId = await response.json()
						console.log("로컬스토리ID:", localStoryId)
						storyIdRef.current = localStoryId
						// setstoryId(localStoryId)
						console.log("바뀐값", localStoryId)
						// storyIdRef.current = localStoryId
					} catch (error) {
				console.error('에러발생', error);
				}
			}
			fetchStoryData();
			}
		}
		if (quillNum.current === 5 ) {
			const promiseStoryId = await getStoryId(parseInt(params.story_id))
			// console.log("858", promiseStoryId)
			// promiseStoryId.then(()=> writeStory())
			await writeStory();
		} else {
			await writeStory();
		}
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
			beforeWriteStory();
		}
	}
	const handleOnKeyDown2 = async (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			// console.log("대퍼팀파이팅")
			await finale();
			// navigate(`/bookshelf`)
			
		}
	}
	const finale = async () => {
		const finale2 = async () => {
			const xxx = await summaryStory(messages);
			console.log("xxx", xxx);
			console.log("새제목:",storyTitleRef.current.value);
			console.log("아이디:", storyIdRef.current);
			const titleSummary = async () => { 
				try { 
					const response = await fetch(`https://kkirikkiri.shop/api/books/modify/${storyIdRef.current}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(
							{ 
							"title": storyTitleRef.current.value,
							// "summary": xxx + "..."
							"summary": xxx
							}
						)	
					})	
				} catch (error) {
					console.log("에러발생", error);
				}
			}	
			await titleSummary();
		}
		await finale2();
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
	const storyTitleRef = useRef();
	// useEffect(() => {storyTitleRef.current.focus()}, [storyTitleRef.current.value]);
  return (
		<Background backgroundimage={background}>
			<StoryContainer>
				<StoryTitlebox>
					<StoryTitleText>{userInfo.nickname} & 끼리코가 만드는 이야기</StoryTitleText>
				</StoryTitlebox>	
				<StoryScrollbox ref={scrollBoxRef}>
					{messages.map((message,index) => {
						return (
							<Sentence key={index}>
								<WriterDiv>
									{/* <WriterName>{message.lineId}</WriterName> */}
									<WriterName>{(message.lineId % 2) ? userInfo.nickname: gptName}</WriterName>
									<WriterImg src={(message.lineId % 2) ? userInfo.thumbnail: gptimg}></WriterImg>
									{/* <WriterImg src={(message.lineId % 2) ?  userimg : gptimg}></WriterImg> */}
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
						{/* <Sentence2 className={`${ isWriting.current ? "writingstyle":"", quillNum.current?"":"stopwrite" }`}> */}
						<Sentence2 className={`${ isWriting.current ? "writingstyle":""} ${quillNum.current?"":"stopwrite"}`}>
							<UserInput className={`${quillNum.current?"":"stopwrite"}`} onChange={CheckLength} ref={userInputRef} onKeyDown={handleOnKeyDown}></UserInput>
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
						<WriteBtn className={`${ isWriting.current? "writingstyle":"", quillNum.current?"":"stopwrite"}`} ref={buttonRef} onClick={beforeWriteStory}>작성</WriteBtn>
					</MiniBox>
					{/* <ModalCloseButton onClick={() => setTestModal(true)}>모달열기</ModalCloseButton> */}
				</StoryInputBox>
			</StoryContainer>
			{/* <StoryNameModal isOpen={testModal} onClose={(e) => {setTestModal(false); e.stopPropagation()}}> */}
			<StoryNameModal isOpen={testModal} onClose={(e) => {setTestModal(false); e.stopPropagation()}}>
			{/* <StoryNameModal isOpen={testModal} onClose={() => setTestModal(false)}> */}
				<ModalTitle>동화의 제목을 지어줄래??</ModalTitle>
				{/* <div src={{closeBtn}} style={{height: '4rem', width: "4rem", backgroundColor: "blue"}} ></div> */}
				<CloseBtn src={closeBtn} onClick={()=>{console.log("모달끈다"); setTestModal(false)}}></CloseBtn>
				<ModalTextBox>
					<StoryTitle ref={storyTitleRef} onKeyDown={handleOnKeyDown2}></StoryTitle>
				</ModalTextBox>
				{/* <ModalCloseButton onClick={() => setTestModal(false)}>작성</ModalCloseButton> */}
				{/* <ModalCloseButton onClick={(e) => {console.log("사용자정보:",userInfo); e.stopPropagation()}}>작성</ModalCloseButton> */}
				<ModalCloseButton onClick={(e) =>{finale() ;{e.stopPropagation()}}}>완료</ModalCloseButton>
			</StoryNameModal>
			{/* <SendBtn className={`${ quillNum.current?"":"writingstyle"}`} onClick={sendStory}>{quillNum.current?"이야기 계속하기":"이야기 작성하기"}</SendBtn> */}
			<SendBtn className={`${ quillNum.current?"":"writingstyle"}`} onClick={() => setTestModal(true)}>{quillNum.current?"이야기 계속하기":"이야기 작성하기"}</SendBtn>
		</Background>
  );
};

export default StoryPage;
