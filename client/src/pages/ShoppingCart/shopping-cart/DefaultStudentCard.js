import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "../../../components/Button";

const DefaultStudentCard = (props) => {
  let { deletecarddata, changecarddata } = props.data;
  let index = props.index;
  let [cardOpen, setCardOpen] = useState(false);
  let [newStudentData, setNewStudentData] = useState({
    firstName: props.data.firstName,
    lastName: props.data.lastName,
    telephone: props.data.telephone,
    birthday: props.data.birthday,
    email: props.data.email, 
    addIntoStudent: false,
    autoUpdateMember: false,
  });
  useEffect(()=>{
    setNewStudentData(
      {
        firstName: props.data.firstName,
        lastName: props.data.lastName,
        telephone: props.data.telephone,
        birthday: props.data.birthday,
        email: props.data.email, 
        addIntoStudent: false,
        autoUpdateMember: false,
      }
    )
  },[props.data])

  useEffect(()=>{
    changecarddata(index,newStudentData,props.carddata)
  },[newStudentData])

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
    console.log("刪除學員");
    deletecarddata(index,props.carddata);
  };

  // 啓閉學員詳細內容
  const handleOpenCard = () => {
    cardOpen ? setCardOpen(false) : setCardOpen(true);
  };

  return (
    <div
      id={index}
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
              value={newStudentData.firstName}
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
              value={newStudentData.lastName}
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
              value={newStudentData.telephone}
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
              value={newStudentData.birthday}
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
              value={newStudentData.email}
              placeholder="請輸入Email"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default withRouter(DefaultStudentCard);
