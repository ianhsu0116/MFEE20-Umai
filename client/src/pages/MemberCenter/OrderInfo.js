import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import OptionBar from "../../components/OptionBar";
import OrderCard from "../../components/member/OrderCard";
import OrderService from "../../services/order.service";
import getValidMessage from "../../validMessage/validMessage";
import ErrorMessage from "../../components/ErrorMessage";

// 要丟入 OptionBar 的三個按鍵值
const allOrderStatus = ["未完成訂單", "已完成訂單", "歷史訂單"];
const OrderInfo = (props) => {
  const { currentUser } = props;
  // 訂單狀態
  const [orderStatus, setOrderStatus] = useState("未完成訂單");
  // 當前拿到的所有訂單
  const [currentData, setCurrentData] = useState([]);
  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState({});

  useEffect(async () => {
    // 按下切換 關閉已打開的下拉視窗 / 清空錯誤訊息
    setOrderDetailOpen(-1);
    setErrorMsg({});

    // 依照切換的訂單狀態去拿資料
    let type = 1;
    switch (orderStatus) {
      case "未完成訂單":
        type = 1;
        break;
      case "已完成訂單":
        type = 2;
        break;
      case "歷史訂單":
        type = 3;
        break;
      default:
        type = 1;
        break;
    }
    try {
      // 依照訂單狀態拿到茲料
      let result = await OrderService.getByMemberId(currentUser.id, type);
      setCurrentData(result.data.order);
      //console.log(result.data.order);
    } catch (error) {
      //console.log(error);
      // console.log(error.response);
      let { code } = error.response.data;
      // 跳通知
      Swal.fire({
        icon: "error",
        title: getValidMessage("member", code),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [orderStatus]);

  // 手風琴效果
  const [orderDetailOpen, setOrderDetailOpen] = useState(-1);
  const toggle = (index) => {
    // 如果點擊已開啟的card就關閉，點及其他卡片的話則啟動手風琴效果
    if (orderDetailOpen === index) {
      setOrderDetailOpen(-1);
    } else {
      setOrderDetailOpen(index);
    }
  };

  // 送出評論
  // 評論送出
  const handleCommentSubmit = async (commentAndStar, index) => {
    // 先判斷是否留言是空白的
    if (commentAndStar.comment.length === 0) {
      setErrorMsg({ ...ErrorMessage, [index]: "評論不可為空白！" });
      return;
    }

    // 沒錯誤後才送後端
    try {
      let result = await OrderService.commentEdit(commentAndStar);
      // 跳通知
      Swal.fire({
        icon: "success",
        title: "評論新增成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.response);
      let { code } = error.response.data;
      // 跳通知
      Swal.fire({
        icon: "error",
        title: getValidMessage("member", code),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="OrderInfo">
      <div className="OrderInfo-container">
        <header className="OrderInfo-container-header">
          <h2>訂單資訊</h2>
        </header>

        {/* 切換狀態的導覽列 */}
        <OptionBar
          allStatus={allOrderStatus}
          currentStatus={orderStatus}
          setCurrentStatus={setOrderStatus}
        />

        {/* 表格標題列 */}
        <div className="OrderInfo-container-tableHead">
          <div className="OrderInfo-container-tableHead-item1">課程名稱</div>
          <div>訂單狀態</div>
          <div>報名梯次</div>
          <div>&ensp;&ensp;&ensp;&ensp;學員人數</div>
        </div>

        {/* 訂單卡片 */}
        <div className="OrderInfo-container-tableBody">
          {currentData &&
            currentData.map((orderDetail, index) => (
              <OrderCard
                key={index}
                index={index}
                toggle={toggle}
                orderDetailOpen={orderDetailOpen}
                orderDetail={orderDetail}
                orderStatus={orderStatus}
                handleCommentSubmit={handleCommentSubmit}
                errorMsg={errorMsg}
              />
            ))}
        </div>

        {/* 沒有任何訂單的情況 */}
        {currentData && currentData.length === 0 && (
          <div className="MemberCenter-defaultText">
            目前您還沒有任何訂單喔！趕緊去
            <Link to="/courses">課程探索</Link>
            逛逛吧！
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
