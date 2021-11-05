import React, { useState, useEffect, useRef } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Button from "../Button";

const DefaultStudentCard2 = (props) => {
  let studentCardRefs = useRef();
  let [newStudentData, setNewStudentData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    birthday: "",
    email: "",
  });

  // 即時抓取input value
  const handleInputChange = (e) => {
    setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value });
  };

  // 新增學員
  const handleAddStudent = (e) => {
    console.log("新增學員");
    console.log(newStudentData);
  };

  return (
    <div ref={studentCardRefs} className="DefaultStudentCard2">
      <div className="DefaultStudentCard2-title">
        <div className="DefaultStudentCard2-title-left">
          <AiOutlineUsergroupAdd />
          &ensp;
          <span>新增學員</span>
        </div>
        <div className="DefaultStudentCard2-title-right">
          <Button
            value={"新增"}
            className={
              "button-themeColorBlue DefaultStudentCard2-title-right-btn"
            }
            onClick={handleAddStudent}
          />
        </div>
      </div>
      <div className="DefaultStudentCard2-main">
        <div className="DefaultStudentCard2-main-row">
          <div className="DefaultStudentCard2-main-row-item">
            <label
              htmlFor="firstName"
              className="DefaultStudentCard2-main-row-item-label"
            >
              名字
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="請輸入真實名字"
              className="DefaultStudentCard2-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="DefaultStudentCard2-main-row-item">
            <label
              htmlFor="lastName"
              className="DefaultStudentCard2-main-row-item-label"
            >
              姓氏
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard2-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="DefaultStudentCard2-main-row">
          <div className="DefaultStudentCard2-main-row-item">
            <label
              htmlFor="telephone"
              className="DefaultStudentCard2-main-row-item-label"
            >
              聯絡電話
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              placeholder="請輸入手機號碼"
              className="DefaultStudentCard2-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="DefaultStudentCard2-main-row-item">
            <label
              htmlFor="birthday"
              className="DefaultStudentCard2-main-row-item-label"
            >
              生日
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              placeholder="請輸入真實姓氏"
              className="DefaultStudentCard2-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="DefaultStudentCard2-main-row">
          <div className="DefaultStudentCard2-main-row-item DefaultStudentCard2-main-row-itemEmail">
            <label
              htmlFor="email"
              className="DefaultStudentCard2-main-row-item-label"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="請輸入Email"
              className="DefaultStudentCard2-main-row-item-input DefaultStudentCard2-main-row-item-email"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultStudentCard2;
