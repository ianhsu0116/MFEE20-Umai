import React, { useState, useEffect } from "react";
import { Link, link } from "react-router-dom";
import moment from "moment";
import image from "./images/sushi-unsplash.jpg";

const Coupons = (props) => {
  let { data } = props;

  // 卡片是否要disable
  const [isDisable, setIsDisable] = useState(false);

  // 用到期日 + 狀態 判斷卡片是否要disable
  useEffect(() => {
    let expireDate = new Date(data.expire_date);
    let now = new Date();
    let disableResult = data.status === 2 || now > expireDate;
    setIsDisable(disableResult);
  }, [props]);

  return (
    <div className={`Coupons ${isDisable && "Coupons-disabled"}`}>
      <div className="Coupons-imageCon">
        <img src={image} alt="foodImage" className="Coupons-imageCon-img" />
        <div className="Coupons-imageCon-banner">
          {/* 可使用: Link,  不能使用: 只顯示文字 */}
          {isDisable ? "無法使用" : <Link to="/courses">立即使用</Link>}
        </div>
      </div>
      <div className="Coupons-textCon">
        <div className="Coupons-textCon-title">
          <h4>{data.title}</h4>
        </div>
        <div className="Coupons-textCon-bottom">
          <div className="Coupons-textCon-bottom-title">優惠券代碼</div>
          <div>{data.id}</div>
          <div className="Coupons-textCon-bottom-title">使用期限</div>
          <div className="Coupons-textCon-bottom-expireDate">
            即日起 ~ {data.expire_date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
