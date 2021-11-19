import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "./Button";
import StarGroup from "./StarGroup";
import { PUBLIC_URL } from "../config/config";

let leverArray = ["", "高階", "中階", "初階"];

// 一定需要傳 courseDetail(課程詳細資料) 進來！
const CourseCard1 = (props) => {
  let { courseDetail } = props;

  // 存解析過的date
  const [parseDate, setParseDate] = useState("");
  // 當前課程人數限制
  const [memberLimit, setMemberLimit] = useState("0");
  // 當前最近梯次的報名人數
  const [member, setMember] = useState("0");

  // 評分
  let [scoreSum, allScore] = [courseDetail.score_sum, courseDetail.score_count];

  // 評分趴數
  let scorePercent = (scoreSum / allScore) * 20;

  // 報名趴數
  let assignPersent = (member / memberLimit) * 100;
  // 將拿過來的梯次日期解析成人看得懂的樣子;
  useEffect(() => {
    // 日期格式轉換成 YYYY-MM-DD
    setParseDate(
      new Date(courseDetail.closest_batchs.batch_date)
        .toLocaleDateString()
        .split("/")
        .join("-")
    );

    // 將member及memberLimit裝入
    setMemberLimit(courseDetail.member_limit);
    setMember(courseDetail.closest_batchs.member_count);
  }, []);

  // 加入購物車
  const handleAddIntoCart = (e) => {
    console.log("加入購物車");
  };

  // 立即購買
  const handlePurchase = (e) => {
    console.log("立即訂購");
  };

  return (
    <div className="CourseCard1">
      <div className="CourseCard1-imageCon">
        <img
          src={`${PUBLIC_URL}/upload-images/${courseDetail.course_image}`}
          alt="course_image"
        />
        {assignPersent > 80 && (
          <div className="CourseCard1-imageCon-banner">即將截止</div>
        )}
      </div>

      <div className="CourseCard1-detailCon">
        <h4 className="CourseCard1-detailCon-h4">
          <Link to="/courses/course_id">{courseDetail.course_name}</Link>
        </h4>
        <StarGroup scorePercent={scorePercent} allScore={allScore} />
        <div className="CourseCard1-detailCon-company">
          <IoLocationSharp />
          {courseDetail.company_name}
          <GiCook />
          {courseDetail.first_name + " " + courseDetail.last_name}
        </div>
        <div className="CourseCard1-detailCon-courseTime">
          最近可報名梯次：{parseDate}
        </div>
        <div className="CourseCard1-detailCon-MemberCount">
          <div className="CourseCard1-detailCon-MemberCount-progressCon">
            <div
              className="CourseCard1-detailCon-MemberCount-progress"
              style={{ width: assignPersent + "%" }}
            ></div>
          </div>
          <div>
            報名人數 {member} / {memberLimit}
          </div>
        </div>
        <div className="CourseCard1-detailCon-bottom">
          {/* 這裡要自行判斷當前課程階級，切換className即可改變樣式(highLevel, midLevel, lowLevel) */}
          <div
            className={`CourseCard1-detailCon-bottom-courseLevel highLevel ${
              courseDetail.course_level == 1
                ? "highLevel"
                : courseDetail.course_level == 2
                ? "midLevel"
                : "lowLevel"
            }`}
          >
            {leverArray[courseDetail.course_level]}
          </div>
          <div className="CourseCard1-detailCon-bottom-coursePrice">
            <span className="CourseCard1-detailCon-bottom-coursePrice-origin">
              NT${courseDetail.course_price}
            </span>
            <span className="CourseCard1-detailCon-bottom-coursePrice-discount">
              NT${courseDetail.course_price * 0.9}
            </span>
          </div>
        </div>
        <div className="CourseCard1-detailCon-likeBtn">
          <AiOutlineHeart />
        </div>
      </div>
      <div className="CourseCard1-buttonCon">
        <Button
          value={"加入購物車"}
          className={"button-themeColor CourseCard1-buttonCon-btn"}
          onClick={handleAddIntoCart}
        />
        <Button
          value={"立即訂購"}
          className={"button-activeColor CourseCard1-buttonCon-btn"}
          onClick={handlePurchase}
        />
      </div>
    </div>
  );
};

export default CourseCard1;
