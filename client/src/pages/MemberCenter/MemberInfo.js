import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import AuthService from "../../services/auth.service";
import MemberService from "../../services/member.service";
import getValidMessage from "../../validMessage/validMessage";
import Button from "../../components/Button";
import CreditCards from "../../components/CreditCards";
import Calendar from "../../components/Calendar";
import ErrorMessage from "../../components/ErrorMessage";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";

const MemberInfo = (props) => {
  const { currentUser, setCurrentUser } = props;

  // 錯誤訊息(一般資訊)
  const [errorMsg, setErrorMsg] = useState("");
  // 錯誤訊息(密碼修改)
  const [errorMsgPwd, setErrorMsgPwd] = useState("");
  // 錯誤訊息(信用卡)
  const [errorMsgCard, setErrorMsgCard] = useState("");
  // 使用者基本資料
  const [memberInfo, setMemberInfo] = useState({
    last_name: "",
    first_name: "",
    telephone: "",
    birthday: "",
  });
  // 密碼修改資料
  const [passwordInfo, setPasswordInfo] = useState({
    passwordConfirm: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  // 信用卡資料
  const [creditCardsInfo, setCreditCardsInfo] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });
  // 密碼修改容器開關
  const [passwordConOpen, setPasswordConOpen] = useState(false);
  // 修改密碼按鈕狀態
  const [editPasswordActive, setEditPasswordActive] = useState("");

  // 即時更新當前使用者資料的function
  async function refreshUser() {
    try {
      // 更新成功後，更新當前使用者資料
      let newUser = await AuthService.memberInfo(currentUser.id);
      // 存入local
      localStorage.setItem("user", JSON.stringify(newUser.data.member));
      // 裝入state
      setCurrentUser(AuthService.getCurrentUser());
    } catch (error) {
      console.log(error);
      if (error.response) {
        let { code } = error.response.data;
        // 跳通知
        Swal.fire({
          icon: "error",
          title: getValidMessage("member", code),
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  // 當currentUser的值存在後，更新資料
  useEffect(() => {
    if (currentUser) {
      // 如果資料有包含生日 （生日預設是Null）
      // let parseBirth;
      // if (currentUser.birthday) {
      //   // 先將日期格式轉換成 YYYY-MM-DD
      //   parseBirth = new Date(currentUser.birthday)
      //     .toLocaleDateString()
      //     .split("/")
      //     .join("-");
      //   setDefaultDate(parseBirth);
      // }

      // 更新state
      setMemberInfo({
        last_name: currentUser.last_name || "",
        first_name: currentUser.first_name || "",
        telephone: currentUser.telephone || "",
        birthday: currentUser.birthday || "",
      });
      // 更新state
      setCreditCardsInfo({
        cvc: "",
        expiry: "",
        name: currentUser.credit_card_name || "",
        number: currentUser.credit_card_number || "",
      });
    }
  }, [currentUser]);

  // 即時抓取基本資料填寫
  const handleMemberInfoChange = (e) => {
    setMemberInfo({ ...memberInfo, [e.target.name]: e.target.value });
  };

  // 即時抓取生日修改
  const handleBirthdayChange = (day) => {
    setMemberInfo({ ...memberInfo, birthday: day });
  };

  // 即時抓取密碼填寫
  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  // 即時判斷新密碼與確認密碼是否相同 / 以及控制確認修改按鍵狀態
  useEffect(() => {
    // 控制確認修改按鍵狀態 (三欄位都正確填寫 且 密碼與密碼確認相符時)
    passwordInfo.passwordConfirm &&
    passwordInfo.newPassword.length >= 8 &&
    passwordInfo.confirmNewPassword.length >= 8 &&
    passwordInfo.newPassword === passwordInfo.confirmNewPassword
      ? setEditPasswordActive(true)
      : setEditPasswordActive("");

    // 判斷兩密碼是否相同
    if (passwordInfo.newPassword && passwordInfo.confirmNewPassword) {
      passwordInfo.newPassword !== passwordInfo.confirmNewPassword
        ? setErrorMsgPwd("新密碼與密碼確認不相符！")
        : setErrorMsgPwd("");
    }
  }, [passwordInfo]);

  // 送出個資修改
  const handleInfoEdit = async () => {
    // 先確認資料是否都有填寫
    let { last_name, first_name, telephone, birthday } = memberInfo;
    if (!last_name || !first_name || !telephone || !birthday) {
      return setErrorMsg("請確實填寫每個欄位再送出！");
    }

    try {
      let result = await MemberService.infoEdit(memberInfo);

      // 更新成功後，更新當前使用者資料
      refreshUser();

      // 清空錯誤訊息
      setErrorMsg("");

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "基本資料更新成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("member", code));
    }
  };

  // 送出密碼修改
  const handlePasswordEdit = async () => {
    // 先確認資料是否都有填寫
    let { passwordConfirm, newPassword, confirmNewPassword } = passwordInfo;
    if (
      !passwordConfirm ||
      !newPassword ||
      !confirmNewPassword ||
      newPassword !== confirmNewPassword
    ) {
      return;
    }
    try {
      let result = await MemberService.passwordEdit(passwordInfo);

      // 關閉密碼修改容器
      setPasswordConOpen(false);

      // 清空當前密碼修改輸入的value
      setPasswordInfo({
        passwordConfirm: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // 清空錯誤訊息
      setErrorMsgPwd("");

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "密碼修改成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsgPwd(getValidMessage("member", code));
    }
  };

  // 送出付款資訊修改
  const handlePaymentEdit = async () => {
    let { name, number } = creditCardsInfo;
    // 先確認資料是否都有填寫
    if (!name || !number) {
      return setErrorMsgCard("請確實填寫卡號及持卡人欄位再送出！");
    }

    try {
      let result = await MemberService.creditCardEdit(number, name);

      // 更新成功後，更新當前使用者資料
      refreshUser();

      // 清空錯誤訊息
      setErrorMsgCard("");

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "信用卡資訊修改成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsgCard(getValidMessage("payment", code));
    }
  };

  // 控制密碼修改容器開關
  const handlePwdConOpen = (e) => {
    e.stopPropagation();
    setPasswordConOpen(true);
  };

  // ref測試中===============
  let infoRef = useRef(new Array(3).fill(1).map((i, index) => index));

  return (
    <div
      className="MemberInfo"
      onClick={() => {
        // 關閉密碼修改容器
        setPasswordConOpen(false);

        // 清空錯誤訊息
        setErrorMsgPwd("");

        // 清空忘記密碼的資料
        setPasswordInfo({
          passwordConfirm: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }}
    >
      <div className="MemberInfo-container">
        {/* 密碼修改 */}
        <div
          className={`MemberInfo-editPwd ${
            passwordConOpen && " MemberInfo-editPwd-active"
          }`}
        >
          <div
            className="MemberInfo-editPwd-con"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="MemberInfo-editPwd-con-title">
              {<RiLockPasswordFill />} 修改會員密碼
            </h3>
            <div className="MemberInfo-editPwd-con-line"></div>
            <div className="MemberInfo-editPwd-con-info">
              請填寫您的新舊密碼
            </div>
            <div className="MemberInfo-editPwd-con-main">
              <div className="MemberInfo-editPwd-con-main-inputCon">
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  value={passwordInfo.passwordConfirm}
                  onChange={handlePasswordChange}
                  placeholder="舊密碼"
                />
                <RiLockPasswordLine />
              </div>
              <div className="MemberInfo-editPwd-con-main-inputCon">
                <input
                  type="password"
                  name="newPassword"
                  id="password"
                  value={passwordInfo.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="新密碼(限8~12英數字)"
                />
                <RiLockPasswordFill />
              </div>
              <div className="MemberInfo-editPwd-con-main-inputCon">
                <input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  value={passwordInfo.confirmNewPassword}
                  onChange={handlePasswordChange}
                  placeholder="新密碼確認"
                />
                <RiLockPasswordFill />
              </div>
              {/* 錯誤訊息提示 */}
              {errorMsgPwd && <ErrorMessage value={errorMsgPwd} />}
              <button
                className={`MemberInfo-editPwd-con-main-btn ${
                  editPasswordActive && "MemberInfo-editPwd-con-main-btn-active"
                }`}
                onClick={handlePasswordEdit}
              >
                送出
              </button>
            </div>
          </div>
        </div>

        <header className="MemberInfo-container-header">
          <h2>會員資訊</h2>
          <div
            className="MemberInfo-passwordEditButton"
            onClick={handlePwdConOpen}
          >
            <FaPencilAlt />
            <span>密碼修改</span>
          </div>
        </header>

        <div className="MemberInfo-container-cards">
          <div className="MemberInfo-container-row">
            <div className="MemberInfo-container-inputCon">
              <label className="MemberInfo-container-inputCon-label">
                會員帳號 (Email)
              </label>
              <input
                type="text"
                className="MemberInfo-container-inputCon-input MemberInfo-accountContainer"
                placeholder="用戶email帳號"
                value={currentUser && currentUser.email}
                disabled
              />
            </div>
          </div>

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
                name="first_name"
                id="first-name"
                maxLength="15"
                className="MemberInfo-container-inputCon-input"
                placeholder="請輸入真實名字"
                value={memberInfo.first_name}
                onChange={handleMemberInfoChange}
                ref={infoRef[0]}
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
                name="last_name"
                id="last-name"
                maxLength="15"
                className="MemberInfo-container-inputCon-input"
                placeholder="請輸入真實姓氏"
                value={memberInfo.last_name}
                onChange={handleMemberInfoChange}
                ref={infoRef[1]}
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
                maxLength="10"
                className="MemberInfo-container-inputCon-input"
                placeholder="請輸入有效行動電話"
                value={memberInfo.telephone}
                onChange={handleMemberInfoChange}
                ref={infoRef[2]}
              />
            </div>
            <div className="MemberInfo-container-inputCon">
              <label
                className="MemberInfo-container-inputCon-label"
                htmlFor="birth"
              >
                出生日期
              </label>

              <Calendar
                onChange={handleBirthdayChange}
                value={memberInfo.birthday}
              />
            </div>
          </div>
          {errorMsg && <ErrorMessage value={errorMsg} />}

          <div className="MemberInfo-container-buttonCon">
            <Button
              value={"確認修改"}
              className={"button-themeColor"}
              onClick={handleInfoEdit}
            />
          </div>
        </div>
        <header className="MemberInfo-container-header">
          <h2>付款資訊</h2>
        </header>
        <div className="MemberInfo-container-cards">
          <CreditCards
            creditCardsInfo={creditCardsInfo}
            setCreditCardsInfo={setCreditCardsInfo}
          />

          {errorMsgCard && <ErrorMessage value={errorMsgCard} />}

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
