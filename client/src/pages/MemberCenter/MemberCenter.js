import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberInfo from "./MemberInfo";
import OrderInfo from "./OrderInfo";
import CollectionCourse from "./CollectionCourse";

const MemberCenter = (props) => {
  const [currentBoard, setCurrentBoard] = useState("會員資訊"); // 各個看板active狀態

  return (
    <div className="MemberCenter">
      <div className="MemberCenter-container">
        <MemberSidebar
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
        />
        {currentBoard === "會員資訊" && <MemberInfo />}
        {currentBoard === "訂單資訊" && <OrderInfo />}
        {currentBoard === "收藏課程" && <CollectionCourse />}
        {currentBoard === "收藏文章" && <MemberInfo />}
        {currentBoard === "優惠券" && <MemberInfo />}
      </div>
    </div>
  );
};

export default MemberCenter;
