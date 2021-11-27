import React, { useState, useEffect } from "react";
import { numDotFormat } from "../config/formula";

import { FaMinus, FaPlus } from "react-icons/fa";

import CoursePic from "../images/img7.jpg";

const CartCourse = (props) => {
  const {
    index,
    CurrentInfoObject,
    cartCourseInfoList,
    setCartCourseInfoList,
    getSubtotal,
  } = props;

  //課堂報名人數減一
  function handleCountMinus() {
    let newCartCourseInfoList = cartCourseInfoList;

    newCartCourseInfoList[index].cartCourseCount > 0 &&
      (newCartCourseInfoList[index].cartCourseCount =
        cartCourseInfoList.CurrentInfoObject.cartCourseCount - 1);

    if (newCartCourseInfoList[index].cartCourseCount === 0) {
      newCartCourseInfoList = newCartCourseInfoList.map((Obj) => {
        return Obj.cartCourseCount > 0;
      });

      let newCartCourseInfoList = cartCourseInfoList.map((Obj) => {
        if (Obj.course_id !== CurrentInfoObject.cartCourseCount) {
          return Obj;
        }
      });
      setCartCourseInfoList(newCartCourseInfoList);
      // console.log(newCartCourseInfoList);
    }
    setCartCourseInfoList(newCartCourseInfoList);
    // console.log(cartCourseInfoList);
  }

  //課堂報名人數加一
  function handleCountPlus() {
    let newCartCourseInfoList = cartCourseInfoList;
    if (
      newCartCourseInfoList[index].cartCourseCount <
      newCartCourseInfoList[index].member_limit -
        newCartCourseInfoList[index].member_count
      //需要小於課堂人上限
    ) {
      newCartCourseInfoList[index].cartCourseCount =
        cartCourseInfoList[index].cartCourseCount + 1;
    }
    setCartCourseInfoList(newCartCourseInfoList);
  }

  // useEffect(,[])

  return (
    <div className="CartCourse-container">
      {/* 圖片容器 */}
      <div className="CartCourse-info-left">
        <div className="CartCourse-pic-container">
          <img
            // src={`./components/images/${cartCourseInfoArray[0].course_picture}`}
            src={CoursePic}
            className="CartCourse-pic"
          ></img>
        </div>
      </div>
      {/* 資訊容器 */}
      <div className="CartCourse-info-right">
        <div className="CartCourse-info-right-top">
          <div className="CartCourse-name">
            <h6>{CurrentInfoObject.course_name}</h6>
          </div>
          <div className="CartCourse-batch">
            <p>課程梯次：{CurrentInfoObject.course_batch}</p>
          </div>
        </div>
        <div className="CartCourse-info-right-bottom">
          <div className="count-container">
            <button
              className="count-minus"
              id={CurrentInfoObject.cartCourseCount}
              onClick={handleCountMinus}
            >
              <FaMinus />
            </button>
            <div className="count" id={CurrentInfoObject.cartCourseCount}>
              {cartCourseCount.CurrentInfoObject.cartCourseCount}
            </div>
            <button
              className="count-plus"
              id={CurrentInfoObject.cartCourseCount}
              onClick={handleCountPlus}
            >
              <FaPlus />
            </button>
          </div>
          <div className="price">
            <h5>{"NT$" + subtotal}</h5>
          </div>
          <div className="edit-Button">
            <div className="addToCollection">
              <button>
                <p>收藏</p>
              </button>
            </div>
            <div className="seperationLine"></div>
            <div className="DeleteThisCourse">
              <button>
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
