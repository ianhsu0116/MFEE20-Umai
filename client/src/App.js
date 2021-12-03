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

  // 結帳資料
  const [checkoutList, setCheckoutList] = useState({
    member_id: "",
    course_id: "",
    cartCourseCount: "",
  });

  //新增課程
  const [newAddCourse, setNewAddCourse] = useState({});

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
      // 把課程加入購物車資料庫(UPDATE)
      await courseService.UpdateCart(member_id, course_id, batch_date);
    } else {
      // 把課程加入購物車資料庫(INSERT)
      await courseService.addCourseIntoCart(member_id, course_id, batch_date);
    }
    setNewAddCourse(await courseService.getCourseOfCart(member_id));
    setNewAddCourse({});
  }

  //搜尋內容
  const [searchValue, setSearchValue] = useState("");

  // ==================== 共用元件展示用ㄉ東西 ======================

  return (
    <Router>
      <Navbar2
        handleLoginClick={handleLoginClick}
        currentUser={currentUser}
        isActiveCourseSearch={isActiveCourseSearch}
        handleToggleCourseSearch={handleToggleCourseSearch}
        checkoutList={checkoutList}
        setCheckoutList={setCheckoutList}
        newAddCourse={newAddCourse}
        setNewAddCourse={setNewAddCourse}
        addCourseIntoCart={addCourseIntoCart}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}

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
          <div className="footerPadding">
            <Forum />
          </div>
          <Footer />
        </Route>
        <Route path="/courses/category" exact>
          <div className="footerPadding">
            <Course
              currentUser={currentUser}
              addCourseIntoCart={addCourseIntoCart}
            />
          </div>
          <Footer />
        </Route>
        <Route path="/about" exact>
          <div className="footerPadding">
            <About />
          </div>
          <Footer />
        </Route>
        <Route path="/contactus" exact>
          <div className="footerPadding">
            <Contactus />
          </div>
          <Footer />
        </Route>
        <Route path="/courses/:course_id" exact>
          <div className="footerPadding">
            <CourseDetail
              currentUser={currentUser}
              addCourseIntoCart={addCourseIntoCart}
            />
          </div>
          <Footer />
        </Route>
        <Route path="/ShoppingList" exact>
          <div className="footerPadding">
            <ShoppingList currentUser={currentUser} />
          </div>
          <Footer />
        </Route>
        <Route path="/PaymentMethod" exact>
          <div className="footerPadding">
            <PaymentMethod currentUser={currentUser} />
          </div>
          <Footer />
        </Route>
        <Route path="/chef" exact>
          <div className="footerPadding">
            <Chef />
          </div>
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
