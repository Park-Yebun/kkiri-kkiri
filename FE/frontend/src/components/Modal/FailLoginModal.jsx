
import styled from "styled-components";

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
  border-radius : 2rem;
  width: 40rem;
  height: 10rem;
  color : white; 
  font-size : 0.8rem;
`
const Btn = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 5rem;
  height : 3rem;
  background-color : green;
  border-radius : 1rem;
`

const FailLoginModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen 상태에 따라 모달을 열거나 닫습니다.

    return (
       <Modal>
           <h1>로그인이 실패하였습니다. 다시 시도해주세요</h1>
           <Btn onClick={onClose}>닫기 </Btn>
       </Modal>
    );
};

export default FailLoginModal;


