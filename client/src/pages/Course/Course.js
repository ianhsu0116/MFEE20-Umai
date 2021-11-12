import React, { useState } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import CourseCard_Course from './CourseCard_Course'
import Test from './test1'


function Course (props){

  const [selectedOptionLevel, setSelectedOptionLevel] = useState('')
  const [selectedOptionDate, setSelectedOptionDate] = useState('')
  const [selectedOptionStart, setSelectedOptionStart] = useState('')

  const [dataC, setDataC] = useState('')

  return (
    <>
    <Test setData={setDataC} />
    {console.log(props)}
    <div className="Course">
    <div className="CourseBreadbox"><MultiLevelBreadcrumb /></div>
    <div className="CourseCategroy">{dataC}</div>
    <div className="st-line"></div>
    <div className="CourseRecommendTitle">本週推薦課程</div>
    <div className="CourseVideo"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/MKdvHnTk0xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    <div className="CourseRecommendTitle">熱門學習組合</div>
    <div className="CourseSixBox"></div>
    <div className="CourseCategroy">課程列表</div>
    <div className="st-line"></div>
    <div className="CourseSelect">
      <select
        value={selectedOptionLevel}
        onChange={(e) => {
          setSelectedOptionLevel(e.target.value)
        }}
      >
        <option value="">課程分級</option>
        <option value="初級">初級</option>
        <option value="中級">中級</option>
        <option value="高級">高級</option>
      </select>
      <select
        value={selectedOptionDate}
        onChange={(e) => {
          setSelectedOptionDate(e.target.value)
        }}
      >
        <option value="">上課時間</option>
        <option value="離今日最近">離今日最近</option>
        <option value="離今日最遠">離今日最遠</option>
      </select>
      <select
        value={selectedOptionStart}
        onChange={(e) => {
          setSelectedOptionStart(e.target.value)
        }}
      >
        <option value="">課程評價</option>
        <option value="全部評價">全部評價</option>
        <option value="1星以上">1星以上</option>
        <option value="2星以上">2星以上</option>
        <option value="3星以上">3星以上</option>
        <option value="4星以上">4星以上</option>
      </select>
    </div>
        <div className="CourseCard">
        <CourseCard_Course />
        <CourseCard_Course />
        <CourseCard_Course />
        <CourseCard_Course />
        <CourseCard_Course />
        <CourseCard_Course />
        
        </div>
    </div>
    </>
  );
};

export default Course;