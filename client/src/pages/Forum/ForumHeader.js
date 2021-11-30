import React from "react";

const ForumHeader = () => {
  return (
    <div>
      <h5 className="Forum-main-h3">首頁>討論區</h5>
      <h1 className="Forum-main-h2 ">日式料理</h1>
      <div className="Forum-main-submit ">
        <a href="./ForumPublish">我要投稿</a>
      </div>
      <div className="st-line"></div>
    </div>
  );
};

export default ForumHeader;
