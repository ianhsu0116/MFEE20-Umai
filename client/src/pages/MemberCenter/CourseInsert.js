import React, { useState } from "react";
import ReviewButton from "../../components/member/ReviewButton";

const coures_info_json = {
  slider_image: ["img_name", "img_name", "img_name"],
  course_name: "課程名稱",
  company_name: "餐廳名稱",
  company_address: "餐廳地址", // 供google地圖搜尋
  timeOfCourse: "平日上午10:30 ~ 下午04:00",
  course_ig: "https://www.instagram.com/",
  course_fb: "https://www.facebook.com/",
  title1_1: "標題1-1號",
  title1_2: "標題1-2號",
  content1: "介紹內容一",
  title2: "標題3號(六道菜部分)",
  six_dishes: [
    // 課程六道菜的圖+文
    {
      image_name: "image_name",
      image_title: "菜色標題",
      image_content: "菜色介紹",
    },
    {
      image_name: "image_name",
      image_title: "菜色標題",
      image_content: "菜色介紹",
    },
  ],
  content2: "費用包含內容＋注意事項",
};

const CourseInsert = (props) => {
  const { isReview, setIsReview } = props;
  // // 是否為預覽狀態
  // const [isReview, setIsReview] = useState(false);

  return (
    <div className="CourseInsert">
      <div className="CourseInsert-container">
        <ReviewButton isReview={isReview} setIsReview={setIsReview} />
        <header className="CourseInsert-container-header">
          <h2>新增課程</h2>
        </header>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_name"
              className="CourseInsert-container-row-inputCon-title"
            >
              課程名稱
            </label>
            <input
              id="course_name"
              name="course_name"
              value=""
              className="CourseInsert-container-row-inputCon-input"
              type="text"
            />
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="company_name"
              className="CourseInsert-container-row-inputCon-title"
            >
              餐廳名稱
            </label>
            <input
              id="company_name"
              name="company_name"
              value=""
              className="CourseInsert-container-row-inputCon-input"
              type="text"
            />
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="company_address"
              className="CourseInsert-container-row-inputCon-title"
            >
              餐廳地址
            </label>
            <input
              id="company_address"
              name="company_address"
              value=""
              className="CourseInsert-container-row-inputCon-input"
              type="text"
            />
          </div>
        </div>
        <header className="CourseInsert-container-header">
          <h2>課程詳細內容</h2>
        </header>
      </div>
    </div>
  );
};

export default CourseInsert;
