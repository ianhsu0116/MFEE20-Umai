import React, { useState } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import headerPicture from "../../components/images/about/cocktail1.jpg"
import CardFront1 from "../../components/images/about/CardFront1.jpg"
import CardBack1 from "../../components/images/about/CardBack1.png"
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
      <h2 className="Title1">蔡泊</h2>
      <div class="Linefront"></div>
      {/* <p className="Word1">
        使用技能組合
      </p> */}
      <ul className="List">
          <li>photoshop</li>
          <li>illustrator</li>
          <li>adobe xd</li>
          <li>html/css</li>
          <li>react.js</li>
          <li>javascript</li>
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
      <div class="Lineback"></div>
      <p className="Word1back">在美術設計的部份使用了photoshop跟xd製作設計稿,logo的部分則是使用illustrtator。<br />在網頁製作的部份整體是使用react框架<br />以html和css去攥寫網頁大部分的功能和樣式,包括卡片翻轉<br />在彈跳式視窗的部份則是使用了javascript和引入插件去實現。
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
      <h2 className="Title2">蔡泊</h2>
      <p className="Word2">
        希望成為前端工程師的男人
        <br />
        目前正努力朝著目標邁進
      </p>
    </section>
    <section
      className="Card2back"
    >
    <img
        className="Teammate2back"
        src="images/loginPageBackground.jpg"
        alt=""
      />
      <h2>Back Side</h2>
      <p></p>
    </section>
  </div>

  <div className="Card1">
    <section className="Card1front">
      <img
        className="Teammate1"
        src="images/andriyko-podilnyk-gEV78HNZOqQ-unsplash.jpg"
        alt=""
      />
      <h2 className="Title1">蔡泊</h2>
      <p className="Word1">
        希望成為前端工程師的男人
        <br />
        目前正努力朝著目標邁進
      </p>
    </section>
    <section
      className="Card1back"
    >
      <h2>Back Side</h2>
      <p></p>
    </section>
  </div>


  <div className="Card2">
    <section className="Card2front">
      <img
        className="Teammate2"
        src="images/andriyko-podilnyk-gEV78HNZOqQ-unsplash.jpg"
        alt=""
      />
      <h2 className="Title2">蔡泊</h2>
      <p className="Word2">
        希望成為前端工程師的男人
        <br />
        目前正努力朝著目標邁進
      </p>
    </section>
    <section
      className="Card2back"
    >
      <h2>Back Side</h2>
      <p></p>
    </section>
  </div>


  <div className="Card1">
    <section className="Card1front">
      <img
        className="Teammate1"
        src="images/andriyko-podilnyk-gEV78HNZOqQ-unsplash.jpg"
        alt=""
      />
      <h2 className="Title1">蔡泊</h2>
      <p className="Word1">
        希望成為前端工程師的男人
        <br />
        目前正努力朝著目標邁進
      </p>
    </section>
    <section
      className="Card1back"
    >
      <h2>Back Side</h2>
      <p></p>
    </section>
  </div>


  <div className="Card2">
    <section className="Card2front">
      <img
        className="Teammate2"
        src="images/andriyko-podilnyk-gEV78HNZOqQ-unsplash.jpg"
        alt=""
      />
      <h2 className="Title2">蔡泊</h2>
      <p className="Word2">
        希望成為前端工程師的男人
        <br />
        目前正努力朝著目標邁進
      </p>
    </section>
    <section
      className="Card2back">
      <h2>Back Side</h2>
      <p></p>
    </section>
  </div>

  
    </>
    
  );
};

export default About;