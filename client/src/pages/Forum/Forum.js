import React from "react";
import {
  AiOutlineMessage,
  AiFillQuestionCircle,
  AiOutlineHeart,
  AiOutlineInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import Forumsidebar from "./../Forum/ForumSidebar";
import { BsFillTriangleFill } from "react-icons/bs";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import ForumCard from "./ForumCard";

// const array = [
//   "img1.jpg",
//   "img2.jpg",
//   "img3.jpg",
//   "img4.jpg",
//   "img5.jpg",
//   "img6.jfif",
//   "img7.jpg",
//   "img8.jfif",
//   "img9.jpg",
//   "img10.jfif",
//   "確認付款.jpg",
//   "付款頁面-01.jpg",
//   "結帳頁面1-2-01.jpg",
//   "購買頁面-1.1-01-01.jpg",
//   "確認付款.jpg",
//   "avatar.jpg",
// ];
console.log("test");
const Forum = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="wrapper">
        <Forumsidebar />
        <ForumCard />
        <div className="publish">
          <form action="post">
            <h2>我要投稿</h2>
            <label HtmlFor="upload" className="Forum-publish-label-illustrator">
              上傳圖片
              <input
                id="upload"
                className="Forum-publish-form-file"
                type="file"
              />
            </label>
            <label htmlFor="category" className="Forum-publish-label-small">
              類別項目
            </label>
            <div className="Forum-publish-form-select">
              <select id="category">
                <option value="none" selected disabled hidden>
                  請選擇選項
                </option>
                <option value="日式料理">日式料理</option>
              </select>
            </div>
            <label className="Forum-publish-label-small">課程名稱</label>
            <div className="Forum-publish-form-select">
              <select id="">
                <option value="none" selected disabled hidden>
                  請選擇選項
                </option>
                <option value="日式料理">日式料理</option>
              </select>
            </div>
            <label htmlFor="theme" className="Forum-publish-label-small">
              發表標題
            </label>
            <input id="theme" className="Forum-publish-form-big" type="text" />
            <div className="Forum-publish-label-small-block">
              <label htmlFor="connect" className="Forum-publish-label-small">
                引用連結
              </label>
              <div className="Forum-publish-label-question-block">
                <AiFillQuestionCircle className="AiFillQuestionCircle" />
                <p className="situation">請自YOUTUBE選擇影片</p>
              </div>
            </div>
            <input
              id="connect"
              className="Forum-publish-form-big"
              type="text"
            />
            <label htmlFor="commet" className="Forum-publish-label-small">
              內容
            </label>
            <textarea
              className="Forum-publish-textarea"
              name=""
              id="commet"
            ></textarea>
            <div className="Forum-publish-button-div">
              <button className="Forum-publish-button" type="submit">
                送出
              </button>
              <button className="Forum-publish-button" type="reset">
                刪除
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forum;
