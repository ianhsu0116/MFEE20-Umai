import React from "react";
<<<<<<< HEAD
=======
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from "../config/config";
import { BsPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
>>>>>>> 2483756afd0ecd21bda2781479d0581427d71eaa

const Login = (props) => {
  const preventLoginClose = (e) => {
    e.stopPropagation();
    console.log("preventLoginClose");
  };
<<<<<<< HEAD
  return (
    <div className="Login">
      <div className="Login-container" onClick={preventLoginClose}></div>
=======

  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div className="Login">
      <div className="Login-container" onClick={preventLoginClose}>
        <div className="Login-container-left"></div>
        <div className="Login-container-right">
          <div className="Login-container-right-thirdPartyCon">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google 註冊 / 登入"
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
                  <div>Google 註冊 / 登入</div>
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
                  <div>Facebook 註冊 / 登入</div>
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
            <input type="text" name="email" id="email" />
            <BsPersonFill />
          </div>
          <div className="Login-container-right-inputCon">
            <label htmlFor="password">密碼</label>
            <input type="password" name="password" id="password" />
            <HiLockClosed />
          </div>

          <div className="Login-container-right-button-con">
            <button className="login-submit-btn">登入</button>
            <button className="register-submit-btn">註冊</button>
          </div>

          <div className="Login-container-right-bottom">
            <button className="Login-container-right-bottom-btn">
              忘記密碼
            </button>
          </div>
        </div>
      </div>
>>>>>>> 2483756afd0ecd21bda2781479d0581427d71eaa
    </div>
  );
};

export default Login;
