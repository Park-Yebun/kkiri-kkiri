
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"

// 쓸 때 주석해제하세요

// import MypagePage from "./pages/Mypagepage.jsx"
// import MainPage from "./pages/MainPage.jsx"
// import BookshelfPage from "./pages/BookshelfPage.jsx"
// import LibraryPage from "./pages/LibraryPage.jsx"


const App = () => {

  return(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />

      {/* <Route path="/mypage" element={<MypagePage/>} />
      <Route path="/" element={<MainPage/>} />
      <Route path="/bookshelf" element={<BookshelfPage/>} />
      <Route path="/library" element={<LibraryPage/>} /> */}


    {/* 동적경로 포함된 라우터는 나중에 추가하세요 */}
    {/* 이야기, 동화책, 학습 페이지입니다 */}
    </Routes>
  </BrowserRouter>

  );

}

export default App