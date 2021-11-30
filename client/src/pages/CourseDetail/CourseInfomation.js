import React from "react";
import { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { PUBLIC_URL } from "../../config/config";
import ChefCard from "../../components/ChefCard";

import CourseHeaderPicture from "./CourseHeaderPicture";
import StarGroup from "./CourseStar";
import CourseCost from "./CourseCost";
import CourseRecommend from "./CourseRecommend";

import CalendarAvailable from "../../components/CalendarAvailable";
import CircleBlue from "../../components/images/circle_blue.svg";
import CircleOrange from "../../components/images/circle_orange.svg";

import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";

import CourseService from "../../services/course.service";
import getValidMessage from "../../validMessage/validMessage";

import Join from "../../components/images/JoinPicture.jpg";

function CourseInfomation(props) {
  //簡易判斷詳細課程ID
  const { location } = props;
  //                               /courses/id 從第9位判斷 /courses/1 = id1 /courses/2 = id2 以此類推
  let id_number = location.pathname.slice(9);

  // 抓取課程Json
  const [newCourseJSON, setNewCourseJSON] = useState([
    {
      course_detail: {
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
      },
      chef_introduction: [
        {
          chefInfo: "",
          chefInfoTitle: "",
          chefIntroduce1: "",
        },
      ],
      avatar: "",
      first_name: "",
      last_name: "",

      // 下方是table內的獨立欄位，不是存在json內
      course_name: "", // 課程名稱
      course_price: 0,
      course_hour: 0,
      course_level: "", // 1, 2, 3 (高階 中階 初階)
      member_limit: 0,
      company_name: "", // 餐廳名稱
      company_address: "", // 餐廳地址, 供google地圖搜尋

      // 下方為需要join的資料
      category_id: "", // 1 ~ 6 代表category table的id
      member_id: "",
    },
  ]);

  // 抓取課程JSON
  const [course_batchJSON, setCourse_batchJSON] = useState({});
  // 該梯次目前參加人數
  const [batch_member, setBatch_member] = useState(0);
  // 全部評論給的分數(下面迴圈加)
  const [course_Score, setCourse_Score] = useState(0);
  // 該堂幾人評論
  const [course_Score_member, setCourse_Score_member] = useState(0);

  useEffect(async () => {
    try {
      let result = await CourseService.course_courseId(id_number);
      result.data.course[0].chef_introduction = JSON.parse(
        result.data.course[0].chef_introduction
      );
      result.data.course[0].course_detail = JSON.parse(
        result.data.course[0].course_detail
      );
      console.log(result.data.course_comment[0]);
      setNewCourseJSON(result.data.course);
      setCourse_batchJSON(result.data.course_batch);
      setCourse_Score(result.data.course_comment);
      setCourse_Score_member(result.data.course_comment.length);
      return;
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 現在年月日 用來判斷從後台抓來的日期是否能用
  let nowdate =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    (new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate());
  let course_batch = [];

  for (let i = 0; i < course_batchJSON.length; i++) {
    if (course_batchJSON[i].batch_date > nowdate) {
      course_batch.push(course_batchJSON[i].batch_date);
    }
  }

  //計算分數
  let scoreSum = 0;

  for (let i = 0; i < course_Score_member; i++) {
    scoreSum += course_Score[i].score;
  }

  const [course, setCourse] = useState(0); //課程六圖片
  const [courseFoodTitle, setCourseFoodTitle] = useState(""); //六標題
  const [color, setColor] = useState(
    "Coursedetail-chepBoxInfomation Coursedetail-colorActive"
  );
  const [map, setMap] = useState(false);
  const [batch, setBatch] = useState("尚未選擇");

  window.addEventListener("click", (e) => {
    setMap(false);
  });

  useEffect(() => {
    setCourseFoodTitle(
      newCourseJSON[0].course_detail.six_dishes[course].dishes_title
    );
  }, [newCourseJSON]);

  useEffect(() => {
    setColor("Coursedetail-chepBoxInfomation Coursedetail-colorActive");
  }, [color]);

  // 給萬年曆用的(回傳已選定日期)
  const onChange = (e) => {
    setBatch(e);
    for (let i = 0; i < course_batchJSON.length; i++) {
      if (e == course_batchJSON[i].batch_date) {
        setBatch_member(course_batchJSON[i].member_count);
        console.log(batch_member);
      }
    }
  };
  let googleMap =
    "https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=" +
    newCourseJSON[0].company_address +
    "&z=16&output=embed&t=";

  // const [ ht , setHt]=useState(100)
  // let documentHeight = document.body.scrollHeight;
  // let windowHeight = window.innerHeight;
  // window.addEventListener("scroll", function(){
  //  let scorllPercent = this.scrollY / (documentHeight - windowHeight)
  //  console.log(scorllPercent);
  //  if(scorllPercent >= 0.27 && ht <= 100){
  //    console.log("到一半了")
  //    setHt(200);
  //  }
  // });

  return (
    <>
      {/* {console.log(course_Score)}
      {console.log(course_Score_member)} */}
      {console.log(scoreSum)}
      <CourseHeaderPicture
        image1={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.slider_images[0]}`}
        image2={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.slider_images[1]}`}
        image3={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.slider_images[2]}`}
      />
      <div className="Coursedetail-set">
        <div className="Coursedetail-container">
          <div className="Coursedetail">
            <div className="Coursedetail-info">
              <div className="Coursedetail-infoRight">
                <div>
                  <span className="Coursedetail-originalPrice">
                    原價NT$
                    {newCourseJSON[0].course_price
                      .toString()
                      .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                  </span>
                  <span className="Coursedetail-infoRightPrice">
                    早鳥優惠價
                  </span>
                </div>
                <div>
                  <span className="Coursedetail-specialPrice">
                    NT$
                    {(newCourseJSON[0].course_price * 0.9)
                      .toString()
                      .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                  </span>
                </div>
                <div className="Coursedetail-quota">
                  <span>
                    本梯次總名額&nbsp;{newCourseJSON[0].member_limit}
                    &nbsp;位&nbsp;/&nbsp;剩餘名額&nbsp;
                    {newCourseJSON[0].member_limit - batch_member}
                    &nbsp;位
                  </span>
                </div>
                <StarGroup
                  Score={Math.round((scoreSum / course_Score_member) * 10) / 10}
                  percent={course_Score_member}
                />
                <div className="Coursedetail-allTime">
                  <span>
                    課程時數&nbsp;:&nbsp;{newCourseJSON[0].course_hour}
                    &nbsp;小時
                  </span>
                </div>
                <div className="Coursedetail-iconSvg">
                  <a href={newCourseJSON[0].course_detail.course_fb} alt="">
                    <ImFacebook2 />
                  </a>
                  <a href={newCourseJSON[0].course_detail.course_ig} alt="">
                    <GrInstagram />
                  </a>
                </div>
              </div>

              <div className="Coursedetail-infoLeft">
                <div className="Coursedetail-infoLeft-breadcrumb">
                  <ul>
                    <li>
                      <Link to="/">首頁</Link>
                    </li>
                    <li>{">"}</li>
                    <li>
                      <Link to="/course">課程探索</Link>
                    </li>
                    <li>{">"}</li>
                    <li className="Coursedetail-infoLeft-breadcrumb-name Coursedetail-mapClose">
                      {newCourseJSON[0].course_name}
                    </li>
                  </ul>
                </div>
                <div className="Coursedetail-infoLeftTitle" id="batch">
                  {newCourseJSON[0].course_name}
                </div>
                <div className="Coursedetail-placeWithChef">
                  <ul>
                    <li
                      className={
                        map === true
                          ? "Coursedetail-infoLeftPlace Coursedetail-mapClose"
                          : "Coursedetail-infoLeftPlace"
                      }
                    >
                      <IoLocationSharp />
                      {newCourseJSON[0].company_name}
                      <iframe src={googleMap} alt="" title="這是地圖">
                        地圖
                      </iframe>
                    </li>
                    <li>
                      <a href="#chef" alt="" target="_parent">
                        <GiCook />
                        {newCourseJSON[0].first_name +
                          " " +
                          newCourseJSON[0].last_name}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="Coursedetail-data">
                  <CalendarAvailable
                    onChange={onChange}
                    availableDays={course_batch}
                    setIsCalendarOpen={setMap}
                  />
                  <div>
                    <p>選擇梯次日期：{batch}</p>
                    <p>{newCourseJSON[0].course_detail.time_of_course}</p>
                  </div>
                </div>
                <div className="Coursedetail-infoLeftJoin">
                  <ul>
                    <li
                      onClick={() => {
                        if (batch === "尚未選擇") {
                          alert("請先選擇梯次日期後再點擊");
                        }
                      }}
                    >
                      加入購物車
                    </li>
                    <li>|</li>
                    <li
                      onClick={() => {
                        if (batch === "尚未選擇") {
                          alert("請先選擇梯次日期後再點擊");
                        }
                      }}
                    >
                      現在報名
                    </li>
                    <li>|</li>
                    <li onClick={() => {}}>評論區</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="Coursedetail-shortLine"></div>
            {/* 下面是主廚外標題 */}

            <img
              className="orange2 CourseDecorate_RWD2"
              src={CircleOrange}
              alt=""
            ></img>

            <div className="Coursedetail-outsideTitle">
              {newCourseJSON[0].course_detail.title1_1}
            </div>
            <div className="Coursedetail-infoBox">
              <div className="Coursedetail-insideTitle">
                <span>{newCourseJSON[0].course_detail.title1_2}</span>
              </div>
              <div className="Coursedetail-whiteLine"></div>
              <div className="Coursedetail-insideText">
                {newCourseJSON[0].course_detail.content1
                  .split("\n")
                  .map(function (item) {
                    return (
                      <div>
                        {item}
                        <br />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="Coursedetail-outsideTitle" id="chef">
              米其林一星主廚精心準備，絕無冷場
            </div>
            <img
              className="blue1 CourseDecorate_RWD3"
              src={CircleBlue}
              alt=""
            ></img>
            <div className="Coursedetail-titleLine"></div>
            <div className="Coursedetail-outsideTitle">
              挑戰舌尖上的味蕾，每一秒的幸福口感
            </div>

            {/* <img className="blue2 CourseDecorate_RWD4" src={CircleBlue} alt=""></img>       */}

            <div className="Coursedetail-chefCardMargin">
              <ChefCard
                chefIntroduce1={
                  newCourseJSON[0].chef_introduction.chefIntroduce1
                }
                chefInfoTitle={newCourseJSON[0].chef_introduction.chefInfoTitle}
                chefInfo={newCourseJSON[0].chef_introduction.chefInfo}
                chefFirstName={newCourseJSON[0].first_name}
                chefLastName={newCourseJSON[0].last_name}
                avatar={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].avatar}`}
              />
            </div>

            <div className="Coursedetail-infoBox2">
              <div className="Coursedetail-insideTitle Coursedetail-foodInfo">
                {newCourseJSON[0].course_detail.title2}
              </div>
              <div className="Coursedetail-whiteLine"></div>
              <div className="Coursedetail-pictureBox">
                <div className="Coursedetail-sixPictureTextBox_1">
                  <ul>
                    <li
                      onClick={() => {
                        setColor("Coursedetail-chepBoxInfomation");
                        setCourse(0);
                        setCourseFoodTitle(
                          newCourseJSON[0].course_detail.six_dishes[0]
                            .dishes_title
                        );
                      }}
                    >
                      <img
                        src={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.six_dishes[0].dishes_image}`}
                        alt=""
                        className={
                          course === 0
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {
                          newCourseJSON[0].course_detail.six_dishes[0]
                            .dishes_title
                        }
                      </span>
                      <span className="Coursedetail-sixPictureTitleMask"></span>
                      <sapn
                        className={
                          course === 0 ? "Coursedetail-activeBottom" : ""
                        }
                      ></sapn>
                    </li>
                    <li
                      onClick={() => {
                        setColor("Coursedetail-chepBoxInfomation");
                        setCourse(1);
                        setCourseFoodTitle(
                          newCourseJSON[0].course_detail.six_dishes[1]
                            .dishes_title
                        );
                      }}
                    >
                      <img
                        src={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.six_dishes[1].dishes_image}`}
                        alt=""
                        className={
                          course === 1
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {
                          newCourseJSON[0].course_detail.six_dishes[1]
                            .dishes_title
                        }
                      </span>
                      <span className="Coursedetail-sixPictureTitleMask"></span>
                      <sapn
                        className={
                          course === 1 ? "Coursedetail-activeBottom" : ""
                        }
                      ></sapn>
                    </li>
                    <li
                      onClick={() => {
                        setColor("Coursedetail-chepBoxInfomation");
                        setCourse(2);
                        setCourseFoodTitle(
                          newCourseJSON[0].course_detail.six_dishes[2]
                            .dishes_title
                        );
                      }}
                    >
                      <img
                        src={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.six_dishes[2].dishes_image}`}
                        alt=""
                        className={
                          course === 2
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {
                          newCourseJSON[0].course_detail.six_dishes[2]
                            .dishes_title
                        }
                      </span>
                      <span className="Coursedetail-sixPictureTitleMask"></span>
                      <sapn
                        className={
                          course === 2 ? "Coursedetail-activeBottom" : ""
                        }
                      ></sapn>
                    </li>
                  </ul>
                  <ul>
                    <li
                      onClick={() => {
                        setColor("Coursedetail-chepBoxInfomation");
                        setCourse(3);
                        setCourseFoodTitle(
                          newCourseJSON[0].course_detail.six_dishes[3]
                            .dishes_title
                        );
                      }}
                    >
                      <img
                        src={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.six_dishes[3].dishes_image}`}
                        alt=""
                        className={
                          course === 3
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {
                          newCourseJSON[0].course_detail.six_dishes[3]
                            .dishes_title
                        }
                      </span>
                      <span className="Coursedetail-sixPictureTitleMask"></span>
                      <sapn
                        className={
                          course === 3 ? "Coursedetail-activeBottom" : ""
                        }
                      ></sapn>
                    </li>
                    <li
                      onClick={() => {
                        setColor("Coursedetail-chepBoxInfomation");
                        setCourse(4);
                        setCourseFoodTitle(
                          newCourseJSON[0].course_detail.six_dishes[4]
                            .dishes_title
                        );
                      }}
                    >
                      <img
                        src={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.six_dishes[4].dishes_image}`}
                        alt=""
                        className={
                          course === 4
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {
                          newCourseJSON[0].course_detail.six_dishes[4]
                            .dishes_title
                        }
                      </span>
                      <span className="Coursedetail-sixPictureTitleMask"></span>
                      <sapn
                        className={
                          course === 4 ? "Coursedetail-activeBottom" : ""
                        }
                      ></sapn>
                    </li>
                    <li
                      onClick={() => {
                        setColor("Coursedetail-chepBoxInfomation");
                        setCourse(5);
                        setCourseFoodTitle(
                          newCourseJSON[0].course_detail.six_dishes[5]
                            .dishes_title
                        );
                      }}
                    >
                      <img
                        src={`${PUBLIC_URL}/upload-images/${newCourseJSON[0].course_detail.six_dishes[5].dishes_image}`}
                        alt=""
                        className={
                          course === 5
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {
                          newCourseJSON[0].course_detail.six_dishes[5]
                            .dishes_title
                        }
                      </span>
                      <span className="Coursedetail-sixPictureTitleMask"></span>
                      <sapn
                        className={
                          course === 5 ? "Coursedetail-activeBottom" : ""
                        }
                      ></sapn>
                    </li>
                  </ul>
                </div>

                <div className="Coursedetail-chepBoxTextWidth">
                  <div className="Coursedetail-chepBox">
                    Chapter{course + 1}
                  </div>
                  <div className="Coursedetail-chepBoxTitle">
                    {courseFoodTitle}
                    <div className={color}>
                      {newCourseJSON[0].course_detail.six_dishes[
                        course
                      ].dishes_content
                        .split("\n")
                        .map(function (item) {
                          return (
                            <div>
                              {item}
                              <br />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CourseCost
              content={newCourseJSON[0].course_detail.content2}
              attention={newCourseJSON[0].course_detail.content3}
            />
            {/* <img className="orange3 CourseDecorate_RWD6" src={CircleOrange} alt=""></img>  */}
            <img
              className="orange4 CourseDecorate_RWD7"
              src={CircleOrange}
              alt=""
            ></img>
            <div className="Coursedetail-outsideTitle">推薦課程</div>
            <div className="Coursedetail-titleLine"></div>
            <CourseRecommend />

            <div className="Coursedetail-join">
              <span>
                <p className="Coursedetail-joinTitle">立即報名</p>
                <div className="Coursedetail-joinLineWidth">
                  <div className="Coursedetail-joinLine"></div>
                </div>
                <p>喜歡這堂課嗎?</p>
                <p>歡迎加入我們</p>
                <p>成為Umai的一員</p>
                <p>讓我們帶您前往美食的世界</p>
                <p
                  className="Coursedetail-joinNow"
                  onClick={() => {
                    if (batch === "尚未選擇") {
                      window.location.href = "#batch";
                      alert("請先選擇梯次日期後再點擊");
                    }
                  }}
                >
                  點擊我立即加入！
                </p>
              </span>
              <img src={Join} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      {/* </div>   */}
    </>
  );
}
export default withRouter(CourseInfomation);
