import React from "react";
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
import CourseMiniCard from "../../components/CourseMiniCard2";
import CourseMiniCardSlider from "../../components/CourseMiniCardSlider";
import ChefCard from "../../components/ChefCard2";

import ChefCardSlider from "../../components/homepage/ChefCardSlider";

const HomePage = () => {
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
        {/* <div className="chefIntroduction">
          <div className="chefIntroductionTrim"></div>
          <div className="circleWrapperA">
            <img className="circleOrange" src={circleOrange} alt="" />
          </div>
          <div className="circleWrapperB">
            <img className="circleOrange" src={circleOrange} alt="" />
          </div>
          <div className="chefIntroductionBox">
            <ChefCardSlider />
          </div>
        </div> */}
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
              <CourseMiniCardSlider SliderTitle="熱門課程" />
              <CourseMiniCardSlider SliderTitle="即將截止課程" />
            </div>
          </div>
        </div>
      </div>

      {/* <CourseMiniCard /> */}
    </>
  );
};
export default HomePage;
