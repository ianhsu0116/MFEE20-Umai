import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const MEMBER_API_URL = API_URL + "/member";

class MemberService {
  // 修改使用者基本資料
  infoEdit({ first_name, last_name, telephone, birthday }) {
    return axios.put(
      MEMBER_API_URL + "/info",
      {
        first_name,
        last_name,
        telephone,
        birthday,
      },
      { withCredentials: true }
    );
  }

  // 修改使用者密碼
  passwordEdit({ newPassword, passwordConfirm }) {
    return axios.put(
      MEMBER_API_URL + "/password",
      { newPassword, passwordConfirm },
      { withCredentials: true }
    );
  }

  // 修改使用者頭貼
  avatarEdit(avatar) {
    // 先將圖檔包成formData
    let formData = new FormData();
    formData.append("avatar", avatar);

    // 送出
    return axios.put(MEMBER_API_URL + "/avatar", formData, {
      withCredentials: true,
    });
  }

  // 修改信用卡資訊
  creditCardEdit(number, name) {
    // 送出
    return axios.put(
      MEMBER_API_URL + "/creditCard",
      { number, name },
      {
        withCredentials: true,
      }
    );
  }

  // 新增學生資訊
  studentInsert(studentInfo) {
    // 送出
    return axios.post(MEMBER_API_URL + "/student", studentInfo, {
      withCredentials: true,
    });
  }

  // 拿取所有學員資訊
  student() {
    // 送出
    return axios.get(MEMBER_API_URL + "/student", {
      withCredentials: true,
    });
  }

  // 編輯學生資訊
  studentEdit(studentInfo) {
    // 送出
    return axios.put(MEMBER_API_URL + "/student", studentInfo, {
      withCredentials: true,
    });
  }

  // 刪除學生資訊
  studentDelete(id) {
    // 送出
    return axios.put(
      MEMBER_API_URL + "/studentDelete",
      { id },
      {
        withCredentials: true,
      }
    );
  }

  // 拿會員擁有的優惠券
  // type => 1:未使用; 2:已使用; 3:已過期(未使用)
  coupons(member_id, type) {
    return axios.get(`${MEMBER_API_URL}/coupons/${member_id}?type=${type}`, {
      withCredentials: true,
    });
  }

  // 主廚卡片資料編輯
  chefIntroEdit(member_id, info_text) {
    return axios.post(
      `${MEMBER_API_URL}/chefIntro/${member_id}`,
      { info_text },
      {
        withCredentials: true,
      }
    );
  }

  // 以下為不需登入即可使用的
  // 拿到所有主廚資料(在member的chef_introduction欄位內)
  chefName() {
    return axios.get(MEMBER_API_URL + "/member/chefName", {
      withCredentials: true,
    });
  }
}

export default new MemberService();
