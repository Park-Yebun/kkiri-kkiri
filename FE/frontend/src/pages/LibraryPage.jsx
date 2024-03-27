import Background from "../components/common/Background";
import background from "../assets/library/librarybackimg.png"
import styled from "styled-components";
import crown from '../assets/library/crown.png'
import { useState, useEffect } from "react";
import LeftButtonImg from '../assets/library/arrow_left.png'
import RightButtonImg from '../assets/library/arrow_right.png'
import BookPreviewModal from "../components/Modal/BookPreviewModal";
import closeBtn from '../assets/library/clear.png'


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
    border-radius: 3.125rem;
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
    background-color : pink;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    border-radius: 3.125rem;
    background: rgba(55, 55, 55, 0.90);
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
    background: rgba(167, 167, 167, 0.90);
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size: 1.853vw;
    text-align : center;
    
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
    font-family: "Ttangsbudaejjigae OTF";
    font-size:  1.853vw;
    text-align : center;
    line-height : 6.25vh;
    line-height : 6.7vh;

`
const SortedDropdown = styled.select`

    width: 11.719vw;
    height: 6.25vh;
    background-color : gray;
    border-radius: 1.875rem;
    border: 1px solid #A7A7A7;
    background: rgba(167, 167, 167, 0.90);
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 500;
    font-size:  1.853vw;
    text-align : center;
    
`
const ImgBox = styled.div`
    width : 26.5vw;
    height : 25.27vh;
    /* background-color : lightcoral; */

    
`
const ContentBox = styled.div`
    width : 47.5375vw;
    height : 25.27vh;
    /* background-color : lightcoral; */
    display : flex;
`
const Top3Text = styled.div`
    font-size:  1.953vw;
    font-family : 'Ttangsbudaejjigae OTF';
    color: #F6DA47;
    margin-top : 1.5rem;
`
const CrownImg = styled.img`
    height : 3.69vh;
    width : 2.5vw;
    margin-top : 2.15rem;
    margin-left : 2.81rem;
    margin-right : 1.03rem;
    
`
const Logo = styled.div`
    display : flex;
    width : 78.125vw;
    height : 5.98vh;
    /* background-color : white; */
`

const DownLoad = styled.div`
    align-items : center;
    font-size: 1.2671vw;
    font-weight: 300;
    
`
const Title = styled.div`
    font-size: 2.639vw;
    margin-right : 1.68vw;
`
const Writer = styled.div`
    margin-top : 0.4rem;
    font-size: 1.7vw;
`
const Info = styled.div`
    display : flex;
`
const Summary = styled.div`
    font-size: 1.5671vw;
    margin-bottom : 3.96rem;
`
const TotalText = styled.div`
    width : ${(props) => props.width ||'20%'};
    overflow : hidden;
    white-space : nowrap;
    margin-bottom : ${(props) => props.marginBottom || '0'};
  
`

const Lists = styled.div`
    font-family: "Ttangsbudaejjigae OTF";
    display : flex;
    justify-content : space-between;
    align-items : center; 
    text-align : center;
    margin-top : 1.4rem;
    /* margin-bottom : 2rem; */
    
`
const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 3.94rem;
    margin-right: 3.94rem;
    margin-top: 1.5vw;
    margin-bottom: 0.75rem;
    height: ${(props) => props.height * 3.75}vh;
    max-height: 30vh; 
    overflow-y: auto; 
    width: 73.203vw;
    color: white;
    font-weight: 300;
    font-size: 2.95vh;

    &::-webkit-scrollbar {
        width: 1.375rem; 
    }

    &::-webkit-scrollbar-track {
    background:  rgba(55, 55, 55, 0.90); 
    border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 1.25rem;
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
    justify-content : space-between;
    width : 26.5vw;
    height : 25.27vh;
    /* margin-top : 1.73rem; */
    /* background-color : red; */
`
const StoryImage = styled.img`
    height: 22.60525vh;
    width :  21.4vw;
    border-radius: 1.25rem;
    margin-top : 0.73rem;
    /* background-color: blue; */

`
const RightButton = styled.img`
    width : 3.75vw;
    height : 5.024vh;
`
const TextSector = styled.div`
    width : 43.1vw;
    height : 25.27vh;
    /* background-color : blue; */
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    color : white;
    font-family: "Ttangsbudaejjigae OTF";
  
` 

