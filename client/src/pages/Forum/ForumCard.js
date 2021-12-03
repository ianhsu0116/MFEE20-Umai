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

const ForumCard = () => {
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
  const [articleDetail, setArticleDetail] = useState({});

  // USEEFFECT模擬類別型元件的生命週期
  // 若把UseEffect設定為UseEffect(),[]的話，在畫面渲染完成以後執行()裡面的內容。
  useEffect(async () => {
    try {
      // 前端請後端抓資料給前端。至後端抓資料，並回傳response
      let res = await axios.get(`${API_URL}/forum`, { withCredentials: true });
      console.log(res.data.forumdata);
      setForumcard(res.data.forumdata);

      let data = JSON.stringify(res.data.forumdata);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

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
    console.log(articleDetail.id);
  };

  // useEffect(async () => {
  //   try {
  //     let image = await axios.get(API_URL + "/forum/forumupdate", {
  //       withCredentials: true,
  //     });
  //     let category_id = category_id;
  //     let course_id = data.course_id;
  //     let article_title = article_title;
  //     let article_link = article_link;
  //     let article_text = article_text;
  //     let data = JSON.stringify({
  //       image: image,
  //       category_id: category_id,
  //       course_id: data.course_id,
  //       article_title: article_title,
  //       article_link: article_link,
  //       article_text: article_text,
  //     });
  //     console.log(image);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }, []);

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
              console.log(e.currentTarget.dataset.forumid);
              // 去後端要資料
              // ajax
              // forumid儲存在dataset裡面。
              let forumEach = await axios.get(
                `${API_URL}/forum/${e.currentTarget.dataset.forumid}`
              );
              // 整筆資料的儲存
              setArticleDetail(forumEach.data.forumdatadetail);
              console.log(forumEach.data.forumdatadetail);
              setdata(JSON.stringify(forumEach.data.forumdatadetail));
              console.log("setdata", setdata);
            }}
          >
            <img
              data-forumId={forumdata.id}
              className="Forum-main-photo"
              src={`${PUBLIC_URL}/upload-images/${
                articleDetail && articleDetail.image_name
              }`}
              alt="drink"
            ></img>
            <div className="Forum-main-middle">
              <div className="Forum-main-DateAndDropdown">
                <p className="Forum-main-date">{forumdata.created_time}</p>
                <div class="Forum-main-dropdown">
                  <FiMoreHorizontal className="FiMoreHorizontal" />
                  <div class="Forum-main-dropdown-content">
                    <p>
                      <a href="#">收藏</a>
                    </p>
                    <p>
                      <a href="#">分享</a>
                    </p>
                    <p>
                      <a href="#">檢舉</a>
                    </p>
                    <p>
                      <a href="#">刪除</a>
                    </p>
                    <p>
                      <a href="#">修改</a>
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
                <div className="Forum-main-small">
                  <BsFillTriangleFill className="BsFillTriangleFill" />
                  <p>其他功能</p>
                  <a href="#">收藏</a>
                  <a href="#">分享</a>
                  <a href="#">引用</a>
                  <a href="#">檢舉</a>
                  <a href="#">刪除</a>
                </div>
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
                    <p>
                      <a href="#">收藏</a>
                    </p>
                    <p>
                      <a href="#">分享</a>
                    </p>
                    <p>
                      <a href="#">檢舉</a>
                    </p>
                    <p>
                      <button onClick={delete_article}>刪除</button>
                    </p>
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
              <iframe
                className="Forum-modal-body-youtube"
                src="https://www.youtube.com/watch?v=hCG6Sa7EEZ0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
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
          <div className="Forum-modal-footer-component">
            <div className="Forum-modal-footer-account">
              <img
                className="Forum-modal-footer-account-image"
                src={require(`./../../components/images/img1.jpg`).default}
                alt="cake"
              ></img>
              <div>
                <h6 className="Forum-modal-footer-account-name">
                  {articleDetail && articleDetail.article_link}
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
                      <a href="#">收藏</a>
                    </p>
                    <p>
                      <a href="#">分享</a>
                    </p>
                    <p>
                      <a href="#">檢舉</a>
                    </p>
                    <p>
                      <a href="#">刪除</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Forum-modal-footer-commet">
              <p className="">{articleDetail && articleDetail.article_link}</p>
            </div>
            <div className="Forum-modal-footer-icon">
              <AiOutlineHeart className="AiOutlineHeart" size="2rem" />
              <p className="Forum-modal-footer-icon-p">999</p>
              {/* <AiOutlineMessage className="AiOutlineMessage" size="2rem" />
              <p className="Forum-modal-footer-icon-p">999</p> */}
            </div>
            <div className="st-line"></div>
          </div>
          <div className="Forum-modal-footer-write-component">
            <div className="Forum-modal-footer-write-account">
              <img
                className="Forum-modal-footer-write-account-image"
                src={require(`./../../components/images/img1.jpg`).default}
                alt="cake"
              ></img>
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
              <textarea
                className="Forum-modal-footer-write-commet-textarea"
                id=""
              >
                留言
              </textarea>
            </div>
            <div className="Forum-modal-footer-write-commet-buttonarea">
              <Button
                className="Forum-modal-footer-write-commet-buttonsave"
                variant="primary"
              >
                送出
              </Button>
              <Button
                className="Forum-modal-footer-write-commet-buttondelete"
                variant="secondary"
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
