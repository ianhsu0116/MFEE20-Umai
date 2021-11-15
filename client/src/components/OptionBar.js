import React from "react";

const OptionBar = (props) => {
  // 需要傳入三個props
  // 分別為所有狀態, 當前狀態, 設定當前狀態
  let { allStatus, currentStatus, setCurrentStatus } = props;

  // 控制狀態切換
  const handleChangeStatus = (e) => {
    setCurrentStatus(e.target.innerText);
  };
  return (
    <div className="OptionBar">
      <ul className="OptionBar-ul">
        {allStatus &&
          allStatus.map((value, index) => (
            <li
              key={index}
              className={`OptionBar-ul-li ${
                currentStatus === value && "OptionBar-ul-li-active"
              }`}
              onClick={handleChangeStatus}
            >
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OptionBar;
