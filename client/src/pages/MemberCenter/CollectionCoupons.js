import React, { useState, useEffect } from "react";
import Coupons from "../../components/Coupons";
import OptionBar from "../../components/OptionBar";

// 要丟入 OptionBar 的三個按鍵值
const allOrderStatus = ["未使用優惠券", "已使用優惠券", "已過期優惠券"];

const CollectionCoupons = (props) => {
  const [couponsStatus, setCouponsStatus] = useState("未使用優惠券"); // 優惠券狀態
  const [currentData, setCurrentDate] = useState([]); // 當前拿到的所有優惠券

  useEffect(() => {
    switch (couponsStatus) {
      case "未使用優惠券":
        setCurrentDate([
          {
            id: "0000000000001",
            title: "中秋節快閃！全站商品85折大放送！",
            discount_percent: "0.85",
            status: 1,
            expire_date: "2021-12-25",
            valid: "1",
          },
          {
            id: "0000000000002",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 1,
            expire_date: "2021-12-30",
            valid: "1",
          },
          {
            id: "0000000000003",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 1,
            expire_date: "2021-11-25",
            valid: "1",
          },
          {
            id: "0000000000003",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 1,
            expire_date: "2021-11-25",
            valid: "1",
          },
          {
            id: "0000000000003",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 1,
            expire_date: "2021-11-25",
            valid: "1",
          },
        ]);
        break;
      case "已使用優惠券":
        setCurrentDate([
          {
            id: "0000000000004",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 2,
            expire_date: "2021-12-3",
            valid: "1",
          },
          {
            id: "0000000000005",
            title: "中秋節快閃！全站商品85折大放送！",
            discount_percent: "0.85",
            status: 2,
            expire_date: "2021-11-3",
            valid: "1",
          },
          {
            id: "0000000000006",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 2,
            expire_date: "2021-11-2",
            valid: "1",
          },
        ]);
        break;
      case "已過期優惠券":
        setCurrentDate([
          {
            id: "0000000000007",
            title: "聖誕節快閃！全站商品95折大放送！",
            discount_percent: "0.95",
            status: 1,
            expire_date: "2021-1-5",
            valid: 1,
          },
          {
            id: "0000000000008",
            title: "中秋節快閃！全站商品85折大放送！",
            discount_percent: "0.85",
            status: 2,
            expire_date: "2021-4-30",
            valid: 1,
          },
        ]);
        break;
      default:
    }
  }, [couponsStatus]);

  return (
    <div className="CollectionCoupons">
      <div className="CollectionCoupons-container">
        <header className="CollectionCoupons-container-header">
          <h2>優惠券</h2>
        </header>

        {/* 切換狀態的導覽列 */}
        <OptionBar
          allStatus={allOrderStatus}
          currentStatus={couponsStatus}
          setCurrentStatus={setCouponsStatus}
        />

        <div className="CollectionCoupons-container-cards">
          {currentData &&
            currentData.map((data, index) => (
              <Coupons key={index} data={data} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionCoupons;
