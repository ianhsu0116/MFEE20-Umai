import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChefCard from "./components/ChefCard";
import CourseMiniCard from "./components/CourseMiniCard";
import ShareCard from "./components/ShareCard";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";
import Masonry from "./pages/Masonry/Masonry";
import Forum from "./pages/Forum/Forum";
import Discussion from "./pages/Forum/Discussion";
import Try from "./pages/Try";

import About from "./pages/About/About";

import Course from "./pages/Course/Course";

import CourseDetail from "./pages/CourseDetail/CourseHeaderPicture"

import DefaultStudentCard from "./components/DefaultStudentCard";
import StarGroup from "./components/StarGroup";

import Calendar from "./components/Calendar";

function App() {
  let [showLogin, setShowLogin] = useState(false);

  // 開啟Login Container
  const handleLoginClick = (e) => {
    e.stopPropagation();
    setShowLogin(true);
  };

  // 點擊任意處關閉login container
  useEffect(() => {
    window.addEventListener("click", (e) => {
      setShowLogin(false);
    });
  }, []);

  const onChange = (e) => {
    console.log(e);
  };

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
          <Calendar onChange={onChange} />
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter />
        </Route>

        <Route path="/masonry" exact>
          <Masonry />
        </Route>
        <Route path="/Forum" exact>
          <Forum />
        </Route>
        <Route path="/Discussion" exact>
          <Discussion />
        </Route>
        <Route path="/Try" exact>
          <Try />

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
