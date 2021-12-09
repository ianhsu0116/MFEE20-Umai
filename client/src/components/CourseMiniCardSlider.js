import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import CourseMiniCard from "./CourseMiniCard2";
import CourseService from "../services/course.service";
import { PUBLIC_URL } from "../config/config";

function CourseMiniCardSlider(props) {
  let { SliderTitle, tag } = props;
  const [homepageCourse, setHomepageCourse] = useState([]);

  useEffect(async () => {
    try {
      let homepage = await CourseService.course_homepage();
      let TrueArrow = [...homepage.data.course].filter(function (item) {
        return item.closest_batchs?.batch_date != null;
      });
    
      setHomepageCourse(TrueArrow);
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
          <h1>{SliderTitle}</h1>
        </div>
      </div>
      <Slider {...settings}>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[0]?.course_image}`}
            courseName={homepageCourse[0]?.course_name}
            chefName={
              homepageCourse[0]?.first_name +" "+ homepageCourse[0]?.last_name
            }
            courseBatch={homepageCourse[0]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[0]?.member_limit}
            courseNowQuota={homepageCourse[0]?.closest_batchs.member_count}
            courseLevel={homepageCourse[0]?.course_level}
            coursePrice={homepageCourse[0]?.course_price}
            score_sum={homepageCourse[0]?.score_sum}
            score_count={homepageCourse[0]?.score_count}
            id={homepageCourse[0]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[1]?.course_image}`}
            courseName={homepageCourse[1]?.course_name}
            chefName={
              homepageCourse[1]?.first_name +" "+ homepageCourse[1]?.last_name
            }
            courseBatch={homepageCourse[1]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[1]?.member_limit}
            courseNowQuota={homepageCourse[1]?.closest_batchs.member_count}
            courseLevel={homepageCourse[1]?.course_level}
            coursePrice={homepageCourse[1]?.course_price}
            score_sum={homepageCourse[1]?.score_sum}
            score_count={homepageCourse[1]?.score_count}
            id={homepageCourse[1]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[3]?.course_image}`}
            courseName={homepageCourse[3]?.course_name}
            chefName={
              homepageCourse[3]?.first_name +" "+ homepageCourse[0]?.last_name
            }
            courseBatch={homepageCourse[3]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[3]?.member_limit}
            courseNowQuota={homepageCourse[3]?.closest_batchs.member_count}
            courseLevel={homepageCourse[3]?.course_level}
            coursePrice={homepageCourse[3]?.course_price}
            score_sum={homepageCourse[3]?.score_sum}
            score_count={homepageCourse[3]?.score_count}
            id={homepageCourse[3]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[4]?.course_image}`}
            courseName={homepageCourse[4]?.course_name}
            chefName={
              homepageCourse[4]?.first_name +" "+ homepageCourse[4]?.last_name
            }
            courseBatch={homepageCourse[4]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[4]?.member_limit}
            courseNowQuota={homepageCourse[4]?.closest_batchs.member_count}
            courseLevel={homepageCourse[4]?.course_level}
            coursePrice={homepageCourse[4]?.course_price}
            score_sum={homepageCourse[4]?.score_sum}
            score_count={homepageCourse[4]?.score_count}
            id={homepageCourse[4]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[2]?.course_image}`}
            courseName={homepageCourse[2]?.course_name}
            chefName={
              homepageCourse[2]?.first_name +" "+ homepageCourse[2]?.last_name
            }
            courseBatch={homepageCourse[2]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[2]?.member_limit}
            courseNowQuota={homepageCourse[2]?.closest_batchs.member_count}
            courseLevel={homepageCourse[2]?.course_level}
            coursePrice={homepageCourse[2]?.course_price}
            score_sum={homepageCourse[2]?.score_sum}
            score_count={homepageCourse[2]?.score_count}
            id={homepageCourse[2]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[5]?.course_image}`}
            courseName={homepageCourse[5]?.course_name}
            chefName={
              homepageCourse[5]?.first_name +" "+ homepageCourse[5]?.last_name
            }
            courseBatch={homepageCourse[5]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[5]?.member_limit}
            courseNowQuota={homepageCourse[5]?.closest_batchs.member_count}
            courseLevel={homepageCourse[5]?.course_level}
            coursePrice={homepageCourse[5]?.course_price}
            score_sum={homepageCourse[5]?.score_sum}
            score_count={homepageCourse[5]?.score_count}
            id={homepageCourse[5]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[2]?.course_image}`}
            courseName={homepageCourse[6]?.course_name}
            chefName={
              homepageCourse[6]?.first_name +" "+ homepageCourse[6]?.last_name
            }
            courseBatch={homepageCourse[6]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[6]?.member_limit}
            courseNowQuota={homepageCourse[6]?.closest_batchs.member_count}
            courseLevel={homepageCourse[6]?.course_level}
            coursePrice={homepageCourse[6]?.course_price}
            score_sum={homepageCourse[6]?.score_sum}
            score_count={homepageCourse[6]?.score_count}
            id={homepageCourse[6]?.id}
            tag={tag}
          />
        </div>
        <div className="CourseMiniCardWrapper">
          <CourseMiniCard
            coursePicture={`${PUBLIC_URL}/upload-images/${homepageCourse[7]?.course_image}`}
            courseName={homepageCourse[7]?.course_name}
            chefName={
              homepageCourse[7]?.first_name +" "+ homepageCourse[7]?.last_name
            }
            courseBatch={homepageCourse[7]?.closest_batchs.batch_date}
            courseQuota={homepageCourse[7]?.member_limit}
            courseNowQuota={homepageCourse[7]?.closest_batchs.member_count}
            courseLevel={homepageCourse[7]?.course_level}
            coursePrice={homepageCourse[7]?.course_price}
            score_sum={homepageCourse[7]?.score_sum}
            score_count={homepageCourse[7]?.score_count}
            id={homepageCourse[7]?.id}
            tag={tag}
          />
        </div>
      </Slider>
    </>
  );
}
export default CourseMiniCardSlider;
