import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.REACT_APP_AUTH_API_URL;

class AuthService {
  // 拿到當前使用者資料
  info() {
    return axios.get(API_URL + "/info", { withCredentials: true });
  }

  // 登入
  login(email, password) {
    return axios.post(
      API_URL + "/login",
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
    return axios.get(API_URL + "/logout", { withCredentials: true });
  }

  // 註冊
  registration(email, password) {
    return axios.post(
      API_URL + "/registration",
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
    return axios.post(API_URL + "/google/token", {
      access_token,
    });
  }

  facebookLogin(access_token) {
    return axios.post(API_URL + "/facebook/token", {
      access_token,
    });
  }
}

export default new AuthService();
