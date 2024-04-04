import Background from "../components/common/Background";
import background from "../assets/library/librarybackimg.jpg"
import styled from "styled-components";
import crown from '../assets/library/crown.png'
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import LeftButtonImg from '../assets/library/arrow_left.png'
import RightButtonImg from '../assets/library/arrow_right.png'
import BookPreviewModal from "../components/Modal/BookPreviewModal";
import closeBtn from '../assets/library/clear.png'
import downbtn from '../assets/user/downicon.png';
import useUserStore from "../components/Counter/UserStore";


const Container = styled.div`
    margin-top : 5rem;
    height : 77.5vh;
    width : 78.125vw;
    /* background-color : blue;  */
    display : flex;
    flex-direction : column;
    justify-content : space-between;
`
const UpperContainer = styled.div`
    width : 78.125vw;
    height : 31.25vh;
    border-radius: 2rem;
    background: rgba(55, 55, 55, 0.90);

`
const BestBox = styled.div`
    width: 78.125vw;
    height: 25.27vh;
    /* background-color : yellow; */
    display : flex;
    justify-content : space-between;
    align-items : center;
`
const SearchBox = styled.div`
    display : flex;
    width : 78.125vw;
    height : 6.25vh;
    /* background-color : red; */
    justify-content : space-between;
    align-items : center;
    /* justify-content : center; */
`
const ListBox = styled.div`
    width: 78.125vw;
    height: 37.5vh;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    border-radius: 2rem;
    background: rgba(55, 55, 55, 0.90);
    align-content: center;
`
const SearchBarBox = styled.div`
    display : flex;
    width : 61.4625vw;
    height : 6.25vh;
    /* background-color : darkgoldenrod; */
    justify-content : space-between;
    align-items : center;
`

const SearchDropdown = styled.select`
    width: 11.719vw;
    height: 6.25vh;
    /* background-color : gray; */
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.90) url(${downbtn}) no-repeat;
    background-position: right 0rem center;
    background-size: 2rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size: 1.9rem;
    text-align : center;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

`
const Option = styled.option`
`

const KeyWordInputBox = styled.input`
    width: 39.062vw;
    height: 6.25vh;
    background-color : rgba(167, 167, 167, 0.90);
    font-family: "Ttangsbudaejjigae OTF";
    font-size: 1.853vw;
    border-radius: 1.875rem;
    text-indent : 2.85rem;

`
const SearchButton = styled.div`
    width: 7.8125vw;
    height: 6.25vh;
    background-color : #29C325;
    border-radius: 1.875rem;
    font-size:  1.7rem;
    text-align : center;
    line-height : 6.7vh;

`
const SortedDropdown = styled.select`
    width: 11rem;
    height: 6.25vh;
    background-color : gray;
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.90) url(${downbtn}) no-repeat;;
    background-position: right 0rem center;
    background-size: 2rem;
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size: 1.8rem;
    text-align : center;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
`
const ImgBox = styled.div`
    width : 32%;
    height : 25.27vh;
    /* background-color : lightcoral; */

    
`
const Top3Text = styled.div`
    font-size:  1.8rem;
    color: #F6DA47;
    margin : 1rem 0.8rem;
`
const CrownImg = styled.img`
    height: 2rem;
    margin-top : 0.7rem;
    margin-left : 2.5rem;
    
`
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color : yellow; */
`

const Logo = styled.div`
    display : flex;
    width : 100%;
    height : 3rem;
    /* background-color : white; */
`

const DownLoad = styled.div`
    align-items : center;
    font-size: 1.5rem;
    font-weight: 300;
    padding-bottom: 0.5rem;
`
const Title = styled.div`
    font-size: 2.1rem;
    margin-right : 5%;
    padding-bottom: 0.8rem;
    /* background-color: aqua; */
`
const Writer = styled.div`
    margin-top : 0.6rem;
    font-size: 1.5rem;
`
const Info = styled.div`
    display : flex;
`
const Summary = styled.div`
    font-size: 1.5rem;
    margin-bottom : 3.96rem;
    font-weight: 300;
`

const TotalText = styled.div`
    width : ${(props) => props.width ||'20%'};
    overflow : hidden;
    white-space : nowrap;
    margin-bottom : ${(props) => props.marginBottom || '1%'};
  
`

const Lists = styled.div`
    font-family: "Ttangsbudaejjigae OTF";
    display : flex;
    justify-content : space-between;
    align-items : center; 
    text-align : center;
    margin : 0.8rem 0 0.5rem; 
    /* background-color: aqua; */
