import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import Button from "./Button";
import StarGroup from "./StarGroup";
import { PUBLIC_URL } from "../config/config";
import { numDotFormat } from "../config/formula";

// 判斷三個不同階級
let leverArray = ["", "高階", "中階", "初階"];
// 判斷當前課程是否為前一天以內新增的
let newCourseCompare = new Date(Date.now() - 86400000);

// 以下為必要props
// courseDetail(課程詳細資料)
// handleAddIntoCollection => 按下愛心 會回傳當前課程id
// handleAddIntoCart => 加入購物車 回傳當前課程id
// handlePurchase => 立即購買 回傳當前課程id

// 下面為非必要props
// collectionIds = 當前登入的使用者收藏的所有課程ID array, 有登入的時候再傳進來即可
const CourseCard1 = (props) => {
  let {
    courseDetail,
    collectionIds,
    handleAddIntoCollection,
    handleAddIntoCart,
    handlePurchase,
    className,
  } = props;

  // 當前課程是否被當前登入的使用者加入收藏
  const [isCollection, setIsCollection] = useState("");
  // 評分趴數
  const [scorePercent, setScorePercent] = useState(20);
  // 報名趴數
  const [assignPersent, setAssignPersent] = useState(0);

  // 初次render做的事情
  useEffect(() => {
    if (courseDetail) {
      // 計算評分平均值
      setScorePercent((courseDetail.score_sum / courseDetail.score_count) * 20);

      // 計算報名趴數
      let member = courseDetail.closest_batchs
        ? courseDetail.closest_batchs.member_count
        : 0;
      setAssignPersent((member / courseDetail.member_limit) * 100);
    }

    // 此課程是否被當前使用者收藏
    if (collectionIds) {
      let result = "";
      for (let i = 0; i < collectionIds.length; i++) {
        if (collectionIds[i] == courseDetail?.id) {
          result = true;
          break;
        }
      }
      setIsCollection(result);
    }
  }, [courseDetail]);

  // 若是有傳入使用者收藏IDS
  useEffect(() => {
    if (collectionIds) {
      // 此課程是否被當前使用者收藏
      if (collectionIds) {
        let result = "";
        for (let i = 0; i < collectionIds.length; i++) {
          if (collectionIds[i] == courseDetail?.id) {
            result = true;
            break;
          }
        }
        setIsCollection(result);
      }
    }
  }, [collectionIds]);

  return (
    <>
      {courseDetail && (
        <div className={`CourseCard1 ${className ? " " + className : ""}`}>
          <div className="CourseCard1-imageCon">
            <img
              src={`${PUBLIC_URL}/upload-images/${courseDetail.course_image}`}
              alt="course_image"
            />
            {assignPersent > 80 && (
              <div className="CourseCard1-imageCon-banner">即將截止</div>
            )}
            {new Date(courseDetail.created_time) > newCourseCompare && (
              <div className="CourseCard1-imageCon-banner">最新課程</div>
            )}
          </div>

          <div className="CourseCard1-detailCon">
            <h4
              className="CourseCard1-detailCon-h4"
              title={courseDetail.course_name}
            >
              <Link to={`/courses/${courseDetail.id}`}>
                {courseDetail.course_name}
              </Link>
            </h4>
            <StarGroup
              percent={scorePercent || 0}
              allScore={courseDetail.score_count || 0}
            />
            <div className="CourseCard1-detailCon-company">
              <IoLocationSharp />
              {courseDetail.company_name}
              <GiCook />
              {courseDetail.first_name + " " + courseDetail.last_name}
            </div>
            <div className="CourseCard1-detailCon-courseTime">
              最近可報名梯次：
              {/* {courseDetail.closest_batchs.batch_date
            ? courseDetail.closest_batchs.batch_date
            : "目前沒有開放"} */}
              {courseDetail.closest_batchs?.batch_date
                ? courseDetail.closest_batchs.batch_date
                : "目前沒有開放"}
            </div>
            <div className="CourseCard1-detailCon-MemberCount">
              <div className="CourseCard1-detailCon-MemberCount-progressCon">
                <div
                  className="CourseCard1-detailCon-MemberCount-progress"
                  style={{ width: assignPersent + "%" }}
                ></div>
              </div>
              <div>
                報名人數{" "}
                {courseDetail.closest_batchs
                  ? courseDetail.closest_batchs.member_count
                  : 0}{" "}
                / {courseDetail.member_limit}
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
                  {/* 先改這樣 不然我主廚頁面會報錯 12/7 不能改這樣再通知我*/}
                  NT$
                  {numDotFormat(
                    courseDetail.course_price ? courseDetail.course_price : 0
                  )}
                </span>
                <span className="CourseCard1-detailCon-bottom-coursePrice-discount">
                  NT$
                  {numDotFormat(
                    courseDetail.course_price
                      ? courseDetail.course_price * 0.9
                      : 0
                  )}
                </span>
              </div>
            </div>
            <div
              className={`CourseCard1-detailCon-likeBtn ${
                isCollection && " CourseCard1-detailCon-likeBtn-active"
              }`}
              onClick={() => {
                handleAddIntoCollection(courseDetail.id);
              }}
            >
              <FaRegHeart />
            </div>
          </div>
          <div className="CourseCard1-buttonCon">
            <Button
              value={"加入購物車"}
              className={"button-themeColor CourseCard1-buttonCon-btn"}
              onClick={() => {
                handleAddIntoCart({
                  course_id: courseDetail.id,
                  batch: courseDetail.closest_batchs,
                });
              }}
            />
            <Button
              value={"立即訂購"}
              className={"button-activeColor CourseCard1-buttonCon-btn"}
              onClick={() => {
                handlePurchase({
                  course_id: courseDetail.id,
                  batch: courseDetail.closest_batchs,
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard1;
