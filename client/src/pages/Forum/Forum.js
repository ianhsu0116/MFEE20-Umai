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
import axios from "axios";

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

  const [article, setArticle] = useState({
    image: "",
    category: "",
    coursename: "",
    title: "",
    quote: "",
    comment: "",
  });

  function handleChange(e) {
    let newArticle = { ...article };
    newArticle[e.target.name] = e.target.value;
    setArticle(newArticle);
    // setArticle({ ...Article, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  function handleUpload(e) {
    let newArticle = { ...article };
    newArticle.photo = e.target.files[0];
    setArticle(newArticle);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // json 格式無法傳檔案
      // 改成用 form data
      let formData = new FormData();
      formData.append("image", article.image);
      formData.append("category", article.category);
      formData.append("coursename", article.coursename);
      formData.append("title", article.title);
      formData.append("quote", article.quote);
      formData.append("comment", article.comment);
      // console.log("formData", formData.getAll());
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/api/forum/insertArticle",
        data: formData,
        header: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.log("handleSubmit", e);
    }
    console.log(article);
  }

  return (
    <>
      <div className="wrapper">
        <Forumsidebar />
        <ForumCard />
        <div className="publish">
          <form action="post" onSubmit={handleSubmit}>
            <h2>我要投稿</h2>
            <label HtmlFor="upload" className="Forum-publish-label-illustrator">
              上傳圖片
              <input
                id="upload"
                className="Forum-publish-form-file"
                type="file"
                name="image"
                value={article.image}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="category" className="Forum-publish-label-small">
              類別項目
            </label>
            <div className="Forum-publish-form-select">
              <select
                id="category"
                name="category"
                selectedValue={article.category}
                onChange={handleChange}
              >
                <option value="" selected>
                  請選擇選項
                </option>
                <option value="日式料理">日式料理</option>
                <option value="美式料理">美式料理</option>
                <option value="韓式料理">韓式料理</option>
              </select>
            </div>
            <label className="Forum-publish-label-small">課程名稱</label>
            <div className="Forum-publish-form-select">
              <select
                id=""
                name="coursename"
                defaultValue={article.coursename}
                onChange={handleChange}
              >
                <option value="" selected>
                  請選擇選項
                </option>
                <option value="日式料理">日式料理</option>
                <option value="美式料理">美式料理</option>
                <option value="韓式料理">韓式料理</option>
              </select>
            </div>
            <label htmlFor="title" className="Forum-publish-label-small">
              發表標題
            </label>
            <input
              id="title"
              className="Forum-publish-form-big"
              type="text"
              name="title"
              value={article.title}
              onChange={handleChange}
            />
            <div className="Forum-publish-label-small-block">
              <label htmlFor="quote" className="Forum-publish-label-small">
                引用連結
              </label>
              <div className="Forum-publish-label-question-block">
                <AiFillQuestionCircle className="AiFillQuestionCircle" />
                <p className="situation">請自YOUTUBE選擇影片</p>
              </div>
            </div>
            <input
              id="quote"
              className="Forum-publish-form-big"
              type="text"
              name="quote"
              value={article.quote}
              onChange={handleChange}
            />
            <label htmlFor="commet" className="Forum-publish-label-small">
              內容
            </label>
            <textarea
              className="Forum-publish-textarea"
              name="comment"
              id="commet"
              value={article.comment}
              onChange={handleChange}
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
