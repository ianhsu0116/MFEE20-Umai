import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberInfo from "./MemberInfo";
import DefaultStudent from "./DefaultStudent";
import OrderInfo from "./OrderInfo";
import CollectionCourse from "./CollectionCourse";
import CollectionCoupons from "./CollectionCoupons";
import CollectionArticle from "./CollectionArticle";
import CourseInsert from "./CourseInsert";

const MemberCenter = (props) => {
  const [currentBoard, setCurrentBoard] = useState("會員資訊"); // 各個看板active狀態

  // 是否為預覽狀態 (給CourseInsert專用)
  const [isReview, setIsReview] = useState(false);

  return (
    <div className="MemberCenter">
      <div className="MemberCenter-container">
        {/* {isReview && <CollectionCoupons />} */}
        <MemberSidebar
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
        />
        {currentBoard === "會員資訊" && <MemberInfo />}
        {currentBoard === "預設學員" && <DefaultStudent />}
        {currentBoard === "訂單資訊" && <OrderInfo />}
        {currentBoard === "收藏課程" && <CollectionCourse />}
        {currentBoard === "收藏文章" && <CollectionArticle />}
        {currentBoard === "優惠券" && <CollectionCoupons />}
        {currentBoard === "新增課程" && (
          <CourseInsert isReview={isReview} setIsReview={setIsReview} />
        )}
      </div>
    </div>
  );
};

export default MemberCenter;
