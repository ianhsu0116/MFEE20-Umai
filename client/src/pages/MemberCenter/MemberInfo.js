import React from "react";

const MemberInfo = () => {
  return (
    <div className="MemberInfo">
      <div className="MemberInfo-container">
        <header className="MemberInfo-container-header">
          <h1>會員資訊</h1>
        </header>
        <div className="MemberInfo-container-row">
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="first-name"
            >
              名字
            </label>
            <input
              type="text"
              id="first-name"
              className="MemberInfo-container-inputCon-input"
            />
          </div>
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="first-name"
            >
              姓氏
            </label>
            <input
              type="text"
              id="first-name"
              className="MemberInfo-container-inputCon-input"
            />
          </div>
        </div>
        <div className="MemberInfo-container-row">
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="tele"
            >
              聯絡電話
            </label>
            <input
              type="tele"
              id="tele"
              className="MemberInfo-container-inputCon-input"
            />
          </div>
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="birth"
            >
              出生日期
            </label>
            <input
              type="date"
              id="birth"
              className="MemberInfo-container-inputCon-input"
            />
          </div>
        </div>
        <div className="MemberInfo-container-buttonCon">
          <button className="MemberInfo-container-buttonCon-btn">
            確認修改
          </button>
        </div>
        <div className="MemberInfo-container-row">
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="creditCard-number"
            >
              信用卡卡號
            </label>
            <div className="MemberInfo-container-inputCon-CCardCon">
              {/* 直接生成四個CCard input */}
              {new Array(4).fill(1).map((i) => (
                <input
                  type="text"
                  maxLength="4"
                  id="creditCard-number"
                  className="MemberInfo-container-inputCon-input"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="MemberInfo-container-buttonCon">
          <button className="MemberInfo-container-buttonCon-btn">
            確認修改
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