const PreviewContent = styled.div`
    display : flex;
    /* margin-top : 8.69rem; */
    width : 53.918vw;
    height : 26.19vh;
    /* background-color : green; */
    margin-bottom : 4.65rem;    
`
const ButtonContent = styled.div`
    display : flex;
    justify-content : space-between;
    width : 34.693vw;
    height : 8.625vh;
    /* background-color : yellow; */
`

const PrevTextSector = styled.div`
    width : 28.327vw;
    height : 30vh;
    display : flex;
    flex-direction : column;
    /* background-color : skyblue; */
    
`
const PrevText = styled.div`
    /* overflow : hidden; */
    margin-bottom : ${(props) => props.marginBottom || '0'};
    height : ${(props) => props.height || '8%'};
    font-family: 'Ttangsbudaejjigae OTF';
    font-weight: 300;
    font-size : ${(props) => props.fontSize || '1.19vw'};
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

`
const CloseBtn = styled.img`
    width : 2.9vw;
    height : 3.9vh;
    margin-top : 1vh;
    margin-left : 55vw;
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
    


    const NextBook = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % topBooks.length);
    };

    const prevBook = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + topBooks.length) %  topBooks.length)
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/dummydata/librarystory.json');
            const data = await response.json();
            console.log(data);
            setBooks(data);
            console.log(books);

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
                sortedBooks.sort((a,b) => new Date(b.Date) - new Date(a.Date));
                break;
            case "날짜느린순":
                sortedBooks.sort((a,b) => new Date(a.Date) - new Date(b.Date));
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
    setSelectedBook(book);
    openModal();
   };

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
                    <ContentBox>
                    <TextSector>
                        {topBooks.length > 0 && (
                            <>
                                <DownLoad>소장수 {topBooks[currentIndex].download}</DownLoad>
                                <Info>
                                    <Title>{topBooks[currentIndex].title}</Title>
                                    <Writer>{topBooks[currentIndex].author} 작가님</Writer>
                                </Info>
                                <Summary>{topBooks[currentIndex].summary}</Summary>
                            </>
                        )}
                    </TextSector>
                        <ButtonBox>
                            <RightButton onClick={NextBook} src={RightButtonImg}></RightButton>
                        </ButtonBox>
                    </ContentBox>
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
                                <TotalText width='30%'>{book.title}</TotalText>
                                <TotalText width='30%'>{book.author} 작가님</TotalText>
                                <TotalText>소장수 {book.download}</TotalText>
                                <TotalText>{book.Date}</TotalText>
                            </Lists>
                        ))}
                        {searchClick === true && searchResults.length > 0 && searchResults.map((book, index) => (
                            <Lists height={searchResults.length} key={index} onClick={()=> handleBookClick(book)}>
                                <TotalText width='30%'>{book.title}</TotalText>
                                <TotalText width='30%' >{book.author} 작가님</TotalText>
                                <TotalText>소장수 {book.download}</TotalText>
                                <TotalText>{book.Date}</TotalText>
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
                <img style={{width : '22.93lvw' , height : '26.1857vh', marginRight:'6.3rem'}} src={selectedBook.imageURL}/>
                <PrevTextSector>
                    <PrevText marginBottom="1.81rem">소장수 {selectedBook.download}</PrevText>
                    <PrevText height="23.13%" fontSize="2.712vw">{selectedBook.title}</PrevText>
                    <PrevText height="12.117%" fontSize="1.612vw" marginBottom="2rem">{selectedBook.author} 작가님</PrevText>
                    <PrevText height="43%" fontSize="1.412vw">{selectedBook.summary}</PrevText>
                </PrevTextSector>
            </PreviewContent>
            <ButtonContent>
                <PrevBtn>소장하기</PrevBtn>
                <PrevBtn>그림책 보기</PrevBtn>
            </ButtonContent>
        </>
    )}
</BookPreviewModal>
        </Background>
    );
};

export default LibraryPage;
