import React from "react";
// import { useState } from 'react'
import avatar from "./images/avatar.svg";
import StarGroup from "./StarGroup";

function ShareCard(props) {
  let { course_name, member_name, commentText, member_avatar } = props;
  let [scoreSum, allScore] = [5, 1];
  let percent = (scoreSum / allScore) * 20;

  return (
    <>
      <div className="ShareCard">
        <div className="ShareCardContentWrapper">
          <div className="ShareCardPictureBox">
            <img className="ShareCardPicture" src={member_avatar} alt=""></img>
          </div>
          <div className="ShareCardPictureName">{member_name}</div>
          <div className="ShareCardCourseName">《 {course_name} 》</div>
          <div className="ShareCardStar">
            <div className="st-boxPos">
              <StarGroup percent={percent} allScore={scoreSum} />
            </div>
          </div>
          <div className="ShareCardText">
            <div className="ShareCardTextTop">"</div>
            <div className="ShareCardComment">
              <p>{commentText}</p>
            </div>
            <div className="ShareCardTextDown">"</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareCard;
