import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import MemberService from "../../services/member.service";
import { PUBLIC_URL } from "../../config/config";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ImGift } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { VscListUnordered } from "react-icons/vsc";
import { MdBookmarkBorder, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import avatar from "../images/avatar.jpg";

const MemberSidebar = (props) => {
  let { currentBoard, setCurrentBoard, currentUser, setCurrentUser } = props;

  // 存avatar的二元編碼
  const [currentAvatar, setCurrentAvatar] = useState("");

  // 切換sidebar內容
  const handleChangeBoard = (e) => {
    setCurrentBoard(e.target.innerText);
  };

  // 即時顯示上傳的avatar
  const handleAvatarChange = async (e) => {
    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 4000000) {
        // 將圖送到後端
        try {
          let result = await MemberService.avatarEdit(file);

          // 更新成功後，更新當前使用者資料
          let newUser = await AuthService.memberInfo(currentUser.id);

          // 存入local
          localStorage.setItem("user", JSON.stringify(newUser.data.member));

          // 裝入state
          setCurrentUser(AuthService.getCurrentUser());
          console.log(result);
          console.log("good");
        } catch (error) {
          console.log(error);
        }

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

  // 登出
  const history = useHistory();
  const handleLogout = async () => {
    try {
      let result = await AuthService.logout();
      //console.log(result);
      setCurrentUser(null);
      window.alert("登出成功，現在導回首頁！");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="MemberSidebar">
      <div className="MemberSidebar-container">
        <div className="MemberSidebar-container-avatar">
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
            {currentUser && currentUser.avatar && (
              <img
                src={`${PUBLIC_URL}/upload-images/${currentUser.avatar}`}
                alt="使用者頭貼"
                className="MemberSidebar-container-avatar-img"
              />
            )}
            {currentUser && !currentUser.avatar && (
              <img
                src={avatar}
                alt="使用者頭貼"
                className="MemberSidebar-container-avatar-img"
              />
            )}
          </label>
          <FaPen className="MemberSidebar-container-avatar-pen" />
        </div>
        <div className="MemberSidebar-container-mamberName">
          {currentUser &&
            currentUser.first_name &&
            `${currentUser.first_name} ${currentUser.last_name}`}
          {currentUser && !currentUser.first_name && `哈囉！`}
        </div>
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
          {/* 當前登入者是廚師時，才能新增課程 */}
          {currentUser && currentUser.member_category === 2 && (
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "新增課程" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <GiCook />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                新增課程
              </span>
            </li>
          )}
          <li className="MemberSidebar-container-ul-li" onClick={handleLogout}>
            <HiOutlineLogout />
            <span className="MemberSidebar-container-ul-li-text">登出</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemberSidebar;
