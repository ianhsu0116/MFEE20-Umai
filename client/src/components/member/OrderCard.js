import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { AiOutlineStar } from "react-icons/ai";
import foodImg from "../images/sushi-unsplash.jpg";

const OrderCard = (props) => {
  // 此訂單詳細資訊
  let { orderDetail } = props;
  // 下拉視窗開關的值
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  // 課程評論輸入值 + 星星數量
  const [commentAndStar, setCommentAndStar] = useState({
    star: 1,
    comment: "",
  });

  // 測試中 ==== 感應區問題
  useEffect(() => {
    console.log("didmount");
  }, []);

  // 控制下拉視窗開關
  const handleOrderDetailOpen = () => {
    orderDetailOpen ? setOrderDetailOpen(false) : setOrderDetailOpen(true);
  };

  // 星星動態增減
  const handleStarClick = (e) => {
    e.stopPropagation();
    let index = Number(e.currentTarget.dataset.index);
    setCommentAndStar({ ...commentAndStar, star: index + 1 });
  };

  // 即時抓取課程評價的值
  const handleCommentChange = (e) => {
    setCommentAndStar({ ...commentAndStar, comment: e.target.value });
  };

  // 評論送出
  const handleCommentSubmit = () => {
    console.log(commentAndStar);

    // 評論state恢復初始值
    setCommentAndStar({ star: 1, comment: "" });
  };

  return (
    <div className="OrderCard">
      <div className="OrderCard-container" onClick={handleOrderDetailOpen}>
        <figure className="OrderCard-image-con">
          <img src={foodImg} alt="courseImage" className="OrderCard-image" />
        </figure>
        <div className="OrderCard-items OrderCard-courseTitle">
          <h5>
            <Link to="/course/category?id=course_id">
              {orderDetail.courseName}
            </Link>
          </h5>
        </div>
        <div className="OrderCard-items OrderCard-orderStatus">
          <p>{orderDetail.orderStatus}</p>
        </div>
        <div className="OrderCard-items OrderCard-orderBatch">
          <p>{orderDetail.orderBatch}</p>
        </div>
        <div className="OrderCard-items OrderCard-mamberCount">
          <p>
            購買名額：{" "}
            <span className="OrderCard-mamberCount-count">
              {orderDetail.courseMember.length}
            </span>{" "}
            人
          </p>
          <p>
            參加學員：{" "}
            <span className="OrderCard-mamberCount-count">
              {orderDetail.courseMemberLimit.length}
            </span>{" "}
            人
          </p>
        </div>
      </div>

      {/* 訂單詳細資訊的下拉式容器 */}
      {orderDetailOpen && (
        <div className="OrderCard-detail OrderCard-detail-active">
          <header className="OrderCard-detail-title">
            <h4 className="hrderCard-detail-title-h3">付款詳細資訊</h4>
          </header>
          <div className="OrderCard-detail-container">
            <div className="OrderCard-detail-container-item">
              <strong className="OrderCard-detail-container-item-title">
                付款方式
              </strong>
              <div className="OrderCard-detail-container-item-content">
                信用卡
              </div>
              <strong className="OrderCard-detail-container-item-title">
                訂單日期
              </strong>
              <div className="OrderCard-detail-container-item-content">
                2021-12-31
              </div>
            </div>
            <div className="OrderCard-detail-container-item">
              <strong className="OrderCard-detail-container-item-title">
                發票資訊
              </strong>
              <div className="OrderCard-detail-container-item-content">
                聯絡人：<span>Ian Hsu</span>
              </div>
              <div className="OrderCard-detail-container-item-content">
                聯絡信箱：<span>ianian@fake.com</span>
              </div>
              <div className="OrderCard-detail-container-item-content">
                電子發票 - 交給Umai幫您捐出去做愛心！
              </div>
            </div>
          </div>
          {orderDetail && orderDetail.orderStatus !== "未完成" && (
            <>
              <header className="OrderCard-detail-title">
                <h4 className="hrderCard-detail-title-h3">課程評價</h4>
              </header>
              <div className="OrderCard-detail-container2">
                <div className="OrderCard-detail-container2-left">
                  <textarea
                    name="courseComment"
                    className="OrderCard-detail-container2-left-textarea"
                    onChange={handleCommentChange}
                    cols="30"
                    rows="7"
                    maxLength="30"
                    placeholder="課程評論(字數限制: 30)"
                    value={commentAndStar.comment}
                  ></textarea>
                </div>

                <div className="OrderCard-detail-container2-right">
                  <ul className="OrderCard-detail-container2-right-stars">
                    {/* 利用迴圈跑出星星 */}
                    {new Array(5).fill(1).map((i, index) => (
                      <li
                        key={index}
                        data-index={index}
                        className={`OrderCard-detail-container2-right-star ${
                          commentAndStar.star >= index + 1 &&
                          "OrderCard-detail-container2-right-starActive"
                        }`}
                        onClick={handleStarClick}
                      >
                        <AiOutlineStar />
                      </li>
                    ))}
                  </ul>
                  <div className="OrderCard-detail-container2-right-buttonCon">
                    <Button
                      value={"送出評論"}
                      className={"button-themeColor"}
                      onClick={handleCommentSubmit}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
