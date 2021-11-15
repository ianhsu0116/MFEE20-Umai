import React from 'react'
// import { useState } from 'react'
import Chef from './images/test/photoAC設置拌飯.jpg';

    const CourseMiniCard=(props)=>{
        
        const CardTest =[
            {
                courseCategory : "日式料理", //分類
                courseName:"好吃好吃好好吃料理好吃好吃好好吃料理",//名稱
                chefName:"佐藤真一(Sado)",//主廚名稱
                courseBatch:"第六期課程",//梯次+時間
                courseTimeStart:"2022/12/20",//時間
                courseTimeEnd:"2022/12/24",//時間
                coursePrice:5000,//價格
                courseScore:1000, //總分
                courseScoreCount:200,//評分人數
                courseQuota:100,//課程總人數
                courseNowQuota:60,//現在人數
                courseChefImage:Chef,
                courseLevel:"初級",
            }
        ]

  return (
    <>
    <div className="st-courseMiniCard">
        <div className="st-courseMiniCardPicture">
        <div className="st-courseMiniCardBar st-courseMiniCardBarActiveDeadline">即將截止</div>
            <img src={Chef} alt=""></img>
            <div className="st-courseMiniCardName">{CardTest[0].courseName}
            <div className="st-courseMiniCardChefName">{CardTest[0].chefName}</div>
            
            <div className="st-startWidth">
                <span  className="st-courseMiniCardBoxStar"><span>★★★★★</span></span>
                <span  className="st-courseMiniCardFullStar" title={Math.floor(CardTest[0].courseScore*10/CardTest[0].courseScoreCount)/10} style={{ width: Math.round(CardTest[0].courseScore/CardTest[0].courseScoreCount * 20) +'%'  }}>★★★★★</span>
                <span  className="st-courseMiniCardStarCount">({CardTest[0].courseScoreCount})</span>
                </div>
            </div>

            <div className="st-courseMiniCardBatch">
                {CardTest[0].courseBatch}：
                <div className="st-courseMiniCardTime">{CardTest[0].courseTimeStart}&nbsp;~&nbsp;{CardTest[0].courseTimeEnd}</div>
            </div>
            
            <div className="st-courseMiniCardProgressBox">
            <div className="st-courseMiniCardProgress"></div>
            <div className="st-courseMiniCardFullProgress" style={{ width: Math.round(100-(CardTest[0].courseQuota-CardTest[0].courseNowQuota)) +'%'  }}></div>
            <div className="st-courseMiniCardCount">報名人數：{CardTest[0].courseNowQuota}&nbsp;/&nbsp;{CardTest[0].courseQuota}</div>
            </div>
            
            <div className="st-courseMiniCardLevel">
                <p className="st-courseMiniCardLevelText">初級</p>
            </div>
            <div className="st-courseMiniCardPriceBox">
            <p className="st-courseMiniCardPrice ">NT${CardTest[0].coursePrice.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</p>
            <p className="st-courseMiniCardSpecialPrice">NT${(CardTest[0].coursePrice*1.2).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</p>
            </div>
        </div>
        
    </div>
    </>
         )
    
}

export default CourseMiniCard