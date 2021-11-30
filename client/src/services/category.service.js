import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/category";

class CategoryService {
    
  categoryID(category_id) {
      return axios.get(AUTH_API_URL + `/${category_id}`, {
        withCredentials: true,
      });
    }
  }
  
  export default new  CategoryService();
