import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import MypagePage from "./pages/MypagePage.jsx"
import MainPage from "./pages/MainPage.jsx"

// 쓸 때 주석해제하세요
// import MainPage from "./pages/MainPage.jsx"
// import BookshelfPage from "./pages/BookshelfPage.jsx"
// import LibraryPage from "./pages/LibraryPage.jsx"


const App = () => {

  return(
  <BrowserRouter>
    <div className="header">
      <Header/>
    </div>
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/mypage" element={<MypagePage/>} />
        <Route path="/" element={<MainPage/>} />
        {/*
        <Route path="/bookshelf" element={<BookshelfPage/>} />
        <Route path="/library" element={<LibraryPage/>} /> */}

      {/* 동적경로 포함된 라우터는 나중에 추가하세요 */}
      {/* 이야기, 동화책, 학습 페이지입니다 */}
      </Routes>
    </div>
  </BrowserRouter>

  );

}

export default App