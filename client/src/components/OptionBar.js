import React from "react";

const OptionBar = (props) => {
  let { allStatus, currentStatus, setCurrentStatus } = props;

  const handleChangeStatus = (e) => {
    setCurrentStatus(e.target.innerText);
  };
  return (
    <div className="BoardChangeBar">
      <ul className="BoardChangeBar-ul">
        {allStatus &&
          allStatus.map((value, index) => (
            <li
              key={index}
              className={`BoardChangeBar-ul-li ${
                currentStatus === value && "BoardChangeBar-ul-li-active"
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
