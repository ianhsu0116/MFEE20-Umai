/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../config/config";
import { numDotFormat } from "../config/formula";
import OrderService from "../services/order.service";
import courseService from "../services/course.service";

import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import { ImCross } from "react-icons/im";

import UmaiLogo from "./images/Umai.png";
import avatar from "./images/avatar.svg";

import Swal from "sweetalert2";
import CartCourse from "./Navbar/CartCourse";
import { empty } from "statuses";
import getValidMessage from "../validMessage/validMessage";
import axios from "axios";

const Navbar = (props) => {
  let {
    handleLoginClick,
    currentUser,
    isActiveCourseSearch,
    handleToggleCourseSearch,
    // cartCourseInfoList,
    // setCartCourseInfoList,
    checkoutCourse,
    setCheckoutCourse,
    newAddCourse,
    clearNewAddCourse,
    numberOfCoursesInCart,
    sumCartCoursePrice,
    setSumCartCoursePrice,
    link,
    setLink,
    data,
    setData,
  } = props;

  //當購物車沒課程時，將總金額歸零
  async function handleSumPriceZeroing() {
    if (numberOfCoursesInCart === 0) {
      setSumCartCoursePrice(0);
    }
  }

  // 重新整理購物車 (刪除購物車中數量小於0的課程/當購物車沒課程時，將總金額歸零)
  async function refreshCartCourse() {
    //刪除購物車中數量小於0的課程
    let newCartCourseInfoList = cartCourseInfoList.filter((obj) => {
      return obj.cartCourseCount > 0;
    });
    setCartCourseInfoList(newCartCourseInfoList);

    //當購物車沒課程時，將總金額歸零
    handleSumPriceZeroing();
  }

  //課程分類左
  const CourseCategoryListLeft = ["日式料理", "法式料理", "中式料理"];
  //課程分類右
  const CourseCategoryListRight = ["韓式料理", "義式料理", "經典調飲"];

  //體驗分享左
  const ExperienceShareListLeft = ["故事牆"];
  //體驗分享右
  const ExperienceShareListRight = ["討論區"];

  //搜尋建議關鍵字
  const SearchKeywordTagList = [
    "傳統日式",
    "韓式料理",
    "義大利麵",
    "紅酒燉牛肉",
    "調酒",
    "入門",
  ];

  const [active, setActive] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY >= 200) {
        setActive(true);
      } else {
        setActive("");
      }
    });

    // 點擊任意處關閉搜尋容器
    window.addEventListener("click", () => {
      handleToggleCourseSearch("close");
    });
  }, []);

  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");
  // 判斷購物車中是否只有一堂課
  const [isOnlyCourseInCart, setIsOnlyCourseInCart] = useState(false);

  //計算當前購物車總金額
  async function getSumCartCoursePrice() {
    if (cartCourseInfoList?.length !== 0) {
      let subtotalList = cartCourseInfoList.map((obj) => {
        return obj?.course_price * obj?.cartCourseCount;
      });
      let newSumCartCoursePrice = subtotalList.reduce((acc, v) => {
        return acc + v;
      }, 0);
      setSumCartCoursePrice(numDotFormat(newSumCartCoursePrice));
    }
  }

  const [searchValue, setSearchValue] = useState("");
  const [SearchCourseList, setSearchCourseList] = useState([]);

  const [checkoutList, setCheckoutList] = useState("");

  const [active, setActive] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY >= 200) {
        setActive(true);
      } else {
        setActive("");
      }
    });

    // 點擊任意處關閉搜尋容器
    window.addEventListener("click", () => {
      handleToggleCourseSearch("close");
    });
  }, []);

  useEffect(async () => {
    if (searchValue === "") {
      setSearchCourseList([]);
      return;
    }

    let result = await axios.post(
      "http://localhost:8080/api/course/searchcourse",
      { searchValue: searchValue },
      {
        withCredentials: true,
      }
    );
    setSearchCourseList(result.data.course);
  }, [searchValue]);

  //刪除搜尋內容
  async function handleSearchValueDelete() {
    setSearchValue("");
  }

  // 拿到購物車所需的全部課程資料，並加入購物車
  async function getAllCourseObject(member_id) {
    // 根據member_id拿到購物車所需的全部課程資料 (cart)
    let result = await courseService.getAllCourseObject(member_id);
    let newCartCourseInfoList = result.data.courseInfoInCart;
    setCartCourseInfoList([...newCartCourseInfoList]);
    console.log("newCartCourseInfoList");
    console.log(newCartCourseInfoList);
  }

  // 重新整理購物車資訊、計算總金額
  async function refreshCartCourse() {
    let newCartCourseInfoList;
    if (!ifNoCourseInCart) {
      newCartCourseInfoList = cartCourseInfoList?.filter((obj) => {
        return obj.cartCourseCount > 0;
      });
    } else {
      newCartCourseInfoList = [];
    }
    //會影響cartCourseInfoList，放在useEffect時要小心
    setCartCourseInfoList(newCartCourseInfoList);
    //計算當前購物車總金額
    getSumCartCoursePrice();
  }

  //判斷購物車是否為沒課程的狀態
  const [ifNoCourseInCart, setIfNoCourseInCart] = useState(true);
  //當購物車沒課程時，改變狀態判斷
  function handleIfCourseInCart() {
    if (
      !cartCourseInfoList ||
      cartCourseInfoList === [] ||
      cartCourseInfoList?.length === 0
    ) {
      setIfNoCourseInCart(true);
    } else {
      setIfNoCourseInCart(false);
    }
  }
  //當購物車沒課程時，將總金額歸零
  async function handleSumPriceZeroing() {
    if (ifNoCourseInCart) {
      setSumCartCoursePrice(0);
    }
  }

  //計算當前購物車總金額
  async function getSumCartCoursePrice() {
    if (!ifNoCourseInCart) {
      let subtotalList;
      let newSumCartCoursePrice;
      if (cartCourseInfoList !== []) {
        //產生金額小計陣列
        subtotalList = cartCourseInfoList?.map((obj) => {
          return obj?.course_price * obj?.cartCourseCount;
        });
        //計算總價
        newSumCartCoursePrice = subtotalList?.reduce((acc, v) => {
          return acc + v, 0;
        });
      }
      if (newSumCartCoursePrice) {
        console.log("subtotalList");
        console.log(subtotalList);
        console.log("newSumCartCoursePrice");
        console.log(newSumCartCoursePrice);
        setSumCartCoursePrice(numDotFormat(newSumCartCoursePrice));
      }
    } else {
      setSumCartCoursePrice(0);
    }
  }

  //確認購物車是否只有一堂課程
  function ifOnlyCourseInCart() {
    cartCourseInfoList && cartCourseInfoList.length === 1
      ? setIsOnlyCourseInCart(true)
      : setIsOnlyCourseInCart(false);
  }

  //確認結帳時購物車是否只有一堂課程，並跳出通知提醒
  async function ifOnlyCourseInAlert() {
    //確認購物車是否只有一堂課程
    ifOnlyCourseInCart();

    if (!isOnlyCourseInCart) {
      Swal.fire({
        title: "請確認購買數量是否正確!",
        icon: "warning",
        // customClass: "Custom_Cancel",
        confirmButtonColor: "#0078b3",
        confirmButtonText: "確認",
      });
      return;
    }

    //設定結帳課程資訊
    setCheckoutList({
      member_id: cartCourseInfoList[0].member_id,
      course_id: cartCourseInfoList[0].course_id,
      cartCourseCount: cartCourseInfoList[0].cartCourseCount,
    });

    // 結帳資料送後端
    try {
      let result = await OrderService.checkout(
        checkoutList.member_id,
        checkoutList.course_id
      );

      // 刪除錯誤訊息
      setErrorMsg("");
    } catch (error) {
      // console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("cart", code));
    }
  }

  // 確認是否登入，並提醒要登入才能買課程
  async function ifLogIn() {
    if (currentUser === null) {
      setData({});
      return Swal.fire({
        title: getValidMessage("cart", "D001"),
        icon: "warning",
        confirmButtonColor: "#0078B3",
        confirmButtonText: "確認",
        timer: 1500,
      });
    }
    // 沒登入無法結帳(離開結帳判斷)
    if (currentUser === null) return;
  }

  //頁面初次渲染、課程加入購物車、課程報名數量改變時，即時更新金額
  useEffect(() => {
    // //清空新增課程state
    // clearNewAddCourse();

    //判斷購物車是否只有一堂課程
    ifOnlyCourseInCart();

    //設定結帳連結
    setLink("/shoppingCart");
  }, []);

  // 控制購物車容器開合
  const [cartConOpen, setCartConOpen] = useState(false);
  const handleCartConOpen = () => {
    // console.log("in");
    setCartConOpen(true);
    console.log(data);
    setLink("/shoppingCart");
    setData(
      JSON.stringify({
        member_id: currentUser ? currentUser.id : "",
        course_id: cartCourseInfoList[0] ? cartCourseInfoList[0].course_id : "",
        batch_id: cartCourseInfoList[0] ? cartCourseInfoList[0].batch_id : "",
        cartCourseCount: cartCourseInfoList[0]
          ? cartCourseInfoList[0].cartCourseCount
          : "",
      })
    );
  };
  const handleCartConClose = () => {
    // console.log("out");
    setCartConOpen(false);
  };

  return (
    <div className="Header">
      <div className={`Navbar ${active ? "Navbar-active" : ""}`}>
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
              <button
                className="Navbar-container-item-btn Navbar-container-item-CourseDiscover Navbar-container-item-CourseSearch"
                //  12/4 亭
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/courses/category?all";
                }}
              >
                課程探索
              </button>
              {/* 下拉式選單 */}
              {/* <div className="Navbar-container-item-CourseDiscover-dropdown-hoverZone"></div> */}
              <div className="Navbar-container-item-CourseDiscover-dropdown">
                <ul>
                  {CourseCategoryListLeft.map((cate) => (
                    <li
                      //  12/4 亭
                      onClick={() => {
                        window.location.href =
                          "http://localhost:3000/courses/category?" + `${cate}`;
                      }}
                    >
                      {cate}
                    </li>
                  ))}
                </ul>
                <ul>
                  {CourseCategoryListRight.map((cate) => (
                    <li
                      //  12/4 亭
                      onClick={() => {
                        window.location.href =
                          "http://localhost:3000/courses/category?" + `${cate}`;
                      }}
                    >
                      {cate}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 體驗分享 */}
            <div className="Navbar-container-item-container">
              <button
                className="Navbar-container-item-btn Navbar-container-item-ExperienceShare"
                onClick={() => {
                  refreshCartCourse();
                }}
              >
                體驗分享
              </button>
              {/* 下拉式選單 */}
              {/* <div className="Navbar-container-item-ExperienceShare-dropdown-hoverZone"></div> */}
              <div className="Navbar-container-item-ExperienceShare-dropdown">
                <ul>
                  {ExperienceShareListLeft.map((page) => (
                    <li
                      onClick={() => {
                        window.location.href = "http://localhost:3000/forum";
                        // console.log(cartCourseInfoList);
                      }}
                    >
                      {page}
                    </li>
                  ))}
                </ul>
                <ul>
                  {ExperienceShareListRight.map((page) => (
                    <li
                      onClick={() => {
                        window.location.href = "http://localhost:3000/forum";
                        // console.log(cartCourseInfoList);
                      }}
                    >
                      {page}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 尋找課程 */}
            <div className="Navbar-container-item-container">
              <button
                className="Navbar-container-item-btn Navbar-container-item-CourseSearch"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleCourseSearch();
                }}
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
                <button
                  className="Navbar-container-item-btn2 Navbar-container-item-Cart"
                  onMouseEnter={handleCartConOpen}
                  onMouseLeave={handleCartConClose}
                >
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

                {/* 購物車框框(已登入) */}
                <div
                  className={`Navbar-container-item-Cart-dropdown ${
                    cartConOpen
                      ? "Navbar-container-item-Cart-dropdown-active"
                      : ""
                  }`}
                >
                  <div className="Navbar-container-item-Cart-dropdown-container">
                    {/* 購物車課程卡片 */}
                    {cartCourseInfoList &&
                      !ifNoCourseInCart &&
                      cartCourseInfoList?.map((Obj) => {
                        return (
                          Obj && (
                            <CartCourse
                              index={cartCourseInfoList.indexOf(Obj)}
                              currentUser={currentUser}
                              CurrentInfoObject={Obj}
                              cartCourseInfoList={cartCourseInfoList}
                              setCartCourseInfoList={setCartCourseInfoList}
                              getSumCartCoursePrice={getSumCartCoursePrice}
                              currentUser={currentUser}
                              refreshCartCourse={refreshCartCourse}
                              data={data}
                              setData={setData}
                            />
                          )
                        );
                      })}
                    {cartCourseInfoList &&
                      ifNoCourseInCart &&
                      cartCourseInfoList.length === 0 && (
                        <div className="CartCourse-container-empty">
                          <h5>快去選購更多精彩課程！</h5>
                        </div>
                      )}

                    {/* 購物車資訊與結帳按鈕 容器 */}
                    <div className="Navbar-container-item-Cart-dropdown-info-bottom">
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-left">
                        {/* 課程數量 */}
                        <div className="sumCourse">
                          <p>
                            總計{" "}
                            {cartCourseInfoList === []
                              ? 0
                              : cartCourseInfoList?.length}{" "}
                            堂課
                          </p>
                        </div>
                        {/* 當前購物車總金額 */}
                        <div className="sumPrice">
                          <h5>NT$ {sumCartCoursePrice}</h5>
                        </div>
                      </div>
                      <Link
                        to={{ pathname: link, state: { data: data } }}
                        onClick={handleCartConClose}
                      >
                        <div className="Navbar-container-item-Cart-dropdown-info-bottom-right">
                          {/* 結帳按鈕 */}
                          <Link to={{ pathname: link, state: { data: data } }}>
                            <div
                              className="goCheckOut"
                              onClick={() => {
                                ifLogIn();
                              }}
                            >
                              <h5>前往結帳</h5>
                            </div>
                          </Link>
                        </div>
                      </Link>
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
                <button
                  className="Navbar-container-item-btn2 Navbar-container-item-Cart"
                  onMouseEnter={handleCartConOpen}
                  onMouseLeave={handleCartConClose}
                >
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
                {/* 購物車框框(未登入) */}
                <div
                  className={`Navbar-container-item-Cart-dropdown ${
                    cartConOpen
                      ? "Navbar-container-item-Cart-dropdown-active"
                      : ""
                  }`}
                >
                  <div className="Navbar-container-item-Cart-dropdown-container">
                    {/* 購物車課程卡片 */}
                    {cartCourseInfoList &&
                      !ifNoCourseInCart &&
                      cartCourseInfoList.map((Obj) => {
                        return (
                          Obj && (
                            <CartCourse
                              index={cartCourseInfoList.indexOf(Obj)}
                              currentUser={currentUser}
                              CurrentInfoObject={Obj}
                              cartCourseInfoList={cartCourseInfoList}
                              setCartCourseInfoList={setCartCourseInfoList}
                              sumCartCoursePrice={sumCartCoursePrice}
                              setSumCartCoursePrice={setSumCartCoursePrice}
                              currentUser={currentUser}
                              refreshCartCourse={refreshCartCourse}
                              data={data}
                              setData={setData}
                            />
                          )
                        );
                      })}
                    {cartCourseInfoList &&
                      ifNoCourseInCart &&
                      cartCourseInfoList.length === 0 && (
                        <div className="CartCourse-container-empty">
                          <h5>快去選購更多精彩課程！</h5>
                        </div>
                      )}

                    {/* 購物車資訊與結帳按鈕 容器 */}
                    <div className="Navbar-container-item-Cart-dropdown-info-bottom">
                      <div className="Navbar-container-item-Cart-dropdown-info-bottom-left">
                        {/* 課程數量 */}
                        <div className="sumCourse">
                          <p>
                            總計{" "}
                            {cartCourseInfoList === []
                              ? 0
                              : cartCourseInfoList?.length}{" "}
                            堂課
                          </p>
                        </div>
                        {/* 當前購物車總金額 */}
                        <div className="sumPrice">
                          <h5>NT$ {sumCartCoursePrice}</h5>
                        </div>
                        {/* <Link to={{ pathname: link, state: { data: data } }}> */}
                        <div className="Navbar-container-item-Cart-dropdown-info-bottom-right">
                          {/* 結帳按鈕 */}
                          <div
                            className="goCheckOut"
                            onClick={() => {
                              ifLogIn();
                            }}
                          >
                            {/* <Link
                              to={{ pathname: link, state: { data: data } }}
                            > */}
                            <h5>前往結帳</h5>
                            {/* </Link> */}
                          </div>
                        </div>
                        {/* </Link> */}
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
          <div
            className="Navbar-CourseSearch-container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
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
              {SearchCourseList.map((Course, i) => {
                if (i <= 4)
                  return (
                    <div
                      className="recommandCourse"
                      title={Course.course_name}
                      onClick={(e) => {
                        window.location.href = `http://localhost:3000/courses/${Course.id}`;
                      }}
                    >
                      {Course.course_name}
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Navbar;
