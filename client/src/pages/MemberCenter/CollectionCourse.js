import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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

    // 如果這次沒回傳任何course
    if (!result.data.course) {
      console.log("good");
      setCurrentCourses([]);
      setCollectionIds([]);
      return;
    }

    // 設定當前課程的資料Array
    setCurrentCourses(result.data.course);

    // 設定當前使用者的所有收藏課程Array
    setCollectionIds(result.data.course.map((item) => item.id));
  };

  // 拿到此會員的收藏課程
  useEffect(() => {
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

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "課程收藏刪除成功！",
        showConfirmButton: false,
        timer: 1500,
      });

      // 拿到更新後的課程收藏
      refreshCollection();
    } catch (error) {
      console.log(error.response);
      // let { code } = error.response.data;
      // setErrorMsg(getValidMessage("course", code));
    }
  };

  // 加入購物車
  const handleAddIntoCart = (course_id) => {
    console.log("加入購物車");
    console.log(course_id);
  };

  // 立即購買
  const handlePurchase = (course_id) => {
    console.log("立即訂購");
    console.log(course_id);
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
                handleAddIntoCart={handleAddIntoCart}
                handlePurchase={handlePurchase}
              />
            ))}
          {currentCourses.length === 0 && (
            <div className="MemberCenter-defaultText">
              目前您還沒有收藏任何課程喔！趕緊去
              <Link to="/courses">課程探索</Link>
              逛逛吧！
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCourse;
