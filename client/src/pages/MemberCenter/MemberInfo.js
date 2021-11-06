import React, { useState } from "react";
import Button from "../../components/Button";
import CreditCards from "../../components/CreditCards";

// 給創造信用卡卡號的四個input使用
let cCardArray = [1, 2, 3, 4];
const MemberInfo = (props) => {
  const [memberInfo, setMemberInfo] = useState({
    lastName: "",
    firstName: "",
    telephone: "",
    birthday: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    passwordConfirm: "",
    newPassword: "",
  });
  const [creditCardsInfo, setCreditCardsInfo] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  // 即時抓取基本資料填寫
  const handleMemberInfoChange = (e) => {
    setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value });
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
          <h2>會員資訊</h2>
        </header>
        <div className="MemberInfo-container-cards">
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
            <h2>付款資訊</h2>
          </header>

          <CreditCards
            creditCardsInfo={creditCardsInfo}
            setCreditCardsInfo={setCreditCardsInfo}
          />

          <div className="MemberInfo-container-buttonCon">
            <Button
              value={"確認修改"}
              className={"button-themeColor"}
              onClick={handlePaymentEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
