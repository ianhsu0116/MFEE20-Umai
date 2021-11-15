import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/member";

class MemberService {
  // 修改使用者基本資料
  infoEdit({ first_name, last_name, telephone, birthday }) {
    return axios.post(
      AUTH_API_URL + "/info",
      {
        first_name,
        last_name,
        telephone,
        birthday,
      },
      { withCredentials: true }
    );
  }
}

export default new MemberService();
