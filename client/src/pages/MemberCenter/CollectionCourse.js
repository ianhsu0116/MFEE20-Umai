import React, { useState, useEffect } from "react";
import CourseService from "../../services/course.service";
import getValidMessage from "../../validMessage/validMessage";
import CourseCard1 from "../../components/CourseCard1";
import CourseReview from "./CourseReview";

const CollectionCourse = (props) => {
  const { currentUser } = props;

  // 當前所有收藏課程
  const [currentCourses, setCurrentCourses] = useState([]);

  // 當前使用者所有的收藏課程id
  const [collectionIds, setCollectionIds] = useState([]);

  // 重整當前收藏課程
  let refreshCollection = async () => {
    let result = await CourseService.course_collection(currentUser.id);

    // 設定當前課程的資料Array
    setCurrentCourses(result.data.course);

    // 設定當前使用者的所有收藏課程Array
    setCollectionIds(result.data.course.map((item) => item.id));
  };

  // 拿到此會員的收藏課程
  useEffect(async () => {
    try {
      refreshCollection();
    } catch (error) {
      console.log(error);
      // let { code } = error.response.data;
      // setErrorMsg(getValidMessage("course", code));
    }
  }, []);

  // 加入/移除收藏
  const handleAddIntoCollection = async (course_id) => {
    // 判斷此課程是否在收藏內
    let type = collectionIds.includes(course_id);

    try {
      let result = await CourseService.course_collection_edit(
        currentUser.id,
        course_id,
        type
      );
      console.log(result);

      // 拿到更新後的課程收藏
      refreshCollection();
    } catch (error) {
      console.log(error.response);
      // let { code } = error.response.data;
      // setErrorMsg(getValidMessage("course", code));
    }
  };
  return (
    <div className="CollectionCourse">
      <div className="CollectionCourse-container">
        <header className="CollectionCourse-container-header">
          <h2>收藏課程</h2>
        </header>

        <div className="CollectionCourse-container-cards">
          {currentCourses &&
            currentCourses.map((data) => (
              <CourseCard1
                key={data.id}
                courseDetail={data}
                collectionIds={collectionIds}
                handleAddIntoCollection={handleAddIntoCollection}
              />
            ))}
          {currentCourses && currentCourses.length === 0 && (
            <p>目前您還沒有任何收藏呦，趕緊去課程探索逛逛吧！</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCourse;
