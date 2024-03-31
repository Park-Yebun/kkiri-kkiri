import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SelectTypeModal = styled.div`
  /* display : flex;
  flex-direction : column;
  align-items : center;
  position : fixed;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%);
  z-index : 1000;
  border-radius: 1.25rem;
  background: rgba(226, 210, 210, 0.90);
  width: 63.397vw;
  height: 55.8125vh; 
  color : white;  */
`
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SelectStudyTypeModal = ({ isOpen, onClose, children }) => {
   const handleSpeakingStudy = () => {

   };

   const handleWritingStudy = () => {

   }; 

    if (!isOpen) return null; // isOpen 상태에 따라 모달을 열거나 닫습니다.

    return (
       <SelectTypeModal>
        <ModalContent>
          <h2>어떤 공부를 하시겠습니까?</h2>
          <Button onClick={handleSpeakingStudy}>말하기 공부</Button>
          <Button onClick={handleWritingStudy}>쓰기 공부</Button>
          <Button onClick={onClose}>닫기</Button>
      </ModalContent>
       </SelectTypeModal>
    );
};

export default SelectStudyTypeModal;


