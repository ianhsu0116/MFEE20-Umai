import React, { useState } from "react";
import ReviewButton from "../../components/member/ReviewButton";

const CourseInsert = (props) => {
  const { isReview, setIsReview } = props;
  // // 是否為預覽狀態
  // const [isReview, setIsReview] = useState(false);

  return (
    <div className="CourseInsert">
      <div className="CourseInsert-container">
        <ReviewButton isReview={isReview} setIsReview={setIsReview} />

        <header className="CourseInsert-container-header">
          <h2>新增課程</h2>
        </header>

        <header className="CourseInsert-container-header">
          <h2>課程詳細內容</h2>
        </header>
      </div>
    </div>
  );
};

export default CourseInsert;
