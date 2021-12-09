import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Player } from "video-react";

import MultiLevelBreadcrumb from "../../components/MultiLevelBreadcrumb";
import LoadMoreButton from "../../components/LoadMoreButton";
import CourseCard from "../../components/CourseCard1";

import CategoryService from "../../services/category.service";
import CourseService from "../../services/course.service";
import getValidMessage from "../../validMessage/validMessage";
import { PUBLIC_URL } from "../../config/config";
import { number } from "joi";
import Swal from "sweetalert2";

function Course(props) {
  const {
    location,
    currentUser,
    link,
    setLink,
    data,
    setData,
    // clearNewAddCourse,
    // addCourseIntoCart,
    // checkoutCourse,
    // setCheckoutCourse,
  } = props;
  // 抓search用 Ex category?... search抓到?...
  let category_number = location.search.slice(1);

  // 當前所有收藏課程
  const [currentCourses, setCurrentCourses] = useState([]);

  // 當前使用者所有的收藏課程id
  const [collectionIds, setCollectionIds] = useState([]);

  // 各式影片 預設日式
  const [categoryVideo, setCategoryVideo] = useState("Japan");

  useEffect(() => {
    setCategoryVideo(category_number);
  }, []);
  // 判斷剛近來有沒有登入
  useEffect(() => {
    if (currentUser) {
      console.log("我有登入");
    } else console.log("我沒登入");
  }, []);

  //用來判斷有沒有登入(原本沒登入按登入)
  useEffect(() => {
    if (currentUser) {
      refreshCollection();
    }
  }, [currentUser]);

  // 重整當前收藏課程
  let refreshCollection = async () => {
    try {
      let result = await CourseService.course_collection(currentUser.id);

      // 如果這次沒回傳任何course
      if (!result.data.course) {
        setCurrentCourses([]);
        setCollectionIds([]);
        return;
      }

      // 設定當前課程的資料Array
      setCurrentCourses(result.data.course);

      // 設定當前使用者的所有收藏課程Array
      setCollectionIds(result.data.course.map((item) => item.id));
    } catch (error) {
      console.log(error.response);
      let { code } = error.response.data;

      // 跳通知
      Swal.fire({
        icon: "error",
        title: getValidMessage("course", code),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // 拿到此會員的收藏課程
  useEffect(async () => {
    try {
      if (currentUser) {
        refreshCollection();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 加入/移除收藏
  const handleAddIntoCollection = async (course_id) => {
    if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "請先登入後再進行操作哦！",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // 判斷此課程是否在收藏內
    let type = collectionIds.includes(course_id);

    try {
      let result = await CourseService.course_collection_edit(
        currentUser.id,
        course_id,
        type
      );
      if (type) {
        // 跳通知
        Swal.fire({
          icon: "success",
          title: "課程收藏刪除成功！",
          showConfirmButton: false,
          timer: 1500,
        });
      } else
        Swal.fire({
          icon: "success",
          title: "課程收藏成功！",
          showConfirmButton: false,
          timer: 1500,
        });

      // 拿到更新後的課程收藏
      if (currentUser) {
        refreshCollection();
      }
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

  const [selectedOptionLevel, setSelectedOptionLevel] = useState("");
  const [selectedOptionDate, setSelectedOptionDate] = useState("");
  const [selectedOptionStart, setSelectedOptionStart] = useState("");

  const [categoryname, setCategoryname] = useState("");

  // 設定一個會變得陣列
  const [category, setCategory] = useState([{}]);

  //設定一個不會動的陣列
  const [categoryOrigin, setCategoryOrigin] = useState([]);

  //設定一個專門存課程等級的陣列
  const [categoryLevel, setCategoryLevel] = useState([]);

  //設定一個專門存篩選後的陣列
  const [categoryCondition, setCategoryCondition] = useState([]);

  // 當前頁碼
  const [page, setPage] = useState(1);
  // 一頁顯示幾筆
  const [perPage, setPerPage] = useState(6);
  // 裝每頁要顯示的資料
  const [pageData, setPageData] = useState([]);
  // LoadMoreButton 是否顯示
  const [loadMoreShow, setLoadMoreShow] = useState(false);

  useEffect(async () => {
    try {
      let result = await CategoryService.categoryID(category_number);

      setCategory(result.data.courseDetail);
      setCategoryOrigin(result.data.courseDetail);
      setCategoryLevel(result.data.courseDetail);

      // 頁碼回歸成第一頁
      setPage(1);

      // loadMoreShow 回歸預設值(關閉)
      setLoadMoreShow(false);

      console.log(result.data.courseDetail.slice(0, perPage));
      // 放入當前頁面需要資料
      setPageData(result.data.courseDetail.slice(0, perPage));

      // 確認是否需要顯示LoadMore
      if (
        result.data.courseDetail.length >
        result.data.courseDetail.slice(0, perPage).length
      )
        setLoadMoreShow(true);

      return;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      let result = await CategoryService.categoryLength(category_number);
      setCategoryname(result.data.category_length[0].category_name);
      return;
    } catch (error) {
      console.log(error);
    }
  }, []);

  //載入更多
  const handleLoadMore = () => {
    let newPage = page;
    newPage = newPage + 1;
    setPage(newPage);
  };

  useEffect(() => {
    // 第二頁後再開始
    if (page > 1) {
      // 這次要拿幾筆
      let start = (page - 1) * perPage;
      console.log(start, perPage);

      // 模擬去拿新資料
      let newData = category.slice(start, start + perPage);

      // 將資料裝入pageData
      setPageData([...pageData, ...newData]);

      // 如果拿到的資料 < 每夜應該拿的資料
      // 代表拿完這次後就沒資料了
      // 關閉LoadMoreButton
      if (newData.length < perPage) return setLoadMoreShow(false);
    }
  }, [page]);

  if (location.search != "") {
    if (
      category_number == "Japan" ||
      category_number == 1 ||
      category_number == "%E6%97%A5%E5%BC%8F%E6%96%99%E7%90%86"
    ) {
      category_number = 1;
    } else if (
      category_number == "Korea" ||
      category_number == 2 ||
      category_number == "%E9%9F%93%E5%BC%8F%E6%96%99%E7%90%86"
    ) {
      category_number = 2;
    } else if (
      category_number == "France" ||
      category_number == 3 ||
      category_number == "%E6%B3%95%E5%BC%8F%E6%96%99%E7%90%86"
    ) {
      category_number = 3;
    } else if (
      category_number == "Italy" ||
      category_number == 4 ||
      category_number == "%E7%BE%A9%E5%BC%8F%E6%96%99%E7%90%86"
    ) {
      category_number = 4;
    } else if (
      category_number == "Chinese" ||
      category_number == 5 ||
      category_number == "%E4%B8%AD%E5%BC%8F%E6%96%99%E7%90%86"
    ) {
      category_number = 5;
    } else if (
      category_number == "Mediation" ||
      category_number == 6 ||
      category_number == "%E7%B6%93%E5%85%B8%E8%AA%BF%E9%A3%B2"
    ) {
      category_number = 6;
    } else if (
      category_number == "All" ||
      category_number == 7 ||
      category_number == "all"
    ) {
      category_number = 7;
    } else category_number = 0;
  }

  // NaN資料型態是Number
  // 思路是 拆成兩個陣列(日期正常和日期Null),各自判斷完後再接在一起
  useEffect(() => {
    // 確認是否需要顯示LoadMore
    if (category.length < category.slice(0, perPage).length) {
      setLoadMoreShow(true);
    } else setLoadMoreShow(false);

    if (selectedOptionDate === "離今日最近") {
      console.log(selectedOptionDate);
      // 複製分級的陣列
      let TrueArrow = [...categoryLevel]
        .filter(function (item) {
          return item.closest_batchs?.batch_date != null;
        })
        .sort(function (a, b) {
          //  如果日期正常，進行日期比對，日期大的往後排
          return a.closest_batchs?.batch_date > b.closest_batchs?.batch_date
            ? 1
            : -1;
        });
      let falseArrow = [...categoryLevel].filter(function (item) {
        //  如果日期Null，就不比了，沒意義
        return item.closest_batchs?.batch_date == null;
      });
      // 接在一起
      Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(TrueArrow);
      // 再存一個篩選後的陣列
      setCategoryCondition(TrueArrow);
    }
    // 根據上面相反
    if (selectedOptionDate === "離今日最遠") {
      console.log(selectedOptionDate);
      let TrueArrow = [...categoryLevel]
        .filter(function (item) {
          return item.closest_batchs?.batch_date != null;
        })
        .sort(function (a, b) {
          return a.closest_batchs?.batch_date < b.closest_batchs?.batch_date
            ? 1
            : -1;
        });
      let falseArrow = [...categoryLevel].filter(function (item) {
        return item.closest_batchs?.batch_date == null;
      });
      Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(TrueArrow);
      setCategoryCondition(TrueArrow);
    }

    if (selectedOptionDate === "評分由高到低") {
      let TrueArrow = [...categoryLevel].sort(function (a, b) {
        return (isNaN(a.score_sum / a.score_count)
          ? 0
          : a.score_sum / a.score_count) <
          (isNaN(b.score_sum / b.score_count) ? 0 : b.score_sum / b.score_count)
          ? 1
          : -1;
      });
      setCategory(TrueArrow);
      setCategoryCondition(TrueArrow);
    }

    if (selectedOptionDate === "評分由低到高") {
      let TrueArrow = [...categoryLevel].sort(function (a, b) {
        return (isNaN(a.score_sum / a.score_count)
          ? 0
          : a.score_sum / a.score_count) >
          (isNaN(b.score_sum / b.score_count) ? 0 : b.score_sum / b.score_count)
          ? 1
          : -1;
      });
      setCategory(TrueArrow);
      setCategoryCondition(TrueArrow);
    }
  }, [selectedOptionDate]);

  useEffect(() => {
    // 確認是否需要顯示LoadMore
    if (category.length < category.slice(0, perPage).length) {
      setLoadMoreShow(true);
    } else setLoadMoreShow(false);

    if (selectedOptionStart === "true" && selectedOptionDate === "") {
      let TrueArrow = [...categoryLevel].filter(function (item) {
        return item.closest_batchs?.batch_date != null;
      });

      let falseArrow = [...categoryLevel].filter(function (item) {
        return item.closest_batchs?.batch_date == null;
      });

      Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(TrueArrow);
    } else if (selectedOptionStart === "true" && selectedOptionDate != "") {
      console.log("123");
      setCategory(categoryCondition);
    } else if (selectedOptionStart === "false") {
      let TrueArrow = [...category].filter(function (item) {
        return item.closest_batchs?.batch_date != null;
      });
      setCategory(TrueArrow);
    }
  }, [selectedOptionStart]);

  // 根據level判斷分類 3初2中1高
  // 因為category陣列會被修改，於是使用複製一個不做改變的陣列
  useEffect(() => {
    if (selectedOptionLevel === "") {
      setCategory([...categoryOrigin]);
      //設定等級陣列
      setCategoryLevel([...categoryOrigin]);
      setPageData(category.slice(0, perPage));
    }
    if (selectedOptionLevel === "3") {
      setCategory(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 3;
        })
      );
      setCategoryLevel(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 1;
        })
      );
      setCategoryLevel(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 3;
        })
      );
      setPageData(category.slice(0, perPage));
    }
    if (selectedOptionLevel === "2") {
      setCategory(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 2;
        })
      );
      setCategoryLevel(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 2;
        })
      );
      setPageData(category.slice(0, perPage));
    }
    if (selectedOptionLevel === "1") {
      setCategory(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 1;
        })
      );
      setCategoryLevel(
        [...categoryOrigin].filter(function (item) {
          return item.course_level == 1;
        })
      );
    }
  }, [selectedOptionLevel]);

  useEffect(() => {
    setPage(1);
    setPageData(category.slice(0, perPage));
    console.log(category.length);
    console.log(category.slice(0, perPage).length);
    // 確認是否需要顯示LoadMore
    if (category.length > category.slice(0, perPage).length) {
      setLoadMoreShow(true);
    } else setLoadMoreShow(false);
  }, [category]);

  return (
    <>
      {console.log(pageData)}
      <div className="Course">
        <div className="CourseBreadbox">
          <MultiLevelBreadcrumb />
        </div>
        <div className="CourseCategroy">{categoryname}</div>
        <div className="st-line"></div>
        <div className="CourseRecommendTitle">本週推薦課程</div>

        <div className="CourseVideo">
          <Player
            fluid={false}
            width="100%"
            height="100%"
            muted={true}
            autoPlay={true}
          >
            <source
              src={`${PUBLIC_URL}/upload-images/${categoryVideo + ".mp4"}`}
            />
          </Player>

          <p>
            畫面源自於Youtube，僅供學術交流使用，如有侵權，請通知我們，我們會立即撤下
          </p>
        </div>
        {/* <div className="CourseRecommendTitle">熱門學習組合</div>
      <div className="CourseSixBox"></div> */}
        <div className="CourseCategroy">課程列表</div>
        <div className="st-line"></div>
        <div className="CourseSelect">
          <select
            onChange={(e) => {
              setSelectedOptionLevel(e.target.value);
              setSelectedOptionDate("");
              setSelectedOptionStart("");
            }}
          >
            {/* 3 初級 2 中級 1 高級  */}
            <option value="">全部分類</option>
            <option value="3">初階</option>
            <option value="2">中階</option>
            <option option value="1">
              高階
            </option>
          </select>

          <select
            onChange={(e) => {
              setSelectedOptionDate(e.target.value);
              setSelectedOptionStart("");
            }}
          >
            <option value="" selected={selectedOptionDate == ""}>
              課程排序
            </option>
            <option value="離今日最近">離今日最近</option>
            <option value="離今日最遠">離今日最遠</option>
            <option value="評分由高到低">評分由高到低</option>
            <option value="評分由低到高">評分由低到高</option>
          </select>

          <select
            onChange={(e) => {
              setSelectedOptionStart(e.target.value);
            }}
          >
            <option value="" selected={selectedOptionStart == ""}>
              課程顯示
            </option>
            <option value="true">顯示全部課程</option>
            <option value="false">僅開課課程</option>
          </select>
        </div>
        <div className="CourseCard">
          {/* {categoryCard} */}
          {pageData &&
            pageData.map((orderDetail, index) => (
              <CourseCard
                key={index}
                index={index}
                courseDetail={category[index]}
                collectionIds={collectionIds} //判斷是否收藏(可以給空)
                handleAddIntoCollection={handleAddIntoCollection} //加入收藏
                handleAddIntoCart={handleAddIntoCart} //加入購物車
                handlePurchase={handlePurchase} //直接購買
                link={link}
                setLink={setLink}
                data={data}
                setData={setData}
                currentUser={currentUser}
                // clearNewAddCourse={clearNewAddCourse}
                // addCourseIntoCart={addCourseIntoCart}
                // checkoutCourse={checkoutCourse}
                // setCheckoutCourse={setCheckoutCourse}
              />

              // <CourseCard
              //   courseDetail={category[i]}
              //   // collectionIds={["1"]} //判斷是否收藏(可以給空)
              //   // handleAddIntoCollection={122} //加入收藏
              //   // handleAddIntoCart={5464} //加入購物車
              //   // handlePurchase={4564} //直接購買
              //   clearNewAddCourse={clearNewAddCourse}
              //   addCourseIntoCart={addCourseIntoCart}
              //   checkoutCourse={checkoutCourse}
              //   setCheckoutCourse={setCheckoutCourse}
              // />
            ))}
        </div>

        <div className="CourseCard-moreButton">
          {loadMoreShow && (
            <div className="OrderInfo-container-buttonCon">
              <LoadMoreButton onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withRouter(Course);
