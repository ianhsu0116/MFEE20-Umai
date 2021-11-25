import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "./Button";
import Calendar from "./Calendar";
import ErrorMessage from "../components/ErrorMessage";

const DefaultStudentCard = (props) => {
  let { index, data, handleEditStudent, handleDeleteStudent, errorMsg } = props;
  let [pathname, setPathname] = useState("/");
  let [cardOpen, setCardOpen] = useState(false);
  let [newStudentData, setNewStudentData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    telephone: "",
    birthday: "",
    email: "",
    addIntoStudent: false,
    autoUpdateMember: false,
  });
  let studentCardRefs = useRef();

  // 初次render，以及每次data改變時，就render一次
  useEffect(() => {
    // 抓到當前網址去判斷卡片要呈現的樣式
    setPathname(props.location.pathname);

    // 將拿到的資料放入input
    if (data) {
      setNewStudentData({
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        telephone: data.telephone,
        birthday: data.birthday,
        email: data.email,
      });
    }
  }, [data]);

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
  // 即時抓取生日修改
  const handleBirthdayChange = (day) => {
    setNewStudentData({ ...newStudentData, birthday: day });
  };

  // // 刪除學生(動畫)
  // const handleDeleteStudent = (index) => (e) => {
  //   studentCardRefs.current.style.animation =
  //     "DefaultStudentCard-scaleDown 0.3s forwards";
  // };
  // // 等動畫跑完在真正刪除 (onAnimationEnd)
  // const handleSlowDelete = (newStudentData) => {
  //   console.log("刪除學員");
  //   console.log(newStudentData);
  //   studentCardRefs.current.remove();
  // };

  // 啓閉學員詳細內容
  const handleOpenCard = () => {
    cardOpen ? setCardOpen(false) : setCardOpen(true);
  };

  return (
    <div
      ref={studentCardRefs}
      // onAnimationEnd={() => {
      //   handleSlowDelete(newStudentData);
      // }}
      className={`DefaultStudentCard ${
        cardOpen && "DefaultStudentCard-active"
      }`}
    >
      <div className="DefaultStudentCard-title">
        <div className="DefaultStudentCard-title-left" onClick={handleOpenCard}>
          <MdOutlineKeyboardArrowDown />
          &ensp;
          <span>學員-{index + 1}</span>
          &ensp;
          {errorMsg && errorMsg[index] && (
            <ErrorMessage value={errorMsg[index]} />
          )}
        </div>
        <div className="DefaultStudentCard-title-right">
          {/* 會員中心內不顯示此欄位 */}
          {pathname !== "/memberCenter" && (
            <select
              name="selectedStudent"
              className="DefaultStudentCard-title-right-select"
            >
              <option value="">選擇預設學員</option>
              <option value="id">學員名稱</option>
              <option value="id">學員名稱</option>
              <option value="id">學員名稱</option>
            </select>
          )}

          {pathname === "/memberCenter" && (
            <Button
              value={"編輯"}
              className={"button-darkColor DefaultStudentCard-title-right-btn"}
              onClick={() => {
                handleEditStudent(index, newStudentData);
              }}
            />
          )}
          <Button
            value={"刪除"}
            className={
              "button-highLeveColor DefaultStudentCard-title-right-btn"
            }
            onClick={() => {
              handleDeleteStudent(index, newStudentData);
            }}
            dataBsToggle="modal"
            dataBsTarget="#DefaultStudent-delete-alert"
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
              name="first_name"
              placeholder="請輸入真實名字"
              className="DefaultStudentCard-main-row-item-input"
              value={newStudentData.first_name}
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
              name="last_name"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard-main-row-item-input"
              value={newStudentData.last_name}
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
              value={newStudentData.telephone}
              onChange={handleInputChange}
            />
          </div>
          <div className="DefaultStudentCard-main-row-item">
            <label
              htmlFor="birthday"
              className="DefaultStudentCard-main-row-item-label"
            >
              出生日期
            </label>
            {/* <input
              type="date"
              id="birthday"
              name="birthday"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
            /> */}
            <Calendar
              onChange={handleBirthdayChange}
              value={newStudentData.birthday}
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
              value={newStudentData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* 會員中心內不顯示此欄位 */}
        {pathname !== "/memberCenter" && (
          <div className="DefaultStudentCard-main-row">
            <div className="DefaultStudentCard-main-row-selectCon">
              <input
                type="checkbox"
                id="addIntoStudent"
                name="addIntoStudent"
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-selectCon-checkbox"
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
            <div className="DefaultStudentCard-main-row-selectCon">
              <input
                type="checkbox"
                id="autoUpdateMember"
                name="autoUpdateMember"
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-selectCon-checkbox"
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
        )}
      </div>
    </div>
  );
};

export default withRouter(DefaultStudentCard);
