import React from "react";
import CourseCard1 from "../../components/CourseCard1";

const CollectionCourse = (props) => {
  return (
    <div className="CollectionCourse">
      <div className="CollectionCourse-container">
        <header className="CollectionCourse-container-header">
          <h2>收藏課程</h2>
        </header>

        <div className="CollectionCourse-container-cards">
          <CourseCard1 />
          <CourseCard1 />
          <CourseCard1 />
          <CourseCard1 />
          <CourseCard1 />
          <CourseCard1 />
        </div>
      </div>
    </div>
  );
};

export default CollectionCourse;
