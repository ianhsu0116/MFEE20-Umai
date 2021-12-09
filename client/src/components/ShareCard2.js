import React from "react";
// import { useState } from 'react'
import avatar from "./images/avatar.svg";
import StarGroup from "./StarGroup";

function ShareCard(props) {
  let { course_name, member_name, commentText, member_avatar ,score_sum, score_count,} = props;


  return (
    <>
      <div className="ShareCard">
        <div className="ShareCardContentWrapper">
          <div className="ShareCardPictureBox">
            <img className="ShareCardPicture" src={member_avatar} alt=""></img>
          </div>
          <div className="ShareCardPictureName">{member_name}</div>
          <div className="st-boxPos">
              <StarGroup percent={(20 * score_sum) / score_count} allScore={score_sum} />
            </div>
          <div className="ShareCardCourseName">
          《 {course_name} 》</div>
          <div >
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
