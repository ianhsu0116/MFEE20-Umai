import React from "react";
import Chef from "./images/chef.png";

function ChefCard(props) {
  const { chefInfomation } = props;

  return (
    <>
      <div className="st-chefCard">
        {/* 主廚照片容器(左) */}
        <div className="st-chefCardPictureWrapper">
          <img
            className="st-chefCardPicture"
            src={chefInfomation.img}
            alt=""
          ></img>
        </div>

        {/* 主廚文字容器(右) */}
        <div className="st-chefCardTextWrapper">
          {/* 上半部 */}
          <div className="st-chefCardTop">
            <div className="st-chefCardTopQuotation">
              「{chefInfomation.chefIntroduce1}」
            </div>
            <div className="st-chefCardLine"></div>
            <div className="st-chefCardTopChefName">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "我是" +
                    chefInfomation.chefIntroduce2 +
                    ",<br /> " +
                    "我想與您一起開心地做料理！",
                }}
              ></div>
            </div>
          </div>
          {/* 下半部 */}
          <div className="st-chefCardDown">
            <div
              dangerouslySetInnerHTML={{
                __html: chefInfomation.chefInfoTiele,
              }}
            ></div>
            <ul>
              <li>{chefInfomation.chefInfo[0]}</li>
              <li>{chefInfomation.chefInfo[1]}</li>
              <li>{chefInfomation.chefInfo[2]}</li>
              <li>{chefInfomation.chefInfo[3]}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChefCard;
