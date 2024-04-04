import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import logoPic from "../../assets/header/logopic.png";
import ProfilePic from "../../assets/header/profilepic.png";
import useUserStore from "../Counter/UserStore";

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1rem 0rem 1.5rem;
`;

const Logo = styled.img`
  height: 6.6rem;
  width: 6.6rem;
`;
const Profile = styled.div`
  position: relative;
  display: flex;
  text-align: right;
  right: 1rem;
  /* width: 20rem; */
  height: 4rem;
  flex-shrink: 0;
  border-radius: 3rem;
  border: 1px solid #fff;
  background: rgba(224, 224, 224, 0.5);
  box-shadow: 2.5px 2.5px 2.5px 2.5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const ProfileAnimal = styled.img`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
`;

const NameInfo = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  padding: 0.9rem 0.5rem 0.9rem 0.9rem;
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #000;
  font-size: 2.2rem;
  font-weight: 500;
  flex-grow: 1;
  /* background-color: aqua; */
`;
const NickName = styled.div`
  font-size: 70%;
  font-size: 2.2rem;
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
  border: 1px solid #fff;
  background: rgba(224, 224, 224, 0.5);
  justify-content: center;
  color: #fff;
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  box-shadow: 2.6px 2.6px 2.6px 2.6px rgba(0, 0, 0, 0.25);
  display: ${(props) => (props.show ? "flex" : "none")};
  opacity: 0;
  ${(props) =>
    props.show &&
    css`
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
  // const [membersInfo, setmembersInfo] = useState(null)
  const userInfo = useUserStore((state) => state.userInfo);

  const logout = () => {
    try {
      document.cookie = "memberId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "loginId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    } catch {
      console.log("로그아웃 실패");
    }
  };

  // function getCookieValue(cookieName) {
  //   const cookies = document.cookie.split('; ');
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split('=');
  //     if (cookie[0] === cookieName) {
  //       return decodeURIComponent(cookie[1]);
  //     }
  //   }
  //   return null;
  // }

  // useEffect(() => {
  //   const memberId = getCookieValue('memberId');
  //   if (memberId) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`https://kkirikkiri.shop/api/members/${memberId}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //         if (response.ok) {
  //           const data = await response.json();
  //           setmembersInfo(data);
  //         } else {
  //           console.log('데이터를 가져오는데 실패했습니다.');
  //         }
  //       } catch (error) {
  //         console.error('데이터를 가져오는 동안 오류가 발생했습니다.', error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, []);

  return (
    <Headers>
      <Link to="/">
        <Logo src={logoPic} />
      </Link>
      <Profile onClick={() => setShowDropdown(!showDropdown)}>
        {userInfo ? <ProfileAnimal src={userInfo.thumbnail} /> : <ProfileAnimal src={ProfilePic} />}
        <NameInfo>
          <NickName>{userInfo && userInfo.nickname}</NickName>
          <NameType>작가님</NameType>
        </NameInfo>
        <DropdownMenu show={showDropdown}>
          <MenuItem as={Link} to="/mypage">
            마이페이지
          </MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </DropdownMenu>
      </Profile>
    </Headers>
  );
};

export default Header;
