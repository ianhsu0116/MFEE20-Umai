import React, { useState } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import headerPicture from "../../components/images/about/cocktail1.jpg"
import CardFront1 from "../../components/images/about/CardFront1.jpg"
import CardBack1 from "../../components/images/about/CardBack1.png"
// import CardBack2 from "../../components/images/about/CardBack2.jpg"
import CardConer from "../../components/images/about/CardConer.png"
import CardConer2 from "../../components/images/about/CardConer2.png"

// import headerPicture from "../../components/images/about/cocktail1.jpg"
// import headerPicture from "../../components/images/about/cocktail1.jpg"
// import headerPicture from "../../components/images/about/cocktail1.jpg"
// import headerPicture from "../../components/images/about/cocktail1.jpg"
// import "./About.css"


const About = (props) => {


  return (
    <>
  

    <div className="Img">
      <img className="Img1" src={headerPicture} alt="" />
      <h1 className="family">關於我們</h1>
    </div>

    <div className="Course">
    <div className="CourseBreadbox"><MultiLevelBreadcrumb /></div>
    </div>

    <div className="About-title">關於我們</div>
    <div class="Linktop"></div>
    

    
    <div className="Card1">
    <section className="Card1front">
      <img
        className="Teammate1"
        src={CardFront1}
        alt=""
      />
       <img
        className="Coner1"
        src={CardConer}
        alt=""
        />
      <h2 className="Title1">蔡泊璟</h2>
      <div class="Linefront1"></div>
      {/* <p className="Word1">
        使用技能組合
      </p> */}
      <ul className="List1">
          <li>切版RWD</li>
          <li>首頁、會員註冊/登入</li>
          <li>串接API(FB、GOOGLE登入)</li>
          <li>會員資料庫設計</li>
          <li>後台會員管理</li>
          <li>視覺設計/logo設計</li>
      </ul>
    </section>
    <section
      className="Card1back"
    >
    <img
        className="Teammate1back"
        src={CardBack1}
        alt=""
      />
      <div className="Line1back"></div>
      <p className="Word1back">我負責的部分為一部份的美術設計和文案。<br />
在網頁製作的部份主要為關於我們和聯繫我們頁面。<br />關於我們主要為卡片翻轉介紹功能。<br />
聯繫我們按下送出時會有彈跳式視窗的確認<br />若沒有輸入則會驗證,所有輸入都正確才會驗證通過。<br />最後包括一些小功能零件。</p>
    </section>
  </div>




  <div className="Card2">
    <section className="Card2front">
      <img
        className="Teammate2"
        src={CardFront1}
        alt=""
      />
      
       <img
        className="Coner2"
        src={CardConer2}
        alt=""
      />
      <h2 className="Title2">林奇毅</h2>
      <div class="Linefront2"></div>
      {/* <p className="Word1">
        使用技能組合
      </p> */}
      <ul className="List2">
          <li>切版RWD</li>
          <li>首頁、會員註冊/登入</li>
          <li>串接API(FB、GOOGLE登入)</li>
          <li>會員資料庫設計</li>
          <li>後台會員管理</li>
          <li>視覺設計/logo設計</li>
      </ul>
    </section>
    <section
      className="Card2back"
    >
    <img
        className="Teammate2back"
        // src={CardBack2}
        alt=""
      />
      <div class="Line2back"></div>
      <p className="Word2back">在美術設計的部份使用了photoshop跟xd製作設計稿<br />logo的部分則是使用illustrtator。<br />在網頁製作的部份整體是使用react框架<br />以html和css去攥寫網頁大部分的功能和樣式<br />在彈跳式視窗的部份則是使用了javascript和引入插件去實現。</p>
    </section>
  </div>




  <div className="Card1">
    <section className="Card1front">
    <img
        className="Teammate1"
        src={CardFront1}
        alt=""
      />
       <img
        className="Coner1"
        src={CardConer}
        alt=""
        />
      <h2 className="Title1">徐翔硯</h2>
      <div class="Linefront1"></div>
      <ul className="List1">
          <li>切版RWD</li>
          <li>首頁、會員註冊/登入</li>
          <li>串接API(FB、GOOGLE登入)</li>
          <li>會員資料庫設計</li>
          <li>後台會員管理</li>
          <li>視覺設計/logo設計</li>
      </ul>
    </section>
    <section
      className="Card1back"
    >
      <img  className="Teammate1back"
        src={CardBack1}
        alt="" />
        <div class="Line1back"></div>
     <p className="Word1back">在期末專題中，我負責的部分為登入註冊系統(含第三方)。<br />會員權限分級、會員中心、動態新增課程(商品)、即時預覽功能。<br />後端程式架構的撰寫(層級分明的路由，共用function打包成module等等)<br />網頁所有提示訊息的統整<br />(打包成module, 給參數即可拿到正確的提示訊息)。
</p>
    </section>
  </div>




  <div className="Card2">
    <section className="Card2front">
    <img
        className="Teammate2"
        src={CardFront1}
        alt=""
      />
      <img
        className="Coner2"
        src={CardConer2}
        alt=""
      />
      <h2 className="Title2">林誠誼</h2>
      <div class="Linefront2"></div>
      <ul className="List2">
          <li>切版RWD</li>
          <li>首頁、會員註冊/登入</li>
          <li>串接API(FB、GOOGLE登入)</li>
          <li>會員資料庫設計</li>
          <li>後台會員管理</li>
          <li>視覺設計/logo設計</li>
      </ul>
    </section>
    <section
      className="Card2back"
    >
       <img
        className="Teammate2back"
        // src={CardBack2}
        alt=""
      />
      <div class="Line2back"></div>
      <p className="Word2back">我負責的部分分為首頁,課程分類,購物車,課程搜尋。
整體的美術設計部分由我規劃統整。<br />購物車的部分,自動紀錄瀏覽者在網站上選擇購買的商品，並且顯示在商品清單中。<br />購物車可以編輯撰寫商品資訊，包含基本CRUD與商品文案的編寫。<br />購買複數商品，將會自動累計購買金額，顯示目前購買總金額。</p>
    </section>
  </div>


  <div className="Card1">
    <section className="Card1front">
    <img
        className="Teammate1"
        src={CardFront1}
        alt=""
      />
       <img
        className="Coner1"
        src={CardConer}
        alt=""
        />
      <h2 className="Title1">鍾禮鴻</h2>
      <div class="Linefront1"></div>
      <ul className="List1">
          <li>切版RWD</li>
          <li>首頁、會員註冊/登入</li>
          <li>串接API(FB、GOOGLE登入)</li>
          <li>會員資料庫設計</li>
          <li>後台會員管理</li>
          <li>視覺設計/logo設計</li>
      </ul>
    </section>
    <section
      className="Card1back"
    >
      <img
        className="Teammate1back"
        src={CardBack1}
        alt=""
      />
      <div class="Line1back"></div>
     <p className="Word1back">我製作了結帳流程頁面，第一個頁面為訂購人資料填寫、學員資料填寫、選擇優惠券並使用。<br />在進入結帳流程後，依舊可以手動更改學員人數。<br />第二個頁面為付款方式確認、收據處理。<br />填入信用卡資料時，左方的卡片會依據卡號顯示對應的卡別<br />並將輸入的資訊顯示在卡片上，快速判別資料是否有誤。<br />第三個頁面為顯示消費明細、付款明細，讓使用者可以確認自己填寫的資料。
</p>
    </section>
  </div>




  <div className="Card2">
    <section className="Card2front">
    <img
        className="Teammate2"
        src={CardFront1}
        alt=""
      />
      <img
        className="Coner2"
        src={CardConer2}
        alt=""
      />
      <h2 className="Title2">李冠亭</h2>
      <div class="Linefront2"></div>
      <ul className="List2">
      <li>切版RWD</li>
          <li>首頁、會員註冊/登入</li>
          <li>串接API(FB、GOOGLE登入)</li>
          <li>會員資料庫設計</li>
          <li>後台會員管理</li>
          <li>視覺設計/logo設計</li>
      </ul>
    </section>
    <section
      className="Card2back">
       <img
        className="Teammate2back"
        // src={CardBack2}
        alt=""
      />
      <div class="Line2back"></div>
      <p className="Word2back">我負責詳細頁面使用axios從資料庫中取得資料<br />根據id抓到對應課程的所有資料。<br />日期梯次按鈕能選擇有這堂課梯次的日期，並更新該梯次<br />剩餘人數點擊下方課程的六個圖片能夠切換各自的介紹討論區<br />能夠觀看學員對該課的評價。
      </p>
    </section>
  </div>

  
    </>
    
  );
};

export default About;