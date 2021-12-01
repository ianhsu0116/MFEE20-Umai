import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AuthService from "./services/auth.service";
import Navbar from "./components/Navbar";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";
import ShoppingCart from "./pages/ShoppingCart/shopping-cart/ShoppingCart";
import ShoppingList from "./pages/ShoppingCart/ShoppingList/ShoppingList";
import PaymentMethod from "./pages/ShoppingCart/paymentMethod/PaymentMethod";

// 測試元件區
import Masonry from "./pages/Masonry/Masonry";
import Forum from "./pages/Forum/Forum";

import Contactus from "./pages/Contactus/Contactus";
import About from "./pages/About/About";
import Course from "./pages/Course/Course";
import Chef from "./pages/Chef/Chef";

import CourseDetail from "./pages/CourseDetail/CourseInfomation";

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

  return (
    <Router>
      <Navbar handleLoginClick={handleLoginClick} currentUser={currentUser} />
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
      <Switch>
        <Route path="/" exact>
          <h1>home</h1>
        </Route>
        <Route path="/ShoppingCart" exact>
          <ShoppingCart currentUser={currentUser} />
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
        <Route path="/ShoppingList" exact>
          <ShoppingList currentUser={currentUser} />
        </Route>
        <Route path="/PaymentMethod" exact>
          <PaymentMethod currentUser={currentUser} />
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
