import styled from 'styled-components';
import Background from '../components/common/Background';
import background from '../assets/study/backimgstudy.jpg';
import backgroundBook from '../assets/study/backimagestudybook.png';
import { useState, useRef, useEffect } from 'react';
import * as iink from 'iink-ts';
import MaleImg from '../assets/book/boy.png'
import FemaleImg from '../assets/book/girl.png'
import arrowLeftImg from '../assets/book/arrow_left1.png'
import arrowRightImg from '../assets/book/arrow_right.png'
import useUserStore from "../components/Counter/UserStore";
import { useParams } from 'react-router-dom';


// import x from "openai";
const StudyContainer = styled.div`
    width: 80%;
    height: 75%;
    position: absolute;
    top: 15%;
    border-radius: 2rem;
    // background-color: #FFF7E7;
    background-image: url(${backgroundBook});
    background-size: cover;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`

const WriteTest = styled.div`
    position : relative;

    right : 3.1rem;
    top : 3rem;

    z-index: 1;
`
const Result = styled.div`
    border  : 1px solid darkgray;
    border-radius : 1rem;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    width: 100%;
    text-align: center;
    background-color : #ffffff;
`

const Nav = styled.nav`
    display: flex;
    display: -webkit-flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    z-index: 25;
    border-top: 1px solid #d7dde3; /*#A9B7C5*/
    border-bottom: 1px solid #d7dde3; /*#A9B7C5*/
    padding: 12px;    
`
const NavDiv = styled.div`
    display: flex;
    gap: 12px;
`

