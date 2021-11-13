import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberInfo from "./MemberInfo";
import DefaultStudent from "./DefaultStudent";
import OrderInfo from "./OrderInfo";
import CollectionCourse from "./CollectionCourse";
import CollectionCoupons from "./CollectionCoupons";
import CollectionArticle from "./CollectionArticle";
import CourseInsert from "./CourseInsert";

const MemberCenter = (props) => {
  let { currentUser, setCurrentUser } = props;

  // 確認當前登入狀態
  const history = useHistory();
  useEffect(async () => {
    // 如果當前沒有使用者的話，直接導回首頁
    if (!currentUser) {
      return history.push("/");
    }
  }, []);

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
          setCurrentUser={setCurrentUser}
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
