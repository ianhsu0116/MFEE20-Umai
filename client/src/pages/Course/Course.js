import React, { useState , useEffect } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import Swal from "sweetalert2";

import { withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../config/config";

import CourseCard from "../../components/CourseCard1";

import CategoryService from "../../services/category.service";
import getValidMessage from "../../validMessage/validMessage";
import { number } from "joi";

import LoadMoreButton from "../../components/LoadMoreButton";

function Course (props){

  const { location } = props;
  let category_number = location.search.slice(1);

  const [selectedOptionLevel, setSelectedOptionLevel] = useState('')
  const [selectedOptionDate, setSelectedOptionDate] = useState('')
  const [selectedOptionStart, setSelectedOptionStart] = useState('')

  const [categoryname, setCategoryname] = useState('')

  const [category , setCategory] = useState([{
   
  }])

  //設定一個不會動的陣列
  const [categoryOrigin , setCategoryOrigin] = useState([
  ])

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
      setCategory(result.data.courseDetail)
      setCategoryOrigin(result.data.courseDetail)
      setCategoryname(result.data.categoryID[0].category_name)

      // 頁碼回歸成第一頁
      setPage(1);

      // loadMoreShow 回歸預設值(關閉)
      setLoadMoreShow(false);

      // 放入當前頁面需要資料
      setPageData(result.data.courseDetail.slice(0, perPage));

      // 確認是否需要顯示LoadMore
      if (result.data.courseDetail.length > result.data.courseDetail.slice(0, perPage).length)
        setLoadMoreShow(true);
    

      return
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

  if(location.search != ""){
    if(category_number == "Japan" || category_number == 1 || category_number == "%E6%97%A5%E5%BC%8F%E6%96%99%E7%90%86" ){
      category_number = 1
      console.log(category_number)
    } else if(category_number == "Korea" || category_number == 2 || category_number == "%E9%9F%93%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 2
    } else if(category_number == "France" || category_number == 3 || category_number == "%E6%B3%95%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 3
    } else if(category_number == "Italy" || category_number == 4 || category_number == "%E7%BE%A9%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 4
    } else if(category_number == "Chinese" || category_number == 5 || category_number == "%E4%B8%AD%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 5
    } else if(category_number == "Mediation" || category_number == 6 || category_number == "%E7%B6%93%E5%85%B8%E8%AA%BF%E9%A3%B2"){
      category_number = 6
    } else if(category_number == "All" || category_number == 7 || category_number == "all"){
      category_number = 7
    } else category_number = 0}


  // NaN資料型態是Number
  // 思路是 拆成兩個陣列(日期正常和日期Null),各自判斷完後再接在一起
  useEffect(()=> {

    // 確認是否需要顯示LoadMore
    // 確認是否需要顯示LoadMore
    if (category.length < category.slice(0, perPage).length){
    setLoadMoreShow(true);}
    else(setLoadMoreShow(false))

    if(selectedOptionDate === "離今日最近"){
      let TrueArrow = [...category].filter(function(item){
        return item.closest_batchs?.batch_date != null
     }).sort(function (a, b) {
      //  如果日期正常，進行日期比對，日期大的往後排
       return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
    })
    let falseArrow = [...category].filter(function(item){
       //  如果日期Null，就不比了，沒意義
      return item.closest_batchs?.batch_date == null
   })
    // 接在一起
   Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(
        TrueArrow
      );
  }
  // 根據上面相反
  if(selectedOptionDate === "離今日最遠"){
    let TrueArrow = [...category].filter(function(item){
      return item.closest_batchs?.batch_date != null
   }).sort(function (a, b) {
     return a.closest_batchs?.batch_date <  b.closest_batchs?.batch_date  ? 1 : -1;
  })
  let falseArrow = [...category].filter(function(item){
    return item.closest_batchs?.batch_date == null
 })
  Array.prototype.push.apply(TrueArrow, falseArrow);
    setCategory(
      TrueArrow
    );}
  },[selectedOptionDate]);
  
  useEffect(()=> {

    
    // 確認是否需要顯示LoadMore
    if (category.length < category.slice(0, perPage).length){
    setLoadMoreShow(true);}
    else(setLoadMoreShow(false))

    if(selectedOptionStart === "評分由高到低" && selectedOptionDate === "離今日最近"){
      let TrueArrow = [...category].filter(function(item){
        return item.closest_batchs?.batch_date != null
     }).sort(function (a, b) {
      //  這邊必須先排分數再排日期，分數排好再排日期就能剛好是指定日期後去比評分
      //  總分/評分人數 先判斷數再去比大小
        return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
        }).sort(function (a, b) {
       return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
    })

//     let falseArrow = [...category].filter(function(item){
//       return item.closest_batchs?.batch_date == null
//    }).sort(function (a, b) {
//     return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
//     }).sort(function (a, b) {
//    return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
// })
//       Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(
        TrueArrow
      );
    } else if(selectedOptionStart === "評分由高到低" && selectedOptionDate === "離今日最遠"){
      let TrueArrow = [...category].filter(function(item){
        return item.closest_batchs?.batch_date != null
     }).sort(function (a, b) {
        return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
        }).sort(function (a, b) {
       return a.closest_batchs?.batch_date <  b.closest_batchs?.batch_date  ? 1 : -1;
    })

//     let falseArrow = [...category].filter(function(item){
//       return item.closest_batchs?.batch_date == null
//    }).sort(function (a, b) {
//     return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
//     }).sort(function (a, b) {
//    return a.closest_batchs?.batch_date <  b.closest_batchs?.batch_date  ? 1 : -1;
// })
//       Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(
        TrueArrow
      );
    }
    else if (selectedOptionStart === "評分由高到低"){
      let TrueArrow = [...category].filter(function(item){
        return item.closest_batchs?.batch_date != null
     }).sort(function (a, b) {
        return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
        })
  //   let falseArrow = [...category].filter(function(item){
  //     return item.closest_batchs?.batch_date == null
  //  }).sort(function (a, b) {
  //   return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
  //   })
  //     Array.prototype.push.apply(TrueArrow, falseArrow);
      setCategory(
        TrueArrow
      );
    }
  if(selectedOptionStart === "評分由低到高" && selectedOptionDate === "離今日最近"){
    let TrueArrow = [...category].filter(function(item){
      return item.closest_batchs?.batch_date != null
   }).sort(function (a, b) {
      return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
      }).sort(function (a, b) {
     return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
  })

//   let falseArrow = [...category].filter(function(item){
//     return item.closest_batchs?.batch_date == null
//  }).sort(function (a, b) {
//   return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
//   }).sort(function (a, b) {
//  return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
// })
//     Array.prototype.push.apply(TrueArrow, falseArrow);
    setCategory(
      TrueArrow
    );
 }  else if(selectedOptionStart === "評分由低到高" && selectedOptionDate === "離今日最遠"){
  let TrueArrow = [...category].filter(function(item){
    return item.closest_batchs?.batch_date != null
 }).sort(function (a, b) {
    return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
    }).sort(function (a, b) {
   return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
})

// let falseArrow = [...category].filter(function(item){
//   return item.closest_batchs?.batch_date == null
// }).sort(function (a, b) {
// return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
// }).sort(function (a, b) {
// return a.closest_batchs?.batch_date >  b.closest_batchs?.batch_date  ? 1 : -1;
// })
//   Array.prototype.push.apply(TrueArrow, falseArrow);
  setCategory(
    TrueArrow
  );
}
 else if (selectedOptionStart === "評分由低到高"){
  let TrueArrow = [...category].filter(function(item){
    return item.closest_batchs?.batch_date != null
 }).sort(function (a, b) {
    return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
    })
// let falseArrow = [...category].filter(function(item){
//   return item.closest_batchs?.batch_date == null
// }).sort(function (a, b) {
// return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
// })
//   Array.prototype.push.apply(TrueArrow, falseArrow);
  setCategory(
    TrueArrow
  );
}
  
  },[selectedOptionStart]);
  
