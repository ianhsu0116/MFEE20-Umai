import React from "react";
import Food4 from "../../components/images/test/istock韓風課程.jpg";

function CourseCost(props) {
  let { content, attention } = props;

  let contentCount = content.split("\n");

  let item1 = [];
  let item2 = [];

  for (let i = 0; i < contentCount.length; i++) {
    if (i <= 9) {
      console.log(i);
      item1.push(<li>{contentCount[i]}</li>);
    } else item2.push(<li>{contentCount[i]}</li>);
  }

  return (
    <>
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
              <div>注意事項：</div>
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
