import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

// 圖片
import bannerPicture from "../../components/images/Banner.png";
import chef from "../../components/images/chef.png";
import platformAdvantageA from "../../components/images/platformAdvantageA.jpg";
import platformAdvantageB from "../../components/images/platformAdvantageB.png";
import cuttingBoard from "../../components/images/cuttingBoard.png";
import circleOrange from "../../components/images/circleOrange.svg";
import circleWhite from "../../components/images/circleWhite.svg";
import HeadingUnderline from "../../components/images/HeadingUnderline.svg";
import plate from "../../components/images/plate.png";
import noodle from "../../components/images/noodle.png";
import BackgroundTexture from "../../components/images/BackgroundTexture.jpg";
import pan from "../../components/images/pan.png";
import cooking from "../../components/images/cooking.png";

// 共用元件
import ShareCard from "../../components/ShareCard2";
// import CourseMiniCard from "../../components/CourseMiniCard2";
import CourseMiniCardSlider from "../../components/CourseMiniCardSlider";
import ChefCard from "../../components/ChefCard2";

// course後端
import CourseService from "../../services/course.service";

// import ChefCardSlider from "../../components/homepage/ChefCardSlider";

const HomePage = () => {
  const [activeChef, setActiveChef] = useState(1);
  // 主廚slide
  const handleSilde = (e, index) => {
    let row = e.currentTarget.parentElement;

    // 設定當前置中的卡片是誰
    setActiveChef(index);

    if (index === 0) {
      row.style.left = "0%";
    } else if (index === 1) {
      row.style.left = "-100%";
    } else if (index === 2) {
      row.style.left = "-200%";
    }
  };
  const [homepageComment, setHomepageComment] = useState({});
  useEffect(async () => {
    try {
      let result = await CourseService.course_homepageComment();
      console.log(result.data.course);
      setHomepageComment(result.data.course);
      return;
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 主廚假資料
  const chefInfomation = [
    {
      chefIntroduce1:
        "廚藝生涯 40 餘年，喜愛義法歐陸料理及葡萄酒，樂當料理人，認為生活中不能沒有料理，讓我來指導你吧！",
      chefIntroduce2: " 華文 李 ",
      chefInfoTiele: "東方文華-雅閣 Restaurant & bar<br />主廚與經營者 野格 李",
      chefInfo: [
        "超過40年專業廚師經歷",
        "創立兩間餐飲品牌",
        "創立品牌獲得米其林三星肯定",
        "創立品牌獲得米其林星級殊榮",
      ],
      img: "http://localhost:8080/upload-images/avatar-df501eba-a83a-4c3e-bf7b-4ff27ce592a2.jpeg",
    },
    {
      chefIntroduce1:
        "做菜總是讓人很開心，做菜總是讓人很開心，做菜總是讓人很開心，因為料理永遠會給以最直接的方式回饋給你。",
      chefIntroduce2: "Kin",
      chefInfoTiele: "LONGTAL restaurant & bar<br />主廚與經營者 林明健(Kin)",
      chefInfo: [
        "榮獲全球前50最佳主廚殊榮",
        "創立四間餐飲品牌",
        "創立品牌連續四年獲得米其林一星肯定",
        "創立品牌連續四年獲得米其餐盤推薦",
      ],
      img: "http://localhost:8080/upload-images/avatar-206a6abd-b017-4544-aea6-bfdcd5e905fd.png",
    },

    {
      chefIntroduce1:
        "常有人問我，該怎麼樣才能像您一樣，成為調飲大師，我總是笑笑的回答，現在加入Umai，讓我來指導你",
      chefIntroduce2: "Midi Li",
      chefInfoTiele:
        "台北西華酒店-野宴 Restaurant & bar<br />點心房行政主廚 Midi Li",
      chefInfo: [
        "創立品牌榮獲亞洲最佳50餐廳",
        "創立兩間餐飲品牌",
        "創立品牌獲得米其林二星肯定",
        "超過10餘年廚師經驗",
      ],
      img: "http://localhost:8080/upload-images/avatar-b1be2eff-aeb0-4631-9d76-33a7a0b1e5a4.jpg",
    },
  ];
  return (
    <>
      <div className="HomePageBox">
        {/* banner容器(含圖文) */}
        <div className="bannerBox">
          {/* banner圖片容器 */}
          <div className="bannerPolygonBox">
            <div className="bannerPolygonWrapper">
              <img className="bannerPicture" src={bannerPicture} alt="" />
            </div>
          </div>
          {/* banner文字容器 */}
          <div className="bannerSloganBox">
            <div className="bannerSloganWrapper">
              <div className="bannerSloganTextA">
                <h1>
                  由米其林主廚授課的<span>料理課程平台</span>
                </h1>
                <h1>輕鬆享受料理的樂趣</h1>
              </div>
              <div className="bannerSloganTextB">
                <p>發揮無限創意、探索各國料理</p>
                <p>一起跟食材交個朋友吧 ！</p>
              </div>
            </div>
          </div>
          <div className="bannerScrollDownArrowBox">
            <div className="bannerScrollDownWrapper">
              <div className="bannerScrollDownText">發掘料理的更多可能</div>
              <div className="bannerScrollDownIcon">
                <TiArrowSortedDown />
              </div>
            </div>
          </div>
        </div>
        <div className="platformIntroduction">
          <div className="cuttingBoardWrapper">
            <img className="cuttingBoard" src={cuttingBoard} alt="" />
          </div>
          <div className="circleWrapperA">
            <img className="circleOrange" src={circleOrange} alt="" />
          </div>
          <div className="circleWrapperB">
            <img className="circleWhite" src={circleWhite} alt="" />
          </div>
          <div className="platformIntroductionBox">
            <div className="platformIntroductionWrapper">
              <div className="platformIntroductionHeading">
                <h1>參與精緻料理課程</h1>
                <img
                  className="HeadingUnderline"
                  src={HeadingUnderline}
                  alt=""
                />
              </div>
              <div className="platformIntroductionContentWrapper">
                <div className="platformIntroductionContent">
                  <h3>實體料理班現場指導</h3>
                  <div className="platformIntroductionPictureWrapper">
                    <img
                      className="platformIntroductionPicture"
                      src={platformAdvantageA}
                      alt=""
                    />
                  </div>
                </div>
                <div className="platformIntroductionContent">
                  <h3>米其林主廚親自授課</h3>
                  <div className="platformIntroductionPictureWrapper">
                    <img
                      className="platformIntroductionPicture"
                      src={chef}
                      alt=""
                    />
                  </div>
                </div>
                <div className="platformIntroductionContent">
                  <h3>小班制教學品質保證</h3>
                  <div className="platformIntroductionPictureWrapper">
                    <img
                      className="platformIntroductionPicture"
                      src={platformAdvantageB}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="platformIntroductionButtonWrapper">
                <div className="platformIntroductionButton">
                  <p
                    onClick={() => {
                      window.location.href =
                        "http://localhost:3000/courses/category";
                    }}
                  >
                    報名課程
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chefIntroduction">
          <div className="chefIntroductionTrim"></div>
          <div className="circleWrapperA">
            <img className="circleOrange" src={circleOrange} alt="" />
          </div>
          <div className="circleWrapperB">
            <img className="circleOrange" src={circleOrange} alt="" />
          </div>
          <div className="chefIntroductionBox">
            <div className="chefIntroductionWrapper">
              <div className="chefIntroductionHeading">
                <h1>豪華主廚陣容</h1>
                <img
                  className="HeadingUnderline"
                  src={HeadingUnderline}
                  alt=""
                />
              </div>
              {/* <div className="chefIntroductionContentWrapper">
                <div className="chefIntroductionContent">
                  <ChefCard />
                </div>
                <div className="chefIntroductionContent">
                  <ChefCard />
                </div>
                <div className="chefIntroductionContent">
                  <ChefCard />
                </div>
              </div> */}

              {/* ian測試 */}
              <div className="chefIntroductionContentWrapper">
                <div className="ContentWrapperMask">
                  <div className="ContentWrapper-row">
                    {new Array(3).fill(0).map((i, index) => (
                      <div
                        className={`chefIntroductionContent ${
                          activeChef === index
                            ? "chefIntroductionContent-canter"
                            : ""
                        }`}
                        onClick={(e) => {
                          // 如果點擊的是中間卡片，就直接進入主廚頁面
                          if (activeChef === index) {
                            window.location.href = "http://localhost:3000/chef";
                          } else {
                            handleSilde(e, index);
                          }
                        }}
                      >
                        <ChefCard chefInfomation={chefInfomation[index]} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ShareCardBox">
          <div className="Background">
            <img className="BackgroundTexture" src={BackgroundTexture} alt="" />
          </div>
          <div className="circleWrapperA">
            <img className="circleWhite" src={circleWhite} alt="" />
          </div>
          <div className="imageA">
            <img className="plate" src={plate} alt="" />
          </div>
          <div className="imageB">
            <img className="noodle" src={noodle} alt="" />
          </div>
          <div className="ShareCardContainer">
            <div className="ShareCardWrapper">
              <div className="ShareCardHeading">
                <h1>Umai 學員分享</h1>
                <img
                  className="HeadingUnderline"
                  src={HeadingUnderline}
                  alt=""
                />
              </div>
              <div className="ShareCardContentWrapper">
                <div className="ShareCardContent">
                  <ShareCard
                    course_name={homepageComment[0]?.course_name}
                    member_name={
                      homepageComment[0]?.first_name +
                      " " +
                      homepageComment[0]?.last_name
                    }
                    commentText={homepageComment[0]?.comment_text}
                    score_sum={homepageComment[0]?.score}
                    score_count={1}
                    member_avatar={
                      "http://localhost:8080/upload-images/" +
                      homepageComment[0]?.avatar
                    }
                  />
                </div>
                <div className="ShareCardContent">
                  <ShareCard
                    course_name={homepageComment[1]?.course_name}
                    member_name={
                      homepageComment[1]?.first_name +
                      " " +
                      homepageComment[1]?.last_name
                    }
                    commentText={homepageComment[1]?.comment_text}
                    score_sum={homepageComment[0]?.score}
                    score_count={1}
                    member_avatar={
                      "http://localhost:8080/upload-images/" +
                      homepageComment[1]?.avatar
                    }
                  />
                </div>
                <div className="ShareCardContent">
                  <ShareCard
                    course_name={homepageComment[2]?.course_name}
                    member_name={
                      homepageComment[2]?.first_name +
                      " " +
                      homepageComment[2]?.last_name
                    }
                    commentText={homepageComment[2]?.comment_text}
                    score_sum={homepageComment[0]?.score}
                    score_count={1}
                    member_avatar={
                      "http://localhost:8080/upload-images/" +
                      homepageComment[2]?.avatar
                    }
                  />
                </div>
              </div>
              <div className="moreShareButtonWrapper">
                <div className="moreShareButton">
                  <p
                    onClick={() => {
                      window.location.href = "http://localhost:3000/forum";
                    }}
                  >
                    更多分享
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="RecommandCourseCardBox">
          <div className="Background">
            <img
              className="BackgroundTexture BackgroundTextureA"
              src={BackgroundTexture}
              alt=""
            />
            <img
              className="BackgroundTexture BackgroundTextureB"
              src={BackgroundTexture}
              alt=""
            />
          </div>
          <div className="imageA">
            <img className="plate" src={plate} alt="" />
          </div>
          <div className="imageB">
            <img className="pan" src={pan} alt="" />
          </div>
          <div className="imageC">
            <img className="cooking" src={cooking} alt="" />
          </div>
          <div className="RecommandCourseCardContentWrapper">
            <div className="RecommandCourseCardSliderWrapper">
              <CourseMiniCardSlider SliderTitle="熱門課程" tag="熱門課程" />
              <CourseMiniCardSlider SliderTitle="即將截止課程" tag="即將截止" />
            </div>
          </div>
        </div>
      </div>

      {/* <CourseMiniCard /> */}
    </>
  );
};
export default HomePage;
