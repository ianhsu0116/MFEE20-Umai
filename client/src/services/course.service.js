import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/course";

class CourseService {
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
      course_name,
      course_price,
      course_hour,
      course_level,
      member_limit,
      company_name,
      company_address,
      category_id,
      course_batch,
    } = courseData;

    let formData = new FormData();
    formData.append("course_name", course_name);
    formData.append("course_price", course_price);
    formData.append("course_hour", course_hour);
    formData.append("course_level", course_level);
    formData.append("member_limit", member_limit);
    formData.append("company_name", company_name);
    formData.append("company_address", company_address);
    formData.append("category_id", category_id);
    formData.append("course_batch", JSON.stringify(course_batch));
    formData.append("course_detail", JSON.stringify(course_detail));

    // 六張圖 + slider圖片
    // 六張圖
    courseData.six_dishes.forEach((file) => {
      formData.append("images", file.dishes_image);
    });
    // slider圖片
    courseData.slider_images.forEach((file) => {
      formData.append("images", file);
    });

    return axios.post(AUTH_API_URL + "/course", formData, {
      withCredentials: true,
    });
  }
}

export default new CourseService();
