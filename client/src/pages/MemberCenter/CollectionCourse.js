import React, { useState, useEffect } from "react";
import CourseService from "../../services/course.service";
import getValidMessage from "../../validMessage/validMessage";
import CourseCard1 from "../../components/CourseCard1";

const CollectionCourse = (props) => {
  const { currentUser } = props;

  // 當前所有收藏課程
  const [currentCourses, setCurrentCourses] = useState([]);

  // 拿到此會員的收藏課程
  useEffect(async () => {
    try {
      let result = await CourseService.course_collection(currentUser.id);
      setCurrentCourses(result.data.course);
    } catch (error) {
      console.log(error.response);
      // let { code } = error.response.data;
      // setErrorMsg(getValidMessage("course", code));
    }
  }, []);
  return (
    <div className="CollectionCourse">
      <div className="CollectionCourse-container">
        <header className="CollectionCourse-container-header">
          <h2>收藏課程</h2>
        </header>

        <div className="CollectionCourse-container-cards">
          {currentCourses &&
            currentCourses.map((data) => <CourseCard1 courseDetail={data} />)}
          {currentCourses && currentCourses.length === 0 && (
            <p>目前您還沒有任何收藏呦，趕緊去課程探索逛逛吧！</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCourse;
