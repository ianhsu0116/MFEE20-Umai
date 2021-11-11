import React from "react";
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
  const handleChangeBoard = (e) => {
    setCurrentBoard(e.target.innerText);
  };

  return (
    <div className="MemberSidebar">
      <div className="MemberSidebar-container">
        <div className="MemberSidebar-container-avatar">
          <img
            src={avatar}
            alt="使用者頭貼"
            className="MemberSidebar-container-avatar-img"
          />
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
