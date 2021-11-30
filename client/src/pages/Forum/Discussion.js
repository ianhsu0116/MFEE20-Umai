import React from "react";
import { AiOutlineHeart, AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const Discussion = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="massonry-title">
        <div className="massonry-title-inside">
          <h5 className="massonry-title-inside-bread">首頁>討論區</h5>
          <h1 className="massonry-title-inside-header">討論區</h1>
          <div className="st-line"></div>
        </div>
      </div>
      <div className="wrapper">
        <div className="discussion">
          <h2 className="Discussion-main-theme">築地創意壽司 課程老師評價？</h2>
          <h5 className="Discussion-main-brad">
            課程探索>日式料理>築地創意壽司
          </h5>
          <div className="Discussion-main-account">
            <img
              className="Discussion-main-account-image"
              src={require(`./../../components/images/img1.jpg`).default}
              alt="cake"
            ></img>
            <div>
              <h6 className="Discussion-main-account">奇異的小玩偶</h6>
              <h6 className="Discussion-main-account">@olsonlovesmakelove</h6>
            </div>
          </div>
          <p className="Discussion-main-p">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam ad
            voluptates ullam odio sed, nihil atque illo earum, neque minus quasi
            aliquam quaerat quae error animi, provident obcaecati aut debitis.
          </p>
          <div className="Discussion-main-image">
            <img src="" alt="" />
          </div>
          <div className="Discussion-main-commet">
            <AiOutlineHeart className="AiOutlineHeart" />
            <p>999</p>
            <AiOutlineMessage className="AiOutlineMessage" />
            <p>999</p>
            <div className="Discussion-main-commet-social">
              <AiFillFacebook />
              <AiOutlineInstagram />
            </div>
          </div>
          <div className="st-line"></div>
        </div>
      </div>

      <div className="wrapper">
        <div className="discussion">
          <div className="Discussion-main-account">
            <img
              className="Discussion-main-account-image"
              src={require(`./../../components/images/img1.jpg`).default}
              alt="cake"
            ></img>
            <div>
              <h6 className="Discussion-main-account">奇異的小玩偶</h6>
              <h6 className="Discussion-main-account">@olsonlovesmakelove</h6>
            </div>
          </div>
          <div className="Discussion-commet">
            <p>sdfsdfsdfssdfasdfsdfsdfdfsdfasdfsadf</p>
            <hr />
          </div>
          <div className="Discussion-main-account">
            <img
              className="Discussion-main-account-image"
              src={require(`./../../components/images/img1.jpg`).default}
              alt="cake"
            ></img>
            <div>
              <h6 className="Discussion-main-account">奇異的小玩偶</h6>
              <h6 className="Discussion-main-account">@olsonlovesmakelove</h6>
            </div>
          </div>
          <div className="Discussion-commet">
            <p>sdfsdfsdfssdfasdfsdfsdfdfsdfasdfsadf</p>
            <hr />
          </div>
          <div className="st-line"></div>
        </div>
      </div>
      <div className="wrapper">
        <div className="discussion">
          <div className="Discussion-main-account">
            <img
              className="Discussion-main-account-image"
              src={require(`./../../components/images/img1.jpg`).default}
              alt="cake"
            ></img>
            <div>
              <h6 className="Discussion-main-account">奇異的小玩偶</h6>
              <h6 className="Discussion-main-account">@olsonlovesmakelove</h6>
            </div>
          </div>
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="Discussion-commet-textarea"
            >
              請輸入
            </textarea>
          </div>

          <div className="st-line"></div>
        </div>
      </div>
    </>
  );
};

export default Discussion;
