import styled from 'styled-components';

const StoryNameM = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform : translate(-50%, -50%);
	z-index: 1000;
	width: 40rem;
	height: 20rem;
	background-color: #BD8080;
	font-size: 2rem;
	font-weight: 300;
	border-radius: 1.5rem;
`

const StoryNameModal = ({ isOpen, onClose, children }) => {
		if (!isOpen) return null;

		return (
				<StoryNameM>
					{/* <div style="color:pink"></div> */}
						{children}
				</StoryNameM>
		);
};


export default StoryNameModal;