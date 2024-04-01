import styled from 'styled-components';
import FlipPage from 'react-pageflip';
import Background from '../components/common/Background';
import background from '../assets/book/backimg.jpg';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PageCoverStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(225, 201, 155);
  border: 0.2rem solid #6d6d6d;
  box-shadow:
    inset 0 0 100px 30px rgba(0, 0, 0, 0.4),
    0 0 50px 10px rgba(0, 0, 0, 0.3);
  font-size: large;
  color: black;
`;
const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
  background-color: rgb(226, 223, 204);
  border: 0.1rem solid #6d6d6d;
  box-shadow: inset 0 0 50px 10px rgba(0, 0, 0, 0.5);
  font-size: large;
  color: black;
`;
const StoryBookPage = () => {
  // const navigate = useNavigate();
  const flipBookRef = useRef(null);

  class PageCover extends React.Component {
    render() {
      return (
        <div ref={this.ref} data-density='hard'>
          <PageCoverStyle>

          </PageCoverStyle>
        </div>
      );
    }
  }
  const handlePageClick = (e) => {};

  return (
    <Background backgroundimage={background}>
      <FlipPage
        width={1000}
        height={1200}
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
            ㅁㄴㅇ
          </PageCoverStyle>
        </div>
        <PageContent>
          <div>sad</div>
        </PageContent>
        <PageContent>
          <div>sad</div>
        </PageContent>
        <PageContent>
          <div>sad</div>
        </PageContent>
        <PageContent>
          <div>sad</div>
        </PageContent>
        <PageContent>
          <div>sad</div>
        </PageContent>
        <PageContent>
          <div>sad</div>
        </PageContent>
        <div data-density='hard'>
          <PageCoverStyle>
            ㅁㄴㅇ
          </PageCoverStyle>
        </div>
      </FlipPage>
    </Background>
  );
};

export default StoryBookPage;