import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/auth";

class AuthService {
  // 拿到當前使用者資料
  info() {
    return axios.get(AUTH_API_URL + "/info", { withCredentials: true });
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
    //localStorage.removeItem("user");
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

  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }

  googleLogin(access_token) {
    return axios.post(AUTH_API_URL + "/google/token", {
      access_token,
    });
  }

  facebookLogin(access_token) {
    return axios.post(AUTH_API_URL + "/facebook/token", {
      access_token,
    });
  }
}

export default new AuthService();
