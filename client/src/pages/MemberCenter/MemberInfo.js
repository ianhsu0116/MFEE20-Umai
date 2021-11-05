import React, { useState } from "react";
import { GiXylophone } from "react-icons/gi";
import Button from "../../components/Button";

// 給創造信用卡卡號的四個input使用
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
  const [passwordInfo, setPasswordInfo] = useState({
    passwordConfirm: "",
    newPassword: "",
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

  // 個資修改
  const handleInfoEdit = () => {
    console.log("handleInfoEdit");
  };

  // 付款資訊修改
  const handlePaymentEdit = () => {
    console.log("handlePatmentEdit");
  };

  // 密碼修改容器開關
  const [passwordConOpen, setPasswordConOpen] = useState(false);
  const handlePasswordConOpen = () => {
    passwordConOpen ? setPasswordConOpen(false) : setPasswordConOpen(true);
    setPasswordInfo({
      passwordConfirm: "",
      newPassword: "",
    });
  };

  // 即時抓取密碼填寫
  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  // 送出密碼修改
  const handlePasswordEdit = () => {
    console.log(passwordInfo);
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
              htmlFor="first-name"
            >
              名字
            </label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              className="MemberInfo-container-inputCon-input"
              onChange={handleMemberInfoChange}
            />
          </div>
          <div className="MemberInfo-container-inputCon">
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="last-name"
            >
              姓氏
            </label>
            <input
              type="text"
              name="lastName"
              id="last-name"
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
        <div className="MemberInfo-container-row">
          <div
            className={`MemberInfo-container-inputCon MemberInfo-container-passwordCon ${
              passwordConOpen && "MemberInfo-container-passwordCon-active"
            }`}
          >
            <label
              className="MemberInfo-container-inputCon-label"
              htmlFor="password"
            >
              密碼
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordInfo.passwordConfirm}
              placeholder="舊密碼確認"
              className="MemberInfo-container-inputCon-input"
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="newPassword"
              id="password"
              value={passwordInfo.newPassword}
              placeholder="輸入新密碼"
              className="MemberInfo-container-inputCon-input"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className={`MemberInfo-container-inputCon-passwordSubmitBtn ${
              passwordConOpen &&
              "MemberInfo-container-inputCon-passwordSubmitBtn-active"
            }`}
            onClick={handlePasswordEdit}
          >
            確認修改
          </button>
          <button
            className="MemberInfo-container-inputCon-passwordEditBtn"
            onClick={handlePasswordConOpen}
          >
            {passwordConOpen ? "取消修改" : "修改密碼"}
          </button>
        </div>
        <div className="MemberInfo-container-buttonCon">
          <Button
            value={"確認修改"}
            className={"button-themeColor"}
            onClick={handleInfoEdit}
          />
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
              "
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
              className="MemberInfo-container-inputCon-input "
              onChange={handleCCardChange()}
            />
          </div>
        </div>

        <div className="MemberInfo-container-buttonCon">
          <Button
            value={"確認修改"}
            className={"button-themeColor"}
            onClick={handlePaymentEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
