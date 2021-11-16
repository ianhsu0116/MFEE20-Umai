import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/auth";

class AuthService {
  // 拿到當前使用者資料
  memberInfo(id) {
    return axios.get(AUTH_API_URL + "/memberInfo/" + id, {
      withCredentials: true,
    });
  }

  // 從local拿到當前使用者資料
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // 登入
  login(email, password) {
    return axios.post(
      AUTH_API_URL + "/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  // 登出
  logout() {
    // 先把local的member資料移除
    localStorage.removeItem("user");
    return axios.get(AUTH_API_URL + "/logout", { withCredentials: true });
  }

  // 註冊
  registration(email, password) {
    return axios.post(
      AUTH_API_URL + "/registration",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  googleLogin(access_token) {
    return axios.post(
      AUTH_API_URL + "/google",
      {
        access_token,
      },
      { withCredentials: true }
    );
  }

  facebookLogin(access_token) {
    return axios.post(
      AUTH_API_URL + "/facebook",
      {
        access_token,
      },
      { withCredentials: true }
    );
  }
}

export default new AuthService();
