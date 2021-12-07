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

  //儲存購物車的課程資訊
  const [cartCourseInfoList, setCartCourseInfoList] = useState([]);
  // [{
  //   course_id: "",
  //   member_id: "",
  //   course_image: "",
  //   course_name: "",
  //   course_price: "",
  //   member_limit: "",
  //   batch_id: "", //(course_batch table)
  //   batch_date: "", //(course_batch table)
  //   member_count: "", //(course_batch table)
  //   cartCourseCount: 1, //(notInDB)
  // }]

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

  //清空新增課程state (加入課程A)
  async function clearNewAddCourse() {
    //清空並觸發Navbar2中的useEffect
    await setNewAddCourse({});
    console.log("clearNewAddCourse");
  }

  // 把課程加入購物車資料庫 (加入課程B)
  async function addCourseIntoCart(member_id, course_id, batch_id) {
    //檢查購物車資料庫中是否已經有此課程
    console.log("addCourseIntoCart FE");
    console.log(member_id, course_id, batch_id);
    let IfInCartResult = await courseService.IfCourseInCart(
      member_id,
      course_id,
      batch_id
    );
    let ifIncart = IfInCartResult.data.inCart[0]?.inCart;
    console.log("back to FE");
    console.log(ifIncart);
    // console.log(ifIncart);

    //產生購物車中，單筆課程所需用到的資料
    let getOneCourseObject = async () => {
      try {
        // 根據course_id與batch_id拿到購物車所需的課程資料 (cart)
        let result = await courseService.getOneCourseObject(
          course_id,
          batch_id
        );
        return {
          member_id,
          course_id,
          batch_id,
          ...result.data.courseInfoInCart[0],
          cartCourseCount: 1,
        };
      } catch (error) {
        console.log(error);
      }
    };

    //先在switch外宣告一個共用變數，用來接住函數回傳的結果
    let CartCourseObject;

    //已有此課程就更新的購物車(UPDATE inCart)，若沒有則新增資料(INSERT)
    switch (ifIncart) {
      //在資料庫中但不在購物車中
      case 0:
        // 根據member_id, course_id, batch_id把更新購物車資料庫(Update)
        console.log("UpdateCart");
        let updateResult = await courseService.UpdateCart(
          member_id,
          course_id,
          batch_id,
          1
        );
        try {
          CartCourseObject = await getOneCourseObject();
        } catch (error) {
          console.log(error);
        }
        console.log("回傳購物車資訊");
        console.log(CartCourseObject);
        break;

      //在資料庫中也在購物車中
      case 1:
        try {
          CartCourseObject = await getOneCourseObject();
        } catch (error) {
          console.log(error);
        }
        console.log("回傳購物車資訊");
        console.log(CartCourseObject);
        break;

      //不在資料庫中
      case undefined:
        // 把課程加入購物車資料庫(INSERT)
        await courseService.addCourseIntoCart(member_id, course_id, batch_id);
        try {
          CartCourseObject = await getOneCourseObject();
        } catch (error) {
          console.log(error);
        }
        console.log("回傳購物車資訊");
        console.log(CartCourseObject);
        break;
      //ifIncart error
      default:
        console.log("ifIncart error");
        break;
    }

    if (ifIncart === 1) {
      await setNewAddCourse([CartCourseObject, "+1"]);
    } else {
      setNewAddCourse([CartCourseObject]);
    }
    console.log("setNewAddCourse");
    console.log("Exit");
  }

  // 結帳資料
  const [checkoutCourse, setCheckoutCourse] = useState({
    member_id: undefined,
    course_id: undefined,
    batch_id: undefined,
    cartCourseCount: 1,
  });

  const getAllCourseObject = async function (member_id) {
    let result = await courseService.getAllCourseObject(member_id);
    let newCartCourseInfoList = result.data.courseInfoInCart;
    setCartCourseInfoList(newCartCourseInfoList);
    console.log(newCartCourseInfoList);
  };

  useEffect(() => {
    if (currentUser) {
      try {
        getAllCourseObject();
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentUser]);

  return (
    <Router>
      <Navbar2
        handleLoginClick={handleLoginClick}
        currentUser={currentUser}
        isActiveCourseSearch={isActiveCourseSearch}
        handleToggleCourseSearch={handleToggleCourseSearch}
        cartCourseInfoList={cartCourseInfoList}
        setCartCourseInfoList={setCartCourseInfoList}
        checkoutCourse={checkoutCourse}
        setCheckoutCourse={setCheckoutCourse}
        newAddCourse={newAddCourse}
        setNewAddCourse={setNewAddCourse}
        clearNewAddCourse={clearNewAddCourse}
        addCourseIntoCart={addCourseIntoCart}
      />
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}

      <Switch>
        <Route path="/" exact>
          <div className="footerPadding">
            <HomePage />
          </div>
          <Footer />
        </Route>
        <Route path="/ShoppingCart" exact>
          <ShoppingCart
            currentUser={currentUser}
            checkoutCourse={checkoutCourse}
          />
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter
            currentUser={currentUser}
            clearNewAddCourse={clearNewAddCourse}
            addCourseIntoCart={addCourseIntoCart}
            checkoutCourse={checkoutCourse}
            setCheckoutCourse={setCheckoutCourse}
          />
        </Route>
        <Route path="/Forum" exact>
          <div className="footerPadding">
            <Forum currentUser={currentUser} />
          </div>
          <Footer />
        </Route>
        <Route path="/courses/category" exact>
          <div className="footerPadding">
            <Course
              currentUser={currentUser}
              clearNewAddCourse={clearNewAddCourse}
              addCourseIntoCart={addCourseIntoCart}
              checkoutCourse={checkoutCourse}
              setCheckoutCourse={setCheckoutCourse}
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
        </Route>
        <Route path="/ForumPublish" exact>
          <div className="footerPadding">
            <ForumPublish currentUser={currentUser} />{" "}
          </div>{" "}
          <Footer />
        </Route>
        <Route path="/ForumUpdate" exact>
          <div className="footerPadding">
            <ForumUpdate currentUser={currentUser} />{" "}
          </div>
          <Footer />{" "}
        </Route>

        <Route path="/courses/:course_id" exact>
          <div className="footerPadding">
            <CourseDetail
              currentUser={currentUser}
              clearNewAddCourse={clearNewAddCourse}
              addCourseIntoCart={addCourseIntoCart}
              checkoutCourse={checkoutCourse}
              setCheckoutCourse={setCheckoutCourse}
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
            <Chef currentUser={currentUser} />
          </div>
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
