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

  //課程搜尋列狀態
  const [newAddCourse, setNewAddCourse] = useState({});

  //課程搜尋列狀態判斷
  const handleToggleCourseSearch = async () => {
    setActiveCourseSearch(!isActiveCourseSearch);
  };

  // 把課程加入購物車資料庫
  async function addCourseIntoCart(member_id, course_id, batch_date) {
    //檢查購物車中是否已經有此課程
    let IfInCartResult = await courseService.IfCourseInCart(
      member_id,
      course_id,
      batch_date
    );

    //已有此課程就更新的購物車(UPDATE inCart)，若沒有則新增資料(INSERT)
    if (IfInCartResult.data.inCart === 1) {
      // 根據course_id把課程加入購物車資料庫(Update)
      await courseService.UpdateCart(member_id, course_id, batch_date);
    } else {
      // 根據course_id把課程加入購物車資料庫(cart)
      await courseService.addCourseIntoCart(member_id, course_id, batch_date);
    }
    setNewAddCourse(await courseService.getCourseOfCart(member_id));
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
        newAddCourse={newAddCourse}
        setNewAddCourse={setNewAddCourse}
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
              addCourseIntoCart={addCourseIntoCart}
            />
          </Route>
          <Route path="/Forum" exact>
            <Forum />
            <Footer />
          </Route>
          <Route path="/courses/category" exact>
            <Course
              currentUser={currentUser}
              addCourseIntoCart={addCourseIntoCart}
            />
            <Footer />
          </Route>
          <Route path="/about" exact>
            <About />
            <Footer />
          </Route>
          <Route path="/contactus" exact>
            <Contactus />
            <Footer />
          </Route>
          <Route path="/courses/:course_id" exact>
            <CourseDetail
              currentUser={currentUser}
              addCourseIntoCart={addCourseIntoCart}
            />
            <Footer />
          </Route>
          <Route path="/ShoppingList" exact>
            <ShoppingList currentUser={currentUser} />
            <Footer />
          </Route>
          <Route path="/PaymentMethod" exact>
            <PaymentMethod currentUser={currentUser} />
            <Footer />
          </Route>
          <Route path="/chef" exact>
            <Chef />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
