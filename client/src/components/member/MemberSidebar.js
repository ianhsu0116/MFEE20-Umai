<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> 2483756afd0ecd21bda2781479d0581427d71eaa
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ImGift } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { VscListUnordered } from "react-icons/vsc";
import { MdBookmarkBorder, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import avatar from "../images/avatar.jpg";

const MemberSidebar = (props) => {
  let { currentBoard, setCurrentBoard } = props;
<<<<<<< HEAD
=======
  const [currentAvatar, setCurrentAvatar] = useState(""); // 存avatar的二元編碼

  // 切換sidebar內容
>>>>>>> 2483756afd0ecd21bda2781479d0581427d71eaa
  const handleChangeBoard = (e) => {
    setCurrentBoard(e.target.innerText);
  };

<<<<<<< HEAD
=======
  // 即時顯示上傳的avatar
  const handleAvatarChange = (e) => {
    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 4000000) {
        // 將圖裝入，等待送到後端
        //setAwsFile(file);

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示
          setCurrentAvatar(readFile.result);
        });
      } else {
        window.alert("只能上傳圖片歐！(檔案須小於4mb)");
      }
    }
  };

>>>>>>> 2483756afd0ecd21bda2781479d0581427d71eaa
  return (
    <div className="MemberSidebar">
      <div className="MemberSidebar-container">
        <div className="MemberSidebar-container-avatar">
<<<<<<< HEAD
          <img
            src={avatar}
            alt="使用者頭貼"
            className="MemberSidebar-container-avatar-img"
          />
=======
          <input
            type="file"
            id="avatar"
            className="MemberSidebar-container-avatar-input"
            onChange={handleAvatarChange}
            multiple
          />
          <label
            htmlFor="avatar"
            className="MemberSidebar-container-avatar-label"
          >
            <img
              src={currentAvatar || avatar}
              alt="使用者頭貼"
              className="MemberSidebar-container-avatar-img"
            />
          </label>
>>>>>>> 2483756afd0ecd21bda2781479d0581427d71eaa
          <FaPen className="MemberSidebar-container-avatar-pen" />
        </div>
        <div className="MemberSidebar-container-mamberName">Ian Hsu</div>
        <ul className="MemberSidebar-container-ul">
          <li
            className={`MemberSidebar-container-ul-li ${
              currentBoard === "會員資訊" &&
              "MemberSidebar-container-ul-li-active"
            }`}
          >
            <BsPersonCircle />
            <span
              className="MemberSidebar-container-ul-li-text"
              onClick={handleChangeBoard}
            >
              會員資訊
            </span>
          </li>
          <li
            className={`MemberSidebar-container-ul-li ${
              currentBoard === "預設學員" &&
              "MemberSidebar-container-ul-li-active"
            }`}
          >
            <AiOutlineUsergroupAdd />
            <span
              className="MemberSidebar-container-ul-li-text"
              onClick={handleChangeBoard}
            >
              預設學員
            </span>
          </li>
          <li
            className={`MemberSidebar-container-ul-li ${
              currentBoard === "訂單資訊" &&
              "MemberSidebar-container-ul-li-active"
            }`}
          >
            <VscListUnordered />
            <span
              className="MemberSidebar-container-ul-li-text"
              onClick={handleChangeBoard}
            >
              訂單資訊
            </span>
          </li>
          <li
            className={`MemberSidebar-container-ul-li ${
              currentBoard === "收藏課程" &&
              "MemberSidebar-container-ul-li-active"
            }`}
          >
            <MdOutlineFavoriteBorder />
            <span
              className="MemberSidebar-container-ul-li-text"
              onClick={handleChangeBoard}
            >
              收藏課程
            </span>
          </li>
          <li
            className={`MemberSidebar-container-ul-li ${
              currentBoard === "收藏文章" &&
              "MemberSidebar-container-ul-li-active"
            }`}
          >
            <MdBookmarkBorder />
            <span
              className="MemberSidebar-container-ul-li-text"
              onClick={handleChangeBoard}
            >
              收藏文章
            </span>
          </li>
          <li
            className={`MemberSidebar-container-ul-li ${
              currentBoard === "優惠券" &&
              "MemberSidebar-container-ul-li-active"
            }`}
          >
            <ImGift />
            <span
              className="MemberSidebar-container-ul-li-text"
              onClick={handleChangeBoard}
            >
              優惠券
            </span>
          </li>
          <li className="MemberSidebar-container-ul-li">
            <HiOutlineLogout />
            <span className="MemberSidebar-container-ul-li-text">登出</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemberSidebar;
