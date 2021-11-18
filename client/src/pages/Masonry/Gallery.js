import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { BsFillTriangleFill } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

// import img from "../images/img1.jpg";
// console.log(img);

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

const Gallery = () => {
  // const photo=
  //   let data = [
  //     {
  //       id: 1,
  //       imgSrc: "img1.jpg",
  //     },
  //     {
  //       id: 2,
  //       imgSrc: "img2.jpg",
  //     },
  //     {
  //       id: 3,
  //       imgSrc: "img3.jpg",
  //     },
  //     {
  //       id: 4,
  //       imgSrc: "img4.jpg",
  //     },
  //     {
  //       id: 5,
  //       imgSrc: "img5.jpg",
  //  },
  //   ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="massonry-title">
        <div className="massonry-title-inside">
          <h5 className="massonry-title-inside-bread">首頁>討論區</h5>
          <h1 className="massonry-title-inside-header">課程體驗</h1>
          <div className="st-line"></div>
        </div>
      </div>

      <section class="wrapper">
        <div class="masonry">
          {array.map((image) => (
            <div class="item">
              <div>
                <img
                  className="img"
                  src={require(`./../../components/images/${image}`).default}
                  alt="cake"
                ></img>
                <div className="opacity" onClick={handleShow}>
                  <h2>cool</h2>
                  <p>amaze</p>
                </div>
              </div>
              <div>
                <p>sdfasdfasdf</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Modal
        className="Massonry-modal"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        {/* <Modal.Header
          closeButton
          className="Massonry-modal-header"
        ></Modal.Header> */}
        <Modal.Body className="Massonry-modal-body" closeButton>
          <div className="Massonry-modal-body-image-border">
            <img
              className="Massonry-modal-body-image"
              src={require(`./../../components/images/img1.jpg`).default}
              alt="cake"
            ></img>
          </div>

          <div className="Massonry-modal-body-textgrop">
            <div className="Massonry-modal-body-owner">
              <div className="Massonry-modal-body-owner-account-block">
                <img
                  className="Massonry-modal-body-orner-image"
                  src={require(`./../../components/images/img1.jpg`).default}
                  alt="cake"
                ></img>
                <div className="Massonry-modal-body-owner-account">
                  <h6 className="Forum-modal-body-account-name">
                    奇異的小玩偶
                  </h6>
                  <h6 className="Forum-modal-body-account-id">
                    @olsonlovesmakelove
                  </h6>
                </div>
              </div>
              <p className="Massonry-modal-body-orner-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis natus tenetur, laboriosam ut commodi ducimus ratione
                provident incidunt dolore reiciendis consequatur ea aspernatur
                sed omnis reprehenderit modi, beatae similique culpa!
              </p>
              <div className="Massonry-modal-body-orner-logo">
                <AiOutlineHeart className="AiOutlineHeart" size="2rem" />
                <p className="Massonry-modal-body-orner-icon-p">999</p>
                <AiOutlineMessage className="AiOutlineMessage" size="2rem" />
                <p className="Massonry-modal-body-orner-icon-p">999</p>
              </div>
            </div>
            <div className="Massonry-modal-body-critic">
              <div className="Massonry-modal-body-critic-account-block">
                <img
                  className="Massonry-modal-body-critic-image"
                  src={require(`./../../components/images/img1.jpg`).default}
                  alt="cake"
                ></img>
                <div className="Massonry-modal-body-critic-account">
                  <h6 className="Forum-modal-body-critic-account-name">
                    奇異的小玩偶
                  </h6>
                  <h6 className="Forum-modal-body-critic-account-id">
                    @olsonlovesmakelove
                  </h6>
                </div>
              </div>
              <p className="Massonry-modal-body-critic-text">sdfasdfasdfsdf</p>
              <div className="Massonry-modal-body-critic-logo">
                <AiOutlineHeart className="AiOutlineHeart" size="2rem" />
                <p className="Massonry-modal-body-critic-icon-p">999</p>
                <AiOutlineMessage className="AiOutlineMessage" size="2rem" />
                <p className="Massonry-modal-body-critic-icon-p">999</p>
              </div>
            </div>
            <div className="Massonry-modal-body-commet">
              <div className="Massonry-modal-body-commet-account-block">
                <img
                  className="Massonry-modal-body-commet-image"
                  src={require(`./../../components/images/img1.jpg`).default}
                  alt="cake"
                ></img>
                <div className="Massonry-modal-body-commet-account">
                  <h6 className="Forum-modal-body-commet-account-name">
                    奇異的小玩偶
                  </h6>
                  <h6 className="Forum-modal-body-commet-account-id">
                    @olsonlovesmakelove
                  </h6>
                </div>
              </div>
              <input className="Forum-modal-body-commet-p" />
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer ClassName="modal-footer">
          <div className="Massonry-modal-footer-component">
            <div className="Massonry-modal-footer-account">
              <img
                className="Massonry-modal-footer-account-image"
                src={require(`./../../components/images/img1.jpg`).default}
                alt="cake"
              ></img> 
              <div>
                <h6 className="Massonry-modal-footer-account-name">
                  奇異的小玩偶
                </h6>
                <h6 className="Massonry-modal-footer-account-id">
                  @olsonlovesmakelove
                </h6>
              </div>
            </div>
            <div className="Massonry-modal-footer-commet">
              <p className="">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
                ad voluptates ullam odio sed, nihil atque illo earum, neque
                minus quasi aliquam quaerat quae error animi, provident
                obcaecati aut debitis.
              </p>
            </div>
            <div className="Massonry-modal-footer-icon">
              <AiOutlineHeart className="AiOutlineHeart" size="2rem" />
              <p className="Massonry-modal-footer-icon-p">999</p>
              <AiOutlineMessage className="AiOutlineMessage" size="2rem" />
              <p className="Massonry-modal-footer-icon-p">999</p>
            </div>
            <div className="st-line"></div>
          </div>
          <div className="Massonry-modal-footer-write-component">
            <div className="Massonry-modal-footer-write-account">
              <img
                className="Massonry-modal-footer-write-account-image"
                src={require(`./../../components/images/img1.jpg`).default}
                alt="cake"
              ></img>
              <div>
                <h6 className="Massonry-modal-footer-write-account-name">
                  奇異的小玩偶
                </h6>
                <h6 className="Massonry-modal-footer-write-account-id">
                  @olsonlovesmakelove
                </h6>
              </div>
            </div>
            <div className="Massonry-modal-footer-write-commet">
              <input type="text" />
              <textarea
                className="Massonry-modal-footer-write-commet-textarea"
                id=""
              >
                留言
              </textarea>
            </div>
            <div className="Massonry-modal-footer-write-commet-buttonarea">
              <Button
                className="Massonry-modal-footer-write-commet-buttonsave"
                variant="primary"
              >
                送出
              </Button>
              <Button
                className="Massonry-modal-footer-write-commet-buttondelete"
                variant="secondary"
              >
                刪除
              </Button>
              <div className="st-line"></div> *
            </div>
          </div>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
export default Gallery;
