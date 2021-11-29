import React, { Component } from "react";
import Slider from "react-slick";
import ChefCard from "../ChefCard";

export default class Responsive extends Component {
  render() {
    var settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "1200px",
      slidesToShow: 3,
      speed: 500,
      // dots: true,
      // accessibility: true,
    };
    return (
      <div className="ChefCardSlider">
        <div className="SliderTitle">
          <div className="TitleText">
            <h1>豪華主廚陣容</h1>
          </div>
        </div>
        <Slider {...settings}>
          <div className="ChefCardWrapper">
            <ChefCard />
          </div>
          <div className="ChefCardWrapper">
            <ChefCard />
          </div>
          <div className="ChefCardWrapper">
            <ChefCard />
          </div>
        </Slider>
        {/* <div className="chefIntroductionWrapper">
          <div className="chefIntroductionHeading">
            <h1>豪華主廚陣容</h1>
            <img className="HeadingUnderline" src={HeadingUnderline} alt="" />
          </div>
          <div className="chefIntroductionContentWrapper">
            <div className="chefIntroductionContent">
              <ChefCard />
            </div>
            <div className="chefIntroductionContent">
              <ChefCard />
            </div>
            <div className="chefIntroductionContent">
              <ChefCard />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
