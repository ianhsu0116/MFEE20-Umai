import React from "react";
import { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
// import '../../components/CourseDetailed.css'
import Chef from "../../components/images/test/pexels-chef1.jpg";
import Food1 from "../../components/images/test/istock泡菜課程.jpg";
import Food2 from "../../components/images/test/istock紫菜包飯.jpg";
import Food3 from "../../components/images/test/istock辣海鮮.jpg";
import Food4 from "../../components/images/test/istock韓風課程.jpg";
import Food5 from "../../components/images/test/photoAC炸醬麵.jpg";
import Food6 from "../../components/images/test/photoAC石鍋拌飯.jpg";
import ChefCard from "../../components/ChefCard";

import CourseHeaderPicture from "./CourseHeaderPicture";
import StarGroup from "./CourseStar";
import CourseCost from "./CourseCost";
import CourseRecommend from "./CourseRecommend";

import CalendarAvailable from "../../components/CalendarAvailable";

import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { Alert } from "react-bootstrap";

function CourseInfomation(props) {
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
    setCourseFoodTitle(newCourseJSON.six_dishes[course].dishes_title);
  }, []);

  useEffect(() => {
    setColor("Coursedetail-chepBoxInfomation Coursedetail-colorActive");
  }, [color]);

  // 給萬年曆用的(回傳已選定日期)
  const onChange = (e) => {
    console.log(e);
    setBatch(e);
    //之後我會加個判斷，現在會預設是今天的日期
  };

  const newCourseJSON = {
    slider_images: [Food1, Food2, Food3], // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
    time_of_course: "平日上午10:30 ~ 下午04:00", // 平日上午10:30 ~ 下午04:00
    course_ig: "https://www.instagram.com/",
    course_fb: "https://www.facebook.com/",
    title1_1: "信じられない！とても美味しい", // 標題1-1號
    title1_2: "最想念的日式料理！每口都是懷念", // 標題1-2號
    content1:
      "「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。\n 「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。\n「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。", // 介紹內容1
    title2: "美味料理，色香味俱全", // 標題2號(六道菜部分)
    six_dishes: [
      // 課程六道菜的圖+文
      {
        dishes_image: Food1, // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
        dishes_title: "泡菜", // 菜色標題
        dishes_content:
          "辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。\n 換行測試辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。", // 菜色介紹
      },
      {
        dishes_image: Food2, // 圖片名稱
        dishes_title: "紫菜包飯", // 菜色標題
        dishes_content:
          "紫菜卷是一種流行的朝鮮食品，是將蒸熟的白米飯和各種其他材料卷進紫菜中，再切成一塊塊供應。海苔飯捲通常在野餐或戶外活動時吃，或作為簡便的午餐，佐以蘿蔔乾或泡菜。 朝鮮日治時期，日本的卷壽司傳入朝鮮半島。朝鮮人在日本壽司的基礎上發展出海苔飯捲。", // 菜色介紹
      },
      {
        dishes_image: Food3, // 圖片名稱
        dishes_title: "辣海鮮", // 菜色標題
        dishes_content: "辣海鮮", // 菜色介紹
      },
      {
        dishes_image: Food4, // 圖片名稱
        dishes_title: "拌飯", // 菜色標題
        dishes_content: "拌飯", // 菜色介紹
      },
      {
        dishes_image: Food5, // 圖片名稱
        dishes_title: "炸醬麵", // 菜色標題
        dishes_content: "炸醬麵", // 菜色介紹
      },
      {
        dishes_image: Food6, // 圖片名稱
        dishes_title: "石鍋拌飯", // 菜色標題
        dishes_content: "石鍋拌飯", // 菜色介紹
      },
    ],
    content2:
      "最好設定10個字上限 \n 最好不要打符號 \n 香蕉 \n 拔辣 \n 荔枝 \n 火龍果 \n 葡萄\n 草莓\n 蘋果 \n 西瓜 \n 拔辣 \n 拔辣 \n 荔枝 \n 火龍果 \n 葡萄\n 草莓", // 費用包含內容
    content3:
      "最少上課人數5人，當參加人數未達上述規定的最少上課人數時，將取消課程形成，於課前5天前發出取消課程簡訊", // 注意事項說明

    // 下方是table內的獨立欄位，不是存在json內

    course_price: 5000,
    member_limit: 50,
    member_count: 12, //現在人數　　原本沒有我新增的
    course_score: 4.3, //分數　　　　原本沒有我新增的
    course_percent: 200, //評論人數　 原本沒有我新增的
    course_hour: 8,
    course_level: "1", // 1, 2, 3 (高階 中階 初階)
    company_name: "日本東京築地名店", // 餐廳名稱
    // https://dotblogs.com.tw/shadow/2011/02/18/21442　之後google 我應該會照這網站弄
    company_address: "國立中央大學依仁堂", // 餐廳地址, 供google地圖搜尋 地址或名稱都行，建議地址比較準確，除非確定地圖名稱沒有重複
    course_name: "築地創意壽司", // 課程名稱
    course_chef: "佐藤真一",

    // 下方為需要join的資料
    category_id: "1", // 1 ~ 6 代表category table的id
    member_id: "0001",

    // 各個梯次實際上是存在 batch table 內 這裡是要將資料送進去時的樣子
    course_batch: [
      "2021-11-18",
      "2021-11-20",
      "2021-11-23",
      "2021-11-24",
      "2021-11-25",
      "2021-11-26",
      "2021-11-27",
      "2021-11-29",
      "2021-12-01",
      "2021-12-02",
      "2021-12-03",
      "2021-12-04",
      "2021-12-05",
    ], // 原本會存著各個梯次日期，到後端後再跑回圈將各個梯次 insert into 梯次的 table 內; ["2021-11-23", "2021-11-24", "2021-11-25"]
  };

  let googleMap =
    "https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=" +
    newCourseJSON.company_address +
    "&z=16&output=embed&t=";

  return (
    <>
      <CourseHeaderPicture image1={Food1} image2={Food2} image3={Food3} />

      <div className="Coursedetail-set">
        <div className="Coursedetail-container">
          <div className="Coursedetail">
            <div className="Coursedetail-info">
              <div className="Coursedetail-infoRight">
                <div>
                  <span className="Coursedetail-originalPrice">
                    原價NT$
                    {newCourseJSON.course_price
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
                    {(newCourseJSON.course_price * 0.9)
                      .toString()
                      .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                  </span>
                </div>
                <div className="Coursedetail-quota">
                  <span>
                    本梯次總名額&nbsp;{newCourseJSON.member_limit}
                    &nbsp;位&nbsp;/&nbsp;剩餘名額&nbsp;
                    {newCourseJSON.member_limit - newCourseJSON.member_count}
                    &nbsp;位
                  </span>
                </div>
                <StarGroup
                  Score={newCourseJSON.course_score}
                  percent={newCourseJSON.course_percent}
                />
                <div className="Coursedetail-allTime">
                  <span>
                    課程時數&nbsp;:&nbsp;{newCourseJSON.course_hour}&nbsp;小時
                  </span>
                </div>
                <div className="Coursedetail-iconSvg">
                  <a href={newCourseJSON.course_fb} alt="">
                    <ImFacebook2 />
                  </a>
                  <a href={newCourseJSON.course_ig} alt="">
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
                      {newCourseJSON.course_name}
                    </li>
                  </ul>
                </div>
                <div className="Coursedetail-infoLeftTitle">
                  {newCourseJSON.course_name}
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
                      {newCourseJSON.company_name}
                      <iframe src={googleMap} alt="" title="這是地圖">
                        地圖
                      </iframe>
                    </li>
                    <li>
                      <a href="#chef" alt="" target="_parent">
                        <GiCook />
                        {newCourseJSON.course_chef}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="Coursedetail-data">
                  <CalendarAvailable
                    onChange={onChange}
                    availableDays={newCourseJSON.course_batch}
                    setIsCalendarOpen={setMap}
                  />
                  {console.log(onChange)}
                  <div>
                    <p>選擇梯次日期：{batch}</p>
                    <p>{newCourseJSON.time_of_course}</p>
                  </div>
                </div>
                <div className="Coursedetail-infoLeftJoin">
                  <ul>
                    <li
                      onClick={() => {
                        if(batch === "尚未選擇"){
                          alert('請先選擇梯次日期後再點擊');
                        }
                      }}
                    >
                      加入購物車
                    </li>
                    <li>|</li>
                    <li
                      onClick={() => {
                        if(batch === "尚未選擇"){
                          alert('請先選擇梯次日期後再點擊');
                        }
                      }}
                    >
                      現在報名
                    </li>
                    <li>|</li>
                    <li
                      onClick={() => {
                     
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
            <div className="Coursedetail-outsideTitle">
              {newCourseJSON.title1_1}
            </div>
            <div className="Coursedetail-infoBox">
              <div className="Coursedetail-insideTitle">
                <span>{newCourseJSON.title1_2}</span>
              </div>
              <div className="Coursedetail-whiteLine"></div>
              <div className="Coursedetail-insideText">
                {newCourseJSON.content1.split("\n").map(function (item) {
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
            <div className="Coursedetail-titleLine"></div>
            <div className="Coursedetail-outsideTitle">
              挑戰舌尖上的味蕾，每一秒的幸福口感
            </div>

            <div className="Coursedetail-chefCardMargin">
              <ChefCard />
            </div>

            <div className="Coursedetail-infoBox2">
              <div className="Coursedetail-insideTitle Coursedetail-foodInfo">
                {newCourseJSON.title2}
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
                          newCourseJSON.six_dishes[0].dishes_title
                        );
                      }}
                    >
                      <img
                        src={newCourseJSON.six_dishes[0].dishes_image}
                        alt=""
                        className={
                          course === 0
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {newCourseJSON.six_dishes[0].dishes_title}
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
                          newCourseJSON.six_dishes[1].dishes_title
                        );
                      }}
                    >
                      <img
                        src={newCourseJSON.six_dishes[1].dishes_image}
                        alt=""
                        className={
                          course === 1
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {newCourseJSON.six_dishes[1].dishes_title}
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
                          newCourseJSON.six_dishes[2].dishes_title
                        );
                      }}
                    >
                      <img
                        src={newCourseJSON.six_dishes[2].dishes_image}
                        alt=""
                        className={
                          course === 2
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {newCourseJSON.six_dishes[2].dishes_title}
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
                          newCourseJSON.six_dishes[3].dishes_title
                        );
                      }}
                    >
                      <img
                        src={newCourseJSON.six_dishes[3].dishes_image}
                        alt=""
                        className={
                          course === 3
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {newCourseJSON.six_dishes[3].dishes_title}
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
                          newCourseJSON.six_dishes[4].dishes_title
                        );
                      }}
                    >
                      <img
                        src={newCourseJSON.six_dishes[4].dishes_image}
                        alt=""
                        className={
                          course === 4
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {newCourseJSON.six_dishes[4].dishes_title}
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
                          newCourseJSON.six_dishes[5].dishes_title
                        );
                      }}
                    >
                      <img
                        src={newCourseJSON.six_dishes[5].dishes_image}
                        alt=""
                        className={
                          course === 5
                            ? "Coursedetail-ImageActive"
                            : "Coursedetail-ImageBorderbottom"
                        }
                      ></img>
                      <span className="Coursedetail-sixPictureTitle">
                        {newCourseJSON.six_dishes[5].dishes_title}
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
                      {newCourseJSON.six_dishes[course].dishes_content
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
              content={newCourseJSON.content2}
              attention={newCourseJSON.content3}
            />

            <div className="Coursedetail-outsideTitle">推薦課程</div>
            <div className="Coursedetail-titleLine"></div>

            <CourseRecommend />

            <div className="Coursedetail-join">
              <span>
                <p>立即報名</p>
                <div className="Coursedetail-joinLine"></div>
                <p>馬上加入好嗎?</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(CourseInfomation);
