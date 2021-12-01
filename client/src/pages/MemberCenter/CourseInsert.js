import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CourseService from "../../services/course.service";
import getValidMessage from "../../validMessage/validMessage";
import ReviewButton from "../../components/member/ReviewButton";
import CalendarMulti from "../../components/CalendarMulti";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import { FaPen } from "react-icons/fa";

// 給下方的兩個map使用（因 label 對應的 id 值不能相同，故 id 的值用下列這些來代替）
let sixDishesArray = [11, 22, 33, 44, 55, 66];
let sliderArray = [111, 222, 333];

// 送出資料前 "錯誤判斷時"，需判斷的欄位
let validCheckArray = [
  "slider_images",
  "time_of_course",
  "course_ig",
  "course_fb",
  "title1_1",
  "title1_2",
  "content1",
  "title2",
  "six_dishes",
  "content2",
  "content3",
  "course_name",
  "course_price",
  "course_hour",
  "course_level",
  "member_limit",
  "company_name",
  "company_address",
  "category_id",
  "course_batch",
];

const CourseInsert = (props) => {
  const {
    isReview,
    setIsReview,
    currentUser,
    courseDetail,
    setCourseDetail,
    sliderImage,
    setSliderImage,
    sixDishesImage,
    setSixDishesImage,
    setCurrentBoard,
  } = props;

  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");

  // 課程的詳細資料 以及 JSON格式
  const [courseDetailCopy, setCourseDetailCopy] = useState({
    slider_images: ["img_name", "img_name", "img_name"], // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
    time_of_course: "", // 平日上午10:30 ~ 下午04:00
    course_ig: "https://www.instagram.com/",
    course_fb: "https://www.facebook.com/",
    title1_1: "", // 標題1-1號
    title1_2: "", // 標題1-2號
    content1: "", // 介紹內容1
    title2: "", // 標題2號(六道菜部分)
    six_dishes: [
      // 課程六道菜的圖+文
      {
        dishes_image: "img_name", // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
        dishes_title: "", // 菜色標題
        dishes_content: "", // 菜色介紹
      },
      {
        dishes_image: "img_name", // 圖片名稱
        dishes_title: "", // 菜色標題
        dishes_content: "", // 菜色介紹
      },
      {
        dishes_image: "img_name", // 圖片名稱
        dishes_title: "", // 菜色標題
        dishes_content: "", // 菜色介紹
      },
      {
        dishes_image: "img_name", // 圖片名稱
        dishes_title: "", // 菜色標題
        dishes_content: "", // 菜色介紹
      },
      {
        dishes_image: "img_name", // 圖片名稱
        dishes_title: "", // 菜色標題
        dishes_content: "", // 菜色介紹
      },
      {
        dishes_image: "img_name", // 圖片名稱
        dishes_title: "", // 菜色標題
        dishes_content: "", // 菜色介紹
      },
    ],
    content2: "", // 費用包含內容
    content3: "", // 注意事項說明

    // 下方是table內的獨立欄位，不是存在json內
    course_image: "", // 課程卡片的首圖 (拿slider的第一張圖來用)
    course_name: "", // 課程名稱
    course_price: 0,
    course_hour: 0,
    course_level: "1", // 1, 2, 3 (高階 中階 初階)
    member_limit: 0,
    company_name: "", // 餐廳名稱
    company_address: "", // 餐廳地址, 供google地圖搜尋

    // 下方為需要join的資料
    category_id: "1", // 1 ~ 6 代表category table的id
    member_id: "0001",

    // 各個梯次實際上是存在 batch table 內 這裡是要將資料送進去時的樣子
    course_batch: [""], // 原本會存著各個梯次日期，到後端後再跑回圈將各個梯次 insert into 梯次的 table 內; ["2021-11-23", "2021-11-24", "2021-11-25"]
  });

  // 先判斷當前登入的 User 是否已填寫主廚卡片
  // 還沒填寫的話就把他導回去卡片頁面
  useEffect(() => {
    // 沒有內容
    if (!currentUser.chef_introduction) {
      // 跳通知
      Swal.fire({
        icon: "warning",
        title: "請先填寫主廚卡片後，才能新增課程！",
        showConfirmButton: false,
        timer: 1500,
      });

      // 導回去卡片編輯頁面
      setCurrentBoard("主廚卡片");
    }

    // 有內容但內容為空
    if (currentUser.chef_introduction) {
      let { chefIntroduce1, chefIntroduce2, chefInfoTitle, chefInfo } =
        JSON.parse(currentUser.chef_introduction);
      if (!chefIntroduce1 || !chefIntroduce2 || !chefInfoTitle || !chefInfo) {
        // 跳通知
        Swal.fire({
          icon: "warning",
          title: "請先填寫主廚卡片後，才能新增課程！",
          showConfirmButton: false,
          timer: 1500,
        });

        // 導回去卡片編輯頁面
        setCurrentBoard("主廚卡片");
      }
    }
  }, []);

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
    let inputIndex = e.target.dataset.index;

    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 4000000) {
        // 將圖裝入，等待送到後端
        let newCourseDetail = { ...courseDetail };
        newCourseDetail["slider_images"][inputIndex] = file;
        setCourseDetail(newCourseDetail);

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示

          let newSliderImage = [...sliderImage];
          newSliderImage[inputIndex] = readFile.result;
          setSliderImage(newSliderImage);
        });
      } else {
        // 跳通知
        Swal.fire({
          icon: "warning",
          title: "只能上傳圖片歐！(檔案須小於4mb)",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  // 即時顯示six_dishes圖片上傳
  const handleSixDishesImageChange = (e) => {
    let inputIndex = e.target.dataset.index;

    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 2500000) {
        // 將圖裝入courseDetail，等待送到後端
        let newCourseDetail = { ...courseDetail };
        newCourseDetail["six_dishes"][inputIndex]["dishes_image"] = file;
        setCourseDetail(newCourseDetail);

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示
          let newSixImage = [...sixDishesImage];
          newSixImage[inputIndex] = readFile.result;
          setSixDishesImage(newSixImage);
        });
      } else {
        // 跳通知
        Swal.fire({
          icon: "warning",
          title: "只能上傳圖片歐！(檔案須小於2.5mb)",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  // 課程梯次
  const handleBatchChange = (batch) => {
    // console.log(batch);
    setCourseDetail({ ...courseDetail, course_batch: batch });
  };

  // 送出課程資料
  const handleCourseInsert = async (e) => {
    // 錯誤判斷 (非圖片類別的所有欄位)
    let isError = false;
    validCheckArray.forEach((item) => {
      if (!courseDetail[item]) {
        isError = true;
      } else if (courseDetail.course_batch.length === 0) {
        isError = true;
      }
    });

    // 圖片部分錯誤判斷
    sliderImage.forEach((item) => {
      if (!item) {
        isError = true;
      }
    });
    sixDishesImage.forEach((item) => {
      if (!item) {
        isError = true;
      }
    });
    if (isError) return setErrorMsg("請確認每個欄位都填寫完畢再提交！");

    // 沒有valid，送出資料至後端
    try {
      let result = await CourseService.courseInsert(courseDetail);

      // 清空當前所有input
      setCourseDetail(courseDetailCopy);
      setSliderImage(["", "", ""]);
      setSixDishesImage(["", "", "", "", "", ""]);

      // 清空錯誤訊息
      setErrorMsg("");

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "課程資料新增成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("course", code));
    }
  };

  return (
    <div className="CourseInsert">
      <div className="CourseInsert-container">
        <ReviewButton isReview={isReview} setIsReview={setIsReview} />
        <header className="CourseInsert-container-header">
          <h2>新增課程</h2>
        </header>
        <div className="CourseInsert-container-group">
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
                placeholder="最精緻的三星級牛排課程..."
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
                placeholder="XX米其林餐廳..."
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
                placeholder="台北市中山區..."
              />
            </div>
          </div>
          <div className="CourseInsert-container-row">
            <div className="CourseInsert-container-row-inputCon">
              <label className="CourseInsert-container-row-inputCon-label">
                幻燈片圖片(Slider)
              </label>
              <div className="CourseInsert-container-row-inputCon-sliderImage">
                {sliderArray.map((item, index) => (
                  <>
                    <label
                      htmlFor={item}
                      className="CourseInsert-container-row-inputCon-sliderImage-label"
                    >
                      {sliderImage[index] ? (
                        <img src={sliderImage[index]} alt="Slider圖片預覽" />
                      ) : (
                        <FaPen />
                      )}
                    </label>
                    <input
                      id={item}
                      data-index={index}
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
                placeholder="上午10:00 ~ 下午04:00..."
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
                max="24"
                min="1"
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
              <CalendarMulti onChange={handleBatchChange} />
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
                className="CourseInsert-container-row-inputCon-input"
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
                htmlFor="category_id"
                className="CourseInsert-container-row-inputCon-label"
              >
                課程分類
              </label>
              <select
                name="category_id"
                id="category_id"
                className="CourseInsert-container-row-inputCon-input"
                onChange={handleCourseChange}
                value={courseDetail.category_id}
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
                學員上限(Max:99)
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
                課程價位(Max:9999)
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
                placeholder="https://www....."
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
                placeholder="https://www....."
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
                maxLength="ˇ30"
                placeholder="信じられない！とても美味しい！..."
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
                maxLength="30"
                placeholder="最驚艷的日式料理，入口彷如人就在日本北海道..."
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
                maxLength="380"
                placeholder="信じられない！とても美味しい！..."
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
                placeholder="精選六道最經典的日式傳統料理..."
              />
            </div>
          </div>
          <div className="CourseInsert-container-row">
            <div className="CourseInsert-container-row-inputCon">
              <label className="CourseInsert-container-row-inputCon-label">
                課程教材圖文內容
              </label>
              {sixDishesArray.map((item, index) => (
                <div
                  key={index}
                  className="CourseInsert-container-row-inputCon-sixDishes"
                >
                  <label
                    htmlFor={item}
                    className="CourseInsert-container-row-inputCon-sixDishes-label"
                  >
                    {sixDishesImage[index] ? (
                      <img src={sixDishesImage[index]} alt="sixImage圖片預覽" />
                    ) : (
                      <FaPen />
                    )}
                  </label>
                  <input
                    id={item}
                    data-index={index}
                    name="dishes_image"
                    onChange={handleSixDishesImageChange}
                    className="CourseInsert-container-row-inputCon-sixDishes-input"
                    type="file"
                  />

                  <div className="CourseInsert-container-row-inputCon-sixDishes-right">
                    <input
                      type="text"
                      name="dishes_title"
                      id={index}
                      onChange={handleCourseChange}
                      value={courseDetail.six_dishes[index].dishes_title}
                      placeholder="課程教材名稱..."
                      maxLength="10"
                    />
                    <textarea
                      name="dishes_content"
                      id={index}
                      cols="10"
                      rows="7"
                      onChange={handleCourseChange}
                      value={courseDetail.six_dishes[index].dishes_content}
                      placeholder="課程教材詳細介紹..."
                      maxLength="200"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="CourseInsert-container-row">
            <div className="CourseInsert-container-row-inputCon">
              <label
                htmlFor="content1"
                className="CourseInsert-container-row-inputCon-label"
              >
                費用包含介紹
              </label>
              <textarea
                name="content2"
                id="content2"
                cols="30"
                rows="7"
                value={courseDetail.content2}
                onChange={handleCourseChange}
                maxLength="340"
                placeholder="請條列式述敘..."
              ></textarea>
            </div>
          </div>
          <div className="CourseInsert-container-row">
            <div className="CourseInsert-container-row-inputCon">
              <label
                htmlFor="content3"
                className="CourseInsert-container-row-inputCon-label"
              >
                注意事項說明
              </label>
              <textarea
                name="content3"
                id="content3"
                cols="30"
                rows="7"
                value={courseDetail.content3}
                onChange={handleCourseChange}
                maxLength="340"
                placeholder="請條著名此課程需要注意的事宜..."
              ></textarea>
            </div>
          </div>

          {/* 錯誤訊息提示 */}
          {errorMsg && <ErrorMessage value={errorMsg} />}
          <div className="CourseInsert-container-btnCon">
            <Button
              value={"新增課程"}
              className={"button-themeColor"}
              onClick={handleCourseInsert}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInsert;
