import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AuthService from "./services/auth.service";
import Navbar from "./components/Navbar";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";
import Forum from "./pages/Forum/Forum";

import Contactus from "./pages/Contactus/Contactus";
import About from "./pages/About/About";
import Course from "./pages/Course/Course";
import Chef from "./pages/Chef/Chef";

import CourseDetail from "./pages/CourseDetail/CourseInfomation";
import CourseStar from "./pages/CourseDetail/CourseStar";
import DefaultStudentCard from "./components/DefaultStudentCard";
import CourseMiniCard from "./components/CourseMiniCard";
import ShareCard from "./components/ShareCard";
import Calendar from "./components/Calendar";
import CalendarAvailable from "./components/CalendarAvailable";
import CalendarMulti from "./components/CalendarMulti";

function App() {
  // 存取當前登入中的使用者資料
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  // 登入視窗開關狀態
  const [showLogin, setShowLogin] = useState(false);

  // 開啟Login Container(登入視窗)
  const handleLoginClick = (e) => {
    e.stopPropagation();
    setShowLogin(true);
    document.querySelector("body").classList.add("stopScroll");
  };

  // 點擊任意處關閉login container(登入視窗)
  useEffect(() => {
    window.addEventListener("click", (e) => {
      setShowLogin(false);
      document.querySelector("body").classList.remove("stopScroll");
    });
  }, []);

  // ==================== 共用元件展示用ㄉ東西 ======================
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // 給萬年曆用的(回傳已選定日期)
  const onChange = (e) => {
    console.log(e);
  };
  // 給顯示可預訂日期的萬年曆用的
  let availableDays = [
    "2021-11-12",
    "2021-11-13",
    "2021-11-15",
    "2021-11-16",
    "2021-11-20",
    "2021-11-23",
    "2021-11-24",
    "2021-11-25",
    "2021-11-26",
    "2021-11-27",
    "2021-11-29",
    "2021-12-01",
    "2021-12-02",
    "2021-12-03",
    "2021-12-04",
    "2021-12-05",
  ];

  return (
    <Router>
      <Navbar handleLoginClick={handleLoginClick} currentUser={currentUser} />
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
      <Switch>
        <Route path="/" exact>
          <h1>home</h1>
          <DefaultStudentCard />
          <ShareCard />
          <CourseMiniCard />
          {/* <StarGroup percent={96} allScore={50} /> */}
          <h4>一般萬年曆</h4>
          <Calendar onChange={onChange} />
          <h4>顯示可預訂日期的萬年曆</h4>
          <CalendarAvailable
            onChange={onChange}
            availableDays={availableDays}
            setIsCalendarOpen={setIsCalendarOpen}
          />
          <h4>可多選萬年曆</h4>
          <CalendarMulti onChange={onChange} />
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/Forum" exact>
          <Forum />
        </Route>
        <Route path="/courses/category" exact>
          <Course />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/contactus" exact>
          <Contactus />
        </Route>
        <Route path="/courses/:course_id" exact>
          <CourseDetail />
        </Route>
        {/* <Route path="/Items" exact>
          <Items />
        </Route> */}
        <Route path="/chef" exact>
          <Chef />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
