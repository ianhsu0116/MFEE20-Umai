import React from "react";

const ReviewButton = (props) => {
  const { isReview, setIsReview } = props;

  // 控制按鈕左右切換
  const handleReviewClick = (e) => {
    //e.stopPropagation();
    isReview ? setIsReview(false) : setIsReview(true);
  };
  return (
    <div className="ReviewButton" onClick={handleReviewClick}>
      <div
        className={`ReviewButton-btn ${isReview && "ReviewButton-btn-active"}`}
      >
        <div className="ReviewButton-btn-imgCon"></div>
      </div>
    </div>
  );
};

export default ReviewButton;
