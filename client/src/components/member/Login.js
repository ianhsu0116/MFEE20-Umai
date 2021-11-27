import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
  // 錯誤訊息
  const [errorMsg2, setErrorMsg2] = useState("");
  // 忘記密碼視窗開關
  const [findPasswordOpen, setFindPasswordOpen] = useState(false);
  // 送出忘記密碼button狀態
  const [findPasswordActive, setFindPasswordActive] = useState("");
  // 忘記密碼的信箱輸入
  const [findPasswordEmail, setFindPasswordEmail] = useState("");

  // 防止點擊到登入的Container時就關閉視窗
  const preventLoginClose = (e) => {
    e.stopPropagation();
  };

  // 即時抓取input data
  const handleInputChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  // 本地登入
  const handleLogin = async () => {
    let { email, password } = accountData;
    try {
      let result = await AuthService.login(email, password);

      // 當前登入使用者存入local
      localStorage.setItem("user", JSON.stringify(result.data.member));

      // 將使用者資料裝入state
      setCurrentUser(AuthService.getCurrentUser());

      // 關閉登入的視窗
      setShowLogin(false);

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "登入成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // console.log(error);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("login", code));
    }
  };

  // 本地註冊
  const handleRegistration = async () => {
    let { email, password } = accountData;
    try {
      let result = await AuthService.registration(email, password);

      // 註冊成功，將錯誤訊息清除
      setErrorMsg("");

      // 通知使用者可以登入了
      Swal.fire({
        icon: "success",
        title: "註冊成功 可以直接登入囉！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("registration", code));
    }
  };

  // Google 登入
  const responseGoogle = async (response) => {
    try {
      let result = await AuthService.googleLogin(response.accessToken);

      // 當前登入使用者存入local
      localStorage.setItem("user", JSON.stringify(result.data.member));

      // 將使用者資料裝入state
      setCurrentUser(AuthService.getCurrentUser());

      // 關閉登入的視窗
      setShowLogin(false);
      // 跳通知
      Swal.fire({
        icon: "success",
        title: "登入成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("registration", code));
    }
  };

  // Facebook 登入
  const responseFacebook = async (response) => {
    try {
      let result = await AuthService.facebookLogin(response.accessToken);

      // 當前登入使用者存入local
      localStorage.setItem("user", JSON.stringify(result.data.member));

      // 將使用者資料裝入state
      setCurrentUser(AuthService.getCurrentUser());

      // 關閉登入的視窗
      setShowLogin(false);

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "登入成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("registration", code));
    }
  };

  // 判斷email有無超過十個字
  useEffect(() => {
    if (findPasswordEmail.length > 10) {
      setFindPasswordActive(true);
    } else {
      setFindPasswordActive("");
    }
  }, [findPasswordEmail]);

  // 送出忘記密碼
  const handleFindPassword = async (e) => {
    if (findPasswordEmail.length > 10) {
      try {
        let result = await AuthService.findPassword(findPasswordEmail);

        // 跳通知
        Swal.fire({
          icon: "success",
          title: `新密碼已寄送至${findPasswordEmail}, 請於24小時內查看並修改！`,
          showConfirmButton: false,
          timer: 1500,
        });

        // 清空錯誤訊息
        setErrorMsg2("");

        // 關閉密碼找回使窗
        setFindPasswordOpen(false);
      } catch (error) {
        //console.log(error.response);
        let { code } = error.response.data;
        setErrorMsg2(getValidMessage("login", code));
      }
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
            <button
              className="Login-container-right-bottom-btn"
              onClick={() => {
                setFindPasswordOpen(true);
              }}
            >
              忘記密碼?
            </button>
          </div>
        </div>
      </div>

      {/* 忘記密碼modal */}
      {findPasswordOpen && (
        <div
          className="Login-findPassword"
          onClick={(e) => {
            e.stopPropagation();
            setFindPasswordOpen(false);
          }}
        >
          <div
            className="Login-findPassword-con"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="Login-findPassword-con-title">
              {<BsPersonFill />} 重設密碼
            </h3>
            <div className="Login-findPassword-con-line"></div>
            <div className="Login-findPassword-con-info">
              請填寫你的會員帳號
            </div>
            <div className="Login-findPassword-con-main">
              <div className="Login-findPassword-con-main-inputCon">
                <input
                  type="email"
                  name="email-findPassword"
                  id="email-findPassword"
                  value={findPasswordEmail}
                  onChange={(e) => {
                    setFindPasswordEmail(e.target.value);
                  }}
                  placeholder="信箱"
                />
                <BsPersonFill />
              </div>
              {/* 錯誤訊息提示 */}
              {errorMsg2 && <ErrorMessage value={errorMsg2} />}
              <button
                className={`Login-findPassword-con-main-btn ${
                  findPasswordActive && "Login-findPassword-con-main-btn-active"
                }`}
                onClick={handleFindPassword}
              >
                送出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
