import React from "react";
import Food4 from "../../../components/images/courseCostBackground.jpg";
import CircleBlue from "../../../components/images/circle_blue.svg";

function CourseCost(props) {
  let { content, attention } = props;

  let contentCount = content.split("\n");

  let item1 = [];
  let item2 = [];

  for (let i = 0; i < contentCount.length; i++) {
    if (i <= 9) {
      //console.log(i);
      item1.push(<li>{contentCount[i]}</li>);
    } else item2.push(<li>{contentCount[i]}</li>);
  }

  return (
    <>
      {/* 11/28 */}
      <img className="blue3 CourseDecorate_RWD5" src={CircleBlue} alt=""></img>
      <div className="Coursedetail-cost">
        <span>
          <div className="Coursedetail-costBox">
            <p>費用包含</p>
            <div className="Coursedetail-costLine"></div>
            <div className="Coursedetail-costArea">
              <ul>{item1}</ul>
              <ul>{item2}</ul>
            </div>
            <div className="Coursedetail-attention">
              <div>※注意事項：</div>
              <p>{attention}</p>
            </div>
          </div>
        </span>
        <img src={Food4} alt="" width="800px"></img>
      </div>
    </>
  );
}

export default CourseCost;
