import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { ImGift } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { VscListUnordered } from "react-icons/vsc";
import { MdBookmarkBorder, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import avatar from "../images/avatar.jpg";

const MemberSidebar = () => {
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
          <li className="MemberSidebar-container-ul-li">
            <BsPersonCircle />
            <span className="MemberSidebar-container-ul-li-text">會員資訊</span>
          </li>
          <li className="MemberSidebar-container-ul-li">
            <VscListUnordered />
            <span className="MemberSidebar-container-ul-li-text">訂單資訊</span>
          </li>
          <li className="MemberSidebar-container-ul-li">
            <MdBookmarkBorder />
            <span className="MemberSidebar-container-ul-li-text">收藏課程</span>
          </li>
          <li className="MemberSidebar-container-ul-li">
            <MdOutlineFavoriteBorder />
            <span className="MemberSidebar-container-ul-li-text">收藏文章</span>
          </li>
          <li className="MemberSidebar-container-ul-li">
            <ImGift />
            <span className="MemberSidebar-container-ul-li-text">優惠券</span>
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
