import React, { useRef, useState } from "react";

// 給創造信用卡卡號使用
let cCardArray = [1, 2, 3, 4];
const MemberInfo = (props) => {
  const [memberInfo, setMemberInfo] = useState({
    lastName: "",
    firstName: "",
    telephone: "",
    birthday: "",
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: ["0", "1", "2", "3"],
    cardDate: "",
    cardSafety: "",
  });
  // 給信用卡16碼 => 分四個input box
  const cCardInputRefs = cCardArray.map((i) => React.createRef());

  // 即時抓取基本資料填寫
  const handleMemberInfoChange = (e) => {
    setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value });
  };

  // 即時抓取信用卡號填寫
  const handleCCardChange = (index) => (e) => {
    // 自動換到下一欄位
    if (e.target.value.length >= 4 && cCardInputRefs[index + 1]) {
      cCardInputRefs[index + 1].current.focus();
    }

    // 判斷此次是否為卡號
    if (e.target.name === "cardNumber") {
      let newCardInfo = { ...cardInfo };
      newCardInfo[e.target.name][index] = e.target.value;
      setCardInfo(newCardInfo);
    } else {
      console.log("f");
      setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    }
  };

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
              htmlFor="last-name"
            >
              名字
            </label>
            <input
              type="text"
              name="lastName"
              id="last-name"
              className="MemberInfo-container-inputCon-input"
              onChange={handleMemberInfoChange}
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
              name="firstName"
              id="first-name"
              className="MemberInfo-container-inputCon-input"
              onChange={handleMemberInfoChange}
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
              name="telephone"
              id="tele"
              className="MemberInfo-container-inputCon-input"
              onChange={handleMemberInfoChange}
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
              name="birthday"
              id="birth"
              className="MemberInfo-container-inputCon-input"
              onChange={handleMemberInfoChange}
            />
          </div>
        </div>
        <div className="MemberInfo-container-buttonCon">
          <button className="MemberInfo-container-buttonCon-btn">
            確認修改
          </button>
        </div>
        <header className="MemberInfo-container-header">
          <h1>付款資訊</h1>
        </header>
        <div className="MemberInfo-container-row">
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="creditCard-number"
            >
              信用卡卡號
            </label>
            <div className="MemberInfo-container-inputCon-ccardCon">
              {/* 直接生成四個CCard input */}
              {cCardArray.map((i, index) => (
                <input
                  key={index}
                  ref={cCardInputRefs[index]}
                  onChange={handleCCardChange(index)}
                  name="cardNumber"
                  type="text"
                  maxLength="4"
                  id={index === 0 && "creditCard-number"}
                  className="MemberInfo-container-inputCon-input"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="MemberInfo-container-row">
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="CCard-date"
            >
              到期日(MM/DD)
            </label>
            <input
              type="text"
              name="cardDate"
              id="CCard-date"
              maxLength="5"
              className="MemberInfo-container-inputCon-input 
              MemberInfo-container-inputCon-ccardInput"
              onChange={handleCCardChange()}
            />
          </div>
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="CCard-safety"
            >
              末三碼
            </label>
            <input
              type="text"
              name="cardSafety"
              maxLength="3"
              id="CCard-safety"
              className="MemberInfo-container-inputCon-input MemberInfo-container-inputCon-ccardInput"
              onChange={handleCCardChange()}
            />
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
