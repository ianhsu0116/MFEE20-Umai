import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AuthService from "./services/auth.service";
import courseService from "./services/course.service";
import HomePage from "./pages/Homepage/HomePage";
import Navbar from "./components/Navbar";
import NavbarHomePage from "./components/NavbarHomePage";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";
import Masonry from "./pages/Masonry/Masonry";
import Forum from "./pages/Forum/Forum";
import Discussion from "./pages/Forum/Discussion";

import About from "./pages/About/About";
import Course from "./pages/Course/Course";
import Chef from "./pages/Chef/Chef";

import CourseDetail from "./pages/CourseDetail/CourseInfomation";
import CourseStar from "./pages/CourseDetail/CourseStar";
import DefaultStudentCard from "./components/DefaultStudentCard";
import StarGroup from "./components/StarGroup";
import ChefCard from "./components/ChefCard";
import CourseMiniCard from "./components/CourseMiniCard";
import ShareCard from "./components/ShareCard";
import Calendar from "./components/Calendar";
import CalendarAvailable from "./components/CalendarAvailable";
import CalendarMulti from "./components/CalendarMulti";
import Footer from "./components/Footer";

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

  //課程搜尋列狀態
  const [isActiveCourseSearch, setActiveCourseSearch] = useState("false");

  //課程搜尋列狀態判斷
  const handleToggleCourseSearch = async () => {
    setActiveCourseSearch(!isActiveCourseSearch);
  };

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
  // //將選購課程的詳細資料，存入state中
  // async function addCourseInfoIntoCart(course_id) {
  //   //驗證該課程是否已經被加入購物車、有無重複加入購物車
  //   let isCourseAdded = await cartCourseInfoList.filter((obj) => {
  //     return obj.id === course_id;
  //   });
  //   if (isCourseAdded === []) {
  //     //該課程尚未加入購物車
  //     let res = courseService.course_courseId(course_id);
  //     let { newCourseInfo } = (await res).data;
  //     newCourseInfo["cartCourseCount"] = 1;
  //     setCartCourseInfoList([...cartCourseInfoList, newCourseInfo]);
  //   } else if (isCourseAdded !== [] && isCourseAdded.length === 1) {
  //     //該課程已加入購物車，增加報名人數(無重複加入購物車)
  //     isCourseAdded["cartCourseCount"] >= 1 &&
  //     isCourseAdded["cartCourseCount"] <=
  //       isCourseAdded["member_limit"] - isCourseAdded["member_count"]
  //       ? (isCourseAdded["cartCourseCount"] =
  //           isCourseAdded["cartCourseCount"] + 1)
  //       : console.log("已達報名人數上限");
  //     //[waiting]待新增 於加入溝物車時 處理 "已達報名人數上限" 的function
  //     let newCartCourseInfoList = cartCourseInfoList;
  //     newCartCourseInfoList["cartCourseCount"] =
  //       isCourseAdded["cartCourseCount"];
  //     setCartCourseInfoList(newCartCourseInfoList);
  //   }
  // }

  // //檢查購物車是否有異常狀況(重複加入購物車)，若有異常則更新購物車
  // async function handleCartException() {
  //   // 產生一個包含當前購物車所有課程id的陣列，例：[1,2,3,1,5,6]
  //   let courseIdArray = cartCourseInfoList.map((obj) => obj.id);
  //   let newCartCourseInfoList = [];
  //   //逐一比對購物車內容，並去除重複課程、更新購物車state
  //   courseIdArray.forEach((courseId) => {
  //     if (
  //       newCartCourseInfoList.find((obj) => obj.id === courseId) === undefined
  //     ) {
  //       newCartCourseInfoList = [
  //         ...newCartCourseInfoList,
  //         cartCourseInfoList.find((obj) => obj.id === courseId),
  //       ];
  //     }
  //   });
  //   setCartCourseInfoList(newCartCourseInfoList);
  // }

  // // 頁面首次render與購物車有增減時要檢查
  // useEffect(() => {
  //   try {
  //     // handleCartException();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [cartCourseInfoList]);

  return (
    <Router>
      <Navbar
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
          <Route path="/Discussion" exact>
            <Discussion />
          </Route>
          <Route path="/courses/category" exact>
            <Course />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/courses/:course_id" exact>
            <CourseDetail />
          </Route>
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
