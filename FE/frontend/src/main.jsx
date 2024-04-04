import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../public/fonts/font.css";

// 서비스 워커를 등록하는 함수
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration.scope);
        })
        .catch((err) => {
          console.error("Service Worker 등록 실패:", err);
        });
    });
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// 서비스 워커 등록 함수 호출
registerServiceWorker();
