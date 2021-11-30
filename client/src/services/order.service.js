import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const ORDER_API_URL = API_URL + "/order";

class OrderService {
  // 根據member_id拿到所有order
  getByMemberId(member_id, type) {
    return axios.post(
      ORDER_API_URL + "/member/" + member_id,
      { type },
      { withCredentials: true }
    );
  }

  // 編輯course_comment (因為有order才有comment，故歸類為orderRoute)
  commentEdit({ orders_id, course_id, comment, star }) {
    return axios.post(
      ORDER_API_URL + "/comment/" + orders_id,
      { comment, star, course_id },
      { withCredentials: true }
    );
  }
}

export default new OrderService();
