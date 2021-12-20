import React, { useState, useEffect } from "react";
import { numDotFormat } from "../../config/formula";
import courseService from "../../services/course.service";

import { FaMinus, FaPlus } from "react-icons/fa";

import CoursePic from "../images/img7.jpg";

const CartCourse = (props) => {
  const {
    index,
    currentUser,
    CurrentInfoObject,
    cartCourseInfoList,
    setCartCourseInfoList,
    getSumCartCoursePrice,
    refreshCartCourse,
    data,
    setData,
  } = props;

  //特定課程金額小計
  const [subtotal, setSubtotal] = useState(CurrentInfoObject.course_price);

  //計算特定課程金額小計
  async function getSubtotal(CurrentInfoObject) {
    let newSubtotal = CurrentInfoObject.course_price * CurrentInfoObject.amount;
    setSubtotal(numDotFormat(newSubtotal));
  }

  //課堂報名人數減一
  async function handleCountMinus() {
    let newCartCourseInfoList = cartCourseInfoList;
    //數量不可小於1
    if (newCartCourseInfoList[index].amount > 1) {
      newCartCourseInfoList[index].amount = CurrentInfoObject.amount - 1;
    }
    await setCartCourseInfoList(newCartCourseInfoList);

    //計算特定課程金額小計
    getSubtotal(CurrentInfoObject);
    //計算當前購物車總金額
    getSumCartCoursePrice();

    setData(
      JSON.stringify({
        member_id: currentUser ? currentUser.id : "",
        course_id: cartCourseInfoList[0] ? cartCourseInfoList[0].course_id : "",
        batch_id: cartCourseInfoList[0] ? cartCourseInfoList[0].batch_id : "",
        amount: cartCourseInfoList[0] ? cartCourseInfoList[0].amount : "",
      })
    );
    console.log("data: ");
    console.log({
      member_id: currentUser ? currentUser.id : "",
      course_id: cartCourseInfoList[0] ? cartCourseInfoList[0].course_id : "",
      batch_id: cartCourseInfoList[0] ? cartCourseInfoList[0].batch_id : "",
      amount: cartCourseInfoList[0] ? cartCourseInfoList[0].amount : "",
    });
  }

  //課堂報名人數加一
  async function handleCountPlus() {
    let newCartCourseInfoList = cartCourseInfoList;
    //數量不可高於可報名人數上限
    if (
      newCartCourseInfoList[index].amount <
      newCartCourseInfoList[index].member_limit -
        newCartCourseInfoList[index].member_count
    ) {
      newCartCourseInfoList[index].amount = CurrentInfoObject.amount + 1;
    }
    await setCartCourseInfoList(newCartCourseInfoList);

    //計算特定課程金額小計
    getSubtotal(CurrentInfoObject);
    //計算當前購物車總金額
    getSumCartCoursePrice();

    setData(
      JSON.stringify({
        member_id: currentUser ? currentUser.id : "",
        course_id: cartCourseInfoList ? cartCourseInfoList[0].course_id : "",
        batch_id: cartCourseInfoList ? cartCourseInfoList[0].batch_id : "",
        amount: cartCourseInfoList ? cartCourseInfoList[0].amount : "",
      })
    );
    console.log("data: ");
    console.log({
      member_id: currentUser ? currentUser.id : "",
      course_id: cartCourseInfoList ? cartCourseInfoList[0].course_id : "",
      batch_id: cartCourseInfoList ? cartCourseInfoList[0].batch_id : "",
      amount: cartCourseInfoList ? cartCourseInfoList[0].amount : "",
    });
  }

  //從購物車中刪除指定課程
  async function handleDeleteClick(member_id, course_id, batch_id, inCart) {
    if (cartCourseInfoList.length !== 0) {
      //從購物車資料庫中移除(將inCart歸零)
      let updateResult = await courseService.UpdateCart(
        currentUser.id,
        CurrentInfoObject.course_id,
        CurrentInfoObject.batch_id,
        0,
        -1 * (CurrentInfoObject.amount - 1)
      );

      // console.log("Delete_Course: ");
      // console.log(
      //   currentUser.id,
      //   CurrentInfoObject.course_id,
      //   CurrentInfoObject.batch_id,
      //   0,
      //   -1 * (CurrentInfoObject.amount - 1)
      // );
      // console.log(updateResult.data.updateResult[0]);

      //從購物車中刪除當前課程
      let newCartCourseInfoList = cartCourseInfoList.filter((obj) => {
        return obj !== CurrentInfoObject;
      });
      setCartCourseInfoList(newCartCourseInfoList);
      console.log("剩餘課程：");
      console.log(newCartCourseInfoList);

      //計算特定課程金額小計
      getSubtotal(CurrentInfoObject);
      //計算當前購物車總金額
      getSumCartCoursePrice();
    }
  }

  //頁面初次渲染、課程加入購物車、課程報名數量改變時，即時更新
  useEffect(() => {
    try {
      //計算特定課程金額小計
      getSubtotal(CurrentInfoObject);
      //計算當前購物車總金額
      getSumCartCoursePrice();
    } catch (error) {
      console.log(error);
    }
  }, [cartCourseInfoList]);

  // useEffect(() => {
  //   try {
  //     // // 重新整理購物車資訊、計算總金額，並刪除購物車中數量小於0的課程
  //     // refreshCartCourse();
  //     // console.log("refreshCartCourse");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <>
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
                {cartCourseInfoList[index].amount}
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
                <button
                  index={index}
                  onClick={() => {
                    handleDeleteClick(
                      currentUser.id,
                      CurrentInfoObject.course_id,
                      CurrentInfoObject.batch_id,
                      0
                    );
                  }}
                >
                  <p>刪除</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCourse;
