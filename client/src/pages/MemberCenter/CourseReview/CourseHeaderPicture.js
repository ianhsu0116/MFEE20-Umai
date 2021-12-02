import React from "react";
import CircleOrange from "../../../components/images/circle_orange.svg";

function CourseHeaderPicture(props) {
  let { image1, image2, image3 } = props;
  return (
    <>
      <img
        className="orangeEx CourseDecorate_RWDEx"
        src={CircleOrange}
        alt=""
      ></img>
      <div className="Coursedetail">
        <div
          id="carouselExampleIndicators"
          className="carousel slide CourseDetail-headerPicture"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={image1}
                class="CourseDetail-headerPicture-img d-block w-100"
                alt="..."
              ></img>
            </div>
            <div class="carousel-item">
              <img
                src={image2}
                class="CourseDetail-headerPicture-img d-block w-100"
                alt="..."
              ></img>
            </div>
            <div class="carousel-item">
              <img
                src={image3}
                class="CourseDetail-headerPicture-img d-block w-100"
                alt="..."
              ></img>
            </div>
          </div>
          <button
            class="carousel-control-prev Course-headerPictureButton"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next Course-headerPictureButton"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default CourseHeaderPicture;
