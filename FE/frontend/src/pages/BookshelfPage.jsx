import Background from "../components/common/Background";
import background from "../assets/bookshelf/bookshelfbackimg.png";
import BookImg from '../assets/bookshelf/bookimg2.png';
import NotCompletedImg from '../assets/bookshelf/notcompletedimg.png'
import PlusImg from '../assets/bookshelf/plus.png'
import styled from "styled-components";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import closeBtn from '../assets/library/clear.png'

const BookContainer = styled.div`
    width : 83.5188vw; 
    height : 79vh;
    display : grid;
    flex-wrap : wrap;
    /* gap : 3.62rem; */
    grid-template-columns: repeat(4, 1fr); 
    justify-content : flex-start;
    /* background-color : pink; */
    margin-top : 10rem; 
    overflow-y : auto; 
    &::-webkit-scrollbar {
        width : 1rem;
    }    
    /* &::-webkit-scrollbar-track {
    background:  rgba(55, 55, 55, 0.90); 
    border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 1.25rem;
    } */
`
const TextSector = styled.div`
    height : 3.12vh;
    width :  83.5188vw;
    background-color : skyblue;
`

const NewBookCover = styled.div`
    background-image: url(${BookImg});
    cursor: pointer;
    text-align: center;
    height: 33.625vh;
    width: 15.179vw;
    margin-bottom: 3.5rem;
    margin-left: 1.2rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

`

const BookCover = styled.div`
    background-image: url(${({ isCompleted }) => isCompleted ? BookImg : NotCompletedImg});
    cursor: pointer;
    text-align: center;
    height: 33.625vh;
    width: 15.179vw;
    margin-bottom: 3.5rem;
    margin-left: 1.2rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    font-family: "Ttangsbudaejjigae OTF";
`

const Book = styled.div`
    
`
const BookTitle = styled.div`
    font-size : 2vw; 
    margin-top : 6.9vw;
    font-size : 1.4vw;
    overflow : hidden;
    max-height: 5vh;
    word-wrap : break-word;
    
`
const BookAuthor = styled.div`
    margin-top : 4.9vw;
    overflow : hidden;
    font-size : 1.1vw;
    word-wrap : break-word;

    `
const PlusImage = styled.img`
    width : 4vw;
    height : 6vh;
    margin-top : 50%;
`
const InfoModal = styled.div`
     display : flex;
    flex-direction : column;
    align-items : center;
    position : fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    z-index : 1000;
    background-color : #8C6E6E;
    opacity : 91%;
    border-radius : 2rem;
    width: 63.397vw;
    height: 55.8125vh; 
    color : black;
`
const CloseBtn = styled.img`
    width : 2.9vw;
    height : 3.9vh;
    margin-top : 1vh;
    margin-left : 55vw;
`
const PreviewContent = styled.div`
    display : flex;
    /* margin-top : 8.69rem; */
    width : 53.918vw;
    height : 26.19vh;
    /* background-color : green; */
    margin-bottom : 4.65rem;    
`
const PrevTextSector = styled.div`
    width : 35.327vw;
    height : 30vh;
    display : flex;
    flex-direction : column;
    /* background-color : skyblue; */
    
`
const PrevText = styled.div`
    /* overflow : hidden; */
    margin-bottom: ${(props) => props.marginBottom || '0'};
    height : ${(props) => props.height || '8%'};
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size : ${(props) => props.fontSize || '1.19vw'};
`

const ButtonContent = styled.div`
    margin-top : 2rem;
    display : flex;
    justify-content : space-between;
    width : 34.693vw;
    height : 8.625vh;
    /* background-color : yellow; */
`
const PrevBtn = styled.div`

    width : 10.199vw;
    height: 8.625vh;
    background-color : #29C325;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 1.875rem;
    color: #000;
    text-align: center;
    font-family: "Ttangsbudaejjigae OTF";
    font-size: 1.712vw;
    font-style: normal;
    font-weight: 300;
    line-height: 8.625vh;
    cursor: pointer;

`
const StudyInfo = styled.div`
    color : #FE3838;

    
`
const Btn = styled.div`
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;


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
    const [modalOpen, setModalOpen] = useState(false); 
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [study, setStudy] = useState(null);
    const [writingModal, setwritingModal] = useState(false);
    


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{                                                      
                const response = await fetch('/dummydata/bookshelf.json');
                const data = await response.json();
                setBooks(data);
                console.log(data)
            } catch (error) {
                console.log('데이터로드실패', error);
            }
        };
        fetchData();
    },[]);

    const handleBookClick = (book) => {
        console.log('선택된 책', book)
        if(book.iscompleted === 1){     //이야기 완성된 경우
            setSelectedBook(book);
            setInfoModalOpen(true);
            if(book.isSpeackingStudy === 1 || book.isWritingStudy === 1){
                const isStudy = 1
                setStudy(isStudy);
                console.log('공부여부' ,isStudy);
            }else {
                const isStudy = 0
                setStudy(isStudy);
                console.log('공부여부',isStudy);
            }
        } else {      
            setwritingModal(true);
        }
    };

    const closeModal = () => {
        setInfoModalOpen(false);
    };
    
    const gotoMakeStory = () => {
        console.log('새이야기 생성하기')
        navigate('/story/:1')
    };

    const gotoStudy = () =>  {
        console.log('학습페이지로 이동하기')
        navigate('/study')

    }

    return (
        <Background backgroundimage={background}>
            <BookContainer>
                <NewBookCover>
                    <PlusImage src={PlusImg} key="new" onClick={gotoMakeStory}/>
                    <BookTitle></BookTitle>
                </NewBookCover>
                {books.map((book, index) => (
                    <BookCover isCompleted={book.iscompleted} key={index} onClick={() => handleBookClick(book)}>
                    {book.iscompleted ? (
                        <>
                            <BookTitle>{book.title}</BookTitle>
                            <BookAuthor>{book.author}</BookAuthor>
                        </>
                    ) : (
                        <NotCompletedStory>
                            <Writer>
                            짱짱맨 작가님의
                            </Writer>
                            <Script>
                            미완성 이야기
                            </Script>
                        </NotCompletedStory>
                    )}
                </BookCover>
                ))}
            </BookContainer>
            {infoModalOpen && selectedBook && (
                <InfoModal>
                  <>
                    <CloseBtn onClick={closeModal} src={closeBtn}></CloseBtn>
                    <PreviewContent>
                        <img style={{width : '22.93lvw' , height : '26.1857vh', marginRight:'6.3rem'}} src={selectedBook.imageURL}/>
                        <PrevTextSector>
                            <PrevText height="34.13%" fontSize="2.612vw">{selectedBook.title}</PrevText>
                            <PrevText height="12.117%" fontSize="1.612vw" marginBottom="2rem">{selectedBook.author} 작가님</PrevText>
                            <PrevText height="43%" fontSize="1.412vw">{selectedBook.summary}</PrevText>
                        </PrevTextSector>
                    </PreviewContent> 
                    <ButtonContent>
                    <PrevBtn onClick={gotoStudy} >
                            학습하기
                        </PrevBtn>
                        <Btn>
                        {study === 0 ? (
                            <StudyInfo>먼저 학습을 진행해주세요</StudyInfo>
                        ) : null}
                        <PrevBtn style={{ backgroundColor: study === 0 ? '#868B86' : '#29C325' }}>
                            그림책보기
                        </PrevBtn>
                    </Btn>
                    </ButtonContent>
                 </>
                </InfoModal>
              
            )}
        </Background>
    );
};

export default BookshelfPage;