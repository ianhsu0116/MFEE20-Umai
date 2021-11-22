import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/order";

class OrderService {
  // 根據member_id拿到所有order
  getByMemberId(member_id, type) {
    return axios.post(
      AUTH_API_URL + "/member/" + member_id,
      { type },
      { withCredentials: true }
    );
  }
}

export default new OrderService();
