import React, { useState } from "react";
import ReviewButton from "../../components/member/ReviewButton";

const CourseInsert = () => {
  // 是否為預覽狀態
  const [isReview, setIsReview] = useState(false);

  return (
    <div className="CourseInsert">
      <div className="CourseInsert-container">
        <header className="CourseInsert-container-header">
          <h2>新增課程</h2>
        </header>
        <ReviewButton isReview={isReview} setIsReview={setIsReview} />

        <header className="CourseInsert-container-header">
          <h2>課程詳細內容</h2>
        </header>
      </div>
    </div>
  );
};

export default CourseInsert;
