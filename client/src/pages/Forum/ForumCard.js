import React from "react";
import { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  AiOutlineMessage,
  AiFillQuestionCircle,
  AiOutlineHeart,
  AiOutlineInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { BsFillTriangleFill } from "react-icons/bs";
import { Modal, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { API_URL, PUBLIC_URL } from "../../config/config";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ForumCard = (props) => {
  // 自前端Forum.js那邊拿到currentUser
  const { currentUser } = props;
  // setShow是一個函式，改變SHOW的狀態
  // useState(初始值)
  // show代表狀態，是唯獨。必須透過setshow去改變
  // 解構賦值
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setdata] = useState({});
  // 通常會設定初始狀態是某一個型態，因為在底下可能會用到這樣的值。
  const [forumcard, setForumcard] = useState([]);
  // setarticledetail的資料來自於後端的forumid
  const [articleDetail, setArticleDetail] = useState({});

  const [messageEnter, setMessageEnter] = useState({
    member_id: currentUser.id,
    article_id: "",
    message_text: "",
    image: "",
  });

  const [messageDetail, setmessageDetail] = useState([]);

  const [essay, setEssay] = useState([]);

  // 寫入當前登入帳號的ID
  let id = JSON.parse(localStorage.getItem("user"));
  // useEffect(), []);
  // console.log(id.id);
  // if (messageEnter.member_id == null) {
  //   setMessageEnter({ member_id: id.id });
  // }

  // USEEFFECT模擬類別型元件的生命週期
  // 若把UseEffect設定為UseEffect(),[]的話，在畫面渲染完成以後執行()裡面的內容。
  useEffect(async () => {
    try {
      // 前端請後端抓資料給前端。至後端抓資料，並回傳response
      let res = await axios.get(`${API_URL}/forum`, { withCredentials: true });
      console.log(res.data.forumdata);
      setForumcard(res.data.forumdata);

      let data = JSON.stringify(res.data.forumdata);
      // 自後端讀取資料庫的資料，
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  // 改變setmessagenter的狀態
  function handleChange(e) {
    if (e.target.name == "image") {
      let newMessage = { ...messageEnter };
      newMessage[e.target.name] = e.target.files[0];
      setMessageEnter(newMessage);
      if (newMessage.length > 0) {
        console.log(newMessage.name);
      }
    } else {
      let newMessage = { ...messageEnter };
      newMessage[e.target.name] = e.target.value;
      setMessageEnter(newMessage);
      if (newMessage.length > 0) {
        console.log(newMessage.name);
      }
    }
  }

  // useEffect({setMessageEnter()}, []);

  // sweetalert2 & 資料送出
  const message_deliver = async (article_id) => {
    console.log(article_id);
    try {
      let formData = new FormData();
      formData.append("article_id", article_id);
      formData.append("member_id", messageEnter.member_id);
      formData.append("image", messageEnter.image);
      formData.append("message_text", messageEnter.message_text);
      let res = await axios.post(
        "http://localhost:8080/api/forum/insertMessage",
        formData
      );
      Swal.fire({
        // title: "",
        icon: "success",
        // customClass: "Custom_Cancel",
        confirmButtonColor: "#0078b3",
        confirmButtonText: "已送出留言，返回討論區",
      }).then(function () {
        // window.location.reload();
        // window.location.href = "/forum";
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 刪除文章的語法
  const delete_article = async () => {
    let id = articleDetail.id;
    let result = await axios.post(
      `${API_URL}/forum/deleteArticle`,
      { id: id },
      {
        withCredentials: true,
      }
    );
    if (result) {
      window.location.href = "/forum";
    }
    // console.log(articleDetail.id);
  };

  // 刪除留言的語法
  const reset_function = () => {
    setMessageEnter({ message_text: "" });
    let inputImage = document.getElementsByName("image");
    // console.log(inputImage);
    inputImage[1].value = "";
  };

  const article_collect = async (article_id) => {
    console.log(article_id);
    console.log(currentUser);
    try {
      let res = await axios.post(
        "http://localhost:8080/api/forum/collection/" + currentUser.id,
        { article_id }
      );
      Swal.fire({
        // title: "",
        icon: "success",
        // customClass: "Custom_Cancel",
        confirmButtonColor: "#0078b3",
        confirmButtonText: "已收藏文章",
      });
    } catch (e) {
      console.log(e);
    }
  };
  // 圖片上傳
  function handleUpload(e) {
    let newMessage = { ...messageEnter };
    messageEnter.image = e.target.files[0];
    setMessageEnter(newMessage);
    // console.log(newArticle.image.name);
    // if (newMessage.length > 0) {
    setMessageEnter({
      ...messageEnter,
      member_id: currentUser.id,
      image: e.target.files[0],
    });
    // }
    console.log(e.target.files[0].name);
  }
  console.log(messageEnter);
  return (
    <>
      {/* &&前面通常是判斷式，當判斷式式true的時候會執行&&以後的工作。內容若有東西的話就會是true */}
      {forumcard &&
        forumcard.map((forumdata) => (
          <div
            className="Forum-main-out"
            // 自訂意屬性
            data-forumId={forumdata.id}
            onClick={async (e) => {
              console.log(forumdata);
              let id = e.currentTarget.dataset.forumid;
              id = Number(id);
              setMessageEnter({
                article_id: id,
              });
              console.log(id);
              console.log(e.currentTarget.dataset.forumid);
              // useEffect已經拿到所有的留言，也變更了messageDetail的狀態，因此messageDetail已經是所有的留言。
              let newMessage = [...messageDetail];
              // filter去篩選
              let newmsg = newMessage.filter(
                (message) => message.article_id == id
              );
              console.log(newMessage);
              console.log(newmsg);
              setmessageDetail(newmsg);
              // 去後端要資料
              // ajax
              // forumid儲存在dataset裡面。
              let forumEach = await axios.get(
                `${API_URL}/forum/${e.currentTarget.dataset.forumid}`
              );
              // 整筆資料的儲存
              setArticleDetail(forumEach.data.forumdatadetail);
              // console.log(forumEach.data.forumdatadetail);
              console.log(forumEach.data);
              setdata(JSON.stringify(forumEach.data.forumdatadetail));
              console.log("setdata", setdata);

              let comment = await axios.get(`${API_URL}/forum/comment/${id}`, {
                withCredentials: true,
              });
              console.log(comment);
              // 第一個COMMENT是 LET的 變數名稱，依照comment形式，再判斷如何拿資料。
              setmessageDetail(comment.data.comment);
              // let message = JSON.stringify(res.message.comment);

              // let comment = await axios.get(`${API_URL}/forum/comment`, {
              //   withCredentials: true,
              // });
              // console.log(comment);
              // // 第一個COMMENT是 LET的 變數名稱，依照comment形式，再判斷如何拿資料。
              // setmessageDetail(comment.data.comment);
              // // let message = JSON.stringify(res.message.comment);
            }}
          >
            <img
              data-forumId={forumdata.id}
              className="Forum-main-photo"
              src={`${PUBLIC_URL}/upload-images/${
                forumdata && forumdata.image_name
              }`}
              alt="drink"
            ></img>
            <div className="Forum-main-middle">
              <div className="Forum-main-DateAndDropdown">
                <p className="Forum-main-date">{forumdata.created_time}</p>
                <div class="Forum-main-dropdown">
                  <FiMoreHorizontal className="FiMoreHorizontal" />
                  <div class="Forum-main-dropdown-content">
                    <button
                      class="Forum-main-dropdown-content-deletebutton"
                      onClick={() => {
                        article_collect(articleDetail.id);
                      }}
                    >
                      收藏
                    </button>
                    <button
                      class="Forum-main-dropdown-content-deletebutton"
                      onClick={delete_article}
                    >
                      刪除
                    </button>
                    <p>
                      <Link
                        to={{
                          pathname: "/forumupdate",
                          state: { data: data },
                        }}
                      >
                        <a>修改</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="Forum-main-dateAndTheme" onClick={handleShow}>
                <h5 className="Forum-main-theme" onClick={handleShow}>
                  {forumdata.article_title}
                </h5>
              </div>
              <p className="Forum-main-p" onClick={handleShow}>
                {forumdata.article_text}
              </p>
              <div className="Forum-main-little">
                <AiOutlineHeart className="AiOutlineHeart" />
                <p className="Forum-main-love">333</p>
                <AiOutlineMessage className="AiOutlineMessage" />
                <p className="Forum-main-love">99999</p>
                {/* <div className="Forum-main-small">
                  <BsFillTriangleFill className="BsFillTriangleFill" />
                  <p>其他功能</p>
                  <a href="#">收藏</a>
                  <a href="#">分享</a>
                  <a href="#">引用</a>
                  <a href="#">檢舉</a>
                  <a href="#">刪除</a>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      <Modal
        className="Forum-modal"
        id="style-10"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="Forum-modal-header" closeButton>
          <Modal.Title>
            <h2>{articleDetail && articleDetail.article_title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Forum-modal-body">
          <div className="Forum-modal-body-border">
            <div className="Forum-modal-body-account">
              <img
                className="Forum-modal-body-account-image"
                src={`${PUBLIC_URL}/upload-images/${
                  articleDetail && articleDetail.image_name
                }`}
                // src={require(`./../../components/images/img1.jpg`).default}
                alt="cake"
              ></img>

              <div>
                <h6 className="Forum-modal-body-account-name">奇異的小玩偶</h6>
                <h6 className="Forum-modal-body-account-id">
                  {articleDetail && articleDetail.member_id}
                </h6>
              </div>
              <div className="Forum-main-DateAndDropdown">
                <div class="Forum-main-dropdown">
                  <FiMoreHorizontal className="FiMoreHorizontal" />
                  <div class="Forum-main-dropdown-content">
                    <button
                      class="Forum-main-dropdown-content-deletebutton"
                      onClick={() => {
                        article_collect(articleDetail.id);
                      }}
                    >
                      收藏
                    </button>
                    {/* <p>
                      <a href="#">收藏</a>
                    </p> */}
                    <button
                      class="Forum-main-dropdown-content-deletebutton"
                      onClick={delete_article}
                    >
                      刪除
                    </button>
                    <p>
                      <Link
                        to={{
                          pathname: "/forumupdate",
                          state: { data: data },
                        }}
                      >
                        <a>修改</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Forum-modal-body-commet" id="Forum-modal-scrollbar">
              <p className="">{articleDetail && articleDetail.article_text}</p>
              <img
                className="Forum-modal-body-image"
                src={`${PUBLIC_URL}/upload-images/${
                  articleDetail && articleDetail.image_name
                }`}
                alt="cake"
              ></img>
              {/* {articleDetail && articleDetail.article_link} */}
              <br />
              <a href={articleDetail && articleDetail.article_link}>
                {articleDetail && articleDetail.article_link}
              </a>
              {/* <iframe
                className="Forum-modal-body-youtube"
                src="https://www.youtube.com/embed/onsQ-RF0dZw"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> */}
            </div>
            <div className="Forum-modal-body-icon">
              <AiOutlineHeart className="AiOutlineHeart" size="2rem" />
              <p className="Forum-modal-body-icon-p">999</p>
              <AiOutlineMessage className="AiOutlineMessage" size="2rem" />
              <p className="Forum-modal-body-icon-p">999</p>
              <div className="Forum-modal-body-icon-fb">
                <AiFillFacebook size="2rem" />
                <AiOutlineInstagram size="2rem" />
              </div>
            </div>
            <div className="st-line"></div>
          </div>
        </Modal.Body>

        <Modal.Footer ClassName="modal-footer">
          {/* message read */}
          {/* 為了預防沒有留言的時候報錯，所以設定條，當留言大於一筆的時候，執行第一個，當留言少於一個的時候執行第二個 */}
          {messageDetail.length >= 1 ? (
            messageDetail.map((msg) => (
              <div className="Forum-modal-footer-component">
                <div className="Forum-modal-footer-account">
                  <img
                    className="Forum-modal-footer-account-image"
                    src={`${PUBLIC_URL}/upload-images/${msg && msg.image_name}`}
                    alt="cake"
                  ></img>
                  <div>
                    <h6 className="Forum-modal-footer-account-name">
                      {msg.member_id}
                    </h6>
                  </div>
                  <div className="Forum-main-DateAndDropdown">
                    <div class="Forum-main-dropdown">
                      <FiMoreHorizontal className="FiMoreHorizontal" />
                      <div class="Forum-main-dropdown-content">
                        <p>
                          <a href="#">刪除</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Forum-modal-footer-commet">
                  <p className="">{msg.comment_text}</p>
                </div>
                <img
                  className="Forum-modal-footer-commet-image"
                  src={`${PUBLIC_URL}/upload-images/${msg && msg.image_name}`}
                  alt=""
                />
                <div className="st-line"></div>
              </div>
            ))
          ) : (
            <div className="Forum-modal-footer-component-less1">
              <div className="Forum-modal-footer-account">
                <img
                  className="Forum-modal-footer-account-image"
                  src={`${PUBLIC_URL}/upload-images/${
                    messageDetail && messageDetail.image_name
                  }`}
                  alt="cake"
                ></img>
                <div>
                  <h6 className="Forum-modal-footer-account-name">
                    {messageDetail.member_id}
                  </h6>
                  <h6 className="Forum-modal-footer-account-id">
                    @olsonlovesmakelove
                  </h6>
                </div>
                <div className="Forum-main-DateAndDropdown">
                  <div class="Forum-main-dropdown">
                    <FiMoreHorizontal className="FiMoreHorizontal" />
                    <div class="Forum-main-dropdown-content">
                      <p>
                        <a href="#">刪除</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Forum-modal-footer-commet">
                {/* <p className="">{msg.comment_text}</p> */}
              </div>
              <img src="" alt="" />
              <div className="Forum-modal-footer-icon">
                <AiOutlineHeart className="AiOutlineHeart" size="2rem" />
                <p className="Forum-modal-footer-icon-p">999</p>
                {/* <AiOutlineMessage className="AiOutlineMessage" size="2rem" />
              <p className="Forum-modal-footer-icon-p">999</p> */}
              </div>
              <div className="st-line"></div>
            </div>
          )}

          <div className="Forum-modal-footer-write-component">
            <div className="Forum-modal-footer-write-account">
              {/* <img
                className="Forum-modal-footer-write-account-image"
                src={`${PUBLIC_URL}/upload-images/${forum[0].course_detail.slider_images[0]}`}
                alt="cake"
              ></img> */}
              {/* message insert*/}
              <div>
                <h6 className="Forum-modal-footer-write-account-name">
                  奇異的小玩偶
                </h6>
                <h6 className="Forum-modal-footer-write-account-id">
                  @olsonlovesmakelove
                </h6>
              </div>
            </div>
            <div className="Forum-modal-footer-write-commet">
              {/* <input type="text" /> */}

              <input
                id=""
                className=""
                type="file"
                name="image"
                onChange={handleUpload}
              ></input>
              <textarea
                className="Forum-modal-footer-write-commet-textarea"
                name="message_text"
                value={messageEnter.message_text}
                onChange={handleChange}
              >
                留言
              </textarea>
            </div>
            <div className="Forum-modal-footer-write-commet-buttonarea">
              <Button
                className="Forum-modal-footer-write-commet-buttonsave"
                variant="primary"
                onClick={() => {
                  message_deliver(articleDetail.id);
                }}
              >
                送出
              </Button>
              <Button
                className="Forum-modal-footer-write-commet-buttondelete"
                variant="secondary"
                onClick={reset_function}
              >
                刪除
              </Button>
              {/* <div className="st-line"></div> */}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForumCard;
