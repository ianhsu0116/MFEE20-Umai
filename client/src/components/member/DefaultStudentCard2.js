import React, { useState, useEffect, useRef } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Button from "../Button";
import Calendar from "../Calendar";
import ErrorMessage from "../ErrorMessage";

const DefaultStudentCard2 = (props) => {
  const {
    newStudentData,
    setNewStudentData,
    handleAddStudent,
    errorMsg,
    infoRef,
  } = props;
  let studentCardRefs = useRef();

  // 即時抓取input value
  const handleInputChange = (e) => {
    setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value });
  };
  // 即時抓取生日修改
  const handleBirthdayChange = (day) => {
    setNewStudentData({ ...newStudentData, birthday: day });
  };

  return (
    <div ref={studentCardRefs} className="DefaultStudentCard2">
      <div className="DefaultStudentCard2-title">
        <div className="DefaultStudentCard2-title-left">
          <AiOutlineUsergroupAdd />
          &ensp;
          <span>新增學員</span>
          &ensp;
          {errorMsg && <ErrorMessage value={errorMsg} />}
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
              htmlFor="first_name"
              className="DefaultStudentCard2-main-row-item-label"
            >
              名字
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="請輸入真實名字(限15字內)"
              maxLength="15"
              ref={infoRef[0]}
              value={newStudentData.first_name}
              className="DefaultStudentCard2-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="DefaultStudentCard2-main-row-item">
            <label
              htmlFor="last_name"
              className="DefaultStudentCard2-main-row-item-label"
            >
              姓氏
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="請輸入真實姓氏(限15字內)"
              maxLength="15"
              ref={infoRef[1]}
              value={newStudentData.last_name}
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
              maxLength="10"
              ref={infoRef[2]}
              value={newStudentData.telephone}
              className="DefaultStudentCard2-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="DefaultStudentCard2-main-row-item">
            <label
              htmlFor="birthday"
              className="DefaultStudentCard2-main-row-item-label"
            >
              出生日期
            </label>
            <Calendar
              onChange={handleBirthdayChange}
              value={newStudentData.birthday}
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
              maxLength="50"
              placeholder="請輸入常用Email"
              ref={infoRef[3]}
              value={newStudentData.email}
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
