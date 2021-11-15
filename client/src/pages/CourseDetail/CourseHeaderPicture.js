import React from 'react'
import { useState } from 'react'
import CourBody from './CourseInfomation'
// import '../../components/CourseDetailed.css'
import background1 from '../../components/images/sushi-unsplash.jpg';
import background2 from '../../components/images/test/istock韓風課程.jpg';
import background3 from '../../components/images/test/istock舒食拌飯課程.jpg';

function CourseHeaderPicture(props) {
    const [image1, setImage1] = useState("Coursedetail-headerLeft") //左邊照片
    const [image2, setImage2] = useState("Coursedetail-headerMid") //中間照片
    const [image3, setImage3] = useState("Coursedetail-headerRight") //
  return (
    <>
    <div className="Coursedetail">
    <div id="carouselExampleIndicators" className="carousel slide CourseDetail-headerPicture" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={background1} class="d-block w-100" alt="..."></img>
    </div>
    <div class="carousel-item">
      <img src={background2} class="d-block w-100" alt="..."></img>
    </div>
    <div class="carousel-item">
      <img src={background3} class="d-block w-100" alt="..."></img>
    </div>
  </div>
  <button class="carousel-control-prev Course-leftButton" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next Course-RightButton" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
    
    <CourBody />
    </>
  )
}

export default CourseHeaderPicture