const NavButton = styled.button`
    display: inline-block;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    color: #fff;
    background-color: #1a9fff;
    font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;
    outline: none;
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all 0.1s ease-out;
    transition: all 0.1s ease-out;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.225);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.225);

    &::before {
        content: "";
        display: inline-block;
        height: 18px;
        width: 18px;
    }
    &:active {
        color: #fff;
        text-decoration: none;
        background: #0065b8;
        box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.5);
    }
    &#clear::before {
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjJweCIgdmlld0JveD0iMCAwIDIwIDIyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgICAgICA8ZyBpZD0iQXBwcy1TbWFsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0Ny4wMDAwMDAsIC02Mi4wMDAwMDApIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMS1Db3B5LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0OC4wMDAwMDAsIDYzLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24tVHJhc2giPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDQgTDE4LDQiIGlkPSJQYXRoLTUyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMsNSBMNC4yODY2Nzk1NywxNy4wMDkwMDkzIEM0LjQwNDQ5MzE5LDE4LjEwODYwMzEgNS4zOTU4NTc4MSwxOSA2LjQ5NzM5MTcsMTkgTDExLjUwMjYwODMsMTkgQzEyLjYwNTczNzMsMTkgMTMuNTk2MTEzNiwxOC4xMDI5Mzk5IDEzLjcxMzMyMDQsMTcuMDA5MDA5MyBMMTUsNSIgaWQ9IlBhdGgtNTMiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS41LDMuNSBMNi44MDM5MDEyLDAuNDU3NTYzODc3IEM2LjkxMjIwMzU3LDAuMjA0ODU4MzI2IDcuMjE1MDU3MzcsMCA3LjQ5MDQ3ODUyLDAgTDEwLjUwOTUyMTUsMCBDMTAuNzgwNDA1MywwIDExLjA4OTMzOTcsMC4yMDg0NTkzNzcgMTEuMTk2MDk4OCwwLjQ1NzU2Mzg3NyBMMTIuNSwzLjUiIGlkPSJQYXRoLTU0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTcsNy41IEw3LjUsMTUiIGlkPSJQYXRoLTY1Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLDcuNSBMMTAuNSwxNSIgaWQ9IlBhdGgtNjUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)
          center center no-repeat;
    }
    &#undo::before {
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+dW5kbzwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJ1bmRvIiBmaWxsPSIjRkZGRkZGIj4gICAgICAgICAgICA8cGF0aCBkPSJNNC4zOTY5NzM4Myw5IEw2LjcwNDQ1MjA0LDExLjI5MDI0ODMgQzcuMDk2NDM3MDYsMTEuNjc5MzA2NCA3LjA5ODgwOTgxLDEyLjMxMjQ2NjkgNi43MDk3NTE3MywxMi43MDQ0NTIgQzYuMzIwNjkzNjYsMTMuMDk2NDM3IDUuNjg3NTMzMTIsMTMuMDk4ODA5NyA1LjI5NTU0ODEsMTIuNzA5NzUxNyBMMS40Njc0MjMwMyw4LjkxMDIxMTEgQzAuOTg3NzYyMDk4LDguNDM0MTMxNzggMC45NzczODMzNTcsNy42NDA2MTY5NyAxLjQ2MjE0Mjk4LDcuMTUyMjM3NjcgTDUuMjkwMjY4MDEsMy4yOTU1MjgyNCBDNS42NzkzMzcwMywyLjkwMzU1NDA3IDYuMzEyNDk3NjIsMi45MDExOTg5NyA2LjcwNDQ3MTc5LDMuMjkwMjY3OTggQzcuMDk2NDQ1OTYsMy42NzkzMzcgNy4wOTg4MDEwNiw0LjMxMjQ5NzU5IDYuNzA5NzMyMDUsNC43MDQ0NzE3NiBMNC40MzEyMTczNiw3IEwxMy4wMDEyMTQ0LDcgQzE1LjIwODc4NDIsNyAxNyw4Ljc5MzMzMjE1IDE3LDExIEMxNywxMy4yMDkwODQ2IDE1LjIxMjQzMjUsMTUgMTMuMDA0ODgxNSwxNSBMMTEsMTUgQzEwLjQ0NzcxNTMsMTUgMTAsMTQuNTUyMjg0NyAxMCwxNCBDMTAsMTMuNDQ3NzE1MyAxMC40NDc3MTUzLDEzIDExLDEzIEwxMy4wMDQ4ODE1LDEzIEMxNC4xMDcwMjQ0LDEzIDE1LDEyLjEwNTM1MTkgMTUsMTEgQzE1LDkuODk3MzczMzMgMTQuMTAzNjg1Nyw5IDEzLjAwMTIxNDQsOSBMNC4zOTY5NzM4Myw5IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+)
          center center no-repeat;
    }
    &#redo::before {
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+cmVkbzwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJyZWRvIiBmaWxsPSIjRkZGRkZGIj4gICAgICAgICAgICA8cGF0aCBkPSJNMTMuNTk0Mzc2Nyw5IEwxMS4yOTQyMTcyLDExLjI5MTU3MiBDMTAuOTAyOTYzMywxMS42ODEzNjUzIDEwLjkwMTc3OTEsMTIuMzE0NTI5MSAxMS4yOTE1NzI0LDEyLjcwNTc4MzEgQzExLjY4MTM2NTYsMTMuMDk3MDM3MSAxMi4zMTQ1Mjk1LDEzLjA5ODIyMTIgMTIuNzA1NzgzNCwxMi43MDg0MjggTDE2LjUzMzkwODEsOC44OTQ1OTUzNCBDMTcuMDEyMjU5NCw4LjQxODAyOTk2IDE3LjAyMjYzNzQsNy42MjQ1MzM0OCAxNi41MzY1NDgxLDcuMTM2NjI5MzcgTDEyLjcwODQyMzMsMy4yOTQyMTIgQzEyLjMxODYyNzQsMi45MDI5NjA3MiAxMS42ODU0NjM1LDIuOTAxNzgwOTQgMTEuMjk0MjEyMiwzLjI5MTU3Njg5IEMxMC45MDI5NjEsMy42ODEzNzI4NCAxMC45MDE3ODEyLDQuMzE0NTM2NzIgMTEuMjkxNTc3MSw0LjcwNTc4OCBMMTMuNTc3MjU1NCw3IEw0Ljk5ODc4NTY0LDcgQzIuNzkxMjE1ODEsNyAxLDguNzkzMzMyMTUgMSwxMSBDMSwxMy4yMDkwODQ2IDIuNzg3NTY3NTIsMTUgNC45OTUxMTg1LDE1IEw3LDE1IEM3LjU1MjI4NDc1LDE1IDgsMTQuNTUyMjg0NyA4LDE0IEM4LDEzLjQ0NzcxNTMgNy41NTIyODQ3NSwxMyA3LDEzIEw0Ljk5NTExODUsMTMgQzMuODkyOTc1NjIsMTMgMywxMi4xMDUzNTE5IDMsMTEgQzMsOS44OTczNzMzMyAzLjg5NjMxNDMyLDkgNC45OTg3ODU2NCw5IEwxMy41OTQzNzY3LDkgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=)
          center center no-repeat;
      }
    
`
const SketchBook = styled.div`
    background-color: pink;
    width: 430px;
    height: 265px;
`

const LeftPage = styled.div`
    width: 50%;
`

const RightPage = styled.div``

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.3rem;
    padding: 20px;
    margin-top: 30px;
`

const BookTitle = styled.div`
    margin-top : 1rem;
    margin-right : 1rem;
    font-size: 2rem;

