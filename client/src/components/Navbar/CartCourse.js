import React, { useState, useEffect } from "react";
import { numDotFormat } from "../../config/formula";
import courseService from "../../services/course.service";

import { FaMinus, FaPlus } from "react-icons/fa";

import CoursePic from "../images/img7.jpg";

const CartCourse = (props) => {
  const {
    index,
    CurrentInfoObject,
    cartCourseInfoList,
    setCartCourseInfoList,
    sumCartCoursePrice,
    setSumCartCoursePrice,
    handleSumPriceZeroing,
    addCourseIntoCart,
    currentUser,
  } = props;

  //特定課程金額小計
  const [subtotal, setSubtotal] = useState(CurrentInfoObject.course_price);

  //課堂報名人數減一
  async function handleCountMinus() {
    let newCartCourseInfoList = cartCourseInfoList;
    //數量不可小於1
    if (newCartCourseInfoList[index].cartCourseCount > 1) {
      newCartCourseInfoList[index].cartCourseCount =
        CurrentInfoObject.cartCourseCount - 1;
    }
    await setCartCourseInfoList(newCartCourseInfoList);

    // 重新整理購物車資訊，並刪除購物車中數量小於0的課程
    refreshCartCourse();
    //計算特定課程金額小計
    getSubtotal(CurrentInfoObject);
    //計算當前購物車總金額
    getSumCartCoursePrice();
  }

  //課堂報名人數加一
  async function handleCountPlus() {
    let newCartCourseInfoList = cartCourseInfoList;
    //數量不可高於可報名人數上限
    if (
      newCartCourseInfoList[index].cartCourseCount <
      newCartCourseInfoList[index].member_limit -
        newCartCourseInfoList[index].member_count
    ) {
      newCartCourseInfoList[index].cartCourseCount =
        CurrentInfoObject.cartCourseCount + 1;
    }
    await setCartCourseInfoList(newCartCourseInfoList);

    // 重新整理購物車資訊，並刪除購物車中數量小於0的課程
    refreshCartCourse();
    //計算特定課程金額小計
    getSubtotal(CurrentInfoObject);
    //計算當前購物車總金額
    getSumCartCoursePrice();
  }

  //計算特定課程金額小計
  async function getSubtotal(CurrentInfoObject) {
    let newSubtotal =
      CurrentInfoObject.course_price * CurrentInfoObject.cartCourseCount;
    setSubtotal(numDotFormat(newSubtotal));
  }

  //計算當前購物車總金額
  async function getSumCartCoursePrice() {
    if (cartCourseInfoList?.length !== 0) {
      let subtotalList = cartCourseInfoList.map((obj) => {
        return obj?.course_price * obj?.cartCourseCount;
      });
      let newSumCartCoursePrice = subtotalList.reduce((acc, v) => {
        return acc + v;
      }, 0);
      await setSumCartCoursePrice(numDotFormat(newSumCartCoursePrice));
    }
  }

  //從購物車中刪除指定課程
  async function handleDeleteClick() {
    if (cartCourseInfoList.length !== 0) {
      let newCartCourseInfoList = cartCourseInfoList.filter((obj) => {
        return obj !== CurrentInfoObject;
      });
      await setCartCourseInfoList(newCartCourseInfoList);

      //計算特定課程金額小計
      getSubtotal(CurrentInfoObject);
      //計算當前購物車總金額
      getSumCartCoursePrice();
      //當購物車沒課程時，將總金額歸零
      // handleSumPriceZeroing();
      //從購物車資料庫中移除(將inCart歸零)
      let updateResult = await courseService.UpdateCart(
        currentUser.id,
        CurrentInfoObject.course_id,
        CurrentInfoObject.batch_id,
        0
      );
    }
  }

  // 重新整理購物車資訊，並刪除購物車中數量小於0的課程
  async function refreshCartCourse() {
    let newCartCourseInfoList = cartCourseInfoList.filter((obj) => {
      return obj.cartCourseCount > 0;
    });
    await setCartCourseInfoList(newCartCourseInfoList);
    //計算當前購物車總金額
    getSumCartCoursePrice();
  }

  //頁面初次渲染、課程加入購物車、課程報名數量改變時，即時更新金額
  useEffect(() => {
    try {
      //計算特定課程金額小計
      getSubtotal(CurrentInfoObject);
      //計算當前購物車總金額
      getSumCartCoursePrice();
      //當購物車沒課程時，將總金額歸零
      handleSumPriceZeroing();
      // // 重新整理購物車資訊，並刪除購物車中數量小於0的課程
      // refreshCartCourse();
    } catch (error) {
      console.log(error);
    }
  }, [cartCourseInfoList]);

  return (
    <div className="CartCourse-container">
      {/* 課程圖片容器 */}
      <div className="CartCourse-info-left">
        <div className="CartCourse-pic-container">
          {/* 課程圖片 */}
          <img src={CoursePic} className="CartCourse-pic"></img>
        </div>
      </div>

      {/* 課程資訊容器 */}
      <div className="CartCourse-info-right">
        <div className="CartCourse-info-right-top">
          {/* 此課程名稱 */}
          <div className="CartCourse-name">
            <h6>{cartCourseInfoList[index].course_name}</h6>
          </div>
          {/* 此課程梯次日期 */}
          <div className="CartCourse-batch">
            <p>課程梯次：{cartCourseInfoList[index].batch_date}</p>
          </div>
        </div>

        {/* 報名人數調整 */}
        <div className="CartCourse-info-right-bottom">
          <div className="count-container">
            {/* 課堂報名人數減一 */}
            <button
              className="count-minus"
              id={cartCourseInfoList[index].id}
              onClick={handleCountMinus}
            >
              <FaMinus />
            </button>

            {/* 此課程報名人數 */}
            <div className="count" id={cartCourseInfoList[index].id}>
              {cartCourseInfoList[index].cartCourseCount}
            </div>

            {/* 課堂報名人數加一 */}
            <button
              className="count-plus"
              id={cartCourseInfoList[index].id}
              onClick={handleCountPlus}
            >
              <FaPlus />
            </button>
          </div>

          {/* 此課程金額小計 */}
          <div className="price">
            <h5>{"NT$" + subtotal}</h5>
          </div>

          {/* 課程編輯按鈕容器 */}
          <div className="edit-Button">
            {/* 收藏此課程 */}
            <div className="addToCollection">
              <button>
                <p>收藏</p>
              </button>
            </div>
            <div className="seperationLine"></div>

            {/* 從購物車中刪除此課程 */}
            <div className="DeleteThisCourse">
              <button index={index} onClick={handleDeleteClick}>
                <p>刪除</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCourse;