`
const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1.5rem;
    margin-right: 3.9rem;
    margin-top: 1vw;
    margin-bottom: 0.75rem;
    height: ${(props) => props.height * 3.75}vh;
    max-height: 35vh; 
    overflow-y: auto; 
    width: 64.5rem;
    color: white;
    font-weight: 300;
    font-size: 2.95vh;
    /* background-color: aqua; */

    &::-webkit-scrollbar {
        width: 1.2rem; 
    }

    &::-webkit-scrollbar-track {
    background:  rgba(79, 79, 79, 0.9);
    border-radius: 50rem; 
    }

    &::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 1rem;
    }
    `
const LeftButton = styled.img`
    width : 3.75vw;
    height : 5.024vh;

    `
const ButtonBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
`
const TOP3imgSector = styled.div`
    display : flex;
    /* justify-content : space-between; */
    width : 100%;
    height : 25.27vh;
    /* margin-top : 1.73rem; */
    /* background-color : red; */
`
const StoryImage = styled.img`
    height: 88%;
    width : 80%;
    border-radius: 1.25rem;
    margin-top : 0.73rem;
    /* background-color: blue; */

`
const RightButton = styled.img`
    width : 3.75vw;
    height : 5.024vh;
`
const TextSector = styled.div`
    width : 63%;
    height : 25.27vh;
    /* background-color : blue; */
    display : flex;
    flex-direction : column;
    color : white;
` 

const PreviewContent = styled.div`
    display : flex;
    margin-top : 3rem;
    width : 90%;
    height : 18rem;
    /* background-color : green; */
    margin-bottom : 1rem;    
`
const ButtonContent = styled.div`
    flex-direction : column;
    display : flex;
    justify-content : space-between;
    width : 34.693vw;
    height : 8.625vh;
    /* background-color : yellow; */
`

const PrevTextSector = styled.div`
    width : 70%;
    height : 30vh;
    display : flex;
    flex-direction : column;
    /* background-color : skyblue; */
    
`
const PrevText = styled.div`
    /* overflow : hidden; */
    margin-bottom : ${(props) => props.marginBottom || '0'};
    height : ${(props) => props.height || '5%'};
    font-weight: 300;
    font-size : ${(props) => props.fontSize || '1.3rem'};
    /* background-color:aqua; */
`
const PrevBtn = styled.div`
    width : 11rem;
    height: 5rem;
    background-color : ${props => props.disabled ? 'gray' :'#29C325' };
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 1.875rem;
    color: #000;
    text-align: center;
    font-family: "Ttangsbudaejjigae OTF";
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 9.6vh;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

`
const CloseBtn = styled.img`
    position: absolute;
    width : 3rem;
    right: 1.8rem;
    top: 1.5rem;
`
const Modal = styled.div`
    display : flex;
  flex-direction : column;
  align-items : center;
  position : fixed;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%);
  z-index : 1000;
  background-color : #8C6E6E;
  border-radius : 5rem;
  width: 30vw;
  height: 30vh; 
  color : white; 

`
const DownloadInfo = styled.div`
    color : #f26464;
    
`
const BtnArea = styled.div`
    display : flex;
    justify-content : space-between;