`

const BookImage = styled.img`
  margin-top : 1rem;
  width: 21rem;
  height: 19rem;
  visibility: ${(props) => {if(props.disabled) {return "visible"} else {return "hidden"}}};
`

const BookContent = styled.div`
  position : relative;
  top : 2rem;
  /* left : 0.9rem; */
  font-size : 1.4rem;
  width : 27rem;
  height : 7rem;
  /* background-color : yellow; */
  overflow: auto; 
  line-height: 1.3;
   &::-webkit-scrollbar {
        width: 1rem; 
    }
    &::-webkit-scrollbar-track {
    background:  rgba(79, 79, 79, 0.9);
    border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 1rem;
    }
`

const BtnContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: space-between;
    top: 50%;
    left: 0;
    right: 0;
    pointer-events: none;
    z-index: 2;
`

const PrevBtn = styled.img`
    width: 3rem;
    height: 3rem;
    /* border: 1px solid black; */
    // position: relative;
    left: 20px;
    pointer-events: auto;
`

const NextBtn = styled.img`
    width: 3rem;
    height: 3rem;
    /* border: 1px solid black; */
    // position: relative;
    right: 20px;
    pointer-events: auto;
`

const QuizSentence = styled.div`
  position : relative;
  top : 6rem;
  right : 2.7rem;
  font-size : 1.4rem;
  width : 27rem;
  height : 16%;
  overflow: auto; 
  line-height: 1.2;
  overflow-wrap: break-word;
   &::-webkit-scrollbar {
        width: 1rem; 
    }

    &::-webkit-scrollbar-track {
    background:  rgba(79, 79, 79, 0.9);
    border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 1rem;
    }
  
`
const Header = styled.div`
  display : flex;
  justify-content : space-between;

`
const Voice = styled.div`
  display : flex;
  width : 10rem;
  height : 4.2rem;
  background-color : lightcoral;
  opacity : 75%;
  border-radius : 1.5rem;
  display : flex;
  justify-content : space-evenly;
  align-items : center;

`
const MaleVoice = styled.img`
    width : 3.5rem;
    height : 3.5rem;
    cursor: pointer;
  
`
const FemaleVoice= styled.img`
   width : 3.5rem;
  height :  3.5rem;
  cursor: pointer;
`

const OrgWords = styled.span`
  margin-right: 15px;
  display: inline-block;
  background-color: ${(props) => {
    if (props.valid) {
      return "black";
    }
  }};
`


