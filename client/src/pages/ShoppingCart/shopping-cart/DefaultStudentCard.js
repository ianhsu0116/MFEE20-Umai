import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "../../../components/Button";

const DefaultStudentCard = (props) => {
  let { index, changestudentnumber } = props;
  let [cardOpen, setCardOpen] = useState(false);
  let [newStudentData, setNewStudentData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    birthday: "",
    email: "",
    addIntoStudent: false,
    autoUpdateMember: false,
  });
  let studentCardRefs = useRef();

  // 即時抓取 input value
  const handleInputChange = (e) => {
    // 判斷當前input是否為 check box
    if (
      e.target.name !== "addIntoStudent" &&
      e.target.name !== "autoUpdateMember"
    ) {
      setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value });
    } else {
      setNewStudentData({
        ...newStudentData,
        [e.target.name]: e.target.checked,
      });
    }
  };

  // 刪除學生(動畫)
  const handleDeleteStudent = (index) => (e) => {
    studentCardRefs.current.style.animation ="DefaultStudentCard-scaleDown 0.3s forwards";
  };
  // 等動畫跑完在真正刪除 (onAnimationEnd)
   const  handleSlowDelete = (e) => {
    console.log("刪除學員");
    //studentCardRefs.current.remove();
    changestudentnumber(-1);
  };

  // 啓閉學員詳細內容
  const handleOpenCard = () => {
    cardOpen ? setCardOpen(false) : setCardOpen(true);
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
          &ensp;
          <span>學員-{index}</span>
        </div>
        <div className="DefaultStudentCard-title-right">
            <select
              name="selectedStudent"
              className="DefaultStudentCard-title-right-select"
            >
              <option value="">選擇預設學員</option>
              <option value="id">學員名稱</option>
              <option value="id">學員名稱</option>
              <option value="id">學員名稱</option>
            </select>
          <Button
            value={"刪除"}
            className={
              "button-highLeveColor DefaultStudentCard-title-right-btn"
            }
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
              name="firstName"
              placeholder="請輸入真實名字"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
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
              name="lastName"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
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
              name="telephone"
              placeholder="請輸入手機號碼"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
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
              name="birthday"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
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
              name="email"
              placeholder="請輸入Email"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
        </div>
          <div className="DefaultStudentCard-main-row">
            <div className="">
              <input
                type="checkbox"
                id="addIntoStudent"
                name="addIntoStudent"
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-item-checkbox"
                onChange={handleInputChange}
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
                name="autoUpdateMember"
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-item-checkbox"
                onChange={handleInputChange}
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
      </div>
    </div>
  );
};

export default withRouter(DefaultStudentCard);
