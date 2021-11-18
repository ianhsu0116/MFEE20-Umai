import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberInfo from "./MemberInfo";
import DefaultStudent from "./DefaultStudent";
import OrderInfo from "./OrderInfo";
import CollectionCourse from "./CollectionCourse";
import CollectionCoupons from "./CollectionCoupons";
import CollectionArticle from "./CollectionArticle";
import CourseInsert from "./CourseInsert";

import CourseInfomation from "./CourseReview";

const MemberCenter = (props) => {
  let { currentUser, setCurrentUser } = props;

  // 確認當前登入狀態
  const history = useHistory();
  useEffect(async () => {
    // 如果當前沒有使用者的話，直接導回首頁
    if (!currentUser) {
      return history.push("/");
    }
  }, []);

  // 紀錄當前正在瀏覽的看板
  const [currentBoard, setCurrentBoard] = useState("會員資訊");

  // 是否為預覽狀態 (給CourseInsert專用)
  const [isReview, setIsReview] = useState(false);

  // 課程新增頁面的課程詳細資料
  const [courseDetail, setCourseDetail] = useState({
    slider_images: ["img_name", "img_name", "img_name"],
    time_of_course: "範例：平日上午10:30 ~ 下午04:00",
    course_ig: "https://www.instagram.com/",
    course_fb: "https://www.facebook.com/",
    title1_1: "課程標題一",
    title1_2: "課程標題ㄧ二",
    content1: "介紹內容1介紹內容1",
    title2: "標題2號(六道菜部分)標題2號(六道菜部分)",
    six_dishes: [
      {
        dishes_image: "img_name",
        dishes_title: "教材標題",
        dishes_content: "請填寫課程教材介紹",
      },
      {
        dishes_image: "img_name",
        dishes_title: "教材標題",
        dishes_content: "請填寫課程教材介紹",
      },
      {
        dishes_image: "img_name",
        dishes_title: "教材標題",
        dishes_content: "請填寫課程教材介紹",
      },
      {
        dishes_image: "img_name",
        dishes_title: "教材標題",
        dishes_content: "請填寫課程教材介紹",
      },
      {
        dishes_image: "img_name",
        dishes_title: "教材標題",
        dishes_content: "請填寫課程教材介紹",
      },
      {
        dishes_image: "img_name",
        dishes_title: "教材標題",
        dishes_content: "請填寫課程教材介紹",
      },
    ],
    content2: "費用包含內容",
    content3: "注意事項說明",

    // 下方是table內的獨立欄位，不是存在json內
    course_image: "", // 課程卡片的首圖 (拿slider的第一張圖來用)
    course_name: "請填寫課程名稱",
    course_price: 2000,
    course_hour: "XX",
    course_level: "1", // 1, 2, 3 (高階 中階 初階)
    member_limit: 30,
    company_name: "請填寫公司名稱",
    company_address: "請填寫公司詳細地址",
    category_id: "1",
    member_id: "1",
    course_batch: [""],

    member_count: 0, //現在人數　　原本沒有我新增的
    course_score: 5, //分數　　　　原本沒有我新增的
    course_percent: 0, //評論人數　 原本沒有我新增的
    course_chef: `${currentUser.first_name} ${currentUser.last_name}`, //主廚名稱　 原本沒有我新增的
  });

  // 課程新增頁面 => 儲存slider上傳的圖片(二元編碼 即時顯示使用)
  const [sliderImage, setSliderImage] = useState(["", "", ""]);

  // 課程新增頁面 => 儲存課程教材(six_dishes)上傳的圖片(二元編碼 即時顯示用)
  const [sixDishesImage, setSixDishesImage] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  return (
    <div className="MemberCenter">
      <div className="MemberCenter-container">
        <MemberSidebar
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        {currentBoard === "會員資訊" && (
          <MemberInfo
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
        {currentBoard === "預設學員" && (
          <DefaultStudent currentUser={currentUser} />
        )}
        {currentBoard === "訂單資訊" && <OrderInfo currentUser={currentUser} />}
        {currentBoard === "收藏課程" && (
          <CollectionCourse currentUser={currentUser} />
        )}
        {currentBoard === "收藏文章" && (
          <CollectionArticle currentUser={currentUser} />
        )}
        {currentBoard === "優惠券" && (
          <CollectionCoupons currentUser={currentUser} />
        )}
        {currentBoard === "新增課程" && (
          <CourseInsert
            isReview={isReview}
            setIsReview={setIsReview}
            currentUser={currentUser}
            courseDetail={courseDetail}
            setCourseDetail={setCourseDetail}
            sliderImage={sliderImage}
            setSliderImage={setSliderImage}
            sixDishesImage={sixDishesImage}
            setSixDishesImage={setSixDishesImage}
          />
        )}

        {/* 課程新增頁面的即時預覽頁面 */}
        {isReview && (
          <CourseInfomation
            courseDetail={courseDetail}
            sliderImage={sliderImage}
            sixDishesImage={sixDishesImage}
          />
        )}
      </div>
    </div>
  );
};

export default MemberCenter;
