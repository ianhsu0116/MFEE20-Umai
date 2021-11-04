import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "./Button";

const DefaultStudentCard = (props) => {
  let { index } = props;
  let [pathname, setPathname] = useState("/");
  let [cardOpen, setCardOpen] = useState(false);
  let studentCardRefs = useRef();

  useEffect(() => {
    // 抓到當前網址去判斷卡片要呈現的樣式
    setPathname(props.location.pathname);
  }, []);

  // 刪除學生(動畫)
  const handleDeleteStudent = (index) => (e) => {
    studentCardRefs.current.style.animation = "scaleDown 0.3s forwards";
  };
  // 等動畫跑完在真正刪除 (onAnimationEnd)
  const handleSlowDelete = (e) => {
    console.log("刪除學員");
    studentCardRefs.current.remove();
  };

  // 啓閉學員詳細內容
  const handleOpenCard = () => {
    cardOpen ? setCardOpen(false) : setCardOpen(true);
    console.log(pathname);
  };

  return (
    <div
      ref={studentCardRefs}
      onAnimationEnd={handleSlowDelete}
      className={`DefaultStudentCard ${
        cardOpen && "DefaultStudentCard-active"
      }`}
    >
      <div className="DefaultStudentCard-title">
        <div className="DefaultStudentCard-title-left" onClick={handleOpenCard}>
          <MdOutlineKeyboardArrowDown />

          <span>學員-{index + 1}</span>
        </div>
        <div className="DefaultStudentCard-title-right">
          {/* 會員中心內不顯示此欄位 */}
          {pathname !== "/memberCenter" && (
            <select
              name=""
              id=""
              className="DefaultStudentCard-title-right-select"
            >
              <option value="">選擇預設學員</option>
              <option value="id">學員名稱</option>
              <option value="id">學員名稱</option>
              <option value="id">學員名稱</option>
            </select>
          )}

          <Button
            value={"刪除"}
            className={"button-activeColor DefaultStudentCard-title-right-btn"}
            onClick={handleDeleteStudent(index)}
          />
        </div>
      </div>
      <div className="DefaultStudentCard-main">
        <div className="DefaultStudentCard-main-row">
          <div className="DefaultStudentCard-main-row-item">
            <label
              htmlFor="firstName"
              className="DefaultStudentCard-main-row-item-label"
            >
              名字
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="請輸入真實名字"
              className="DefaultStudentCard-main-row-item-input"
            />
          </div>
          <div className="DefaultStudentCard-main-row-item">
            <label
              htmlFor="lastName"
              className="DefaultStudentCard-main-row-item-label"
            >
              姓氏
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard-main-row-item-input"
            />
          </div>
        </div>
        <div className="DefaultStudentCard-main-row">
          <div className="DefaultStudentCard-main-row-item">
            <label
              htmlFor="telephone"
              className="DefaultStudentCard-main-row-item-label"
            >
              聯絡電話
            </label>
            <input
              type="text"
              id="telephone"
              placeholder="請輸入手機號碼"
              className="DefaultStudentCard-main-row-item-input"
            />
          </div>
          <div className="DefaultStudentCard-main-row-item">
            <label
              htmlFor="birthday"
              className="DefaultStudentCard-main-row-item-label"
            >
              生日
            </label>
            <input
              type="date"
              id="birthday"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard-main-row-item-input"
            />
          </div>
        </div>
        <div className="DefaultStudentCard-main-row">
          <div className="DefaultStudentCard-main-row-item DefaultStudentCard-main-row-itemEmail">
            <label
              htmlFor="email"
              className="DefaultStudentCard-main-row-item-label"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="請輸入Email"
              className="DefaultStudentCard-main-row-item-input"
            />
          </div>
        </div>
        {/* 會員中心內不顯示此欄位 */}
        {pathname !== "/memberCenter" && (
          <div className="DefaultStudentCard-main-row">
            <div className="">
              <input
                type="checkbox"
                id="addIntoStudent"
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-item-checkbox"
              />
              &ensp;
              <label
                htmlFor="addIntoStudent"
                className="DefaultStudentCard-main-row-item-label"
              >
                新增至預設學員資料
              </label>
            </div>
            <div className="">
              <input
                type="checkbox"
                id="autoUpdateMember"
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-item-checkbox"
              />
              &ensp;
              <label
                htmlFor="autoUpdateMember"
                className="DefaultStudentCard-main-row-item-label"
              >
                同步更新會員資料
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(DefaultStudentCard);
