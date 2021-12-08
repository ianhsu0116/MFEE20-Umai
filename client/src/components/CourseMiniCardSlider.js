import React, { Component , useState, useEffect } from "react";
import Slider from "react-slick";
import CourseMiniCard from "./CourseMiniCard2";
import CourseService from "../services/course.service";



function CourseMiniCardSlider(props){

  const [homepageCourse , setHomepageCourse] = useState([])

    useEffect(async () => {
      try {
        let homepage = await CourseService.course_homepage();
        setHomepageCourse(homepage.data)
      } catch (error) {
        console.log(error);
      }
    }, []);

    var settings = {
      dots: true,
      // infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      accessibility: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    };
    return (
      <>
        <div className="SliderTitle">
          <div className="circle"></div>
          <div className="TitleText">
            {/* <h1>{props.SliderTitle}</h1> */}
          </div>
        </div>
        <Slider {...settings}>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
          <div className="CourseMiniCardWrapper">
            <CourseMiniCard />
          </div>
        </Slider>
      </>
    );
  }
export default CourseMiniCardSlider