`

const LibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [topBooks, setTopBooks] = useState([]);
    const [searchOption, setSearchOption] = useState("제목");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchClick, setSearchClick] = useState(false);
    const [sortedKeyword, setSortedKeyword] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginId, setLoginId] = useState(null);
    const [isDownloadModal, setIsDownloadModal] = useState(false);
    
    const userInfo = useUserStore(state => state.userInfo)
    const navigate = useNavigate()

    const NextBook = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % topBooks.length);
    };

    const prevBook = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + topBooks.length) %  topBooks.length)
    };

    const SummaryText = ({ text, maxLength = 100 }) => {
        const formattedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
        return <div>{formattedText}</div>;
      };

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://kkirikkiri.shop/api/library/${userInfo.loginId}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                params: {
                    loginId: loginId
                }
            });
            const data = await response.json();
            console.log('책데이터', data)
            setBooks(data);
           

            // 전체 책에서 소장 수가 가장 많은 순으로 상위 3권을 설정
            const topBooksData = data
                .sort((a, b) => b.download - a.download)
                .slice(0, 3);
            setTopBooks(topBooksData);
            
            const bookData = data
            setBooks(bookData);
            
        } catch (error) {
            console.error('데이터로드실패', error);
        }
    };
    fetchData();
}, []);

    const handleSearch = () => {
    const click = true;
    setSearchClick(click);
    const searchData = [...books];
    const searchKey = searchKeyword.trim().toLowerCase().replace(/\s+/g, ''); 
    const filteredResults = searchData.filter(book => {
        if (searchOption === "제목") {
            const title = book.title.toLowerCase().replace(/\s+/g, ''); 
            return title.includes(searchKey);
        } else if (searchOption === "작가명") {
            const author = book.author.toLowerCase().replace(/\s+/g, ''); 
            return author.includes(searchKey);
        }
        return false;
    });
    setSearchResults(filteredResults);
};


    useEffect(() => {
        if (searchClick){
            handleSearch();
        }
    },[searchClick])


    const handleSort = (event) => {
        const selectedKeyword = event.target.value;
        setSortedKeyword(selectedKeyword);
    } ;

    const closeDownLoadModal = () =>  {
        console.log('닫기버튼')
        setIsDownloadModal(false);
    }

    // 검색했을 때 => searchClick = true 인상태에는 searchResults를 정렬하고,
    // 검색안했을때 => searchClick = false 인상태에서는 전체 book을 정렬한다.
    const sortBooks = (keyword) => {
        let sortedBooks = []
            if(searchClick === false){
                sortedBooks = [...books];
            } else {
                sortedBooks = [...searchResults];
            }

        switch (keyword) {
            case "소장수많은순":
                sortedBooks.sort((a,b) => b.download - a.download);
                break;
            case "소장수적은순":
                sortedBooks.sort((a,b) => a.download - b.download);
                break;
            case "날짜빠른순":
                sortedBooks.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "날짜느린순":
                sortedBooks.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                break;
                
        }
        setBooks(sortedBooks);
        setSearchResults(sortedBooks);
    };

   useEffect(() => {
        sortBooks(sortedKeyword)
   },[sortedKeyword])

   const openModal = () => {
    setIsModalOpen(true);
   };

   const closeModal = () => {
    setIsModalOpen(false);
   };

   const handleBookClick = (book) => {
    console.log('선택된 책 ', book)
    setSelectedBook(book);
    openModal();
   };


   const collectStory = async (storyId, loginId) => {
       console.log(selectedBook)
       console.log(storyId);
       console.log('모달상태',isDownloadModal)
       console.log(loginId);
    if (selectedBook.downloaded === false){
        const bodyData = {
            storyId: storyId,
            loginId: loginId
        }
            try {
                const response = await fetch('https://kkirikkiri.shop/api/bookshelves', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData)
                });
                if (response.ok) {
                    console.log('내 책장에 추가되었습니다.');


                    const makeLearnedData = async () => {
                        const makeLearnedData1 = async () => {
                          try {
                            const response = await fetch(`https://kkirikkiri.shop/api/learn`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                storyId: storyId,
                                memberId: userInfo.id,
                              }),
                            });
                          } catch (error) {
                            console.log("에러발생", error);
                          }
                        };
                        await makeLearnedData1();
                      };
                      await makeLearnedData();


                    navigate('/bookshelf')
                  } else {
                    console.error('요청이 실패했습니다.', error.message);
                    console.log('이미 소장한 책입니다. ')
                    setIsDownloadModal(true);            
                  }
            } catch (error) {
                console.error(error);
            }

    } else {
    
    }
    }


    const goDetail = (storyId) => {
        console.log('동화책 상세 페이지로 이동')
        navigate(`/storybook/${storyId}`)
    }


    
    return (
        <Background backgroundimage={background}>
            <Container>
                <UpperContainer>
                    <Logo>
                        <CrownImg src={crown}></CrownImg>
                        <Top3Text>TOP{currentIndex + 1}</Top3Text>
                    </Logo>
                    <BestBox>
                        <ImgBox>
                            <TOP3imgSector>
                                <ButtonBox>
                                    <LeftButton onClick={prevBook} src={LeftButtonImg}></LeftButton>
                                </ButtonBox>
                                <StoryImage src={topBooks.length > 0 && topBooks[currentIndex].imageURL}></StoryImage>
                            </TOP3imgSector>
                        </ImgBox>
                        <TextSector>
                            {topBooks.length > 0 && (
                                <TextBox>
                                    <DownLoad>소장수 {topBooks[currentIndex].download}</DownLoad>
                                    <Info>
                                        <Title>{topBooks[currentIndex].title}</Title>
                                        <Writer>{topBooks[currentIndex].author} 작가님</Writer>
                                    </Info>
                                    <Summary>
                                        <SummaryText text={topBooks[currentIndex].summary} maxLength={135} />
                                    </Summary>
                                </TextBox>
                            )}
                        </TextSector>
                        <ButtonBox>
                            <RightButton onClick={NextBook} src={RightButtonImg}></RightButton>
                        </ButtonBox>
                    </BestBox>
                </UpperContainer>
                
                <SearchBox>
                    <SearchBarBox>
                        <SearchDropdown value={searchOption} onChange={(event) => setSearchOption(event.target.value)}>
                            <Option value="제목">제목</Option>
                            <Option value="작가명">글쓴이</Option>
                        </SearchDropdown>
                        <KeyWordInputBox value={searchKeyword} onChange={(event) => setSearchKeyword(event.target.value)} placeholder="검색할 키워드를 입력하세요"></KeyWordInputBox>
                        <SearchButton onClick={handleSearch}>검색</SearchButton>
                    </SearchBarBox>
                    <SortedDropdown value={sortedKeyword} onChange={handleSort}>
                            <Option value="기본">정렬기준</Option>
                            <Option value="소장수많은순">소장수↑</Option>
                            <Option value="소장수적은순">소장수↓ </Option>
                            <Option value="날짜빠른순">날짜순↑</Option>
                            <Option value="날짜느린순">날짜순↓</Option>
                    </SortedDropdown>
                </SearchBox>
                <ListBox>
                    <List>
                        {searchClick === false && books.length > 0 && books.map((book, index) => (
                            <Lists key={index} onClick={()=> handleBookClick(book)}>
                                <TotalText width='43%'>{book.title}</TotalText>
                                <TotalText width='22%'>{book.author} 작가님</TotalText>
                                <TotalText width='15%'>소장수 {book.download}</TotalText>
                                <TotalText width='20%'>{book.createdAt.split('T')[0]}</TotalText>

                            </Lists>
                        ))}
                        {searchClick === true && searchResults.length > 0 && searchResults.map((book, index) => (
                            <Lists height={searchResults.length} key={index} onClick={()=> handleBookClick(book)}>
                                <TotalText width='43%'>{book.title}</TotalText>
                                <TotalText width='22%'>{book.author} 작가님</TotalText>
                                <TotalText width='15%'>소장수 {book.download}</TotalText>
                                <TotalText width='20%'>{book.createdAt.split('T')[0]}</TotalText>

                            </Lists>
                        ))}
                        {searchClick === true && searchResults.length === 0 && (
                            <>
                                <Lists>
                                    <TotalText>"검색결과가 없습니다"</TotalText>
                                </Lists>
                             
                            </>
                        )}
                    </List>
                </ListBox>
            </Container>
            <BookPreviewModal isOpen={isModalOpen} onClose={closeModal}>
    {selectedBook && (
        <>
            <CloseBtn onClick={closeModal} src={closeBtn}></CloseBtn>
            <PreviewContent>
                <img style={{width : '18rem' , height : '15rem', marginRight:'2rem'}} src={selectedBook.imageURL}/>
                <PrevTextSector>
                    <PrevText marginBottom="1.4rem">소장수 {selectedBook.download}</PrevText>
                    <PrevText height="18%" fontSize="1.9rem">{selectedBook.title}</PrevText>
                    <PrevText height="8%" fontSize="1.7rem" marginBottom="1.8rem">{selectedBook.author} 작가님</PrevText>
                    <PrevText height="40%" fontSize="1.4rem">
                        <SummaryText text={selectedBook.summary} maxLength={132} />
                    </PrevText>
                </PrevTextSector>
            </PreviewContent>
            <ButtonContent>
                {selectedBook.author === userInfo.nickname ? (
                    <DownloadInfo>작가님의 책입니다</DownloadInfo>
                ) : selectedBook.downloaded ? (
                    <DownloadInfo>이미 소장한 책입니다</DownloadInfo>
                ) : null}
                <BtnArea>
                    <PrevBtn disabled={selectedBook.downloaded || selectedBook.author === userInfo.nickname } onClick={() => collectStory(selectedBook.storyId, userInfo.loginId)}>소장하기</PrevBtn>
                    <PrevBtn onClick={() => goDetail(selectedBook.storyId)}>그림책 보기</PrevBtn>

                </BtnArea>
            </ButtonContent>
        </>
    )}
        </BookPreviewModal>
        </Background>
    );
};

export default LibraryPage;