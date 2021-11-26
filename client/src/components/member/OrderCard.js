import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { AiOutlineStar } from "react-icons/ai";
import { PUBLIC_URL } from "../../config/config";
import ErrorMessage from "../ErrorMessage";
import { numDotFormat } from "../../config/formula";

const OrderCard = (props) => {
  let {
    index,
    toggle,
    orderDetailOpen,
    orderDetail,
    orderStatus,
    handleCommentSubmit,
    errorMsg,
  } = props;

  // 課程評論輸入值 + 星星數量
  const [commentAndStar, setCommentAndStar] = useState({
    orders_id: "",
    course_id: "",
    star: 1,
    comment: "",
  });
  // 訂單狀態
  const [status, setStatus] = useState("訂單狀態");
  // 方票方式(1: 電子; 2: 捐贈)
  const [receiptStatus, setReceiptStatus] = useState("發票方式");

  // 設定訂單狀態欄位顯示文字
  useEffect(() => {
    switch (orderStatus) {
      case "未完成訂單":
        setStatus("未完成");
        break;
      case "已完成訂單":
        setStatus("已完成");
        break;
      case "歷史訂單":
        setStatus("歷史訂單");
        break;
    }
  }, [orderStatus]);

  useEffect(() => {
    // 設定發票方式
    if (orderDetail) {
      switch (orderDetail.receipt_type) {
        case 1:
          setReceiptStatus("電子發票");
          break;
        case 2:
          setReceiptStatus("交給Umai幫您捐出去做愛心！");
          break;
        default:
          setReceiptStatus("交給Umai幫您捐出去做愛心！");
          break;
      }

      // 設定預設評論 / 星星
      setCommentAndStar({
        orders_id: orderDetail.id,
        course_id: orderDetail.course_id,
        comment: orderDetail.comment_text || "",
        star: orderDetail.score || 1,
      });
    }
  }, [orderDetail]);

  // let orderDetail = {
  //   batch_date: "2021-11-25",
  //   batch_id: 41,
  //   comment_text: "good23232322",
  //   course_image: "course-642d4711-beff-492a-ad6b-79d3e486fdd8.jpg",
  //   course_id: 10,
  //   course_name: "極度美味中式饗宴",
  //   created_time: "2021-11-22 11:14:08",
  //   id: 5,
  //   member_count: 26,
  //   member_id: 1,
  //   member_limit: 30,
  //   orders_birthdate: "2021-01-01",
  //   orders_email: "test@test.com",
  //   orders_first_name: "mike",
  //   orders_last_name: "kee",
  //   orders_student_count: 1,
  //   orders_telephone: "0966666666",
  //   payment_type: 1,
  //   receipt_type: 1,
  //   score: 5,
  //   valid: 1,
  // }

  // 控制下拉視窗開關
  const handleOrderDetailOpen = () => {
    toggle(index);
  };

  // 星星動態增減
  const handleStarClick = (e) => {
    e.stopPropagation();
    let index = Number(e.currentTarget.dataset.index);
    setCommentAndStar({ ...commentAndStar, star: index + 1 });
  };

  // 即時抓取課程評價的值
  const handleCommentChange = (e) => {
    setCommentAndStar({ ...commentAndStar, comment: e.target.value });
  };

  return (
    <div className="OrderCard">
      <div className="OrderCard-container" onClick={handleOrderDetailOpen}>
        <figure className="OrderCard-image-con">
          <img
            src={`${PUBLIC_URL}/upload-images/${orderDetail.course_image}`}
            alt="courseImage"
            className="OrderCard-image"
          />
        </figure>
        <div className="OrderCard-items OrderCard-courseTitle">
          <h5>
            <Link to={`/courses/${orderDetail.course_id}`}>
              {orderDetail.course_name}
            </Link>
          </h5>
        </div>
        <div className="OrderCard-items OrderCard-orderStatus">
          <p>{status}</p>
        </div>
        <div className="OrderCard-items OrderCard-orderBatch">
          <p>{orderDetail.batch_date}</p>
        </div>
        <div className="OrderCard-items OrderCard-mamberCount">
          <p>
            購買名額：{" "}
            <span className="OrderCard-mamberCount-count">
              {orderDetail.orders_student_count}
            </span>{" "}
            人
          </p>
          <p>
            參加學員：{" "}
            <span className="OrderCard-mamberCount-count">
              {orderDetail.member_count}
            </span>{" "}
            人
          </p>
          <h5 className="OrderCard-mamberCount-price">
            NTD${numDotFormat(orderDetail.orders_price)}
          </h5>
        </div>
      </div>

      {/* 訂單詳細資訊的下拉式容器 */}

      <div
        className={`OrderCard-detail ${
          orderDetailOpen === index && "OrderCard-detail-active"
        }`}
      >
        <header className="OrderCard-detail-title">
          <h4 className="hrderCard-detail-title-h3">付款詳細資訊</h4>
        </header>
        <div className="OrderCard-detail-container">
          <div className="OrderCard-detail-container-item">
            <strong className="OrderCard-detail-container-item-title">
              付款方式
            </strong>
            <div className="OrderCard-detail-container-item-content">
              信用卡
            </div>
            <strong className="OrderCard-detail-container-item-title">
              訂單日期
            </strong>
            <div className="OrderCard-detail-container-item-content">
              {orderDetail.created_time}
            </div>
          </div>
          <div className="OrderCard-detail-container-item">
            <strong className="OrderCard-detail-container-item-title">
              發票資訊
            </strong>
            <div className="OrderCard-detail-container-item-content">
              聯絡人：
              <span>
                {orderDetail.orders_first_name +
                  " " +
                  orderDetail.orders_last_name}
              </span>
            </div>
            <div className="OrderCard-detail-container-item-content">
              聯絡信箱：<span>{orderDetail.orders_email}</span>
            </div>
            <div className="OrderCard-detail-container-item-content">
              電子發票 - {receiptStatus}
            </div>
          </div>
        </div>
        {orderDetail && status !== "未完成" && (
          <>
            <header className="OrderCard-detail-title">
              <h4 className="hrderCard-detail-title-h3">課程評價</h4>
            </header>
            <div className="OrderCard-detail-container2">
              <div className="OrderCard-detail-container2-left">
                <textarea
                  name="courseComment"
                  className="OrderCard-detail-container2-left-textarea"
                  onChange={handleCommentChange}
                  cols="30"
                  rows="5"
                  maxLength="50"
                  placeholder="請輸入課程評論(字數限制: 50)"
                  value={commentAndStar.comment}
                ></textarea>
                <ErrorMessage value={errorMsg[index]} />
              </div>

              <div className="OrderCard-detail-container2-right">
                <ul className="OrderCard-detail-container2-right-stars">
                  {/* 利用迴圈跑出星星 */}
                  {new Array(5).fill(1).map((i, index) => (
                    <li
                      key={index}
                      data-index={index}
                      className={`OrderCard-detail-container2-right-star ${
                        commentAndStar.star >= index + 1 &&
                        "OrderCard-detail-container2-right-starActive"
                      }`}
                      onClick={handleStarClick}
                    >
                      <AiOutlineStar />
                    </li>
                  ))}
                </ul>
                <div className="OrderCard-detail-container2-right-buttonCon">
                  <Button
                    value={"送出評論"}
                    className={"button-themeColor"}
                    onClick={() => {
                      handleCommentSubmit(commentAndStar, index);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
