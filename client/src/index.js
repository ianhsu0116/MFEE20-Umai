import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

export const debug = true
// 測試開發/營運網址
export const devUrl = 'http://localhost:3000'
export const prodUrl = 'http://www.abc.com'

export const pathnameList = [
  '/courses',
  '/about',
  '/masonry',
  '/chef',
  '/contactus',
  '/forum'
]

export const pathnameTextList = [
  '/課程探索',
  '/關於我們',
  '/課程體驗',
  '/主廚殿堂',
  '/聯絡我們',
  '/討論區'
]

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
