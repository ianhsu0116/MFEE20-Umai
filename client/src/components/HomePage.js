import React from "react";
import bannerPicture from "./images/Banner.png";
import cuttingBoard from "./images/cuttingBoard.png";
import circleOrange from "./images/circleOrange.svg";
import circleWhite from "./images/circleWhite.svg";
import HeadingUnderline from "./images/HeadingUnderline.svg";
import chef from "./images/chef.png";
import cookCourseA from "./images/cookCourseA.jpg";
import cookCourseB from "./images/cookCourseB.png";
import plate from "./images/plate.png";
import noodle from "./images/noodle.png";
import BackgroundTexture from "./images/BackgroundTexture.jpg";
import { TiArrowSortedDown } from "react-icons/ti";
import CourseCard1 from "./CourseCard1";
import Button from "./Button";
import ShareCard from "./ShareCard";
import CourseMiniCard from "./CourseMiniCard";
// import CourseMiniCardSlider from "./CourseMiniCardSlider";
import ChefCard from "./ChefCard";

const HomePage = () => {
  return (
    <>
      <div className="HomePageBox">
        <div className="bannerBox">
          <div className="bannerPolygonBox">
            <div className="bannerPolygonWrapper">
              <img className="bannerPicture" src={bannerPicture} alt="" />
            </div>
          </div>
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
                      src={cookCourseA}
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
                      src={cookCourseB}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="platformIntroductionButtonWrapper">
                <div className="platformIntroductionButton">
                  <p>報名課程</p>
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
              <div className="chefIntroductionContentWrapper">
                <div className="chefIntroductionContent">
                  <ChefCard />
                </div>
                <div className="chefIntroductionContent">
                  <ChefCard />
                </div>
                <div className="chefIntroductionContent">
                  <ChefCard />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ShareCardBox">
          {/* <div className="Background"> */}
          <img className="BackgroundTexture" src={BackgroundTexture} alt="" />
          {/* <div className="Backgroundfilter"></div> */}
          {/* </div> */}
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
                  <ShareCard />
                </div>
                <div className="ShareCardContent">
                  <ShareCard />
                </div>
                <div className="ShareCardContent">
                  <ShareCard />
                </div>
              </div>
              <div className="moreShareButtonWrapper">
                <div className="moreShareButton">
                  <p>更多分享</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="RecommandCourseCardBox">
          <div className="Background">
            <img className="BackgroundTexture" src={BackgroundTexture} alt="" />
          </div>
          <div className="imageA">
            <img className="plate" src={plate} alt="" />
          </div>
          <div className="RecommandCourseCardContentWrapper">
            <div className="RecommandCourseCardSliderWrapper">
              <CourseMiniCard />
            </div>
          </div>
          {/* <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="d-block w-100 BGRED"></div>
                </div>
                <div className="carousel-item">
                  <div className="d-block w-100 bg-red"></div>
                </div>
                <div className="carousel-item">
                  <div className="d-block w-100 bg-red"></div>
                </div>
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
};
export default HomePage;
