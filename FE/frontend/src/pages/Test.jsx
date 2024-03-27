import { useRef } from 'react';
import FlipPage from 'react-pageflip';
import styled from 'styled-components';

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

const BookContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -5rem;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 100%;
  height: 100%;
  background-color: rgb(226, 223, 204);
  border: 0.1rem solid #6d6d6d;
  box-shadow: inset 0 0 50px 10px rgba(0, 0, 0, 0.5);
  font-size: large;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageButton = styled.button`
  width: 5rem;
  height: 6rem;
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:hover {
    background-color: #e7e7e7;
  }
`;

const Test = () => {
  const bookRef = useRef(null);

  const goToPage = (pageNumber) => {
    bookRef.current.pageFlip().flip(pageNumber - 1);
  };

  return (
    <BookContainer>
      <FlipPage 
        width={1000} height={1200} ref={bookRef} showCover={true}>
        <div data-density='hard'>
          <PageCoverStyle>
            ㅁㄴㅇ
          </PageCoverStyle>
        </div>
        <Page className="page">페이지 1</Page>
        <Page className="page">페이지 2</Page>
        <Page className="page">페이지 3</Page>
        <Page className="page">페이지 4</Page>
        <Page className="page">페이지 5</Page>
        <Page className="page">페이지 6</Page>
        <Page className="page">페이지 7</Page>
        <Page className="page">페이지 8</Page>
        <Page className="page">페이지 9</Page>
        <Page className="page">페이지 10</Page>
        <div data-density='hard'>
          <PageCoverStyle>
            ㅁㄴㅇ
          </PageCoverStyle>
        </div>
      </FlipPage>

      <ButtonContainer>
        {[...Array(10).keys()].map((number) => (
          <PageButton key={number} onClick={() => goToPage(number+2)}>
            {number+1}
          </PageButton>
        ))}
      </ButtonContainer>
    </BookContainer>
  );
};

export default Test;
