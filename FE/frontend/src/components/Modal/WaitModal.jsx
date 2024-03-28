
import styled from "styled-components";

const WaitModal = styled.div`
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
  width: 63.397vw;
  height: 55.8125vh; 
  color : white; 
`

const BookPreviewModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen 상태에 따라 모달을 열거나 닫습니다.

    return (
       <PreviewModal>
            {children}
       </PreviewModal>
    );
};

export default WaitModal;


