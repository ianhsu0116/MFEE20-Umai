import React from "react";
// import { useState } from 'react'
import avatar from "./images/avatar.jpg";
import StarGroup from "./StarGroup";

function ShareCard(props) {
  let [scoreSum, allScore] = [4, 1];
  let percent = (scoreSum / allScore) * 20;

  return (
    <>
      <div className="ShareCard">
        <div className="ShareCardContentFrame">
          <div className="ShareCardPictureBox">
            <img className="ShareCardPicture" src={avatar} alt=""></img>
          </div>
          <div className="ShareCardPictureName">Ian</div>
          <div className="ShareCardCourseName">《 居家法式料理 》</div>
          <div className="ShareCardStar">
            <div className="st-boxPos">
              <StarGroup percent={percent} allScore={scoreSum} />
            </div>
          </div>
          <div className="ShareCardText">
            <div className="ShareCardTextTop">"</div>
            <div className="ShareCardComment">
              <p>
                最優質的導師陣容加上最優質的學生，不能再更好了，但我還是想扣一分，超爽ㄉ！
              </p>
            </div>
            <div className="ShareCardTextDown">"</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareCard;
