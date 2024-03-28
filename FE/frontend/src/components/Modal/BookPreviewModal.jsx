import styled from "styled-components";

const PreviewModal = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  position : fixed;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%);
  z-index : 1000;
  background-color : #D2F9D1;
  border-radius : 4rem;
  width: 63.397vw;
  height: 55.8125vh; 
  overflow-y : auto;
  color : black; 
`

const BookPreviewModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen 상태에 따라 모달을 열거나 닫습니다.

    return (
       <PreviewModal>
            {children}
       </PreviewModal>
    );
};

export default BookPreviewModal;


