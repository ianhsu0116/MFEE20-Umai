import React from 'react'
import { useState , useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import '../../components/CourseDetailed.css'
import Chef from '../../components/images/test/pexels-chef1.jpg';
import Food1 from '../../components/images/test/istock泡菜課程.jpg';
import Food2 from '../../components/images/test/istock紫菜包飯.jpg';
import Food3 from '../../components/images/test/istock辣海鮮.jpg';
import Food4 from '../../components/images/test/istock韓風課程.jpg';
import Food5 from '../../components/images/test/photoAC炸醬麵.jpg';
import Food6 from '../../components/images/test/photoAC石鍋拌飯.jpg';
import ChefCard from '../../components/ChefCard'

import StarGroup from './CourseStar';
import CourseCost from './CourseCost'

import CalendarAvailable from "../../components/CalendarAvailable";

import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { HiClock } from "react-icons/hi";
import { MdArrowDropUp } from "react-icons/md"
import { ImFacebook2 } from "react-icons/im"
import { GrInstagram } from "react-icons/gr"

function CourseInfomation (props){
    const [course, setCourse] = useState(0) //課程六圖片
    const [courseFoodTitle, setCourseFoodTitle] = useState("") //六標題
    const [color , setColor] = useState("Coursedetail-chepBoxInfomation Coursedetail-colorActive")

    useEffect(() => {
        setCourseFoodTitle(Course[0].courseFoodName[course])
      }, [])

      useEffect(() => {
        setColor("Coursedetail-chepBoxInfomation Coursedetail-colorActive")
      }, [color])

      // 給萬年曆用的(回傳已選定日期)
  const onChange = (e) => {
    console.log(e);
  };
  // 給顯示可預訂日期的萬年曆用的
  let availableDays = [
    "2021-11-12",
    "2021-11-13",
    "2021-11-15",
    "2021-11-16",
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
  ];


    const Course =[
        {
            id:1,
            courseCategory : "日式料理", //分類
            courseName:"築地創意壽司",//名稱
            coursePlace:"日本東京築地名店",//地點名稱
            courseMap:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1520.754417225542!2d121.19166239369804!3d24.96666082528404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468236c3548196b%3A0x596f83296c212a97!2z5ZyL56uL5Lit5aSu5aSn5a245bel56iL5LqM6aSo!5e0!3m2!1szh-TW!2stw!4v1635685487815!5m2!1szh-TW!2stw",//地圖
            chefName:"佐藤真一",//主廚名稱
            courseBatch:"2021/12/21 - 2021/12/24",//梯次+時間
            courseBatchTime:"每日晚上18:00 - 20:00",
            coursePrice:5000,//價格
            courseScore:800, //總分
            courseScoreCount:200,//評分人數
            courseQuota:50,//課程總人數
            courseNowQuota:38,//現在人數
            courseTime:8,//課程時數
            courseOutsideTitle:"信じられない！とても美味しい",//課程介紹外標題
            courseInsideTitle:"最想念的日式料理！每口都是懷念",//課程介紹內標題
            courseInsideText:
            " 「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。\n 「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。\n「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。",//課程介紹內文
            courseChefUpTitle:"米其林一星主廚精心準備，絕無冷場",//廚師上標題
            courseChefDownTitle:"挑戰舌尖上的味蕾，每一秒的幸福口感",//廚師下標題
            courseChefImage:Chef,
            courseFoodImage:[Food1,Food2,Food3,Food4,Food5,Food6],
            courseFoodName:["泡菜","紫菜包飯","辣海鮮","拌飯","炸醬麵","石鍋拌飯"],
            courseFoodInfo:["辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。\n 換行測試辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。","紫菜卷是一種流行的朝鮮食品，是將蒸熟的白米飯和各種其他材料卷進紫菜中，再切成一塊塊供應。海苔飯捲通常在野餐或戶外活動時吃，或作為簡便的午餐，佐以蘿蔔乾或泡菜。 朝鮮日治時期，日本的卷壽司傳入朝鮮半島。朝鮮人在日本壽司的基礎上發展出海苔飯捲。","「料理料理」「料理料理」「料理料理」","「料理料理」「料理料理」「料理料理」「料理料理」","「料理料理」「料理料理」「料理料理」「料理料理」「料理料理」","「料理料理」「料理料理」「料理料理」「料理料理」「料理料理」「料理料理」"],
            courseCostInfo:"最好設定10個字上限 \n 最好不要打符號 \n 香蕉 \n 拔辣 \n 荔枝 \n 火龍果 \n 葡萄\n 草莓\n 蘋果 \n 西瓜 \n 拔辣 \n 拔辣 \n 荔枝 \n 火龍果 \n 葡萄\n 草莓",
            courseAttentionInfo:"最少上課人數5人，當參加人數未達上述規定的最少上課人數時，將取消課程形成，於課前5天前發出取消課程簡訊"
        }
    ]

    // const newCourseJSON = {
    //     slider_images: ["img_name", "img_name", "img_name"], // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
    //     time_of_course: "平日上午10:30 ~ 下午04:00", // 平日上午10:30 ~ 下午04:00
    //     course_ig: "https://www.instagram.com/",
    //     course_fb: "https://www.facebook.com/",
    //     title1_1: "信じられない！とても美味しい", // 標題1-1號
    //     title1_2: "最想念的日式料理！每口都是懷念", // 標題1-2號
    //     content1: "「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。\n 「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。\n「日本料理」在日語解作「日本式烹飪」，但是此詞語也在部分地區的現代漢語中用以代表日本菜。一般來說，日本料理和和食在日本本土是同義詞。不過，由於日本也有自己的「洋食」，左翼在除了日本以外的地區，日式蛋包飯、日式咖喱、日式炸豬排、日本拉麵等日本人在其它國家的料理的基礎上改造出來的菜品也能被稱為「日本料理」，但不能被稱為純粹的和食。", // 介紹內容1
    //     title2: "美味料理，色香味俱全", // 標題2號(六道菜部分)
    //     six_dishes: [
    //       // 課程六道菜的圖+文
    //       {
    //         dishes_image: "img_name", // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
    //         dishes_title: "泡菜", // 菜色標題
    //         dishes_content: "辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。\n 換行測試辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。", // 菜色介紹
    //       },
    //       {
    //         dishes_image: "img_name", // 圖片名稱
    //         dishes_title: "紫菜包飯", // 菜色標題
    //         dishes_content: "紫菜卷是一種流行的朝鮮食品，是將蒸熟的白米飯和各種其他材料卷進紫菜中，再切成一塊塊供應。海苔飯捲通常在野餐或戶外活動時吃，或作為簡便的午餐，佐以蘿蔔乾或泡菜。 朝鮮日治時期，日本的卷壽司傳入朝鮮半島。朝鮮人在日本壽司的基礎上發展出海苔飯捲。", // 菜色介紹
    //       },
    //       {
    //         dishes_image: "img_name", // 圖片名稱
    //         dishes_title: "辣海鮮", // 菜色標題
    //         dishes_content: "", // 菜色介紹
    //       },
    //       {
    //         dishes_image: "img_name", // 圖片名稱
    //         dishes_title: "拌飯", // 菜色標題
    //         dishes_content: "", // 菜色介紹
    //       },
    //       {
    //         dishes_image: "img_name", // 圖片名稱
    //         dishes_title: "炸醬麵", // 菜色標題
    //         dishes_content: "", // 菜色介紹
    //       },
    //       {
    //         dishes_image: "img_name", // 圖片名稱
    //         dishes_title: "石鍋拌飯", // 菜色標題
    //         dishes_content: "", // 菜色介紹
    //       },
    //     ],
    //     content2: "", // 費用包含內容
    //     content3: "", // 注意事項說明
      
    //     // 下方是table內的獨立欄位，不是存在json內
    //     course_name: "", // 課程名稱
    //     course_price: 0,
    //     course_hour: 0,
    //     course_level: "1", // 1, 2, 3 (高階 中階 初階)
    //     member_limit: 0,
    //     company_name: "", // 餐廳名稱
    //     company_address: "", // 餐廳地址, 供google地圖搜尋
      
    //     // 下方為需要join的資料
    //     category_id: "1", // 1 ~ 6 代表category table的id
    //     member_id: "0001",
      
    //     // 各個梯次實際上是存在 batch table 內 這裡是要將資料送進去時的樣子
    //     course_batch: availableDays, // 原本會存著各個梯次日期，到後端後再跑回圈將各個梯次 insert into 梯次的 table 內; ["2021-11-23", "2021-11-24", "2021-11-25"]
    //   };
      
    
    return(
        <>
    <div className="Coursedetail-set">
      <div className="Coursedetail-container">
        <div className="Coursedetail">
          <div className="Coursedetail-info">
            <div className="Coursedetail-infoRight">
                <div><span className="Coursedetail-originalPrice">原價NT${Course[0].coursePrice.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</span><span className="Coursedetail-infoRightPrice">早鳥優惠價</span></div>
                <div><span className="Coursedetail-specialPrice">NT${(Course[0].coursePrice*0.9).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</span></div>
                <div className="Coursedetail-quota"><span>本梯次總名額&nbsp;{Course[0].courseQuota}&nbsp;位&nbsp;/&nbsp;剩餘名額&nbsp;{Course[0].courseQuota-Course[0].courseNowQuota}&nbsp;位</span></div>
                <StarGroup Score={4.3} percent={200}/>
                <div className="Coursedetail-allTime"><span>課程時數&nbsp;:&nbsp;{Course[0].courseTime}&nbsp;小時</span></div>  
                <div className="Coursedetail-iconSvg"><Link to="/"><ImFacebook2 /></Link><Link to="/"><GrInstagram /></Link></div>
            </div>

            <div className="Coursedetail-infoLeft">
                <div className="Coursedetail-infoLeft-breadcrumb">
                    <ul>
                        <li><Link to="/">首頁</Link></li>
                        <li>{">"}</li>
                        <li><Link to="/course">課程探索</Link></li>
                        <li>{">"}</li>
                        <li className="Coursedetail-infoLeft-breadcrumb-name">{Course[0].courseName}</li>
                    </ul>
                </div>
                <div className="Coursedetail-infoLeftTitle">{Course[0].courseName}</div>
                <div className="Coursedetail-placeWithChef">
                    <ul>
                        <li className="Coursedetail-infoLeftPlace"><IoLocationSharp />{Course[0].coursePlace}<iframe src={Course[0].courseMap} alt="" title="這是地圖">地圖</iframe></li>
                        <li><a href="#chef" alt="" target="_parent"><GiCook />{Course[0].chefName}</a></li>
                    </ul> 
                </div>

                <div className="Coursedetail-data"> 
                    <CalendarAvailable 
                         onChange={onChange}
                         availableDays={ availableDays}
                    />
                    <div><p>{Course[0].courseBatch}</p><p>{Course[0].courseBatchTime}</p></div>
                </div>
                <div className="Coursedetail-infoLeftJoin">
                    <ul>
                        <li onClick={()=> {
                        console.log("加入購物車")
                        }}>加入購物車</li>
                        <li>|</li>
                        <li onClick={()=> {
                        console.log("現在報名")
                        }}>現在報名</li>
                        <li>|</li>
                        <li onClick={()=> {
                        console.log("現在報名")
                        }}>評論區</li>
                    </ul> 
                </div>
            </div>
          </div>

                <div className="Coursedetail-shortLine"></div>
                {/* 下面是主廚外標題 */}
                <div className="Coursedetail-outsideTitle">{Course[0].courseOutsideTitle}</div>
            <div className="Coursedetail-infoBox">
                <div className="Coursedetail-insideTitle"><span>{Course[0].courseInsideTitle}</span></div>
                <div className="Coursedetail-whiteLine"></div>
                <div className="Coursedetail-insideText">{Course[0].courseInsideText.split('\n').map(function(item) {
                  return (
                    <div>
                      {item}
                      <br/>
                    </div>
                   )
             })}</div>
            </div>

                <div className="Coursedetail-outsideTitle" id="chef">{Course[0].courseChefUpTitle}</div>
                <div className="Coursedetail-titleLine"></div>
                <div className="Coursedetail-outsideTitle">{Course[0].courseChefDownTitle}</div>
                
                <div className="Coursedetail-chefCardMargin">
                <ChefCard />
                </div>

            <div className="Coursedetail-infoBox2">
                <div className="Coursedetail-insideTitle Coursedetail-foodInfo">美味料理，色香味俱全</div>
                <div className="Coursedetail-whiteLine"></div>
                <div className="Coursedetail-pictureBox">
   
                <div className="Coursedetail-sixPictureTextBox_1">
                    <ul>
                        <li onClick={()=> {
                        setColor("Coursedetail-chepBoxInfomation")    
                        setCourse(0)
                        setCourseFoodTitle(Course[0].courseFoodName[0])
                        }}><img src={Course[0].courseFoodImage[0]} alt="" className={course === 0 ? "Coursedetail-ImageActive" : "Coursedetail-ImageBorderbottom"}></img>
                        <span className={course === 0 ? 'Coursedetail-sixPictureTitle Coursedetail-active ':'Coursedetail-sixPictureTitle'}>{Course[0].courseFoodName[0]}</span>
                        <span className="Coursedetail-sixPictureTitleMask"></span>
                        </li>
                        <li onClick={()=> {
                        setColor("Coursedetail-chepBoxInfomation")    
                        setCourse(1)
                        setCourseFoodTitle(Course[0].courseFoodName[1])
                        }}><img src={Course[0].courseFoodImage[1]} alt="" className={course === 1 ? "Coursedetail-ImageActive" : "Coursedetail-ImageBorderbottom"}></img>
                        <span className={course === 1 ? 'Coursedetail-sixPictureTitle Coursedetail-active ':'Coursedetail-sixPictureTitle'}>{Course[0].courseFoodName[1]}</span>
                        <span className="Coursedetail-sixPictureTitleMask"></span>
                        </li>
                        <li onClick={()=> {
                        setColor("Coursedetail-chepBoxInfomation")    
                        setCourse(2)
                        setCourseFoodTitle(Course[0].courseFoodName[2])
                        }}><img src={Course[0].courseFoodImage[2]} alt="" className={course === 2 ? "Coursedetail-ImageActive" : "Coursedetail-ImageBorderbottom"}></img>
                        <span className={course === 2 ? 'Coursedetail-sixPictureTitle Coursedetail-active ':'Coursedetail-sixPictureTitle'}>{Course[0].courseFoodName[2]}</span>
                        <span className="Coursedetail-sixPictureTitleMask"></span>
                        </li>
                    </ul> 
                    <ul>
                        <li onClick={()=> {
                        setColor("Coursedetail-chepBoxInfomation")    
                        setCourse(3)
                        setCourseFoodTitle(Course[0].courseFoodName[3])
                        }}><img src={Course[0].courseFoodImage[3]} alt="" className={course === 3 ? "Coursedetail-ImageActive" : "Coursedetail-ImageBorderbottom"}></img>
                        <span className={course === 3 ? 'Coursedetail-sixPictureTitle Coursedetail-active ':'Coursedetail-sixPictureTitle'}>{Course[0].courseFoodName[3]}</span>
                        <span className="Coursedetail-sixPictureTitleMask"></span>
                        </li>
                        <li onClick={()=> {
                        setColor("Coursedetail-chepBoxInfomation")    
                        setCourse(4)
                        setCourseFoodTitle(Course[0].courseFoodName[4])
                        }}><img src={Course[0].courseFoodImage[4]} alt="" className={course === 4 ? "Coursedetail-ImageActive" : "Coursedetail-ImageBorderbottom"}></img>
                        <span className={course === 4 ? 'Coursedetail-sixPictureTitle Coursedetail-active ':'Coursedetail-sixPictureTitle'}>{Course[0].courseFoodName[4]}</span>
                        <span className="Coursedetail-sixPictureTitleMask"></span>
                        </li>
                        <li onClick={()=> {
                        setColor("Coursedetail-chepBoxInfomation")    
                        setCourse(5)
                        setCourseFoodTitle(Course[0].courseFoodName[5])
                        }}><img src={Course[0].courseFoodImage[5]} alt="" className={course === 5 ? "Coursedetail-ImageActive" : "Coursedetail-ImageBorderbottom"}></img>
                        <span className={course === 5 ? 'Coursedetail-sixPictureTitle Coursedetail-active ':'Coursedetail-sixPictureTitle'}>{Course[0].courseFoodName[5]}</span>
                        <span className="Coursedetail-sixPictureTitleMask"></span>
                        </li>
                    </ul>
                </div>

                <div className="Coursedetail-chepBoxTextWidth">
                    <div className="Coursedetail-chepBox">Chapter{course+1}</div>
                    <div className="Coursedetail-chepBoxTitle">{courseFoodTitle}
                        <div className={color}>{Course[0].courseFoodInfo[course].split('\n').map(function(item) {
                        return (
                            <div>
                                {item}
                                <br/>
                            </div>
                        )
                     })}</div>
                    </div>
                </div>

            </div>

     
            </div>

            <CourseCost content={Course[0].courseCostInfo} attention={Course[0].courseAttentionInfo}/>

            <div className="Coursedetail-outsideTitle">推薦課程</div>
            <div className="Coursedetail-titleLine"></div> 
            <div className="Coursedetail-recommend">
                <div className="Coursedetail-recommendLeft">
                    <img src={Food3} alt="" width="300px"></img>
                    <span className="Coursedetail-recommendText">
                        <div className="Coursedetail-recommendTitle">難度:中級</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">如何開始料理</div>
                        <div className="Coursedetail-recommendInfo">{Course[0].courseFoodInfo[0]}</div>
                    </span>
                </div>
                <div className="Coursedetail-recommendRight">
                    <img src={Food5} alt="" width="300px"></img>
                    <span className="Coursedetail-recommendText">
                        <div className="Coursedetail-recommendTitle">難度:高級</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">製作道地的麵</div>
                        <div className="Coursedetail-recommendInfo">{Course[0].courseFoodInfo[0]}</div>
                    </span>
                </div>
            </div>

            <div className="Coursedetail-join">
                    
            <span>
            <p>
            立即報名
            </p>
            <div className="Coursedetail-joinLine"></div>
            <p>馬上加入好嗎?</p>
            </span>

            </div>
             
        </div>

     
        </div>
            
    </div>
        </>
    )

}
export default withRouter(CourseInfomation)