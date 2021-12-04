import React from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'

const ForumHeader = () => {
  return (
    <div>
      <MultiLevelBreadcrumb />
      <h1 className="Forum-main-h2 ">日式料理</h1>
      <div className="Forum-main-submit ">
        <a href="./ForumPublish">我要投稿</a>
      </div>
      <div className="st-line"></div>
    </div>
  );
};

export default ForumHeader;
