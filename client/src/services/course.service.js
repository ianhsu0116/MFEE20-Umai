import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const COURSE_API_URL = API_URL + "/course";

class CourseService {
  // 根據member_id拿到購物車所需的全部課程資料 (cart)
  getAllCourseObject(member_id) {
    return axios.get(COURSE_API_URL + `/cart/all/${member_id}`, {
      withCredentials: true,
    });
  }

  // 根據course_id與batch_id拿到購物車所需的單筆課程資料 (cart)
  getOneCourseObject(batch_id) {
    return axios.get(COURSE_API_URL + `/cart/single/${batch_id}`, {
      withCredentials: true,
    });
  }

  //檢查購物車資料庫中是否已經有此課程
  IfCourseInCart(member_id, course_id, batch_id) {
    return axios.get(
      COURSE_API_URL + `/cart/${member_id}/${course_id}/${batch_id}`,
      {
        withCredentials: true,
      }
    );
  }

  // 根據member_id, course_id, batch_id更新購物車資料庫
  UpdateCart(member_id, course_id, batch_id, inCart, updateAmount) {
    return axios.put(
      COURSE_API_URL + `/cart/${member_id}`,
      { course_id, batch_id, inCart, updateAmount },
      {
        withCredentials: true,
      }
    );
  }

  // 根據course_name拿到搜尋結果的課程資料(cart)
  CourseSearch(searchValue) {
    return axios.get(COURSE_API_URL + `/?search=${searchValue}`, {
      withCredentials: true,
    });
  }

  // 測試隨機抓資料
  course_recommend() {
    return axios.get(COURSE_API_URL + "/course/recommend", {
      withCredentials: true,
    });
  }
  // 測試首頁抓資料
  course_homepage() {
    return axios.get(COURSE_API_URL + "/hottest", {
      withCredentials: true,
    });
  }
  course_homepageComment() {
    return axios.get(COURSE_API_URL + "/homepage/comment", {
      withCredentials: true,
    });
  }

  // 依照course_id拿到課程詳細資料(detail)
  course_courseId(course_id) {
    return axios.get(COURSE_API_URL + `/${course_id}`, {
      withCredentials: true,
    });
  }

  // 依照member_id(主廚)拿到所有此會員發布的課程(卡片)
  course_memeberId(member_id) {
    return axios.get(COURSE_API_URL + `/member/${member_id}`, {
      withCredentials: true,
    });
  }

  // 依照member_id 拿到所有此會員收藏的課程(卡片)
  course_collection(member_id) {
    return axios.get(COURSE_API_URL + `/collection/${member_id}`, {
      withCredentials: true,
    });
  }

  // 新增或移除課程收藏
  course_collection_edit(member_id, course_id, type) {
    return axios.post(
      COURSE_API_URL + `/collection/${member_id}`,
      { course_id, type },
      {
        withCredentials: true,
      }
    );
  }

  // 新增課程
  courseInsert(courseData) {
    //console.log(courseData);

    // 製造一個要放入DB的正確JSON格式
    let course_detail = {
      slider_images: [],
      time_of_course: courseData.time_of_course,
      course_ig: courseData.course_ig,
      course_fb: courseData.course_fb,
      title1_1: courseData.title1_1,
      title1_2: courseData.title1_2,
      content1: courseData.content1,
      title2: courseData.title2,
      six_dishes: [
        // 課程六道菜的圖+文
        {
          dishes_image: "",
          dishes_title: courseData.six_dishes[0].dishes_title,
          dishes_content: courseData.six_dishes[0].dishes_content,
        },
        {
          dishes_image: "",
          dishes_title: courseData.six_dishes[1].dishes_title,
          dishes_content: courseData.six_dishes[1].dishes_content,
        },
        {
          dishes_image: "",
          dishes_title: courseData.six_dishes[2].dishes_title,
          dishes_content: courseData.six_dishes[2].dishes_content,
        },
        {
          dishes_image: "",
          dishes_title: courseData.six_dishes[3].dishes_title,
          dishes_content: courseData.six_dishes[3].dishes_content,
        },
        {
          dishes_image: "",
          dishes_title: courseData.six_dishes[4].dishes_title,
          dishes_content: courseData.six_dishes[4].dishes_content,
        },
        {
          dishes_image: "",
          dishes_title: courseData.six_dishes[5].dishes_title,
          dishes_content: courseData.six_dishes[5].dishes_content,
        },
      ],
      content2: courseData.content2,
      content3: courseData.content3,
    };

    let {
      category_id,
      course_name,
      course_price,
      course_hour,
      course_level,
      member_limit,
      company_name,
      company_address,
      course_batch,
    } = courseData;

    let formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("course_name", course_name);
    formData.append("course_price", course_price);
    formData.append("course_hour", course_hour);
    formData.append("course_level", course_level);
    formData.append("member_limit", member_limit);
    formData.append("company_name", company_name);
    formData.append("company_address", company_address);
    formData.append("course_batch", JSON.stringify(course_batch));
    formData.append("course_detail", JSON.stringify(course_detail));

    // 六張圖 + slider圖片 （一定要先放六張圖再放slider）
    // 六張圖
    courseData.six_dishes.forEach((file) => {
      formData.append("images", file.dishes_image);
    });
    // slider圖片
    courseData.slider_images.forEach((file) => {
      formData.append("images", file);
    });

    return axios.post(COURSE_API_URL + "/", formData, {
      withCredentials: true,
    });
  }
}

export default new CourseService();
