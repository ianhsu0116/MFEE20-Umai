import React, { useState } from "react";
import OptionBar from "../../components/OptionBar";

// 要丟入 BoardChangeBar 的三個按鍵值
const allOrderStatus = ["未完成訂單", "已完成訂單", "歷史訂單"];
const OrderInfo = () => {
  const [orderStatus, setOrderStatus] = useState("未完成訂單");

  return (
    <div className="OrderInfo">
      <div className="OrderInfo-container">
        <header className="OrderInfo-container-header">
          <h1>訂單資訊</h1>
        </header>
        <OptionBar
          allStatus={allOrderStatus}
          currentStatus={orderStatus}
          setCurrentStatus={setOrderStatus}
        />
      </div>
    </div>
  );
};

export default OrderInfo;
