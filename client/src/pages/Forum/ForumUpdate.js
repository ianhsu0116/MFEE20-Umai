import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { API_URL } from "../../config/config";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const ForumUpdate = () => {
  const { forumid } = useParams();
  const [show, setShow] = useState(false);
  const [articleDetail, setArticleDetail] = useState({});
  const [forumcard, setForumcard] = useState([""]);

  //接住卡片的資料
  const location = useLocation();
  console.log(location.state.data);
  let data = JSON.parse(location.state.data);
  console.log(data);
  const [article, setArticle] = useState({
    id: data.id,
    image_name: data.image_name,
    category_id: data.category_id,
    course_id: data.course_id,
    article_title: data.article_title,
    article_link: data.article_link,
    article_text: data.article_text,
  });
  console.log(article);
  function handleUpload(e) {
    let newArticle = { ...article };
    newArticle.image = e.target.files[0];
    setArticle(newArticle);
    // console.log(newArticle.image.name);
    if (newArticle.length > 0) {
      setArticle({ image_name: newArticle.image.name });
    }

    console.log(e.target.files[0]);
  }

  // 將資料送出
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     // json 格式無法傳檔案
  //     // 改成用 form data
  //     let formData = new FormData();
  //     formData.append("image", article.image);
  //     formData.append("category_id", article.category_id);
  //     formData.append("course_id", article.course_id);
  //     formData.append("article_title", article.article_title);
  //     formData.append("article_link", article.article_link);
  //     formData.append("article_text", article.article_text);
  //     // console.log("formData", formData.getAll());
  //     let res = await axios.post(
  //       "http://localhost:8080/api/forum/insertArticle",
  //       formData
  //     );
  //   } catch (e) {
  //     console.log("handleSubmit", e);
  //   }
  //   console.log(article);
  // }

  // 改變article的狀態
  function handleChange(e) {
    let newArticle = { ...article };
    newArticle[e.target.name] = e.target.value;
    setArticle(newArticle);
    // setArticle({ ...Article, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  // sweetalert2 & 資料送出
  const article_deliver = async () => {
    let formData = new FormData();
    formData.append("id", article.id);
    formData.append("image", article.image);
    formData.append("category_id", article.category_id);
    formData.append("course_id", article.course_id);
    formData.append("article_title", article.article_title);
    formData.append("article_link", article.article_link);
    formData.append("article_text", article.article_text);
    let res = await axios.post(
      "http://localhost:8080/api/forum/updateArticle",
      formData
    );

    Swal.fire({
      // title: "",
      icon: "success",
      // customClass: "Custom_Cancel",
      confirmButtonColor: "#0078b3",
      confirmButtonText: "已送出文章，返回討論區",
    }).then(function () {
      // window.location.href = "/forum";
    });
  };

  // 重設forum
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

  useEffect(async () => {
    try {
      let res = await axios.get(`${API_URL}/forum`, { withCredentials: true });
      console.log(res.data.forumdata);
      setForumcard(res.data.forumdata);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  console.log(article_deliver);
  return (
    <>
      <div className="space"></div>
      <div className="update">
        <div className="form">
          <h2>修改文章</h2>
          <div className="Forum-update-image">
            <label HtmlFor="upload" className="Forum-update-label-small">
              {/* Forum-update-label-update-illustrator  */}
              上傳圖片
              <input
                id="upload"
                className="Forum-update-form-file"
                type="file"
                name="image"
                // value={article.image_name}
                onChange={handleUpload}
              />
            </label>
            <p className="Forum-update-form-data">{article.image_name}</p>
          </div>
          <label htmlFor="category_id" className="Forum-update-label-small">
            類別項目
          </label>
          <div className="Forum-update-form-select">
            <select
              id="category_id"
              name="category_id"
              value={article.category_id}
              onChange={handleChange}
            >
              <option>請選擇選項</option>
              <option value="1">日式料理</option>
              <option value="2">韓式料理</option>
              <option value="3">法式料理</option>
              <option value="4">義式料理</option>
              <option value="5">中式料理</option>
              <option value="6">經典調酒</option>
            </select>
          </div>
          <label className="Forum-update-label-small">課程名稱</label>
          <div className="Forum-update-form-select">
            <select
              id=""
              name="course_id"
              // defaultValue={article.course_id}
              onChange={handleChange}
              value={article.course_id}
            >
              <option value="" selected>
                請選擇選項
              </option>
              <option value="12">築地創意壽司</option>
              <option value="13">炸薯條</option>
            </select>
          </div>
          <label htmlFor="article_title" className="Forum-update-label-small">
            發表標題
          </label>
          <input
            id="article_title"
            className="Forum-update-form-big"
            type="text"
            name="article_title"
            value={articleDetail && article.article_title}
            onChange={handleChange}
          />
          <label htmlFor="article_title" className="Forum-update-label-small">
            影片連結
          </label>
          <input
            id="article_link"
            className="Forum-update-form-big"
            type="text"
            name="article_link"
            value={article.article_link}
            onChange={handleChange}
          />
          <label htmlFor="article_text" className="Forum-update-label-content">
            內容
          </label>
          <textarea
            className="Forum-update-textarea"
            name="article_text"
            id="commet"
            value={article.article_text}
            onChange={handleChange}
          ></textarea>
          <div className="Forum-update-button-div">
            <button className="Forum-update-button" onClick={article_deliver}>
              送出
            </button>

            <button
              className="Forum-update-button"
              value="重設"
              onClick={reset_function}
            >
              重設
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumUpdate;
