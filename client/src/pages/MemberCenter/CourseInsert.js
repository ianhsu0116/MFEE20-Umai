import React, { useState } from "react";
import ReviewButton from "../../components/member/ReviewButton";
import Calendar from "../../components/Calendar";

const CourseInsert = (props) => {
  const { isReview, setIsReview } = props;
  const [courseDetail, setCourseDetail] = useState({
    slider_image1: "slider_image1",
    slider_image2: "slider_image2",
    slider_image3: "slider_image3",
    slider_images: [
      "slider_image_name",
      "slider_image_name",
      "slider_image_name",
    ],
    course_name: "課程名稱",
    company_name: "餐廳名稱",
    company_address: "餐廳地址", // 供google地圖搜尋
    time_of_course: "平日上午10:30 ~ 下午04:00",
    course_ig: "https://www.instagram.com/",
    course_fb: "https://www.facebook.com/",
    title1_1: "標題1-1號",
    title1_2: "標題1-2號",
    content1: "介紹內容一",
    title2: "標題2號(六道菜部分)",
    six_dishes: [
      // 課程六道菜的圖+文
      {
        dishes_image: "image_name0",
        dishes_title: "菜色標題",
        dishes_content: "菜色介紹",
      },
      {
        dishes_image: "image_name1",
        dishes_title: "菜色標題",
        dishes_content: "菜色介紹",
      },
      {
        dishes_image: "image_name2",
        dishes_title: "菜色標題",
        dishes_content: "菜色介紹",
      },
      {
        dishes_image: "image_name3",
        dishes_title: "菜色標題",
        dishes_content: "菜色介紹",
      },
      {
        dishes_image: "image_name4",
        dishes_title: "菜色標題",
        dishes_content: "菜色介紹",
      },
      {
        dishes_image: "image_name5",
        dishes_title: "菜色標題",
        dishes_content: "菜色介紹",
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

  // 即時顯示slider上傳的圖片(二元編碼)
  const [sliderImage, setSliderImage] = useState(["", "", ""]);

  // 即時顯示課程教材(six_dishes)上傳的圖片(二元編碼)
  const [sixDishesImage, setSixDishesImage] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // 即時抓取input輸入的內容
  const handleCourseChange = (e) => {
    let inputId = e.target.id;
    let inputName = e.target.name;
    let inputValue = e.target.value;

    // 如果是six_dishes的event / 以及一般情況
    if (inputName === "dishes_title" || inputName === "dishes_content") {
      let newCourseDetail = { ...courseDetail };
      newCourseDetail["six_dishes"][inputId][inputName] = inputValue;
      setCourseDetail(newCourseDetail);
    } else {
      setCourseDetail({ ...courseDetail, [inputName]: inputValue });
    }
  };

  // 即時顯示上傳的Slider image
  const handleSliderChange = (e) => {
    let inputId = e.target.id;
    let inputName = e.target.name;

    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 4000000) {
        // 將圖裝入，等待送到後端
        let newCourseDetail = { ...courseDetail };
        newCourseDetail["slider_images"][inputId] = file;
        setCourseDetail(newCourseDetail);

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示

          let newSliderImage = [...sliderImage];
          newSliderImage[inputId] = readFile.result;
          setSliderImage(newSliderImage);
        });
      } else {
        window.alert("只能上傳圖片歐！(檔案須小於4mb)");
      }
    }
  };

  // 即時顯示six_dishes圖片上傳
  const handleSixDishesImageChange = (e) => {
    let inputId = e.target.id;
    console.log(inputId);

    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 2500000) {
        // 將圖裝入courseDetail，等待送到後端
        let newCourseDetail = { ...courseDetail };
        newCourseDetail["six_dishes"][inputId]["dishes_image"] = file;
        setCourseDetail(newCourseDetail);

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示
          let newSixImage = [...sixDishesImage];
          newSixImage[inputId] = readFile.result;
          setSixDishesImage(newSixImage);
        });
      } else {
        window.alert("只能上傳圖片歐！(檔案須小於2.5mb)");
      }
    }
  };

  // 課程梯次
  const [courseBatch, setCourseBatch] = useState([""]); // 梯次複選問題沒有解決！！！！！！！！！
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
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
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
            <label className="CourseInsert-container-row-inputCon-label">
              Slider圖片
            </label>
            <div className="CourseInsert-container-row-inputCon-sliderImage">
              {new Array(3).fill(1).map((item, index) => (
                <>
                  <label
                    key={index}
                    htmlFor={index}
                    className="CourseInsert-container-row-inputCon-sliderImage-label"
                  >
                    <img src={sliderImage[index]} alt="Slider圖片預覽" />
                  </label>
                  <input
                    id={index}
                    name="slider_image"
                    onChange={handleSliderChange}
                    className="CourseInsert-container-row-inputCon-sliderImage-input"
                    type="file"
                  />
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="time_of_course"
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
            >
              開課梯次
            </label>
            <Calendar onChange={handleBatchChange} />
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_level"
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
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
              className="CourseInsert-container-row-inputCon-label"
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
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_ig"
              className="CourseInsert-container-row-inputCon-label"
            >
              Instagram連結
            </label>
            <input
              id="course_ig"
              name="course_ig"
              value={courseDetail.course_ig}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="100"
            />
          </div>
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="course_fb"
              className="CourseInsert-container-row-inputCon-label"
            >
              Facebook連結
            </label>
            <input
              id="course_fb"
              name="course_fb"
              value={courseDetail.course_fb}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="100"
            />
          </div>
        </div>
        <br />
        <header className="CourseInsert-container-header">
          <h2>課程詳細內容</h2>
        </header>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="title1_1"
              className="CourseInsert-container-row-inputCon-label"
            >
              標題1｜課程介紹區 - 1
            </label>
            <input
              id="title1_1"
              name="title1_1"
              value={courseDetail.title1_1}
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
              htmlFor="title1_2"
              className="CourseInsert-container-row-inputCon-label"
            >
              標題2｜課程介紹區 - 1
            </label>
            <input
              id="title1_2"
              name="title1_2"
              value={courseDetail.title1_2}
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
              htmlFor="content1"
              className="CourseInsert-container-row-inputCon-label"
            >
              內文｜課程介紹區 - 1
            </label>
            <textarea
              name="content1"
              id="content1"
              cols="30"
              rows="10"
              value={courseDetail.content1}
              onChange={handleCourseChange}
              maxLength="340"
            ></textarea>
          </div>
        </div>
        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label
              htmlFor="title2"
              className="CourseInsert-container-row-inputCon-label"
            >
              標題｜教材內容介紹區
            </label>
            <input
              id="title2"
              name="title2"
              value={courseDetail.title2}
              onChange={handleCourseChange}
              className="CourseInsert-container-row-inputCon-input"
              type="text"
              maxLength="50"
            />
          </div>
        </div>

        <div className="CourseInsert-container-row">
          <div className="CourseInsert-container-row-inputCon">
            <label className="CourseInsert-container-row-inputCon-label">
              課程教材圖文內容
            </label>
            {courseDetail.six_dishes.map((item, index) => (
              <div
                key={index}
                className="CourseInsert-container-row-inputCon-sixDishes"
              >
                <label
                  htmlFor={index}
                  className="CourseInsert-container-row-inputCon-sixDishes-label"
                >
                  <img src={sixDishesImage[index]} alt="sixImage圖片預覽" />
                </label>
                <input
                  id={index}
                  name="dishes_image"
                  onChange={handleSixDishesImageChange}
                  className="CourseInsert-container-row-inputCon-sixDishes-input"
                  type="file"
                />

                <div className="CourseInsert-container-row-inputCon-sixDishes-right">
                  <input
                    type="text"
                    placeholder="教材名稱"
                    name="dishes_title"
                    id={index}
                    onChange={handleCourseChange}
                    value={courseDetail.six_dishes[index].dishes_title}
                  />
                  <textarea
                    name="dishes_content"
                    id={index}
                    cols="10"
                    rows="7"
                    onChange={handleCourseChange}
                    value={courseDetail.six_dishes[index].dishes_content}
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInsert;
