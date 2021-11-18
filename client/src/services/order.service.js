import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/order";

class OrderService {
  // 修改使用者基本資料
  getAllOrder() {
    return axios.get(AUTH_API_URL + "/order", { withCredentials: true });
  }
}

export default new OrderService();
