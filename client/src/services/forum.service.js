import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const FORUM_API_URL = API_URL + "/forum";

class ForumService {
  // 拿到當前使用者資料
  collection(member_id) {
    return axios.get(FORUM_API_URL + "/collection/" + member_id, {
      withCredentials: true,
    });
  }
}

export default new ForumService();
