import React from "react";
import foodImg from "../images/sushi-unsplash.jpg";
import foodImg2 from "../images/cocktail2-unsplash.jpg";

const OrderCard = (props) => {
  let { orderDetail } = props;
  return (
    <div className="OrderCard">
      <figure className="OrderCard-image-con">
        <img src={foodImg} alt="courseImage" className="OrderCard-image" />
      </figure>
      <div className="OrderCard-items OrderCard-courseTitle">
        <h3>{orderDetail.courseName}</h3>
      </div>
      <div className="OrderCard-items OrderCard-orderStatus">
        <p>{orderDetail.orderStatus}</p>
      </div>
      <div className="OrderCard-items OrderCard-orderBatch">
        <p>{orderDetail.orderBatch}</p>
      </div>
      <div className="OrderCard-items OrderCard-mamberCount">
        <p>
          剩餘名額：{" "}
          <span className="OrderCard-mamberCount-count">
            {orderDetail.courseMemberLimit.length -
              orderDetail.courseMember.length}
          </span>{" "}
          人
        </p>
        <p>
          報名學員：{" "}
          <span className="OrderCard-mamberCount-count">
            {orderDetail.courseMember.length}
          </span>{" "}
          人
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
