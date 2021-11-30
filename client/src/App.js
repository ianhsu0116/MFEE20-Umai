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
import StarGroup from "./components/StarGroup";
import ChefCard from "./components/ChefCard2";
import CourseMiniCard from "./components/CourseMiniCard2";
import ShareCard from "./components/ShareCard2";
import Calendar from "./components/Calendar";
import CalendarAvailable from "./components/CalendarAvailable";
import CalendarMulti from "./components/CalendarMulti";
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
  const handleToggleCourseSearch = async () => {
    setActiveCourseSearch(!isActiveCourseSearch);
  };

  //
  async function addCourseIntoCart(course_id) {
    // getCurrentInfoObject;
  }

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

  //課程分類左
  const CourseCategoryListLeft = ["日式料理", "法式料理", "中式料理"];
  //課程分類右
  const CourseCategoryListRight = ["韓式料理", "義式料理", "經典調飲"];

  //體驗分享左
  const ExperienceShareListLeft = ["故事牆"];
  //體驗分享右
  const ExperienceShareListRight = ["討論區"];

  return (
    <Router>
      <Navbar2
        handleLoginClick={handleLoginClick}
        currentUser={currentUser}
        SearchKeywordTagList={SearchKeywordTagList}
        SearchCourseList={SearchCourseList}
        isActiveCourseSearch={isActiveCourseSearch}
        handleToggleCourseSearch={handleToggleCourseSearch}
        CourseCategoryListLeft={CourseCategoryListLeft}
        CourseCategoryListRight={CourseCategoryListRight}
        ExperienceShareListLeft={ExperienceShareListLeft}
        ExperienceShareListRight={ExperienceShareListRight}
        checkoutList={checkoutList}
        setCheckoutList={setCheckoutList}
        addCourseIntoCart={addCourseIntoCart}
      />
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
      {/* <NavbarHomePage /> */}
      <Switch>
        <div className="footerPadding">
          <Route path="/" exact>
            <HomePage />
            {/* <DefaultStudentCard />
          <ChefCard />
          <ShareCard />
          <CourseMiniCard /> */}
            {/* <StarGroup percent={96} allScore={50} /> */}
            {/* <h4>一般萬年曆</h4> */}
            {/* <Calendar onChange={onChange} /> */}
            {/* <h4>顯示可預訂日期的萬年曆</h4>
          <CalendarAvailable
            onChange={onChange}
            availableDays={availableDays}
            setIsCalendarOpen={setIsCalendarOpen}
          /> */}
            {/* <h4>可多選萬年曆</h4> */}
            {/* <CalendarMulti onChange={onChange} /> */}
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

          <Route path="/masonry" exact>
            <Masonry />
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
        </div>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
