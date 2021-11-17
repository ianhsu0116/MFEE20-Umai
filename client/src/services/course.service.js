import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/course";

class CourseService {
  // 新增課程
  courseInsert(courseData) {
    //console.log(courseData);
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

    // slider圖片 + 六張圖
    courseData.slider_images.forEach((file) => {
      formData.append("images", file);
    });
    // courseData.six_dishes.forEach((file) => {
    //   formData.append("images", file.dishes_image);
    // });

    return axios.post(AUTH_API_URL + "/course", formData, {
      withCredentials: true,
    });
  }
}

export default new CourseService();
