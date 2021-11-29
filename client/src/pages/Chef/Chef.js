import React, { useState } from "react";
import MultiLevelBreadcrumb from "../../components/MultiLevelBreadcrumb";
import ChefCard from "../../components/ChefCard2";
import CourseCard from "../../components/CourseCard1";

const Chef = (props) => {
  const [active, SetActive] = useState(-1);

  let liForLoop = [];

  const chefJson = [
    "吳紀維",
    "黃智堯",
    "李怡璇",
    "葉裕仁",
    "葉承光",
    "張延剛",
    "黃秀福",
    "吳韻如",
    "張學諭",
    "孫治信",
    "吳巧郁",
    "劉佩珊",
    "何俊男",
    "陳怡婷",
    "曾偉誠",
    "賴林仲",
    "陳虹善",
    "郭馨儀",
    "沈俊諺",
    "黃上喬",
    "黃協銘",
    "蔡怡文",
    "林東琴",
    "傅致年",
    "謝與奇",
    "王書瑋",
    "柳千惠",
    "黃冠雨",
    "江妤芬",
  ];

  for (let i = 0; i < 30; i++) {
    liForLoop.push(
      // eslint-disable-next-line eqeqeq
      <li
        className={active == i ? "chef-li chef-liActive" : "chef-li"}
        id={i}
        onClick={(e) => {
          SetActive(e.target.id);
        }}
      >
        {chefJson[i]}
      </li>
    );
  }

  return (
    <>
      <div className="chef-set">
        <div className="CourseBreadbox">
          <MultiLevelBreadcrumb />
        </div>
        <div className="chef-title">主廚殿堂</div>
        <div className="st-line"></div>
        <div className="chef-infomationBox">
          <ul className="chef-ul">{liForLoop}</ul>
          <div className="chef-cardAndCourseCard">
            <div className="chef-margin">
              <ChefCard />
            </div>
            <div className="chef-courseCardMargin">
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chef;
