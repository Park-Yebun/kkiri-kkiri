
import styled from "styled-components";

const Modal = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content: center;
  position : absolute;
  margin-top: 10rem;
  z-index : 1000;
  background-color : #ff7f7f;
  border-radius : 2rem;
  width: 40rem;
  height: 15rem;
  color : white; 
  font-size : 1rem;
`
const Btn = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 7rem;
  height : 3.5rem;
  font-size: 1.8rem;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  background-color : green;
  border-radius : 1rem;
`

const FailLoginModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen 상태에 따라 모달을 열거나 닫습니다.

    return (
       <Modal>
           <h1>로그인이 실패했어요. 다시 시도해주세요.</h1>
           <Btn onClick={onClose}>닫기 </Btn>
       </Modal>
    );
};

export default FailLoginModal;


