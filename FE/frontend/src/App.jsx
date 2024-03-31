import './App.css'
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage2 from "./pages/SignupPage2.jsx";
import MypagePage from "./pages/MypagePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import StoryPage from "./pages/StoryPage.jsx"
import BookshelfPage from './pages/BookshelfPage.jsx';
import StudyPage from './pages/StudyPage.jsx'
import StorybookPage from "./pages/StoryBookPage.jsx";
import Test from "./pages/Test.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import STT from './pages/STT.jsx';

function LayoutWithHeader() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="app-container">
        <Outlet />
      </div>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage2 />} />
          <Route element={<LayoutWithHeader />}>
          <Route path="/mypage" element={<MypagePage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/story/:user-id" element={<StoryPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/Storybook/:story-id" element={<StorybookPage/>} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/study" element={<StudyPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/stttest" element={<STT/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
