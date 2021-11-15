import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import NavbarHomePage from "./components/NavbarHomePage";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import ChefCard from "./components/ChefCard";
import CourseMiniCard from "./components/CourseMiniCard";
// import CourseMiniCardSlider from "./components/CourseMiniCardSlider";
import ShareCard from "./components/ShareCard";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";

import About from "./pages/About/About";

import Course from "./pages/Course/Course";

import CourseDetail from "./pages/CourseDetail/CourseHeaderPicture";

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
      <div className="main">
        <Switch>
          <Route path="/" exact>
            <NavbarHomePage />
            <HomePage />
            {/* <DefaultStudentCard />
            <ChefCard />
            <ShareCard />
            <CourseMiniCard />
            <StarGroup percent={96} allScore={50} />
            <Calendar onChange={onChange} /> */}
          </Route>
          <Route path="/memberCenter" exact>
            <Navbar handleLoginClick={handleLoginClick} />
            {showLogin && <Login />}
            <MemberCenter />
          </Route>
          <Route path="/course/category" exact>
            <Navbar handleLoginClick={handleLoginClick} />
            {showLogin && <Login />}
            <Course />
          </Route>
          <Route path="/about" exact>
            <Navbar handleLoginClick={handleLoginClick} />
            {showLogin && <Login />}
            <About />
          </Route>
          <Route path="/course/:course_id" exact>
            <Navbar handleLoginClick={handleLoginClick} />
            {showLogin && <Login />}
            <CourseDetail />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
