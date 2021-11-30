import React from "react";
import { ImDownload } from "react-icons/im";

const LoadMoreButton = (props) => {
  let { onClick } = props;
  return (
    <button className="LoadMoreButton" onClick={onClick}>
      載入更多
      <ImDownload />
    </button>
  );
};

export default LoadMoreButton;