const StudyPage = () => {
  const editorRef = useRef(null);
  const resultRef = useRef();
  const clearRef = useRef();
  const undoRef = useRef();
  const redoRef = useRef();
  const [studyData, setStudyData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const pageNumberRef = useRef(0);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const userInfo = useUserStore((state) => state.userInfo);
  // const memberId = 37
  // const storyId = 235
  const audioRef = useRef(null);
  const { 'story-id': storyId } = useParams();
  const [contents, setContents] = useState([]);
  const [writeWord, setWriteWord] = useState();

  const visibilityImg = useRef([]);
  const randomWordsREF = useRef([])


  useEffect(() => {
    console.log(storyId)
    console.log(userInfo.id)
    const fetchData = async () => {
        try {
            const response = await fetch(`https://kkirikkiri.shop/api/learn/${userInfo.id}/${storyId}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            setStudyData(data);
            console.log("데이터 로드 성공!!"); 
            console.log(data); 
        } catch (error) {
            console.error('데이터로드실패', error);
        }
    };
    fetchData();
}, []);

    useEffect(() => {
      console.log(studyData)
      if (Object.keys(studyData).length !== 0) {
        console.log("나누자!!");
        let copyStudyData = studyData
        console.log(copyStudyData.contents[0].orgWords);
        console.log(copyStudyData);
        let randomWords = [];
        for (let i=0; i<10; i++) {
          copyStudyData.contents[i].orgWords = studyData.contents[i].translatedSentence.split(" ");
          copyStudyData.contents[i].copyWords = copyStudyData.contents[i].orgWords.map(word => word.replace(".", "").replace(",","")).filter(word => word !== "");
          copyStudyData.contents[i].RandomNum=Math.floor(Math.random() * copyStudyData.contents[i].copyWords.length);
          randomWords = [...randomWords, copyStudyData.contents[i].copyWords[copyStudyData.contents[i].RandomNum]];
        }
        randomWordsREF.current = randomWords
        console.log(copyStudyData);
        setStudyData(copyStudyData);
        setContents(copyStudyData.contents);
      }
    }, [studyData])


    useEffect(() => {
        const options = {
            configuration: {
                server: {
                    protocol: "WEBSOCKET",
          scheme: "https",
          host: "cloud.myscript.com",
                    applicationKey: '1a013050-732e-402c-ac76-22fa6453c22f',
                    hmacKey: 'ddf8d6e0-9758-40c3-a518-fe111fe1d606',
                },
                recognition: {
                    type: "TEXT",
                    text: {
                        guides: {
                            // enable: false,
                            enable: true,
                        },
                    },
                },
            }
        };
        const editor = new iink.Editor(editorRef.current, options);
        editor.initialize()

        editor.events.addEventListener("changed", (event) => {
            undoRef.disabled = !event.detail.canUndo;
            redoRef.disabled = !event.detail.canRedo;
            clearRef.disabled = !event.detail.canClear;
        });
        editor.events.addEventListener("exported", (event) => {
            resultRef.current.innerHTML =
                event.detail && event.detail["application/vnd.myscript.jiix"]
                    ? event.detail["application/vnd.myscript.jiix"].label
                    : "";
        if (event.detail && event.detail["application/vnd.myscript.jiix"]) {
            if(randomWordsREF.current[pageNumberRef.current]===event.detail["application/vnd.myscript.jiix"].label) {
              visibilityImg.current[pageNumberRef.current] = true;
            }
            setWriteWord(event.detail["application/vnd.myscript.jiix"].label);
        }
        });
        clearRef.current.addEventListener("click", async () => {
            await editor.clear();
        });
        undoRef.current.addEventListener("click", async () => {
            await editor.undo();
        });
        redoRef.current.addEventListener("click", async () => {
            await editor.redo();
        });


        return () => {
            // editor.close();
        };
    }, []);
  
    
  const turnOnVoice = (voiceUrl) => {
      console.log('click');
      console.log('Selected voice URL:', voiceUrl);
    if (selectedVoice === voiceUrl) {
      setSelectedVoice(null);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      setSelectedVoice(voiceUrl);
      audioRef.current.src = voiceUrl;
      audioRef.current.play();
    }
  };


  const goPrev = () => {
    pageNumberRef.current = Math.max(0, pageNumberRef.current - 1);
    setPageNumber(pageNumberRef.current);
  }

  const goNext = () => {
    pageNumberRef.current = Math.min(9, pageNumberRef.current + 1);
    setPageNumber(pageNumberRef.current);
  }


  return (
    <Background backgroundimage={background}>
      <StudyContainer>
        <LeftPage>
        {studyData.contents && studyData.contents.length > pageNumber && (
            <Page>
              <Header>
                 <BookTitle>{studyData.title}</BookTitle>
                  <Voice>
                    <MaleVoice onClick={() => turnOnVoice(studyData.contents[pageNumber].maleVoiceUrl)} src={MaleImg} />
                    {selectedVoice === studyData.contents[pageNumber].maleVoiceUrl && <audio src={studyData.contents[pageNumber].maleVoiceUrl} autoPlay />}
                    <FemaleVoice onClick={() => turnOnVoice(studyData.contents[pageNumber].femaleVoiceUrl)}src={FemaleImg} />
                    {selectedVoice === studyData.contents[pageNumber].femaleVoiceUrl && <audio src={studyData.contents[pageNumber].femaleVoiceUrl} autoPlay />}
                  </Voice>
              </Header>
              <BookImage src={studyData.contents[pageNumber].imageUrl} alt='Book Image' disabled={visibilityImg.current[pageNumber]}></BookImage>
              <BookContent>{studyData.contents[pageNumber].koreanSentence}</BookContent>
            </Page>
        )}
        </LeftPage>
        <RightPage>
          <WriteTest>
            <Result ref={resultRef}/>
            <Nav>
              <NavDiv>
                <NavButton id='clear' ref={clearRef}></NavButton>
                <NavButton id='undo' ref={undoRef}></NavButton>
                <NavButton id='redo' ref={redoRef}></NavButton>
              </NavDiv>
            </Nav>
            <SketchBook ref={editorRef} touch-action={"none"}></SketchBook>
          </WriteTest>
          {contents && contents.length > pageNumber && (
            <QuizSentence>{contents[pageNumber].orgWords.map((item, index) => (
              <OrgWords key={index} valid={index==contents[pageNumber].RandomNum}>{item}</OrgWords>
            ))}
            </QuizSentence>
          )}
        </RightPage>
        <BtnContainer>
          <PrevBtn src={arrowLeftImg} onClick={goPrev} />
          <NextBtn src={arrowRightImg} onClick={goNext} />
        </BtnContainer>
      </StudyContainer>
    </Background>
  );
};

export default StudyPage;