// 根據level判斷分類 3初2中1高
// 因為category陣列會被修改，於是使用複製一個不做改變的陣列
  useEffect(()=> {
    if(selectedOptionLevel === ""){
      setCategory(
        [...categoryOrigin]
      );
      setPageData(category.slice(0, perPage));
  }
    if(selectedOptionLevel === "3"){
      setCategory(
        [...categoryOrigin].filter(function(item){
           return item.course_level == 3
        })
      );
      setPageData(category.slice(0, perPage));
  }
  if(selectedOptionLevel === "2"){
    setCategory(
      [...categoryOrigin].filter(function(item){
         return item.course_level == 2
      })
    );
    setPageData(category.slice(0, perPage));
}
  if(selectedOptionLevel === "1"){
    setCategory(
      [...categoryOrigin].filter(function(item){
        return item.course_level == 1
     })
   );
   }
},[selectedOptionLevel]);

useEffect(() => {
  setPage(1)
  setPageData(category.slice(0, perPage));
  console.log(category.length)
  console.log(category.slice(0, perPage).length)
  // 確認是否需要顯示LoadMore
  if (category.length > category.slice(0, perPage).length){
    setLoadMoreShow(true);}
    else(setLoadMoreShow(false))
}, [category]);

  return (
    <>
    {console.log(category.length)}
    <div className="Course">
      <div className="CourseBreadbox"><MultiLevelBreadcrumb /></div>
      <div className="CourseCategroy">{categoryname}</div>
      <div className="st-line"></div>
      <div className="CourseRecommendTitle">本週推薦課程</div>
      <div className="CourseVideo"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/MKdvHnTk0xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      {/* <div className="CourseRecommendTitle">熱門學習組合</div>
      <div className="CourseSixBox"></div> */}
      <div className="CourseCategroy">課程列表</div>
      <div className="st-line"></div>
        <div className="CourseSelect">
          <select
            onChange={(e) => {
              setSelectedOptionLevel(e.target.value)
              setSelectedOptionDate("");
              setSelectedOptionStart("")
            }}
          >
          {/* 3 初級 2 中級 1 高級  */}
            <option value="">全部分類</option>
            <option value="3">初級</option>
            <option value="2">中級</option>
            <option option value="1">高級</option>
          </select>

          <select
            onChange={(e) => { 
              setSelectedOptionDate(e.target.value)
              setSelectedOptionStart("")
            }}
          >
            <option value="" selected={selectedOptionDate == ''}>上課時間</option>
            <option value="離今日最近">離今日最近</option>
            <option value="離今日最遠">離今日最遠</option>
          </select>

          <select
            onChange={(e) => {
              setSelectedOptionStart(e.target.value)
            }}
          >
            <option value="" selected={selectedOptionStart == ''}>課程評分</option>
            <option value="評分由高到低">評分由高到低</option>
            <option value="評分由低到高">評分由低到高</option>
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
                collectionIds={["1"]} //判斷是否收藏(可以給空)
                handleAddIntoCollection={122} //加入收藏
                handleAddIntoCart={5464} //加入購物車
                handlePurchase={4564} //直接購買
              />
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

export default withRouter (Course);