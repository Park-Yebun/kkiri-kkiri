import Background from "../components/common/Background";
import background from "../assets/bookshelf/bookshelfbackimg.jpg";
import BookImg from "../assets/bookshelf/bookimg2.png";
import trashCanImg from "../assets/bookshelf/trashCan.png";
import NotCompletedImg from "../assets/bookshelf/notcompletedimg.png";
import PlusImg from "../assets/bookshelf/plus.png";
import TrashImg from "../assets/bookshelf/trash.png";
import styled, { css, keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
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
  margin: 7rem 0 0 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;
const NewBookCover = styled.div`
  background-image: url(${BookImg});
  cursor: pointer;
  display: flex;
  position:relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 33.625vh;
  width: 15.179vw;
  margin-bottom: 4rem;
  border-radius: 2%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const PlusImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items:center;
  flex: 1;
  width:100%;
  /* background-color:aqua; */
`;
const Line = styled.div`
  position: absolute;
  height: 0.3rem;
  width: 60%;
  background-color: #643030;
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
  font-family: "Ttangsbudaejjigae OTF";
  position: relative;

  ${({ shouldVibrate }) => shouldVibrate && css`
    animation: ${vibration} 0.2s ease-in-out infinite;
  `}
`;

const BookTitle = styled.div`
  font-size: 2vw;
  left: 2.5vw;
  font-size: 1.4vw;
  overflow: hidden;
  max-height: 5vh;
  word-wrap: break-word;
  width: 11vw;
  position: relative;
`;
const BookAuthor = styled.div`
`;
const PlusImage = styled.img`
  height: 5rem;
  width: 5rem;
  /* width:50%; */
  /* margin: 53% 0 0 2%; */
  /* background-color:aqua; */
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
  /* margin-top: %; */
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
  display: flex;
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
  bottom: 28%;
  right: 22%;
  /* margin-bottom: 13vh; */
`;
const CheckMessage = styled.div`
  font-size: 1.5rem;
  margin-top: 12%;
`;

const CompletedStory = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  font-size: 1.1rem;
  position: relative;
  justify-content:space-evenly;
`;
const NotCompletedStory = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  font-size: 1.1rem;
  position: relative;
  justify-content:space-evenly;
`;

const vibration = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const RemoveBookshelf = styled.img`
  right: 5%;
  top: 5%;
  height: 15%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;

  ${({ shouldVibrate }) => shouldVibrate && css`
    animation: ${vibration} 0.2s ease-in-out infinite;
  `}
`;

const Writer = styled.div`
  font-size: 2vw;
  left: 2.5vw;
  font-size: 1.4vw;
  overflow: hidden;
  max-height: 5vh;
  word-wrap: break-word;
  width: 11vw;
  position: relative;
`;
const Script = styled.div``;

const BookshelfPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [study, setStudy] = useState(null);
  const [writingModalOpen, setWritingModalOpen] = useState(false);
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);
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
          book.isLearned = true;
          setBooks((books) => [...books, book]);
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
          setBooks((books) => [...books, book]);
        });
        console.log(data);
      } catch (error) {
        console.log("데이터로드실패", error);
      }
    };
    const loadData = async () => {
      fetchData();
      fetchMyData();
    };
    loadData();
  }, []);

  const handleBookClick = (book) => {
    if (book.isCompleted || book.isLearned) {
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

  const gotoStory = (storyId) => {
    console.log("이야기 페이지로 이동 : /storybook/" + storyId);
    navigate("/storybook/" + storyId);
  };

  const toggleRemoveIcon = () => {
    setShowRemoveIcon(!showRemoveIcon);
  };

  const SummaryText = ({ text, maxLength = 100 }) => {
    const formattedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    return <span>{formattedText}</span>;
  };

  const removeBookshelf = (event, storyId, author) => {
    event.stopPropagation();

    // 구독한 책 제거
    const deleteBookshelves = async (storyId, loginId) => {
      const bodyData = {
        storyId: storyId,
        loginId: loginId,
      };
      try {
        const response = await fetch(`https://kkirikkiri.shop/api/bookshelves`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
        if (response.ok) {
          console.log("책장에서 삭제되었어요!!");
        } else {
          console.error("요청이 실패하였습니다.");
        }
      } catch (error) {
        console.error("데이터로드실패", error);
      }
    };

    


    const deleteStory = async (storyId) => {
      try {
        const response = await fetch(`https://kkirikkiri.shop/api/books/${storyId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("책장에서 삭제되었어요!!");
        } else {
          console.error("요청이 실패하였습니다.");
        }
      } catch (error) {
        console.error("데이터로드실패", error);
      }
    };
    console.log("작가 : ", author);
    console.log("닉네임 : ", userInfo.nickname);

    if (author === userInfo.nickname) {
      console.log("내가 쓴 스토리 제거", storyId);
      deleteStory(storyId);
    } else if (author !== userInfo.nickname) {
      console.log("책장에서 제거", storyId);
      deleteBookshelves(storyId, userInfo.loginId);
    }
    let CopyBooks = books.filter((book) => book.storyId !== storyId);
    setBooks(CopyBooks);
  };
  useEffect(() => {}, [books]);

  
  return (
    <Background backgroundimage={background}>
      <BookContainer>
        <NewBookCover>
          <PlusImageContainer key="new" onClick={() => gotoMakeStory(0)} >
            <PlusImage src={PlusImg} />
          </PlusImageContainer>
          <Line />
          <PlusImageContainer key="delete" onClick={toggleRemoveIcon}> 
            <PlusImage src={TrashImg}  />
          </PlusImageContainer>
        </NewBookCover>
        {books.map((book, index) => (
          <BookCover
            isCompleted={book.isCompleted || book.isLearned }
            key={index}
            onClick={() => handleBookClick(book)}
            shouldVibrate={showRemoveIcon}
          >
            {book.isCompleted || book.isLearned ? (
              <CompletedStory>
                {showRemoveIcon && (
                  <RemoveBookshelf
                    src={trashCanImg}
                    onClick={(event) => removeBookshelf(event, book.storyId, book.author)}
                  /> 
                )}
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>{book.author} 작가님</BookAuthor>
              </CompletedStory>
            ) : (
              <NotCompletedStory>
                {showRemoveIcon && (
                  <RemoveBookshelf
                    src={trashCanImg}
                    onClick={(event) => removeBookshelf(event, book.storyId, book.author)}
                  />
                )}
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
              <img src={selectedBook.imageURL} />
              <PrevTextSector>
                <PrevText fontSize="2.5rem" marginBottom="rem">
                  {selectedBook.title}
                </PrevText>
                <PrevText fontSize="1.7rem" marginBottom="0.8rem">
                  {selectedBook.author} 작가님
                </PrevText>
                <PrevText fontSize="1.3rem">
                  <SummaryText text={selectedBook.summary} maxLength={170} />
                </PrevText>
              </PrevTextSector>
            </PreviewContent>
            <ButtonContent>
              <PrevBtn onClick={() => gotoStudy(selectedBook.storyId)}>학습하기</PrevBtn>
              <>
                {study === 0 ? <StudyInfo>먼저 학습을 진행해주세요</StudyInfo> : null}
                <PrevBtn
                  onClick={() => gotoStory(selectedBook.storyId)}
                  style={{ backgroundColor: study === 0 ? "#868B86" : "#29C325" }}
                >
                  그림책보기
                </PrevBtn>
              </>
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
