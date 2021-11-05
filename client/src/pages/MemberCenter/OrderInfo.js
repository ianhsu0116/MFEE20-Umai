import React, { useState, useEffect } from "react";
import OptionBar from "../../components/OptionBar";
import OrderCard from "../../components/member/OrderCard";

// 要丟入 OptionBar 的三個按鍵值
const allOrderStatus = ["未完成訂單", "已完成訂單", "歷史訂單"];
const OrderInfo = () => {
  const [orderStatus, setOrderStatus] = useState("未完成訂單"); // 訂單狀態
  const [currentData, setCurrentDate] = useState([]); // 當前拿到的所有訂單
  useEffect(() => {
    switch (orderStatus) {
      case "未完成訂單":
        setCurrentDate([
          {
            courseId: "0001",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本四十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/22",
            courseMember: new Array(8).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0002",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本八十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/10",
            courseMember: new Array(19).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0001",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本四十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/22",
            courseMember: new Array(8).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0002",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本八十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/10",
            courseMember: new Array(19).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0001",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本四十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/22",
            courseMember: new Array(8).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0002",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本八十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/10",
            courseMember: new Array(19).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0001",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本四十年老師父",
            orderStatus: "未完成",
            orderBatch: "2021/12/22",
            courseMember: new Array(8).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
        ]);
        break;
      case "已完成訂單":
        setCurrentDate([
          {
            courseId: "0003",
            courseImage: "foodImg2",
            courseName: "築地創意壽司 - 道地日本十五十年老師父",
            orderStatus: "已完成",
            orderBatch: "2021/12/11",
            courseMember: new Array(25).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0004",
            courseImage: "foodImg",
            courseName: "台式奇怪壽司 - 道地金門四十年老師父",
            orderStatus: "已完成",
            orderBatch: "2021/12/22",
            courseMember: new Array(8).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0002",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本八十年老師父",
            orderStatus: "已完成",
            orderBatch: "2021/12/10",
            courseMember: new Array(19).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0001",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本四十年老師父",
            orderStatus: "已完成",
            orderBatch: "2021/12/22",
            courseMember: new Array(8).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
        ]);
        break;
      case "歷史訂單":
        setCurrentDate([
          {
            courseId: "0003",
            courseImage: "foodImg",
            courseName: "韓式創意料理 - 道地韓國一年老師父",
            orderStatus: "歷史訂單",
            orderBatch: "2021/12/30",
            courseMember: new Array(13).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
          {
            courseId: "0002",
            courseImage: "foodImg",
            courseName: "築地創意壽司 - 道地日本八十年老師父",
            orderStatus: "歷史訂單",
            orderBatch: "2021/12/10",
            courseMember: new Array(19).fill(1), // 模擬已報名人數
            courseMemberLimit: new Array(30).fill(1), // 模擬課程報名上限
          },
        ]);
        break;
      default:
    }
  }, [orderStatus]);

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
                orderDetail={orderDetail}
                //allOrderStatus={allOrderStatus}
              />
            ))}
        </div>

        {/* 沒有任何訂單的情況 */}
        {currentData && currentData.length === 0 && (
          <h3>目前還沒有任何訂單～</h3>
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
