import './App.css'
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MypagePage from "./pages/MypagePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import StoryPage from "./pages/StoryPage.jsx"
import BookshelfPage from './pages/BookshelfPage.jsx';
import WritingStudyPage from './pages/WritingStudyPage.jsx'
import SpeakingStudyPage from './pages/SpeakingStudyPage.jsx'
import StorybookPage from "./pages/StoryBookPage.jsx";
import Test from "./pages/Test.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import STT from './pages/STT.jsx';
import Test2 from "./pages/Test2.jsx";
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
        <Route path="/signup" element={<SignupPage />} />
          <Route element={<LayoutWithHeader />}>
            <Route path="/mypage" element={<MypagePage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/story/:story_id" element={<StoryPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/Storybook/:story-id" element={<StorybookPage/>} />
            <Route path="/bookshelf" element={<BookshelfPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/study-write/:story-id" element={<WritingStudyPage />} />
            <Route path="/study-speak" element={<SpeakingStudyPage />} />
          </Route>
        <Route path="*" element={<ErrorPage />} />
        {/* <Route path="/stttest" element={<STT/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
