import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../config/config";
import { numDotFormat } from "../config/formula";
import courseService from "../services/course.service";

import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import { ImCross } from "react-icons/im";

import UmaiLogo from "./images/Umai.png";
import avatar from "./images/avatar.jpg";

import CartCourse from "./Navbar/CartCourse";
import { forEach } from "lodash";

const Navbar = (props) => {
  let {
    handleLoginClick,
    currentUser,
    cartCourseInfoList,
    setCartCourseInfoList,
  } = props;

  //推薦關鍵字tag
  const SearchKeywordTagList = [
    "創意壽司",
    "義大利麵",
    "紅酒燉牛肉",
    "獵人燉雞",
  ];
  //推薦課程
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

  //目前選購課程的總數量
  const numberOfCoursesInCart = cartCourseInfoList.length;

  //目前選購總金額
  const [sumCartCoursePrice, setSumCartCoursePrice] = useState(0);

  //取得該課程金額小計
  async function getSubtotal(course_id) {
    let targetCourse = cartCourseInfoList[course_id];
    let subtotal = targetCourse.course_price * targetCourse.cartCourseCount;
    return subtotal;
  }

  //計算目前選購總金額
  async function getSumCartCoursePrice() {
    let subtotalList = cartCourseInfoList.map((obj) => {
      return getSubtotal(obj.id);
    });
    let newSumCartCoursePrice = subtotalList.reduce((acc, v) => {
      return acc + v;
    }, 0);
    setSumCartCoursePrice(newSumCartCoursePrice);
  }

  useEffect(() => {
    try {
      getSumCartCoursePrice();
    } catch (error) {
      console.log(error);
    }
  }, [cartCourseInfoList]);

  function handleSearchCourseClick() {}

  return (
    <>
      <div className="Navbar">
        <div className="Navbar-container">
          {/* 尋找課程 */}
          <div className="Navbar-container-item">
            <div className="Navbar-container-item-container">
              <button
                className="Navbar-container-item-btn Navbar-container-item-CourseSearch"
                onClick={handleSearchCourseClick}
              >
                <GoSearch />
                &ensp;尋找課程
              </button>
            </div>
          </div>

          {/* 課程探索 */}
          <div className="Navbar-container-item">
            <div className="Navbar-container-item-container">
              <button className="Navbar-container-item-btn Navbar-container-item-CourseDiscover">
                課程探索
              </button>
              {/* 下拉式選單 */}
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
          </div>

          {/* Logo */}
          <div className="Navbar-container-item ">
            <div className="Navbar-container-item-container">
              <Link to="/">
                <img src={UmaiLogo} alt="Umai Logo" className="UmaiLogo" />
              </Link>
            </div>
          </div>

          {/* 體驗分享 */}
          <div className="Navbar-container-item">
            <div className="Navbar-container-item-container">
              <button className="Navbar-container-item-btn Navbar-container-item-ExperienceShare">
                體驗分享
              </button>
              {/* 下拉式選單 */}
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
                  {currentUser && currentUser.avatar && (
                    <img
                      src={`${PUBLIC_URL}/upload-images/${currentUser.avatar}`}
                      alt="使用者頭貼"
                      className="Navbar-container-item-btn Navbar-container-item-btn2-avatar"
                    />
                  )}
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
                    <div className="Navbar-container-item-Cart-dropdown-info-bottom">
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-left">
                        <div className="sumCourse">
                          <p>總計{}堂課</p>
                        </div>
                        <div className="sumPrice">
                          <h5>NT${}</h5>
                        </div>
                      </div>
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-right">
                        <div className="goCheckOut"></div>
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
                    {/* {setSumCartCoursePrice(0)} */}

                    {cartCourseInfoList.map((Obj) => {
                      return (
                        Obj && (
                          <CartCourse
                            index={cartCourseInfoList.indexOf(Obj)}
                            CurrentInfoObject={Obj}
                            cartCourseInfoList={cartCourseInfoList}
                            setCartCourseInfoList={setCartCourseInfoList}
                            getSubtotal={getSubtotal}
                          />
                        )
                      );
                    })}

                    {/* {setSumCartCoursePrice(NewSum)} */}

                    <div className="Navbar-container-item-Cart-dropdown-info-bottom">
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-left">
                        <div className="sumCourse">
                          <p>總計{numberOfCoursesInCart}堂課</p>
                        </div>
                        <div className="sumPrice">
                          <h5>NT${numDotFormat(sumCartCoursePrice)}</h5>
                        </div>
                      </div>
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-right">
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
      <div className="Navbar-CourseSearch">
        <div className="Navbar-CourseSearch-container">
          <div className="Navbar-CourseSearch-dropdown">
            <input
              type="text"
              className="Navbar-CourseSearch-dropdown-SearchBar"
            />
            <button className="SearchBar-cross-circle">
              <ImCross className="SearchBar-cross-icon" />
            </button>
          </div>
          <div className="SearchKeywordTag">
            <span>推薦關鍵字：</span>
            {SearchKeywordTagList.map((keywordTag) => (
              <div className="KeywordTag">#{keywordTag}</div>
            ))}
          </div>
          <div className="SearchCourseList">
            {SearchCourseList.map((Course) => (
              <div className="Course">{Course}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
