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

  // 編輯course_comment (因為有order才有comment，故歸類為orderRoute)
  commentEdit({ orders_id, course_id, comment, star }) {
    return axios.post(
      AUTH_API_URL + "/comment/" + orders_id,
      { comment, star, course_id },
      { withCredentials: true }
    );
  }

  //儲存購物車的課程資訊
  getCurrentInfoObject() {}
  // const [cartCourseInfoList, setCartCourseInfoList] = useState([
  //   {
  //     id: "",
  //     member_id: "",
  //     category_id: "",
  //     batch_id: "", //(course_batch table)(alia)
  //     course_image: "",
  //     course_name: "",
  //     course_price: "",
  //     member_limit: "",
  //     batch_date: "", //(course_batch table)
  //     member_count: "", //(course_batch table)
  //     cartCourseCount: 1, //(notInDB)
  //   },
  // ]);

  checkout({ member_id, course_id }) {
    return axios.post(
      AUTH_API_URL + "/checkout" + member_id,
      { course_id },
      { withCredentials: true }
    );
  }
}

export default new OrderService();
