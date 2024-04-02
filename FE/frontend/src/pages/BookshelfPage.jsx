import Background from "../components/common/Background";
import background from "../assets/bookshelf/bookshelfbackimg.jpg";
import BookImg from "../assets/bookshelf/bookimg2.png";
import NotCompletedImg from "../assets/bookshelf/notcompletedimg.png";
import PlusImg from "../assets/bookshelf/plus.png";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import closeBtn from "../assets/library/clear.png";
import useUserStore from "../components/Counter/UserStore";

const BookContainer = styled.div`
  width: 80%;
  height: 80%;
  display: grid;
  flex-wrap: wrap;
  /* gap : 3.62rem; */
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  /* background-color : pink; */
  margin: 5rem 0 0 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0rem;}
`;
const NewBookCover = styled.div`
  background-image: url(${BookImg});
  cursor: pointer;
  text-align: center;
  height: 33.625vh;
  width: 15.179vw;
  margin-bottom: 4rem;
  border-radius: 2%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BookCover = styled.div`
  background-image: url(${({ isCompleted }) => (isCompleted ? BookImg : NotCompletedImg)});
  cursor: pointer;
  text-align: center;
  height: 33.625vh;
  width: 15.179vw;
  margin-bottom: 4rem;
  border-radius: 2%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BookTitle = styled.div`
  font-size: 2vw;
  margin-top: 6.9vw;
  font-size: 1.4vw;
  overflow: hidden;
  max-height: 5vh;
  word-wrap: break-word;
`;
const BookAuthor = styled.div`
  margin-top: 4.9vw;
  overflow: hidden;
  font-size: 1.1vw;
  word-wrap: break-word;
`;
const PlusImage = styled.img`
  width: 3.5rem;
  margin: 53% 0 0 2%;
`;
const InfoModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  justify-content: center;
  z-index: 1000;
  background-color: #8c6e6e;
  border-radius: 2rem;
  width: 63%;
  height: 55%;
  color: black;
`;
const WritingModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 1000;
  background-color: rgba(226, 210, 210, 1);
  border-radius: 2rem;
  width: 40vw;
  height: 28vh;

  color: black;
`;

const CloseBtn = styled.img`
  position: absolute;
  width: 8%;
  right: 3%;
  top: 3%;
  filter: brightness(0%);
`;
const PreviewContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88%;
  height: 50%;
  /* background-color : green; */
`;
const PrevTextSector = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background-color : skyblue; */
`;
const PrevText = styled.div`
  /* overflow : hidden; */
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-top: 1%;
  font-weight: 300;
  font-size: ${(props) => props.fontSize || "1.19vw"};
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 6%;
  width: 35vw;
  height: 10vh;
  /* background-color : yellow; */
`;
const PrevBtn = styled.div`
  display:flex;
  width: 10rem;
  height: 100%;
  background-color: #29c325;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 1.875rem;
  color: #000;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;

const CheckBtn = styled.div`
  width: 10.199vw;
  height: 8.625vh;
  background-color: #e17171;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 1.875rem;
  color: #000;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  line-height: 8.625vh;
  cursor: pointer;
`;

const StudyInfo = styled.div`
  position: absolute;
  color: #fe3838;
  font-size: 1.3rem;
  margin-bottom: 13vh;
`;
const CheckMessage = styled.div`
  font-size: 1.5rem;
  margin-top: 12%;
`;

const Btn = styled.div`
    
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    `
    const CompletedStory = styled.div`
    display : flex;
    flex-direction : column;
    /* margin-top : 6.9vw; */
    font-size : 1.3vw;
  
`
    const NotCompletedStory = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 6.9vw;
    font-size : 1.3vw;
  
`
const Writer = styled.div`

    
`
const Script = styled.div`
    
`






const BookshelfPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [study, setStudy] = useState(null);
  const [writingModalOpen, setWritingModalOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://kkirikkiri.shop/api/bookshelves/${userInfo.loginId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              loginId: userInfo.loginId,
            },
          }
        );
        const data = await response.json();
        data.forEach((book) => {
          books.push(book);
        });
        console.log(data);
      } catch (error) {
        console.log("데이터로드실패", error);
      }
    };
    const fetchMyData = async () => {
      try {
        const response = await fetch(`https://kkirikkiri.shop/api/books/mine/${userInfo.loginId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            loginId: userInfo.loginId,
          },
        });
        const data = await response.json();
        data.forEach((book) => {
          books.push(book);
        });
        console.log(data);
      } catch (error) {
        console.log("데이터로드실패", error);
      }
    };
    let books = [];
    const loadData = async () => {
      await fetchData();
      await fetchMyData();
      await setBooks(books);
    };
    loadData();
  }, []);

  const handleBookClick = (book) => {
    if (book.isCompleted) {
      //이야기 완성된 경우
      setSelectedBook(book);
      setInfoModalOpen(true);
      console.log("선택된 책", book);
      if (book.isLearned) {
        const isStudy = 1;
        setStudy(isStudy);
        console.log("공부여부", isStudy);
      } else {
        const isStudy = 0;
        setStudy(isStudy);
        console.log("공부여부", isStudy);
      }
    } else {
      setSelectedBook(book);
      console.log("선택된 책", book);
      setWritingModalOpen(true);
    }
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  const closeWritingModal = () => {
    setWritingModalOpen(false);
  };

  const gotoMakeStory = (storyId) => {
    console.log("이야기 생성하기");
    navigate(`/story/${storyId}`);
  };

  const gotoStudy = (storyId) => {
    console.log("학습페이지로 이동하기");
    navigate("/study-write/" + storyId);
  };

  return (
    <Background backgroundimage={background}>
      <BookContainer>
        <NewBookCover>
          <PlusImage src={PlusImg} key="new" onClick={() => gotoMakeStory(0)} />
          <BookTitle></BookTitle>
        </NewBookCover>
        {books.map((book, index) => (
          <BookCover
            isCompleted={book.isCompleted}
            key={index}
            onClick={() => handleBookClick(book)}
          >
            {book.isCompleted ? (
              <CompletedStory>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>{book.author}</BookAuthor>
              </CompletedStory>
            ) : (
              <NotCompletedStory>
                <Writer>{book.author} 작가님의</Writer>
                {/* 몇번째 미완성 이야기인지 세어줘야함 */}
                <Script>미완성 이야기</Script>
              </NotCompletedStory>
            )}
          </BookCover>
        ))}
      </BookContainer>
      {infoModalOpen && selectedBook !== null && (
        <InfoModal>
          <>
            <CloseBtn onClick={closeInfoModal} src={closeBtn}></CloseBtn>
            <PreviewContent>
              <img
                src={selectedBook.imageURL}
              />
              <PrevTextSector>
                <PrevText fontSize="2.5rem" marginBottom="rem">
                  {selectedBook.title}
                </PrevText>
                <PrevText fontSize="1.7rem" marginBottom="1.1rem">
                  {selectedBook.author} 작가님
                </PrevText>
                <PrevText fontSize="1.3rem">
                  {selectedBook.summary}
                </PrevText>
              </PrevTextSector>
            </PreviewContent>
            <ButtonContent>
              <PrevBtn onClick={() => gotoStudy(selectedBook.storyId)}>학습하기</PrevBtn>
              <Btn>
                {study === 0 ? <StudyInfo>먼저 학습을 진행해주세요</StudyInfo> : null}
                <PrevBtn style={{ backgroundColor: study === 0 ? "#868B86" : "#29C325" }}>
                  그림책보기
                </PrevBtn>
              </Btn>
            </ButtonContent>
          </>
        </InfoModal>
      )}
      {writingModalOpen && (
        <WritingModal>
          <CloseBtn onClick={closeWritingModal} src={closeBtn}></CloseBtn>
          <CheckMessage>"작성하던 이야기가 있어. 이어서 작성해볼래?"</CheckMessage>
          <ButtonContent>
            <CheckBtn onClick={() => gotoMakeStory(selectedBook.storyId)}>YES</CheckBtn>
            <CheckBtn onClick={closeWritingModal} src={closeBtn}>
              NO
            </CheckBtn>
          </ButtonContent>
          <></>
        </WritingModal>
      )}
    </Background>
  );
};

export default BookshelfPage;

