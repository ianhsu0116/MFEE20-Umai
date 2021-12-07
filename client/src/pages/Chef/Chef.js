import React, { useState , useEffect  } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import ChefCard from '../../components/ChefCard'
import { IoMdArrowDropleft } from "react-icons/io"
import { PUBLIC_URL } from "../../config/config";
import CourseCard from '../../components/CourseCard1'
import Swal from "sweetalert2";
import LoadMoreButton from "../../components/LoadMoreButton";
import MemberService from "../../services/member.service";
import CourseService from "../../services/course.service";
import getValidMessage from "../../validMessage/validMessage";

const Chef = (props) => {

  const {currentUser, setCurrentUser } = props;

  const [active, SetActive] = useState(-1);

  //主廚JSON
  const [chefJSON , setChefJSON] = useState(
  );
  //主廚數量
  const [chefCount , setChefCount] = useState();
  // 設定哪個主廚被選
  const [chefSelect , setChefSelect] = useState();
  // 當前所有收藏課程
  const [currentCourses, setCurrentCourses] = useState([]);

  // 當前使用者所有的收藏課程id
  const [collectionIds, setCollectionIds] = useState([]);

   // 當前頁碼
  const [page, setPage] = useState(1);
  // 一頁顯示幾筆
  const [perPage, setPerPage] = useState(3);
  // 裝每頁要顯示的資料
  const [pageData, setPageData] = useState();
  // LoadMoreButton 是否顯示
  const [loadMoreShow, setLoadMoreShow] = useState(false);
   // 設定主廚開的課
   const [chefCourse , setChefCourse] = useState([{}])

   // 判斷剛近來有沒有登入
   useEffect(() => {
    if(currentUser){
      console.log("我有登入")
    } else (console.log("我沒登入"))
  }, []);

  //用來判斷有沒有登入(原本沒登入按登入)
  useEffect(() => {
    if(currentUser){
      refreshCollection()
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
        if(currentUser){
        refreshCollection();
      }} catch (error) {
        console.log(error);
      }
    }, []);

      // 加入/移除收藏
  const handleAddIntoCollection = async (course_id) => {
    if (!currentUser){
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
        if(type){
      // 跳通知
      Swal.fire({
        icon: "success",
        title: "課程收藏刪除成功！",
        showConfirmButton: false,
        timer: 1500,
      });}else Swal.fire({
        icon: "success",
        title: "課程收藏成功！",
        showConfirmButton: false,
        timer: 1500,
      });

      // 拿到更新後的課程收藏
      if(currentUser){
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


  useEffect(async () => {
    try {
      let result = await MemberService.chefName();
      console.log(result.data.chefs)
      for(let i = 0 ; i < result.data.chefs.length ; i++){
        result.data.chefs[i].chef_introduction = JSON.parse(
        result.data.chefs[i].chef_introduction
      );
      }
      setChefJSON(result.data.chefs);
      setChefCount(result.data.chefs.length)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async() => {
    try {
      let result = await MemberService.chefCourse(chefSelect?.id);
      // 處理拿到的資料
      for(let i = 0 ; i < result.data.chefs.length ; i++){
        result.data.chefs[i].course_detail = JSON.parse(
        result.data.chefs[i].course_detail
      );
        }
        setChefCourse(result.data.chefs)

         // 頁碼回歸成第一頁
      setPage(1);

      // loadMoreShow 回歸預設值(關閉)
      setLoadMoreShow(false);

      // 放入當前頁面需要資料
      console.log(result.data.chefs)
      setPageData(result.data.chefs.slice(0, perPage));

      // // 確認是否需要顯示LoadMore
      if (result.data.chefs.length > result.data.chefs.slice(0, perPage).length)
        setLoadMoreShow(true);
  
      // return

    } catch (error) {
      console.log(error);
    }
  }, [chefSelect]);

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
      let newData = chefCourse.slice(start, start + perPage);

      // 將資料裝入pageData
      setPageData([...pageData, ...newData]);

      // 如果拿到的資料 < 每夜應該拿的資料
      // 代表拿完這次後就沒資料了
      // 關閉LoadMoreButton
      if (newData.length <= perPage) return setLoadMoreShow(false);
    }
  }, [page]);

  useEffect(() => {
    setPage(1)
    setPageData(chefCourse.slice(0, perPage));
    console.log(chefCourse.length)
    console.log(chefCourse.slice(0, perPage).length)
    // 確認是否需要顯示LoadMore
    if (chefCourse.length > chefCourse.slice(0, perPage).length){
      setLoadMoreShow(true);}
      else(setLoadMoreShow(false))
  }, [chefCourse]);
  

 const chefJson = []

  for( let j = 0  ; j < chefCount  ; j++)
  {
    chefJson.push(
      chefJSON[j].first_name + " " + chefJSON[j].last_name
    )}

  let liForLoop = [];

  for( let i = 0  ; i < chefCount  ; i++)
  {
    liForLoop.push(
      // eslint-disable-next-line eqeqeq
      <li className={active == i ? 'chef-li chef-liActive':"chef-li"} id={i} onClick={(e)=> {
        SetActive(e.target.id)
        setChefSelect(chefJSON[i])
        }}>{chefJson[i]}<span className={active == i ? "chef-arrowActive":"chef-arrow"}><IoMdArrowDropleft /></span></li>
    )
  }


  return (
    <>
    {/* {console.log(chefSelect?.first_name)} */}
      <div className="chef-set">
        <div className="CourseBreadbox">
          <MultiLevelBreadcrumb />
        </div>
        <div className="chef-title">主廚殿堂</div>
        <div className="st-line"></div>
          <div className="chef-infomationBox">
            <ul className="chef-ul">
              {liForLoop}
            </ul>
              <div className="chef-cardAndCourseCard">
                <div className="chef-margin">
                  <ChefCard  
                    chefIntroduce1={chefSelect?.chef_introduction.chefIntroduce1}
                    chefInfoTitle={chefSelect?.chef_introduction.chefInfoTitle}
                    chefInfo={chefSelect?.chef_introduction.chefInfo}
                    chefFirstName={chefSelect?.first_name}
                    chefLastName={chefSelect?.last_name}
                    avatar={`${PUBLIC_URL}/upload-images/${chefSelect?.avatar}`}
                  />
                </div> 
                <div>
                {console.log(pageData)}
                {
                pageData == 0?<p>主廚目前還沒開課哦!</p>: 
                pageData&&
                pageData.map((orderDetail, index) => (
              <CourseCard
                key={index}
                index={index}
                courseDetail={chefCourse[index]}
                collectionIds={collectionIds} //判斷是否收藏(可以給空)
                handleAddIntoCollection={handleAddIntoCollection} //加入收藏
                handleAddIntoCart={handleAddIntoCart} //加入購物車
                handlePurchase={handlePurchase} //直接購買
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
          </div>
        </div>
    </>
  );
};

export default Chef;
