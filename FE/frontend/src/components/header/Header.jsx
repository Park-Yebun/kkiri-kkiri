import { useState } from 'react'
import styled, { keyframes,css } from 'styled-components';
import { Link } from 'react-router-dom';
import logoPic from '../../assets/header/logopic.png';
import ProfilePic from '../../assets/header/profilepic.png';

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
`

const Logo = styled.img`
  height: 6.6rem;
  width: 6.6rem;
`
const Profile = styled.div`
  position: relative;
  display: flex;
  text-align: right;
  right: 1rem;
  width: 20rem;
  height: 4rem;
  flex-shrink: 0;
  border-radius: 3rem;
  border: 1px solid #FFF;
  background: rgba(224, 224, 224, 0.50);
  box-shadow: 2.5px 2.5px 2.5px 2.5px rgba(0, 0, 0, 0.25);
`

const ProfileAnimal = styled.img`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
`;

const NameInfo = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  color: #FFF;
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #000;
  font-size: 2.2rem;
  font-weight: 500;
  flex-grow:1;
`;
const NickName = styled.div`
`;
const NameType = styled.div`
  margin: 0 0.8rem;
`;
const DropdownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  top: 5rem;
  right: 0rem;
  border-radius: 1rem;
  border: 1px solid #FFF;
  background: rgba(224, 224, 224, 0.50);
  justify-content: center;
  color: #FFF;
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  box-shadow: 2.6px 2.6px 2.6px 2.6px rgba(0, 0, 0, 0.25);
  display: ${props => props.show ? 'flex' : 'none'};
  opacity: 0;
  ${props => props.show && css`
    animation: ${dropDownAnimation} 1s ease forwards;
    opacity: 1;
  `};
`;

const MenuItem = styled(Link)`
  margin-top: 0.6rem;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  &:visited {
    color: inherit;
    -webkit-text-stroke-width: 0.1rem;
    -webkit-text-stroke-color: #000;
  }
`;
const dropDownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Headers>
      <Link to='/'>
        <Logo src={logoPic} />
      </Link>
      <Profile onClick={() => setShowDropdown(!showDropdown)}>
        <ProfileAnimal src={ProfilePic}/>
        <NameInfo>
          <NickName>가나다</NickName>
          <NameType>작가님</NameType>
        </NameInfo>
        <DropdownMenu show={showDropdown}>
          <MenuItem as={Link} to="/mypage">마이페이지</MenuItem>
          <MenuItem>로그아웃</MenuItem>
        </DropdownMenu>
      </Profile>
    </Headers>
  )
}

export default Header