import styled from 'styled-components';
import Modal1 from '../../assets/story/modal1.png';

// 모달 배경 스타일
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// 로딩 이미지 스타일
const LoadingImage = styled.img`
  max-width: 50%; // 이미지 크기 조절
  max-height: 50%;
  object-fit: contain; // 이미지 비율 유지
`;

// 로딩 텍스트 스타일
const LoadingText = styled.div`
  color: white;
  font-size: 5rem;
  margin-top: 1rem;
  justify-content: center;
  -webkit-text-stroke: 0.2rem black;
  white-space: pre-line;
  text-align: center;
  text-shadow: 0.2rem 0.2rem black;
`;

const StoryLoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
        <LoadingImage src={Modal1} alt="Loading..." />
        <LoadingText>{"이야기를 쓰는 중이야!\n조금만 기다려줘!"}</LoadingText>
    </ModalBackdrop>
  );
};

export default StoryLoadingModal;