import React from "react";
import axios from "axios";
import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const ForumUpdate = () => {
  const [show, setShow] = useState(false);

  function handleUpload(e) {
    let newArticle = { ...article };
    newArticle.image = e.target.files[0];
    setArticle(newArticle);
    console.log(newArticle);
    console.log(e.target.files[0]);
  }

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
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/api/forum/updateArticle",
        data: formData,
        // header: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.log("handleSubmit", e);
    }
    console.log(article);
  }

  const [article, setArticle] = useState({
    image_name: "",
    category_id: "",
    course_id: "",
    article_title: "",
    article_link: "",
    article_text: "",
  });

  function handleChange(e) {
    let newArticle = { ...article };
    newArticle[e.target.name] = e.target.value;
    setArticle(newArticle);
    // setArticle({ ...Article, [e.target.name]: e.target.value });
    console.log(e.target.value);
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
      <div className="space"></div>
      <div className="publish">
        <form action="post" onSubmit={handleSubmit} className="form">
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
          <label htmlFor="article_title" className="Forum-publish-label-small">
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
          <label htmlFor="article_title" className="Forum-publish-label-small">
            影片連結
          </label>
          <input
            id="article_link"
            className="Forum-publish-form-big"
            type="text"
            name="article_link"
            value={article.article_link}
            onChange={handleChange}
          />
          <label htmlFor="article_text" className="Forum-publish-label-content">
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
            <button className="Forum-publish-button">送出</button>

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
    </>
  );
};

export default ForumUpdate;
