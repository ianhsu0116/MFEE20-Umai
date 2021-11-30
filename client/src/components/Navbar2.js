import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../config/config";
import { numDotFormat } from "../config/formula";

import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import { ImCross } from "react-icons/im";

import UmaiLogo from "./images/Umai.png";
import avatar from "./images/avatar.jpg";

import CartCourse from "./Navbar/CartCourse";
import { empty } from "statuses";

const Navbar = (props) => {
  let {
    handleLoginClick,
    currentUser,
    SearchKeywordTagList,
    SearchCourseList,
    isActiveCourseSearch,
    handleToggleCourseSearch,
    CourseCategoryListLeft,
    CourseCategoryListRight,
    ExperienceShareListLeft,
    ExperienceShareListRight,
  } = props;

  //儲存購物車的課程資訊
  const [cartCourseInfoList, setCartCourseInfoList] = useState([
    {
      id: 9,
      member_id: 1,
      category_id: 1,
      batch_id: 1, //(course_batch table)(alia)
      course_image: "course-44d67cba-78ee-419a-a853-907974d112aa.jpg",
      course_name: "美式經典牛排烹調高階課程",
      course_price: 5400,
      member_limit: 30,
      batch_date: "2021/12/26", //(course_batch table)
      member_count: 0, //(course_batch table)
      cartCourseCount: 1, //(notInDB)
    },
    {
      id: 10,
      member_id: 1,
      category_id: 1,
      batch_id: 2, //(course_batch table)(alia)
      course_image: "course-642d4711-beff-492a-ad6b-79d3e486fdd8.jpg",
      course_name: "極度美味中式饗宴，傳統粵式名菜",
      course_price: 2800,
      member_limit: 30,
      batch_date: "2022/01/05", //(course_batch table)
      member_count: 5, //(course_batch table)
      cartCourseCount: 1, //(notInDB)
    },
    {
      id: 11,
      member_id: 1,
      category_id: 5,
      batch_id: 3, //(course_batch table)(alia)
      course_image: "course-f22462f8-1f79-47ce-85b0-00a567d15476.jpg",
      course_name: "米其林二星經典港式傳統料理",
      course_price: 4500,
      member_limit: 25,
      batch_date: "2022/01/11", //(course_batch table)
      member_count: 10, //(course_batch table)
      cartCourseCount: 1, //(notInDB)
    },
  ]);

  //當前選購課程的總數量
  const numberOfCoursesInCart = cartCourseInfoList.length;

  //當前購物車總金額
  const [sumCartCoursePrice, setSumCartCoursePrice] = useState(0);

  //當購物車沒課程時，將總金額歸零
  async function handleSumPriceZeroing() {
    if (cartCourseInfoList.length === 0) {
      setCartCourseInfoList([]);
      setSumCartCoursePrice(0);
    }
  }

  //搜尋內容
  const [searchValue, setSearchValue] = useState("");

  //刪除搜尋內容
  async function handleSearchValueDelete() {
    setSearchValue("");
  }

  //

  //頁面初次渲染、課程加入購物車、課程報名數量改變時，即時更新金額
  useEffect(() => {
    //當購物車沒課程時，將總金額歸零
    handleSumPriceZeroing();
  }, [cartCourseInfoList]);

  return (
    <div className="Header">
      <div className="Navbar">
        <div className="Navbar-container">
          <div className="Navbar-container-item ">
            {/* Logo */}
            <div className="Navbar-container-item-container Navbar-container-item-container-UmaiLogo">
              <Link to="/">
                <img src={UmaiLogo} alt="Umai Logo" className="UmaiLogo" />
              </Link>
            </div>

            {/* 課程探索 */}
            <div className="Navbar-container-item-container">
              <button className="Navbar-container-item-btn Navbar-container-item-CourseDiscover">
                課程探索
              </button>
              {/* 下拉式選單 */}
              {/* <div className="Navbar-container-item-CourseDiscover-dropdown-hoverZone"></div> */}
              <div className="Navbar-container-item-CourseDiscover-dropdown">
                <ul>
                  {CourseCategoryListLeft.map((cate) => (
                    <li>{cate}</li>
                  ))}
                </ul>
                <ul>
                  {CourseCategoryListRight.map((cate) => (
                    <li>{cate}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 體驗分享 */}
            <div className="Navbar-container-item-container">
              <button className="Navbar-container-item-btn Navbar-container-item-ExperienceShare">
                體驗分享
              </button>
              {/* 下拉式選單 */}
              {/* <div className="Navbar-container-item-ExperienceShare-dropdown-hoverZone"></div> */}
              <div className="Navbar-container-item-ExperienceShare-dropdown">
                <ul>
                  {ExperienceShareListLeft.map((page) => (
                    <li>{page}</li>
                  ))}
                </ul>
                <ul>
                  {ExperienceShareListRight.map((page) => (
                    <li>{page}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 尋找課程 */}
            <div className="Navbar-container-item-container">
              <button
                className="Navbar-container-item-btn Navbar-container-item-CourseSearch"
                onClick={handleToggleCourseSearch}
              >
                <GoSearch />
                &ensp;尋找課程
              </button>
            </div>
          </div>

          {/* 購物車與會員中心(已登入) */}
          {currentUser && (
            <div className="Navbar-container-item">
              <div className="Navbar-container-item-container2">
                {/* 購物車按鈕 */}
                <button className="Navbar-container-item-btn2 Navbar-container-item-Cart">
                  <MdShoppingCart className="Navbar-container-item-btn2-Cart" />
                </button>
                {/* 會員中心按鈕 */}
                <Link
                  to="/memberCenter"
                  className="Navbar-container-item-btn Navbar-container-item-btn2"
                >
                  {/* 會員已登入且有大頭貼 */}
                  {currentUser && currentUser.avatar && (
                    <img
                      src={`${PUBLIC_URL}/upload-images/${currentUser.avatar}`}
                      alt="使用者頭貼"
                      className="Navbar-container-item-btn Navbar-container-item-btn2-avatar"
                    />
                  )}
                  {/* 會員已登入但沒有大頭貼 */}
                  {currentUser && !currentUser.avatar && (
                    <img
                      src={avatar}
                      alt="使用者頭貼"
                      className="Navbar-container-item-btn Navbar-container-item-btn2-avatar"
                    />
                  )}
                </Link>

                {/* 購物車框框 */}
                <div className="Navbar-container-item-Cart-dropdown">
                  <div className="Navbar-container-item-Cart-dropdown-container">
                    {/* 購物車課程卡片 */}
                    {cartCourseInfoList.length !== 0 &&
                      cartCourseInfoList.map((Obj) => {
                        return (
                          Obj && (
                            <CartCourse
                              index={cartCourseInfoList.indexOf(Obj)}
                              CurrentInfoObject={Obj}
                              cartCourseInfoList={cartCourseInfoList}
                              setCartCourseInfoList={setCartCourseInfoList}
                              sumCartCoursePrice={sumCartCoursePrice}
                              setSumCartCoursePrice={setSumCartCoursePrice}
                            />
                          )
                        );
                      })}
                    {cartCourseInfoList.length === 0 && (
                      <div className="CartCourse-container-empty">
                        <h5>快去選購更多精彩課程！</h5>
                      </div>
                    )}

                    {/* 購物車資訊與結帳按鈕 容器 */}
                    <div className="Navbar-container-item-Cart-dropdown-info-bottom">
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-left">
                        {/* 課程數量 */}
                        <div className="sumCourse">
                          <p>總計 {numberOfCoursesInCart} 堂課</p>
                        </div>
                        {/* 當前購物車總金額 */}
                        <div className="sumPrice">
                          <h5>NT$ {sumCartCoursePrice}</h5>
                        </div>
                      </div>
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-right">
                        {/* 結帳按鈕 */}
                        <div className="goCheckOut">
                          <h5>前往結帳</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 購物車與會員中心(未登入) */}
          {!currentUser && (
            <div className="Navbar-container-item">
              <div className="Navbar-container-item-container2">
                {/* 購物車按鈕 */}
                <button className="Navbar-container-item-btn2 Navbar-container-item-Cart">
                  <MdShoppingCart className="Navbar-container-item-btn2-Cart" />
                </button>
                &thinsp;
                {/* 會員登入註冊按鈕 */}
                <button
                  onClick={handleLoginClick}
                  className="Navbar-container-item-btn Navbar-container-item-btn-login"
                >
                  登入
                </button>
                {/* 購物車框框 */}
                <div className="Navbar-container-item-Cart-dropdown">
                  <div className="Navbar-container-item-Cart-dropdown-container">
                    {/* 購物車課程卡片 */}
                    {cartCourseInfoList.length !== 0 &&
                      cartCourseInfoList.map((Obj) => {
                        return (
                          Obj && (
                            <CartCourse
                              index={cartCourseInfoList.indexOf(Obj)}
                              CurrentInfoObject={Obj}
                              cartCourseInfoList={cartCourseInfoList}
                              setCartCourseInfoList={setCartCourseInfoList}
                              sumCartCoursePrice={sumCartCoursePrice}
                              setSumCartCoursePrice={setSumCartCoursePrice}
                              handleSumPriceZeroing={handleSumPriceZeroing}
                            />
                          )
                        );
                      })}
                    {cartCourseInfoList.length === 0 && (
                      <div className="CartCourse-container-empty">
                        <h5>快去選購更多精彩課程！</h5>
                      </div>
                    )}

                    {/* 購物車資訊與結帳按鈕 容器 */}
                    <div className="Navbar-container-item-Cart-dropdown-info-bottom">
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-left">
                        {/* 課程數量 */}
                        <div className="sumCourse">
                          <p>總計 {numberOfCoursesInCart} 堂課</p>
                        </div>
                        {/* 當前購物車總金額 */}
                        <div className="sumPrice">
                          <h5>NT$ {sumCartCoursePrice}</h5>
                        </div>
                      </div>
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-right">
                        {/* 結帳按鈕 */}
                        <div className="goCheckOut">
                          <h5>前往結帳</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 課程searchbar */}
      {!isActiveCourseSearch ? (
        <div className="Navbar-CourseSearch">
          <div className="Navbar-CourseSearch-container">
            <div className="Navbar-CourseSearch-dropdown">
              <input
                type="text"
                className="Navbar-CourseSearch-dropdown-SearchBar"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <button
                className="SearchBar-cross-circle"
                onClick={handleSearchValueDelete}
              >
                <ImCross className="SearchBar-cross-icon" />
              </button>
            </div>
            <div className="SearchKeywordTag">
              <span>推薦關鍵字：</span>
              {SearchKeywordTagList.map((keywordTag) => (
                <div
                  className="KeywordTag"
                  title={keywordTag}
                  onClick={(e) => {
                    setSearchValue(e.target.title);
                  }}
                >
                  #{keywordTag}
                </div>
              ))}
            </div>
            <div className="SearchCourseList">
              {SearchCourseList.map((Course) => (
                <div
                  className="recommandCourse"
                  title={Course}
                  onClick={(e) => {
                    setSearchValue(e.target.title);
                  }}
                >
                  {Course}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
