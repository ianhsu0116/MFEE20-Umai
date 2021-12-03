import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AuthService from "./services/auth.service";

import NavbarOld from "./components/Navbar";
import courseService from "./services/course.service";
import HomePage from "./pages/Homepage/HomePage";
import Navbar2 from "./components/Navbar2";
import NavbarHomePage from "./components/NavbarHomePage";
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
import CourseStar from "./pages/CourseDetail/CourseStar";
import DefaultStudentCard from "./components/DefaultStudentCard";
import CourseMiniCard from "./components/CourseMiniCard";
import ShareCard from "./components/ShareCard";
import Calendar from "./components/Calendar";
import CalendarAvailable from "./components/CalendarAvailable";
import CalendarMulti from "./components/CalendarMulti";
import ForumPublish from "./pages/Forum/ForumPublish";
import ForumUpdate from "./pages/Forum/ForumUpdate";
import Footer from "./components/Footer";

function App() {
  // 存取當前登入中的使用者資料
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  // 登入視窗開關狀態
  const [showLogin, setShowLogin] = useState(false);
  const [checkoutList, setCheckoutList] = useState({
    member_id: "",
    course_id: "",
    cartCourseCount: "",
  });

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

  //課程搜尋列狀態
  const [isActiveCourseSearch, setActiveCourseSearch] = useState("false");

  //課程搜尋列狀態判斷
  const handleToggleCourseSearch = async (msg) => {
    // 點擊任意處關閉
    if (msg === "close") {
      setActiveCourseSearch(true);
    } else {
      // 點擊按鈕toggle
      setActiveCourseSearch(!isActiveCourseSearch);
    }
  };

  // 把課程資訊加入購物車
  async function addCourseIntoCart(course_id, batch_date) {
    // getCurrentInfoObject;
    let result = courseService.getCourseIntoCart(course_id, batch_date);

    // 如果這次沒回傳任何course
    if (!result.data.courseInfoInCart) {
      console.log({
        success: false,
        code: "D999",
        message: "課程未加入購物車",
      });
      return;
    }

    // // 設定當前課程的資料Array
    // setCurrentCourses(result.data.course);

    // // 設定當前使用者的所有收藏課程Array
    // setCollectionIds(result.data.course.map((item) => item.id));
  }

  // ==================== 共用元件展示用ㄉ東西 ======================

  //搜尋列推薦關鍵字
  const SearchKeywordTagList = [
    "創意壽司",
    "義大利麵",
    "紅酒燉牛肉",
    "獵人燉雞",
  ];
  //搜尋列推薦課程
  const SearchCourseList = [
    "創意壽司",
    "築地創意壽司",
    "築地高級壽司",
    "築地高級創意壽司",
  ];

  return (
    <Router>
      <Navbar2
        handleLoginClick={handleLoginClick}
        currentUser={currentUser}
        SearchKeywordTagList={SearchKeywordTagList}
        SearchCourseList={SearchCourseList}
        isActiveCourseSearch={isActiveCourseSearch}
        handleToggleCourseSearch={handleToggleCourseSearch}
        checkoutList={checkoutList}
        setCheckoutList={setCheckoutList}
        addCourseIntoCart={addCourseIntoCart}
      />
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
      <div className="footerPadding">
        <Switch>
          <Route path="/" exact>
            <HomePage />
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
          <Route path="/ForumPublish" exact>
            <ForumPublish />
          </Route>
          <Route path="/ForumUpdate" exact>
            <ForumUpdate />
          </Route>

          <Route path="/courses/:course_id" exact>
            <CourseDetail addCourseIntoCart={addCourseIntoCart} />
          </Route>
          <Route path="/ShoppingList" exact>
            <ShoppingList currentUser={currentUser} />
          </Route>
          <Route path="/PaymentMethod" exact>
            <PaymentMethod currentUser={currentUser} />
          </Route>
          <Route path="/chef" exact>
            <Chef />
          </Route>
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
