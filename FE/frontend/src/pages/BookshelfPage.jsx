import Background from "../components/common/Background";
import background from "../assets/bookshelf/bookshelfbackimg.png";
import BookImg from '../assets/bookshelf/bookimg.png' 
import styled from "styled-components";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const BookContainer = styled.div`
    width : 83.5188vw; 
    height : 79vh;
    display : grid;
    flex-wrap : wrap;
    /* gap : 3.62rem; */
    grid-template-columns: repeat(4, 1fr); 
    justify-content : flex-start;
    /* background-color : pink; */
    margin-top : 16.12rem; 
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

const BookCover = styled.div`
    background-image: url(${BookImg});
    cursor: pointer;
    text-align: center;
    /* border: 1px solid red; */
    height : 37.625vh;
    width : 19.179vw;
    margin-bottom : 2rem;
    margin-left : 1.2rem;   
    background-size: contain;
    background-repeat: no-repeat;
    background-position : center;
    font-family: "Ttangsbudaejjigae OTF";

`
const Book = styled.div`
    
`
const BookTitle = styled.div`
    margin-top : 13.12rem;
    font-size : 1.4vw;
    overflow : hidden;
    
`
const BookAuthor = styled.div`
    margin-top : 6rem;
    overflow : hidden;

    `

const BookshelfPage = () => {
    const [books, setBooks] = useState([]);
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

    const gotoMakeStory = () => {
        console.log('새이야기 생성하기')
        navigate('/story/:1')

    };

    return (
        <Background backgroundimage={background}>
            <BookContainer>
                <BookCover key="new" onClick={gotoMakeStory}>
                    <BookTitle></BookTitle>
                </BookCover>
                {books.map(book => (
                    <BookCover>
                        <BookTitle>{book.title}</BookTitle>
                        <BookAuthor>{book.author}</BookAuthor>
                    </BookCover>
                ))}
           
            </BookContainer>
        </Background>
    );
};

export default BookshelfPage;