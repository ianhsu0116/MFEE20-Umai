import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/category";

class CategoryService {
    
  // 麵包屑針對課程名稱
  categoryID(category_id) {
      return axios.get(AUTH_API_URL + `/${category_id}`, {
        withCredentials: true,
      });
    }
  // 全課程  
  categoryLength(category_number) {
      return axios.get(AUTH_API_URL + `/categoryLength/${category_number}`, {
        withCredentials: true,
      });
    }
  // // 課程種類  
  //   categoryClass(category_class) {
  //     return axios.get(AUTH_API_URL + `/${category_class}`, {
  //       withCredentials: true,
  //     });
  //   }  
  }


  
  export default new  CategoryService();
