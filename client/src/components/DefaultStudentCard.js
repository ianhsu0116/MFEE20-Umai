import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Button from "./Button";

const DefaultStudentCard = (props) => {
  let location = useParams();
  console.log(location); // 目前卡在 無法抓到當前網址列，並且用網址判斷當前是否人在會員中心

  return (
    <div className="DefaultStudentCard">
      <div className="DefaultStudentCard-title">
        <div className="DefaultStudentCard-title-left">
          <MdOutlineKeyboardArrowDown />
          <span>學員-1</span>
        </div>
        <div className="DefaultStudentCard-title-right">
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
          <Button
            value={"刪除"}
            className={"button-activeColor DefaultStudentCard-title-right-btn"}
            onClick=""
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
      </div>
      {/* <div className="DefaultStudentCard-footer"></div> */}
    </div>
  );
};

export default DefaultStudentCard;
