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

const ForumCard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [forumcard, setForumcard] = useState([""]);
  const [articleDetail, setArticleDetail] = useState({});

  useEffect(async () => {
    try {
      let res = await axios.get(`${API_URL}/forum`, { withCredentials: true });
      console.log(res.data.forumdata);
      setForumcard(res.data.forumdata);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  return (
    <>
      {forumcard &&
        forumcard.map((forumdata) => (
          <div
            className="Forum-main-out"
            data-forumId={forumdata.id}
            onClick={async (e) => {
              console.log(forumdata);
              console.log(e.currentTarget.dataset.forumid);
              let forumEach = await axios.get(
                `${API_URL}/forum/${e.currentTarget.dataset.forumid}`
              );
              setArticleDetail(forumEach.data.forumdatadetail);
            }}
          >
            <img
              data-forumId={forumdata.id}
              className="Forum-main-photo"
              src={`${PUBLIC_URL}/upload-images/${
                articleDetail && articleDetail.image_name
              }`}
              // onClick={async (e) => {
              //   console.log(e.target.dataset.forumid);
              //   let forumEach = await axios.get(
              //     `${API_URL}/forum/${e.target.dataset.forumid}`
              //   );
              //   setArticleDetail(forumEach.data.forumdatadetail);
              // }}
              // src={require(`./../../components/images/${image}`).default}
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
                      <a href="#">刪除</a>
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
              <iframe
                className="Forum-modal-body-youtube"
                src="https://www.youtube.com/embed/CAbUdQbTz7c"
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
                  奇異的小玩偶
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
              <p className="">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
                ad voluptates ullam odio sed, nihil atque illo earum, neque
                minus quasi aliquam quaerat quae error animi, provident
                obcaecati aut debitis.
              </p>
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
