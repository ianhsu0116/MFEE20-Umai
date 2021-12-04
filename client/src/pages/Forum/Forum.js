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
import Swal from "sweetalert2";
import ForumHeader from "./ForumHeader";


const array = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jfif",
  "img7.jpg",
  "img8.jfif",
  "img9.jpg",
  "img10.jfif",
  "確認付款.jpg",
  "付款頁面-01.jpg",
  "結帳頁面1-2-01.jpg",
  "購買頁面-1.1-01-01.jpg",
  "確認付款.jpg",
  "avatar.jpg",
];
console.log("test");
const Forum = () => {
  // useState(初始值)
  // show代表狀態，是唯獨。必須透過setshow去改變
  // article是唯獨
  const [article, setArticle] = useState({
    image_name: "",
    category_id: "",
    course_id: "",
    article_title: "",
    article_link: "",
    article_text: "",
  });

  // 把表單的VALuE變成狀態，讓REACT控管。狀態是不能修改，因此需透過新的值覆蓋初始值。
  function handleChange(e) {
    // 展開運算子 把原本ARTICLE的東西複製出來到newArticle。
    let newArticle = { ...article };
    // name必須得初始狀態的值對應到。
    // e是事件物件，e.target.name是表單裡面的input、select 或textarea標籤的NAME。
    // e.target.name 可能可以寫成newarticle.e.target.name
    // 讓KEY有新的value
    newArticle[e.target.name] = e.target.value;
    //newArtcle等於setarticle，setarticle去改變article
    setArticle(newArticle);

    // let.... set的簡化版。
    // setArticle({ ...Article, [e.target.name]: e.target.value });

    console.log(e.target.value);
  }

  function handleUpload(e) {
    let newArticle = { ...article };
    //預設值是一個陣列，只上傳一個檔案。
    newArticle.image = e.target.files[0];
    setArticle(newArticle);
    console.log(newArticle);
    console.log(e.target.files[0]);
  }

  // 處理非同步，await本身必須是promise。通常是在於說依序執行。因為非同步無法控制什麼時候執行完。
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // json 格式無法傳檔案
      // 改成用 form data
      let formData = new FormData();
      formData.append("image", article.image);
      formData.append("category_id", article.category_id);
      formData.append("course_id", article.course_id);
      formData.append("article_title", article.article_title);
      formData.append("article_link", article.article_link);
      formData.append("article_text", article.article_text);
      // console.log("formData", formData.getAll());

      // 將文章送出去的是 axios。 因為res直接等於
      // await在等成功的結果。失敗則執行 catch。
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/api/forum/insertArticle",
        data: formData,
        // header: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.log("handleSubmit", e);
    }
    console.log(article);
  }

  const article_deliver = () => {
    Swal.fire({
      // title: "",
      icon: "success",
      // customClass: "Custom_Cancel",
      confirmButtonColor: "#0078b3",
      confirmButtonText: "已送出文章，返回討論區",
    }).then(function () {
      window.location.reload();
    });
  };

  const reset_function = () => {
    setArticle({
      image_name: "",
      category_id: "",
      course_id: "",
      article_title: "",
      article_link: "",
      article_text: "",
    });
  };

  return (
    <>
      <div className="wrapper">
        <Forumsidebar />
        <div className="forum">
          <div className="main">
            <ForumHeader />
            <ForumCard />
          </div>
        </div>
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
                // value={article.image_name}
                onChange={handleUpload}
              />
            </label>
            <label htmlFor="category_id" className="Forum-publish-label-small">
              類別項目
            </label>
            <div className="Forum-publish-form-select">
              <select
                id="category_id"
                name="category_id"
                selectedValue={article.category_id}
                onChange={handleChange}
              >
                <option value="" selected>
                  請選擇選項
                </option>
                <option value="1">日式料理</option>
                <option value="2">韓式料理</option>
                <option value="3">法式料理</option>
                <option value="4">義式料理</option>
                <option value="5">中式料理</option>
                <option value="6">經典調酒</option>
              </select>
            </div>
            <label className="Forum-publish-label-small">課程名稱</label>
            <div className="Forum-publish-form-select">
              <select
                id=""
                name="course_id"
                defaultValue={article.course_id}
                onChange={handleChange}
              >
                <option value="" selected>
                  請選擇選項
                </option>
                <option value="1">日式料理</option>
                <option value="2">美式料理</option>
                <option value="3">韓式料理</option>
              </select>
            </div>
            <label
              htmlFor="article_title"
              className="Forum-publish-label-small"
            >
              發表標題
            </label>
            <input
              id="article_title"
              className="Forum-publish-form-big"
              type="text"
              name="article_title"
              value={article.article_title}
              onChange={handleChange}
            />
            <div className="Forum-publish-label-small-block">
              <label
                htmlFor="article_link"
                className="Forum-publish-label-small"
              >
                引用連結
              </label>
              <div className="Forum-publish-label-question-block">
                <AiFillQuestionCircle className="AiFillQuestionCircle" />
                <p className="situation">請自YOUTUBE選擇影片</p>
              </div>
            </div>
            <input
              id="article_link"
              className="Forum-publish-form-big"
              type="text"
              name="article_link"
              value={article.article_link}
              onChange={handleChange}
            />
            <label htmlFor="article_text" className="Forum-publish-label-small">
              內容
            </label>
            <textarea
              className="Forum-publish-textarea"
              name="article_text"
              id="commet"
              value={article.article_text}
              onChange={handleChange}
            ></textarea>
            <div className="Forum-publish-button-div">
              <button
                className="Forum-publish-button"
                onClick={article_deliver}
              >
                送出
              </button>

              <button
                className="Forum-publish-button"
                value="重設"
                onClick={reset_function}
              >
                重設
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forum;
