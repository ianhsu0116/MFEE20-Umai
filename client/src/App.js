import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChefCard from "./components/ChefCard";
import CourseMiniCard from "./components/CourseMiniCard";
import ShareCard from "./components/ShareCard";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";

import About from "./pages/About/About";

import Course from "./pages/Course/Course";

import CourseDetail from "./pages/CourseDetail/CourseHeaderPicture"

import DefaultStudentCard from "./components/DefaultStudentCard";
import StarGroup from "./components/StarGroup";


function App() {
  let [showLogin, setShowLogin] = useState(false);

  // 開啟Login Container
  const handleLoginClick = (e) => {
    e.stopPropagation();
    console.log("loginOpen");
    setShowLogin(true);
  };

  // 點擊任意處關閉login container
  useEffect(() => {
    window.addEventListener("click", (e) => {
      setShowLogin(false);
      console.log("window");
    });
  }, []);

  return (
    <Router>
      <Navbar handleLoginClick={handleLoginClick} />
      {showLogin && <Login />}
      <Switch>
        <Route path="/" exact>
          <h1>home</h1>
          <DefaultStudentCard />
          <ChefCard />
          <ShareCard />
          <CourseMiniCard />
          <StarGroup percent={96} allScore={50} />
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter />
        </Route>
        <Route path="/course/category" exact>
          <Course />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/course/:course_id" exact>
          <CourseDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
