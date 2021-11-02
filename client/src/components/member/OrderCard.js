import React, { useState } from "react";
import foodImg from "../images/sushi-unsplash.jpg";
import foodImg2 from "../images/cocktail2-unsplash.jpg";

const OrderCard = (props) => {
  let { orderDetail } = props;
  const [orderDetailOpen, setOrderDetailOpen] = useState(false); // 控制下拉視窗開關

  // 控制訂單明細視窗開關
  const handleOrderDetailOpen = () => {
    orderDetailOpen ? setOrderDetailOpen(false) : setOrderDetailOpen(true);
  };
  return (
    <div className="OrderCard">
      <div className="OrderCard-container" onClick={handleOrderDetailOpen}>
        <figure className="OrderCard-image-con">
          <img src={foodImg} alt="courseImage" className="OrderCard-image" />
        </figure>
        <div className="OrderCard-items OrderCard-courseTitle">
          <h3>{orderDetail.courseName}</h3>
        </div>
        <div className="OrderCard-items OrderCard-orderStatus">
          <p>{orderDetail.orderStatus}</p>
        </div>
        <div className="OrderCard-items OrderCard-orderBatch">
          <p>{orderDetail.orderBatch}</p>
        </div>
        <div className="OrderCard-items OrderCard-mamberCount">
          <p>
            購買名額：{" "}
            <span className="OrderCard-mamberCount-count">
              {orderDetail.courseMember.length}
            </span>{" "}
            人
          </p>
          <p>
            參加學員：{" "}
            <span className="OrderCard-mamberCount-count">
              {orderDetail.courseMemberLimit.length}
            </span>{" "}
            人
          </p>
        </div>
      </div>

      {/* 訂單詳細資訊的下拉式容器 */}
      <div
        className={`OrderCard-detail ${
          orderDetailOpen && "OrderCard-detail-active"
        }`}
      >
        <header className="OrderCard-detail-title">
          <h3 className="hrderCard-detail-title-h3">付款詳細資訊</h3>
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
              2021-12-31
            </div>
          </div>
          <div className="OrderCard-detail-container-item">
            <strong className="OrderCard-detail-container-item-title">
              發票資訊
            </strong>
            <div className="OrderCard-detail-container-item-content">
              聯絡人：<span>Ian Hsu</span>
            </div>
            <div className="OrderCard-detail-container-item-content">
              聯絡信箱：<span>ianian@fake.com</span>
            </div>
            <div className="OrderCard-detail-container-item-content">
              電子發票 - 交給Umai幫您捐出去做愛心！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
