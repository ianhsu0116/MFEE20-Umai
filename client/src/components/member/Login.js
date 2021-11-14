import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import getValidMessage from "../../validMessage/validMessage";
import AuthService from "../../services/auth.service";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from "../../config/config";
import { BsPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

const Login = (props) => {
  // 存放當前使用者資料
  const { setShowLogin, setCurrentUser } = props;
  // 帳號密碼
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });
  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");

  // 防止點擊到登入的Container時就關閉視窗
  const preventLoginClose = (e) => {
    e.stopPropagation();
  };

  // Google Login
  const responseGoogle = (response) => {
    console.log(response);
  };

  // Facebook Login
  const responseFacebook = (response) => {
    console.log(response);
  };

  // 即時抓取input data
  const handleInputChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  // 按下登入
  const handleLogin = async () => {
    let { email, password } = accountData;
    try {
      let result = await AuthService.login(email, password);

      // 將使用者資料裝入state
      setCurrentUser(result.data.member);
      window.alert("登入成功！");

      // 關閉登入的視窗
      setShowLogin(false);
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("login", code));
    }
  };

  // 按下註冊
  const handleRegistration = async () => {
    let { email, password } = accountData;
    try {
      let result = await AuthService.registration(email, password);
      window.alert("註冊成功 可以直接登入囉！");
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("registration", code));
    }
  };

  return (
    <div className="Login">
      <div className="Login-container" onClick={preventLoginClose}>
        <div className="Login-container-left"></div>
        <div className="Login-container-right">
          <div className="Login-container-right-thirdPartyCon">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="使用 Google 帳戶繼續"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="Login-container-right-googleBtn"
                >
                  <img src={require("../images/googleLogin.svg").default} />
                  <div>使用 Google 帳戶繼續</div>
                  <div></div>
                </button>
              )}
            />
            <FacebookLogin
              appId={FACEBOOK_CLIENT_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="Login-container-right-fbBtn"
                >
                  <img src={require("../images/facebookLogin.svg").default} />
                  <div>使用 Facebook 帳戶繼續</div>
                  <div></div>
                </button>
              )}
            />
          </div>

          <div className="Login-container-right-center">
            <div className="Login-container-right-center-text">
              或使用Umai帳號登入
            </div>
            <div className="Login-container-right-center-line"></div>
          </div>

          <div className="Login-container-right-inputCon">
            <label htmlFor="email">常用Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={accountData.email}
              onChange={handleInputChange}
            />
            <BsPersonFill />
          </div>
          <div className="Login-container-right-inputCon">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              name="password"
              id="password"
              value={accountData.password}
              onChange={handleInputChange}
            />
            <HiLockClosed />
          </div>

          {/* 錯誤訊息提示 */}
          {errorMsg && <ErrorMessage value={errorMsg} />}

          <div className="Login-container-right-button-con">
            <button className="login-submit-btn" onClick={handleLogin}>
              登入
            </button>
            <button
              className="register-submit-btn"
              onClick={handleRegistration}
            >
              註冊
            </button>
          </div>

          <div className="Login-container-right-bottom">
            <button className="Login-container-right-bottom-btn">
              忘記密碼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
