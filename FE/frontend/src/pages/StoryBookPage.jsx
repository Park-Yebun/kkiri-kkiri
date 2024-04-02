import styled from 'styled-components';
import FlipPage from 'react-pageflip';
import Background from '../components/common/Background';
import background from '../assets/book/backimg.png';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookcover from '../assets/book/bookcover.png'
import bookcover2 from '../assets/book/bookcover2.png'





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
  
`;
const StoryImg = styled.img`
  width : 23rem;
  height : 23rem;
  
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
const ContentArea = styled.div`
  display : flex;
  flex-direction : column;
  justify-items : center;
  align-items : center;
  margin-top : 3rem;
  /* background-color : pink; */
  width : 90%;
  height : 85%;
  justify-content : space-between;
`
const ImgArea = styled.div`

`
const TextArea = styled.div`
 
  
`


const StoryBookPage = () => {
  const flipBookRef = useRef(null);
  const { 'story-id': storyId } = useParams();
  console.log(storyId)
  const [bookInfo, setBookInfo] = useState(null);

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
      } catch (error) {
        console.log('데이터로드실패', error);
      }
    };
    fetchData();
  }, [storyId]);

  const handlePageClick = (e) => {};

  return (
    <Background backgroundimage={background}>
   
      {bookInfo && (
        <FlipPage
          width={450}
          height={600}
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
        >
          <div data-density='hard'>
            <PageCoverStyle>
                <Title>{bookInfo.title}</Title>
                <Writer>{bookInfo.memberNickname} 작가님</Writer>
            </PageCoverStyle>
          </div>
          {bookInfo.contents.map((content, index) => (
            <PageContent key={index}>
              <ContentArea>
                <ImgArea>
                  <StoryImg src={content.imageUrl}></StoryImg>
                </ImgArea>
                <TextArea>
                  <StoryText>{content.koreanSentence}</StoryText>

                </TextArea>
             
              </ContentArea>
            </PageContent>
          ))}
          <div data-density='hard'>
            <PageCoverStyle></PageCoverStyle>
          </div>
        </FlipPage>
      )}
  
    </Background>
  );
};

export default StoryBookPage;
