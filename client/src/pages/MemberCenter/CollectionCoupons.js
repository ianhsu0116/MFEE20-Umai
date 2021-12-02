import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Coupons from "../../components/Coupons";
import OptionBar from "../../components/OptionBar";
import MemberService from "../../services/member.service";
import getValidMessage from "../../validMessage/validMessage";
import Swal from "sweetalert2";

// 要丟入 OptionBar 的三個按鍵值
const allOrderStatus = ["未使用優惠券", "已使用優惠券", "已過期優惠券"];

const CollectionCoupons = (props) => {
  const { currentUser } = props;
  const [couponsStatus, setCouponsStatus] = useState("未使用優惠券"); // 優惠券狀態
  const [currentData, setCurrentData] = useState([]); // 當前拿到的所有優惠券

  // 依照不同的狀態，拿到當符合的優惠券資料
  useEffect(async () => {
    // type => 1:未使用(未過期) 2:已使用 3:已過期未使用
    let type = 1;
    switch (couponsStatus) {
      case "未使用優惠券":
        type = 1;
        break;
      case "已使用優惠券":
        type = 2;
        break;
      case "已過期優惠券":
        type = 3;
        break;
      default:
        type = 1;
        break;
    }

    try {
      let result = await MemberService.coupons(currentUser.id, type);
      //console.log(result.data);
      setCurrentData(result.data.coupons);
      // console.log(result.data.coupons);
    } catch (error) {
      // console.log(error.response);
      console.log(error);
      let { code } = error.response.data;

      // 提示錯誤
      Swal.fire({
        icon: "error",
        title: getValidMessage("forum", code),
        showConfirmButton: false,
        timer: 1500,
      });
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

          {currentData && currentData.length === 0 && (
            <div className="MemberCenter-defaultText">
              目前您還沒有優惠券喔！趕緊去
              <Link to="/courses/category?all">課程探索</Link>
              逛逛吧，即日起選購滿三堂課程就送一張9折優惠券！
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCoupons;
