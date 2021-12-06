import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../config/config";
import { numDotFormat } from "../config/formula";
import OrderService from "../services/order.service";

import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";

import UmaiLogo from "./images/Umai.png";
import avatar from "./images/avatar.svg";

import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";

import CartCourse from "./Navbar/CartCourse";
// import CourseSearch from "./Navbar/CourseSearch";
import getValidMessage from "../validMessage/validMessage";
import courseService from "../services/course.service";

const Navbar = (props) => {
  let {
    handleLoginClick,
    currentUser,
    isActiveCourseSearch,
    handleToggleCourseSearch,
    cartCourseInfoList,
    setCartCourseInfoList,
    checkoutCourse,
    setCheckoutCourse,
    newAddCourse,
    setNewAddCourse,
    clearNewAddCourse,
    addCourseIntoCart,
    searchValue,
    setSearchValue,
  } = props;

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

  //課程分類左
  const CourseCategoryListLeft = ["日式料理", "法式料理", "中式料理"];
  //課程分類右
  const CourseCategoryListRight = ["韓式料理", "義式料理", "經典調飲"];

  //體驗分享左
  const ExperienceShareListLeft = ["故事牆"];
  //體驗分享右
  const ExperienceShareListRight = ["討論區"];

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

  //搜尋列focus Ref
  const inputSearch = useRef(null);

  //搜尋列focus
  const focusSearch = () => {
    inputSearch.current.focus();
  };

  //判斷搜尋內容
  const handleCourseSearch = async () => {
    let searchResult = await courseService.CourseSearch(searchValue);
    // console.log(searchResult);
  };

  //刪除搜尋內容
  async function handleSearchValueDelete() {
    setSearchValue("");
  }

  // 判斷購物車中是否只有一堂課
  const [isOnlyCourseInCart, setIsOnlyCourseInCart] = useState(false);

  //當前購物車總金額
  const [sumCartCoursePrice, setSumCartCoursePrice] = useState(0);

  //當前選購課程的總數量
  const numberOfCoursesInCart = cartCourseInfoList?.length;

  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");

  //當購物車沒課程時，將總金額歸零
  async function handleSumPriceZeroing() {
    if (numberOfCoursesInCart === 0) {
      setCartCourseInfoList([]);
      setSumCartCoursePrice(0);
    }
  }

  // 結帳按鈕判斷
  const handleCheckout = async () => {
    //清空結帳資訊
    setCheckoutCourse({});

    // 告知需要登入才能購買課程
    ifLogIn();
    // 沒登入無法結帳(離開結帳判斷)
    if (currentUser === null) return;

    //確認購物車是否只有一堂課程
    ifOnlyCourseInAlert();
    //購物車中太多課程無法結帳(離開結帳判斷)
    if (!isOnlyCourseInCart) return;

    //設定結帳資訊
    setCheckoutCourse({
      member_id: cartCourseInfoList[0].member_id,
      course_id: cartCourseInfoList[0].course_id,
      cartCourseCount: cartCourseInfoList[0].cartCourseCount,
    });
  };

  // 確認是否登入，並提醒要登入才能買課程
  async function ifLogIn() {
    if (currentUser === null) {
      return Swal.fire({
        icon: "warning",
        title: getValidMessage("cart", "D002"),
        text: "單筆消費僅能購買一堂課程",
        confirmButtonColor: "#0078B3",
        timer: 1500,
      });
    }
  }

  //確認購物車是否只有一堂課程
  function ifOnlyCourseInCart() {
    cartCourseInfoList.length === 1
      ? setIsOnlyCourseInCart(true)
      : setIsOnlyCourseInCart(false);
  }

  //確認購物車是否只有一堂課程，並跳出通知提醒
  async function ifOnlyCourseInAlert() {
    //確認購物車是否只有一堂課程
    ifOnlyCourseInCart();

    if (isOnlyCourseInCart) {
      return true;
    } else {
      // 告知需要刪除多餘課程
      Swal.fire({
        icon: "warning",
        title: getValidMessage("cart", "D002"),
        text: "單筆消費僅能購買一堂課程",
        confirmButtonColor: "#0078B3",
        timer: 1500,
      });
    }
  }

  //頁面初次渲染、課程加入購物車、課程報名數量改變時，即時更新金額
  useEffect(() => {
    console.log("觸發navbar2");
    console.log(newAddCourse);
    if (newAddCourse.length === 1) {
      let newCartCourseInfoList = [...cartCourseInfoList, newAddCourse[0]];
      setCartCourseInfoList(newCartCourseInfoList);
      console.log("newAddCourse.length-1");
      console.log(newCartCourseInfoList);
    }

    if (newAddCourse.length === 2) {
      // console.log(cartCourseInfoList[0].cartCourseCount);
      let newCartCourseInfoList = cartCourseInfoList;
      newCartCourseInfoList = newCartCourseInfoList.map((obj) => {
        if (obj.course_id === newAddCourse[0].course_id) {
          obj.cartCourseCount = obj.cartCourseCount + 1;
        };
        return obj;
      })
      console.log("newAddCourse.length-2");
      console.log(newCartCourseInfoList);
      console.log(newCartCourseInfoList.cartCourseCount);
      setCartCourseInfoList([...newCartCourseInfoList]);
    }

    console.log("cartCourseInfoList");
  }, [newAddCourse]);

  //頁面初次渲染、課程加入購物車、課程報名數量改變時，即時更新金額
  useEffect(() => {
    //清空新增課程state
    clearNewAddCourse();

    //當購物車沒課程時，將總金額歸零
    handleSumPriceZeroing();

    //確認購物車是否只有一堂課程
    ifOnlyCourseInCart();
  }, []);

  // 控制購物車容器開合
  const [cartConOpen, setCartConOpen] = useState(false);
  const handleCartConOpen = () => {
    console.log("in");
    setCartConOpen(true);
  };
  const handleCartConClose = () => {
    console.log("out");
    setCartConOpen(false);
  };

  return (
    <>
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
                            "http://localhost:3000/courses/category?" +
                            `${cate}`;
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
                            "http://localhost:3000/courses/category?" +
                            `${cate}`;
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
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleToggleCourseSearch();
                    isActiveCourseSearch && focusSearch();
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

                  {/* 購物車框框 */}
                  <div
                    className={`Navbar-container-item-Cart-dropdown ${
                      cartConOpen
                        ? "Navbar-container-item-Cart-dropdown-active"
                        : ""
                    }`}
                  >
                    <div className="Navbar-container-item-Cart-dropdown-container">
                      {/* 購物車課程卡片 */}
                      {cartCourseInfoList?.length !== 0 &&
                        cartCourseInfoList?.map((Obj) => {
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
                                currentUser={currentUser}
                              />
                            )
                          );
                        })}
                      {cartCourseInfoList?.length === 0 && (
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
                          <div className="goCheckOut" onClick={handleCheckout}>
                            <h5
                            onClick={async() => {
                              await setCheckoutCourse({
                                member_id: currentUser ? currentUser.id : undefined,
                                course_id: cartCourseInfoList.length !== 0 ? cartCourseInfoList[0].course_id : undefined,
                                batch_id: cartCourseInfoList.length !== 0 ? cartCourseInfoList[0].batch_id : undefined,
                                cartCourseCount: cartCourseInfoList.length !== 0 ? cartCourseInfoList[0].cartCourseCount : 1,
                              });
                              if(checkoutCourse.member_id === undefined || checkoutCourse.course_id === undefined || checkoutCourse.batch_id === undefined){
                                return;
                              } else {
                                return window.location.href =
                                "http://localhost:3000/ShoppingCart";
                              }
                              }}
                            >前往結帳</h5>
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
                  {/* 購物車框框 */}
                  <div
                    className={`Navbar-container-item-Cart-dropdown ${
                      cartConOpen
                        ? "Navbar-container-item-Cart-dropdown-active"
                        : ""
                    }`}
                  >
                    <div className="Navbar-container-item-Cart-dropdown-container">
                      {/* 購物車課程卡片 */}
                      {cartCourseInfoList?.length !== 0 &&
                        cartCourseInfoList?.map((Obj) => {
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
                                currentUser={currentUser}
                              />
                            )
                          );
                        })}
                      {cartCourseInfoList?.length === 0 && (
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
                          <div className="goCheckOut" onClick={handleCheckout}>
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
        {/* <CourseSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        /> */}
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
                  ref={inputSearch}
                  className="Navbar-CourseSearch-dropdown-SearchBar"
                  value={searchValue}
                  onChange={async (e) => {
                    await setSearchValue(e.target.value);
                    await handleCourseSearch();
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
    </>
  );
};

export default Navbar;