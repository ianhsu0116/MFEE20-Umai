import React from 'react'
import { useState } from 'react'
import CourBody from './CourseInfomation'
// import '../../components/CourseDetailed.css'
import background1 from '../../components/images/test/photoAC設置拌飯.jpg';
import background2 from '../../components/images/test/istock韓風課程.jpg';
import background3 from '../../components/images/test/istock舒食拌飯課程.jpg';

function CourseHeaderPicture(props) {
    const [image1, setImage1] = useState("Coursedetail-headerLeft") //左邊照片
    const [image2, setImage2] = useState("Coursedetail-headerMid") //中間照片
    const [image3, setImage3] = useState("Coursedetail-headerRight") //
  return (
    <>
    <div className="Coursedetail">
      <div className="Coursedetail-header">
      <img  onClick={()=> {
        setImage1("Coursedetail-headerMid")
        setImage2("Coursedetail-headerRight")
        setImage3("Coursedetail-headerLeft")
      }}
      src={background1} alt="" className={image1}></img>
      <img onClick={()=> {
        setImage1("Coursedetail-headerLeft")
        setImage2("Coursedetail-headerMid")
        setImage3("Coursedetail-headerRight")
      }}src={background2} alt="" className={image2}></img>
      <img onClick={()=> {
        setImage1("Coursedetail-headerRight")
        setImage2("Coursedetail-headerLeft")
        setImage3("Coursedetail-headerMid")
      }}src={background3} alt="" className={image3}></img>
      </div>
    </div>
    <CourBody />
    </>
  )
}

export default CourseHeaderPicture