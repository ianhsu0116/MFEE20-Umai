import React from "react";
import { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import sliderBasic from "../../components/images/sliderBasic.png";
import imageBasic from "../../components/images/imageBasic.png";
import ChefCard2 from "../../components/member/ChefCard2";

import CourseHeaderPicture from "./CourseHeaderPicture";
import StarGroup from "./CourseStar";
import CourseCost from "./CourseCost";

import CalendarAvailable from "../../components/CalendarAvailable";

import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";

// 11/28 神奇小圈圈
import CircleBlue from "../../components/images/circle_blue.svg";
import CircleOrange from "../../components/images/circle_orange.svg";

function CourseInfomation(props) {
  const { courseDetail, sliderImage, sixDishesImage, currentUser } = props;
  //課程六圖片
  const [course, setCourse] = useState(0);
  //六標題
  const [courseFoodTitle, setCourseFoodTitle] = useState("");
  const [color, setColor] = useState(
    "Coursedetail-chepBoxInfomation Coursedetail-colorActive"
  );
  const [map, setMap] = useState(false);
  const [batch, setBatch] = useState("尚未選擇");

  // 主廚卡片預設資料
  const [chefInfomation, setChefInfomation] = useState({
    chefIntroduce1: "",
    chefIntroduce2: "Name",
    chefInfoTitle: "",
    chefInfo: ["", "", "", ""],
  });

  window.addEventListener("click", (e) => {
    setMap(false);
  });

  useEffect(() => {
    setCourseFoodTitle(courseDetail.six_dishes[course].dishes_title);

    // 先確認有使用者，且使用者的chef_intro有東西
    if (currentUser && currentUser.chef_introduction) {
      let parsedIntro = JSON.parse(currentUser.chef_introduction);
      setChefInfomation({
        chefIntroduce1: parsedIntro.chefIntroduce1,
        chefIntroduce2: "Name",
        chefInfoTitle: parsedIntro.chefInfoTitle,
        chefInfo: [
          parsedIntro.chefInfo[0],
          parsedIntro.chefInfo[1],
          parsedIntro.chefInfo[2],
          parsedIntro.chefInfo[3],
        ],
      });
    }
  }, []);

  useEffect(() => {
    setColor("Coursedetail-chepBoxInfomation Coursedetail-colorActive");
  }, [color]);

  // 給萬年曆用的(回傳已選定日期)
  const onChange = (e) => {
    setBatch(e);
  };

  let googleMap =
    "https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=" +
    courseDetail.company_address +
    "&z=16&output=embed&t=";

  return (
    <div className="CourseReview">
      <CourseHeaderPicture
        image1={sliderImage[0] || sliderBasic}
        image2={sliderImage[1] || sliderBasic}
        image3={sliderImage[2] || sliderBasic}
      />

      <div className="Coursedetail-set">
        <div className="Coursedetail-container">
          <div className="Coursedetail">
            <div className="Coursedetail-info">
              <div className="Coursedetail-infoRight">
                <div>
                  <span className="Coursedetail-originalPrice">
                    原價NT$
                    {courseDetail.course_price
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
                    {Math.floor(courseDetail.course_price * 0.9)
                      .toString()
                      .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                  </span>
                </div>
                <div className="Coursedetail-quota">
                  <span>
                    本梯次總名額&nbsp;{courseDetail.member_limit}
                    &nbsp;位&nbsp;/&nbsp;剩餘名額&nbsp;
                    {courseDetail.member_limit - courseDetail.member_count}
                    &nbsp;位
                  </span>
                </div>
                <StarGroup
                  Score={courseDetail.course_score}
                  percent={courseDetail.course_percent}
                />
                <div className="Coursedetail-allTime">
                  <span>
                    課程時數&nbsp;:&nbsp;{courseDetail.course_hour}&nbsp;小時
                  </span>
                </div>
                <div className="Coursedetail-iconSvg">
                  <a href={courseDetail.course_fb} alt="">
                    <ImFacebook2 />
                  </a>
                  <a href={courseDetail.course_ig} alt="">
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
                    <li className="Coursedetail-infoLeft-breadcrumb-name">
                      {courseDetail.course_name}
                    </li>
                  </ul>
                </div>
                <div className="Coursedetail-infoLeftTitle">
                  {courseDetail.course_name}
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
                      {courseDetail.company_name}
                      <iframe src={googleMap} alt="" title="這是地圖">
                        地圖
                      </iframe>
                    </li>
                    <li>
                      <a href="#chef" alt="" target="_parent">
                        <GiCook />
                        {courseDetail.course_chef}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="Coursedetail-data">
                  <CalendarAvailable
                    onChange={onChange}
                    availableDays={courseDetail.course_batch}
                    setIsCalendarOpen={setMap}
                  />
                  <div>
                    <p>選擇梯次日期：{batch}</p>
                    <p>{courseDetail.time_of_course}</p>
                  </div>
                </div>
                <div className="Coursedetail-infoLeftJoin">
                  <ul>
                    <li
                      onClick={() => {
                        console.log("加入購物車");
                      }}
                    >
                      加入購物車
                    </li>
                    <li>|</li>
                    <li
                      onClick={() => {
                        console.log("現在報名");
                      }}
                    >
                      現在報名
                    </li>
                    <li>|</li>
                    <li
                      onClick={() => {
                        console.log("現在報名");
                      }}
                    >
                      評論區
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="Coursedetail-shortLine"></div>
            {/* 下面是主廚外標題 */}

            {/* 11/28 神奇小圈圈 */}
            <img
              className="orange2 CourseDecorate_RWD2"
              src={CircleOrange}
              alt=""
            ></img>

            <div className="Coursedetail-outsideTitle">
              {courseDetail.title1_1}
            </div>
            <div className="Coursedetail-infoBox">
              <div className="Coursedetail-insideTitle">
                <span>{courseDetail.title1_2}</span>
              </div>
              <div className="Coursedetail-whiteLine"></div>
              <div className="Coursedetail-insideText">
                {courseDetail.content1.split("\n").map(function (item) {
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
              米其林星級主廚精心準備，絕無冷場
            </div>
            {/* 11/28小圈圈 */}
            <img
              className="blue1 CourseDecorate_RWD3"
              src={CircleBlue}
              alt=""
            ></img>
            <div className="Coursedetail-titleLine"></div>
            <div className="Coursedetail-outsideTitle">
              挑戰舌尖上的味蕾，每一秒的幸福口感
            </div>
            {/* 11/28 */}
            <img
              className="blue2 CourseDecorate_RWD4"
              src={CircleBlue}
              alt=""
            ></img>

            <div className="Coursedetail-chefCardMargin">
              {/* <ChefCard /> */}
              <ChefCard2
                image={currentUser && currentUser.avatar}
                name={
                  currentUser && currentUser.first_name
                    ? currentUser.first_name + " " + currentUser.last_name
                    : "XXX"
                }
                chefInfomation={chefInfomation}
                setChefInfomation={() => {}}
              />
            </div>

            <div className="Coursedetail-infoBox2">
              <div className="Coursedetail-insideTitle Coursedetail-foodInfo">
                {courseDetail.title2}
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
                          courseDetail.six_dishes[0].dishes_title
                        );
                      }}
                    >
                      <img
                        src={sixDishesImage[0] || imageBasic}
                        alt=""
                        className={
                          course === 0
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {courseDetail.six_dishes[0].dishes_title}
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
                          courseDetail.six_dishes[1].dishes_title
                        );
                      }}
                    >
                      <img
                        src={sixDishesImage[1] || imageBasic}
                        alt=""
                        className={
                          course === 1
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {courseDetail.six_dishes[1].dishes_title}
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
                          courseDetail.six_dishes[2].dishes_title
                        );
                      }}
                    >
                      <img
                        src={sixDishesImage[2] || imageBasic}
                        alt=""
                        className={
                          course === 2
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {courseDetail.six_dishes[2].dishes_title}
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
                          courseDetail.six_dishes[3].dishes_title
                        );
                      }}
                    >
                      <img
                        src={sixDishesImage[3] || imageBasic}
                        alt=""
                        className={
                          course === 3
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {courseDetail.six_dishes[3].dishes_title}
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
                          courseDetail.six_dishes[4].dishes_title
                        );
                      }}
                    >
                      <img
                        src={sixDishesImage[4] || imageBasic}
                        alt=""
                        className={
                          course === 4
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {courseDetail.six_dishes[4].dishes_title}
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
                          courseDetail.six_dishes[5].dishes_title
                        );
                      }}
                    >
                      <img
                        src={sixDishesImage[5] || imageBasic}
                        alt=""
                        className={
                          course === 5
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {courseDetail.six_dishes[5].dishes_title}
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
                      {courseDetail.six_dishes[course].dishes_content
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
              content={courseDetail.content2}
              attention={courseDetail.content3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(CourseInfomation);
