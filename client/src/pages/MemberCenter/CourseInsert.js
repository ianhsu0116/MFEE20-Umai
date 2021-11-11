import React, { useState } from "react";
import ReviewButton from "../../components/member/ReviewButton";
import Calendar from "../../components/Calendar";

const CourseInsert = (props) => {
  const { isReview, setIsReview } = props;
  const [courseDetail, setCourseDetail] = useState({
    slider_image1: "slider_image1",
    slider_image2: "slider_image2",
    slider_image3: "slider_image3",
    course_name: "課程名稱",
    company_name: "餐廳名稱",
    company_address: "餐廳地址", // 供google地圖搜尋
    time_of_course: "平日上午10:30 ~ 下午04:00",
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

    // 下方是table內的獨立欄位，不是存在json內
    member_limit: 0,
    course_price: 0,
    course_hour: 0,
    course_level: 1, // 1, 2, 3
    course_category: 1, // 1 ~ 6 代表course_category的id
  });

  // 課程梯次
  const [courseBatch, setCourseBatch] = useState([""]); // 梯次複選問題沒有解決！！！！！！！！！

  // 即時顯示的圖片(二元編碼)
  const [sliderImage1, setSliderImage1] = useState("");
  const [sliderImage2, setSliderImage2] = useState("");
  const [sliderImage3, setSliderImage3] = useState("");

  // 即時抓取input輸入的內容
  const handleCourseChange = (e) => {
    setCourseDetail({ ...courseDetail, [e.target.name]: e.target.value });
  };

  // 即時顯示上傳的Slider image
  const handleSliderChange = (e) => {
    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 4000000) {
        // 將圖裝入，等待送到後端
        setCourseDetail({
          ...courseDetail,
          [e.target.name]: file,
        });

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示
          if (e.target.name === "slider_image1") {
            setSliderImage1(readFile.result);
          } else if (e.target.name === "slider_image2") {
            setSliderImage2(readFile.result);
          } else if (e.target.name === "slider_image3") {
            setSliderImage3(readFile.result);
          }
        });
      } else {
        window.alert("只能上傳圖片歐！(檔案須小於4mb)");
      }
    }
  };

  const handleBatchChange = (batch) => {
    console.log(batch);
  };

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
              value={courseDetail.course_name}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="50"
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
              value={courseDetail.company_name}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="50"
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
              value={courseDetail.company_address}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="70"
            />
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label className="CourseInsert-container-row-inputCon-title">
              Slider圖片
            </label>
            <div className="CourseInsert-container-row-inputCon-sliderImage">
              <label
                htmlFor="slider_image1"
                className="CourseInsert-container-row-inputCon-sliderImage-label"
              >
                <img src={sliderImage1} alt="Slider圖1" />
              </label>
              <input
                id="slider_image1"
                name="slider_image1"
                onChange={handleSliderChange}
                className="CourseInsert-container-row-inputCon-sliderImage-input"
                type="file"
              />
              <label
                htmlFor="slider_image2"
                className="CourseInsert-container-row-inputCon-sliderImage-label"
              >
                <img src={sliderImage2} alt="Slider圖2" />
              </label>
              <input
                id="slider_image2"
                name="slider_image2"
                onChange={handleSliderChange}
                className="CourseInsert-container-row-inputCon-sliderImage-input"
                type="file"
              />
              <label
                htmlFor="slider_image3"
                className="CourseInsert-container-row-inputCon-sliderImage-label"
              >
                <img src={sliderImage3} alt="Slider圖3" />
              </label>
              <input
                id="slider_image3"
                name="slider_image3"
                onChange={handleSliderChange}
                className="CourseInsert-container-row-inputCon-sliderImage-input"
                type="file"
              />
            </div>
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="time_of_course"
              className="CourseInsert-container-row-inputCon-title"
            >
              課程時段(10:00AM ~ 05:00PM)
            </label>
            <input
              id="time_of_course"
              name="time_of_course"
              value={courseDetail.time_of_course}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="50"
            />
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_hour"
              className="CourseInsert-container-row-inputCon-title"
            >
              課程時數(小時)
            </label>
            <input
              id="course_hour"
              name="course_hour"
              value={courseDetail.course_hour}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="number"
              max="48"
              min="0"
            />
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="courseBatch"
              className="CourseInsert-container-row-inputCon-title"
            >
              開課梯次
            </label>
            <Calendar onChange={handleBatchChange} />
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_level"
              className="CourseInsert-container-row-inputCon-title"
            >
              課程難易度
            </label>
            <select
              name="course_level"
              id="course_level"
              onChange={handleCourseChange}
            >
              <option value="1">高階</option>
              <option value="2">中階</option>
              <option value="3">初階</option>
            </select>
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_category"
              className="CourseInsert-container-row-inputCon-title"
            >
              課程分類
            </label>
            <select
              name="course_category"
              id="course_category"
              onChange={handleCourseChange}
              value={courseDetail.course_category}
            >
              <option value="1">日式料理</option>
              <option value="2">韓式料理</option>
              <option value="3">法式料理</option>
              <option value="4">義式料理</option>
              <option value="5">中式料理</option>
              <option value="6">經典飲調</option>
            </select>
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="member_limit"
              className="CourseInsert-container-row-inputCon-title"
            >
              學員上限
            </label>
            <input
              id="member_limit"
              name="member_limit"
              value={courseDetail.member_limit}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="2"
            />
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_price"
              className="CourseInsert-container-row-inputCon-title"
            >
              課程價位
            </label>
            <input
              id="course_price"
              name="course_price"
              value={courseDetail.course_price}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="4"
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
