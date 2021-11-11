import React from "react";
import starGroup from "./images/starGroup.png";
import starGroupBackground from "./images/starGroupBackground.png";

const StarGroup = (props) => {
  let { percent, allScore } = props;
  return (
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
          style={{ width: percent + "%" }}
        />
      </div>
      <p>({allScore})</p>
    </div>
  );
};

export default StarGroup;
