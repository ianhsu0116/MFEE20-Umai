/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "../../../components/Button";
import axios from "axios";

const DefaultStudentCard = (props) => {
  let { deletecarddata, changecarddata, index, data, studentdata } = props;
  let [ cardOpen, setCardOpen] = useState(false);
  let [ DefultStudent, setDefultStudent] = useState(true)
  //從props抓取學員資料
  let [newStudentData, setNewStudentData] = useState({
    first_name:data.first_name,
    last_name:data.last_name,
    telephone:data.telephone,
    birthday:data.birthday,
    email:data.email, 
    addIntoStudent: false,
    autoUpdateMember: false,
  });
  //選擇預設學員並更改資料
  function selectDefultStudent(i){
    if(i==="-1"){
      setDefultStudent(true)
      setNewStudentData({
        first_name:"",
        last_name:"",
        telephone:"",
        birthday:"",
        email:"", 
        addIntoStudent: false,
        autoUpdateMember: false,
      })
      changecarddata(index,{
        first_name:"",
        last_name:"",
        telephone:"",
        birthday:"",
        email:"", 
        addIntoStudent: false,
        autoUpdateMember: false,
      })
    }else{
      setDefultStudent(false)
      setNewStudentData({...studentdata[i],
        id:studentdata[i].id,
        first_name:studentdata[i].first_name,
        last_name:studentdata[i].last_name,
        addIntoStudent: false,
        autoUpdateMember: false,
      })
      changecarddata(index,{
        id:studentdata[i].id,
        first_name:studentdata[i].first_name,
        last_name:studentdata[i].last_name,
        telephone:studentdata[i].telephone,
        birthday:studentdata[i].birthday,
        email:studentdata[i].email,
        addIntoStudent: false,
        autoUpdateMember: false,
      })
    }
  }

  // 即時抓取 input value
  const handleInputChange = (e) => {
    // 判斷當前input是否為 check box
    if (
      e.target.name !== "addIntoStudent" &&
      e.target.name !== "autoUpdateMember"
    ) {
      setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value });
      changecarddata(index,{ ...newStudentData, [e.target.name]: e.target.value })
    } else {
      setNewStudentData({...newStudentData, [e.target.name]: e.target.checked});
      changecarddata(index,{ ...newStudentData, [e.target.name]: e.target.checked})
    }
    
  };

  // 刪除學生(動畫)
  const handleDeleteStudent = (index) => (e) => {
    console.log("刪除學員");
    console.log(props.coursetitle);
    deletecarddata(index,props.carddata,props.coursetitle);
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
              onChange={(e)=>{selectDefultStudent(e.target.value)}}
            >
              <option value="-1">選擇預設學員</option>
              {studentdata.map((data,i)=><option value={i}>{data.last_name+data.first_name}</option>)}
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
              htmlFor="first_name"
              className="DefaultStudentCard-main-row-item-label"
            >
              名字
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={newStudentData.first_name}
              placeholder="請輸入真實名字"
              className="DefaultStudentCard-main-row-item-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="DefaultStudentCard-main-row-item">
            <label
              htmlFor="last_name"
              className="DefaultStudentCard-main-row-item-label"
            >
              姓氏
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={newStudentData.last_name}
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
            {DefultStudent?
              <input
                type="checkbox"
                id="addIntoStudent"
                name="addIntoStudent"
                checked={newStudentData.addIntoStudent === true ?  "checked": ""}
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-selectCon-checkbox"
                onChange={handleInputChange}
              />:
              <input
                type="checkbox"
                id="addIntoStudent"
                name="addIntoStudent"
                disabled
                checked={newStudentData.addIntoStudent === true ?  "checked": ""}
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-selectCon-checkbox"
                onChange={handleInputChange}
              />
            }
              &ensp;
              <label
                htmlFor="addIntoStudent"
                className="DefaultStudentCard-main-row-item-label"
              >
                新增至預設學員資料
              </label>
            </div>
            <div className="DefaultStudentCard-main-row-selectCon">
            {DefultStudent?
              <input
                type="checkbox"
                id="autoUpdateMember"
                name="autoUpdateMember"
                disabled
                checked={newStudentData.autoUpdateMember === true ?  "checked": ""}
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-selectCon-checkbox"
                onChange={handleInputChange}
              />:
              <input
                type="checkbox"
                id="autoUpdateMember"
                name="autoUpdateMember"
                checked={newStudentData.autoUpdateMember === true ?  "checked": ""}
                className="DefaultStudentCard-main-row-item-input DefaultStudentCard-main-row-selectCon-checkbox"
                onChange={handleInputChange}
              />}
              
              &ensp;
              <label
                htmlFor="autoUpdateMember"
                className="DefaultStudentCard-main-row-item-label"
              >
                同步更新學員資料
              </label>
            </div>
          </div>
      </div>
    </div>
  );
};

export default withRouter(DefaultStudentCard);
