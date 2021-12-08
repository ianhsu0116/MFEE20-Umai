import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import CourseMiniCard from "./CourseMiniCard2";
import CourseService from "../services/course.service";
import { PUBLIC_URL } from "../config/config";

function CourseMiniCardSlider(props) {
  const [homepageCourse, setHomepageCourse] = useState([]);

  useEffect(async () => {
    try {
      let homepage = await CourseService.course_homepage();
      console.log(homepage.data.course);
      setHomepageCourse(homepage.data.course);
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
      {console.log(homepageCourse)}
      <div className="SliderTitle">
        <div className="circle"></div>
        <div className="TitleText">{/* <h1>{props.SliderTitle}</h1> */}</div>
      </div>
      <Slider {...settings}>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[0]?.course_image}`}
            courseName={homepageCourse[0]?.course_name}
            chefName={
              homepageCourse[0]?.first_name + homepageCourse[0]?.last_name
            }
            courseBatch={homepageCourse[0]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[0]?.member_limit}
            courseNowQuota={homepageCourse[0]?.closest_batchs.member_count}
            courseLevel={homepageCourse[0]?.course_level}
            coursePrice={homepageCourse[0]?.course_price}
            score_sum={homepageCourse[0]?.score_sum}
            score_count={homepageCourse[0]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[2]?.course_image}`}
            courseName={homepageCourse[2]?.course_name}
            chefName={
              homepageCourse[2]?.first_name + homepageCourse[0]?.last_name
            }
            courseBatch={homepageCourse[2]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[2]?.member_limit}
            courseNowQuota={homepageCourse[2]?.closest_batchs.member_count}
            courseLevel={homepageCourse[2]?.course_level}
            coursePrice={homepageCourse[2]?.course_price}
            score_sum={homepageCourse[2]?.score_sum}
            score_count={homepageCourse[2]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[4]?.course_image}`}
            courseName={homepageCourse[4]?.course_name}
            chefName={
              homepageCourse[4]?.first_name + homepageCourse[0]?.last_name
            }
            courseBatch={homepageCourse[4]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[4]?.member_limit}
            courseNowQuota={homepageCourse[4]?.closest_batchs.member_count}
            courseLevel={homepageCourse[4]?.course_level}
            coursePrice={homepageCourse[4]?.course_price}
            score_sum={homepageCourse[4]?.score_sum}
            score_count={homepageCourse[4]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[6]?.course_image}`}
            courseName={homepageCourse[6]?.course_name}
            chefName={
              homepageCourse[6]?.first_name + homepageCourse[6]?.last_name
            }
            courseBatch={homepageCourse[6]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[6]?.member_limit}
            courseNowQuota={homepageCourse[6]?.closest_batchs.member_count}
            courseLevel={homepageCourse[6]?.course_level}
            coursePrice={homepageCourse[6]?.course_price}
            score_sum={homepageCourse[6]?.score_sum}
            score_count={homepageCourse[6]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[8]?.course_image}`}
            courseName={homepageCourse[8]?.course_name}
            chefName={
              homepageCourse[6]?.first_name + homepageCourse[8]?.last_name
            }
            courseBatch={homepageCourse[8]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[8]?.member_limit}
            courseNowQuota={homepageCourse[8]?.closest_batchs.member_count}
            courseLevel={homepageCourse[8]?.course_level}
            coursePrice={homepageCourse[8]?.course_price}
            score_sum={homepageCourse[8]?.score_sum}
            score_count={homepageCourse[8]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[10]?.course_image}`}
            courseName={homepageCourse[10]?.course_name}
            chefName={
              homepageCourse[10]?.first_name + homepageCourse[10]?.last_name
            }
            courseBatch={homepageCourse[10]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[10]?.member_limit}
            courseNowQuota={homepageCourse[10]?.closest_batchs.member_count}
            courseLevel={homepageCourse[10]?.course_level}
            coursePrice={homepageCourse[10]?.course_price}
            score_sum={homepageCourse[10]?.score_sum}
            score_count={homepageCourse[10]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[2]?.course_image}`}
            courseName={homepageCourse[12]?.course_name}
            chefName={
              homepageCourse[12]?.first_name + homepageCourse[12]?.last_name
            }
            courseBatch={homepageCourse[12]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[12]?.member_limit}
            courseNowQuota={homepageCourse[12]?.closest_batchs.member_count}
            courseLevel={homepageCourse[12]?.course_level}
            coursePrice={homepageCourse[12]?.course_price}
            score_sum={homepageCourse[12]?.score_sum}
            score_count={homepageCourse[12]?.score_count}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[14]?.course_image}`}
            courseName={homepageCourse[14]?.course_name}
            chefName={
              homepageCourse[14]?.first_name + homepageCourse[14]?.last_name
            }
            courseBatch={homepageCourse[14]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[14]?.member_limit}
            courseNowQuota={homepageCourse[14]?.closest_batchs.member_count}
            courseLevel={homepageCourse[14]?.course_level}
            coursePrice={homepageCourse[14]?.course_price}
            score_sum={homepageCourse[14]?.score_sum}
            score_count={homepageCourse[14]?.score_count}
          />
        </div>
      </Slider>
    </>
  );
}
export default CourseMiniCardSlider;
