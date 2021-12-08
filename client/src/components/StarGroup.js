import React, { useEffect, useState } from "react";
import starGroup from "./images/starGroup.png";
import starGroupBackground from "./images/starGroupBackground.png";

const StarGroup = (props) => {
  let { percent, allScore } = props;

  // const [percent1, setPersent1] = useState(0)
  // const [allScore1, setaAlScore1] = useState(0)

  // useEffect(() => {
  //   setPersent1(percent)
  //   // console.log(percent)
  // }, [percent])
  // useEffect(() => {
  //   setaAlScore1(allScore)
  //   // console.log(allScore)
  // }, [allScore])

  return (
    <>
      {console.log(props)}
      <div className="StarGroup">
        <div className="StarGroup-container">
          <img
            src={starGroup}
            alt="starGroup"
            className="StarGroup-container-star"
          />
          <img
            src={starGroupBackground}
            alt="starGroup"
            className="StarGroup-container-background"
            style={{ width: isNaN(percent) ? 0 : `${percent}%` }}
          />
        </div>
        <p>({allScore || 0})</p>
      </div>
    </>
  );
};

export default StarGroup;
