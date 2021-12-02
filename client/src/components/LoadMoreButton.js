import React from "react";
import { ImDownload } from "react-icons/im";

const LoadMoreButton = (props) => {
  let { onClick } = props;
  return (
    <button className="LoadMoreButton" onClick={onClick}>
      <span className="LoadMoreButton-text">載入更多</span>
      <ImDownload />
    </button>
  );
};

export default LoadMoreButton;
