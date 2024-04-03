import styled from 'styled-components';
import FlipPage from 'react-pageflip';
import Background from '../components/common/Background';
import background from '../assets/book/backimg.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookcover from '../assets/book/bookcover.png'
import bookcover2 from '../assets/book/bookcover2.png'
import MaleImg from '../assets/book/boy.png'
import FemaleImg from '../assets/book/girl.png'



const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content : center;
  width: 100%;
  height: 100%;
  background-color: rgb(226, 223, 204);
  border: 0.1rem solid #6d6d6d;
  box-shadow: inset 0 0 50px 10px rgba(0, 0, 0, 0.5);
  font-size: large;
  color: black;
`;

const Title = styled.span`
  font-size: 2.3rem;
  
`;
const Writer = styled.span`
  font-size: 1.7rem;
`;
const StoryText = styled.div`
  display : flex;
  height: 85%;
  margin: 1.5rem;
  font-size: 1.6rem; 
  overflow: auto; 
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
const StoryImg = styled.img`
  width : 22rem;
  height : 20rem;
`

const PageCoverStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background-image: url(${bookcover});
  background-size: 100% 100%;;
  border: 0.1rem solid #6d6d6d;
  border-radius: 0.6rem;
  box-shadow:
    inset 0 0 100px 30px rgba(0, 0, 0, 0.4),
    0 0 50px 10px rgba(0, 0, 0, 0.3);
  font-size: large;
  color: black;
  flex-direction: column;
`;

const LastPageCoverStyle = styled(PageCoverStyle)`
  background-image: url(${bookcover2});  
`;

const ContentArea = styled.div`
  display : flex;
  margin-left : 1.6rem;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  justify-content: space-between;
  /* background-color : pink; */
  width : 90%;
  height : 83%;
`
const ImgArea = styled.div`
  position: relative;
  /* background-color: blue; */
`
const TextArea = styled.div`
  height : 33%;
  /* background-color: bisque; */
`
const ToggleSwitch = styled.label`
  position: absolute;
  display: flex;
  width: 12%;
  height: 34px;
  top: 67%;
  right: 15%;
  z-index: 2;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  & input:checked + .slider {
    background-color: #2196F3;
  }

  & .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  & input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const Voice = styled.div`
  margin: 1rem 30%;
  display : flex;
  width : 13rem;
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


const StoryBookPage = () => {
  const flipBookRef = useRef(null);
  const { 'story-id': storyId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const audioRef = useRef(new Audio());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://kkirikkiri.shop/api/books/${storyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setBookInfo(data);
        setLanguages(data.contents.map(() => 'kr')); 
      } catch (error) {
        console.log('데이터로드실패', error);
      }
    };
    fetchData();
  }, [storyId]);

  const handlePageClick = (e) => {};

  const toggleLanguage = (index) => {
    setLanguages((prevLanguages) => {
      const newLanguages = [...prevLanguages];
      newLanguages[index] = newLanguages[index] === 'kr' ? 'en' : 'kr';
      return newLanguages;
    });
  };

  const turnOnVoice = (voiceUrl) => {
    if (selectedVoice === voiceUrl) {
      setSelectedVoice(null);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      setSelectedVoice(voiceUrl);
      audioRef.current.src = voiceUrl;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <Background backgroundimage={background}>
      {bookInfo && (
        <FlipPage
          width={500}
          height={650}
          size='fixed'
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          maxShadowOpacity={1}
          mobileScrollSupport={true}
          onPageClick={handlePageClick}
          ref={flipBookRef}
          showCover={true}
          onClick={(event) => {event.stopPropagation()}} 
          disableFlipByClick
        >
          <div data-density='hard'>
            <PageCoverStyle>
                <Title>{bookInfo.title}</Title>
                <Writer>{bookInfo.memberNickname} 작가님</Writer>
            </PageCoverStyle>
          </div>
       
          {bookInfo.contents.map((content, index) => (
            <PageContent key={index}>
               <Voice>
                  <MaleVoice onClick={() => turnOnVoice(content.maleVoiceUrl)} src={MaleImg}/>
                  {selectedVoice === content.maleVoiceUrl && <audio src={content.maleVoiceUrl} autoPlay />}
                  <FemaleVoice onClick={() => turnOnVoice(content.femaleVoiceUrl)} src={FemaleImg} />
                  {selectedVoice === content.femaleVoiceUrl && <audio src={content.femaleVoiceUrl} autoPlay/>}
                </Voice>
              <ContentArea>
                <ImgArea>
                  <StoryImg src={content.imageUrl}></StoryImg>
                </ImgArea>
                <TextArea>
                  <StoryText>{languages[index] === 'kr' ? content.koreanSentence : content.translatedSentence}</StoryText>
                </TextArea>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={languages[index] === 'en'}
                    onChange={() => toggleLanguage(index)} 
                  />
                  <span className="slider"></span>
                </ToggleSwitch>
              </ContentArea>
            </PageContent>
          ))}
          <div data-density='hard'>
          < LastPageCoverStyle/>
          </div>
        </FlipPage>
      )}
    </Background>
  );
};

export default StoryBookPage;