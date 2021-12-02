import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ErrorMessage from "../ErrorMessage";
import getValidMessage from "../../validMessage/validMessage";
import AuthService from "../../services/auth.service";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import UmaiLogo from "../images//Umai.png";
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from "../../config/config";
import { BsPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Login = (props) => {
  // 存放當前使用者資料
  const { setShowLogin, setCurrentUser } = props;
  // 帳號密碼
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");
  // 錯誤訊息
  const [errorMsg2, setErrorMsg2] = useState("");

  // 註冊或登入切換 (login / register)
  const [currentMode, setCurrentMode] = useState("login");
  // 登入註冊按鈕的狀態
  const [isLoginSignupErr, setIsLoginSignupErr] = useState(true);

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

  // 前端即時錯誤阻擋
  useEffect(() => {
    // 先確認當前模式
    if (currentMode === "register") {
      // 確認兩個密碼欄位
      if (accountData.password !== accountData.confirmPassword) {
        setErrorMsg("密碼與確認密碼不符！");
      } else {
        setErrorMsg("");
      }

      // 確認三欄位都有填寫 (正確 按鈕才會亮)
      if (
        accountData.email.length >= 10 &&
        accountData.password.length >= 8 &&
        accountData.confirmPassword.length >= 8 &&
        accountData.password === accountData.confirmPassword
      ) {
        setIsLoginSignupErr(false);
      } else {
        setIsLoginSignupErr(true);
      }
    } else {
      // 確認兩個欄位都有填寫 (正確 按鈕才會亮)
      if (accountData.email.length >= 10 && accountData.password.length >= 8) {
        setIsLoginSignupErr(false);
      } else {
        setIsLoginSignupErr(true);
      }
    }

    //
  }, [accountData]);

  // 本地登入
  const handleLogin = async () => {
    // 錯誤阻擋
    if (isLoginSignupErr) return;

    let { email, password } = accountData;

    // 實際送後端
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
      console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("login", code));
    }
  };

  // 本地註冊
  const handleRegistration = async () => {
    // 錯誤阻擋
    if (isLoginSignupErr) return;

    let { email, password, confirmPassword } = accountData;

    // 實際送後端
    try {
      let result = await AuthService.registration(email, password);

      // 註冊成功，將錯誤訊息清除
      setErrorMsg("");

      // 重開一次loginCon, 因為直接切回loginMode會有霸個(不知名)
      setShowLogin(false);
      setShowLogin(true);

      // 清空註冊input資料
      setAccountData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      // 通知使用者可以登入了
      Swal.fire({
        icon: "success",
        title: "註冊成功 可以直接登入囉！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      // let { code } = error.response.data;
      // setErrorMsg(getValidMessage("registration", code));
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

  // 切換登入/註冊模式
  const handleChangeMode = (e) => {
    currentMode === "login"
      ? setCurrentMode("register")
      : setCurrentMode("login");
    // setCurrentMode("register");
    // 重置當前輸入的資料
    setAccountData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    //重置錯誤訊息
    setErrorMsg("");
  };

  // 判斷密碼找回email有無超過十個字
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

        // 清空忘記密碼input
        setFindPasswordEmail("");

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
        <div className="Login-container-left">
          {/* 遮罩 */}
          <div className="Login-container-left-mask"></div>

          <Link
            to="/"
            className="Login-container-left-con"
            onClick={() => {
              setShowLogin(false);
            }}
            title="來去Umai首頁逛逛"
          >
            <img src={UmaiLogo} alt="Umai Logo" className="UmaiLogo" />
            <span className="Login-container-left-con-text">
              任何您有興趣的<span className="heighLight-text">廚藝技巧</span>
            </span>
            <span className="Login-container-left-con-text">
              都在Umai等您探索！
            </span>
          </Link>
        </div>

        <div
          className={`Login-container-right ${
            currentMode === "login"
              ? " Login-container-right-login"
              : " Login-container-right-register"
          }`}
        >
          <div className="Login-container-right-group">
            {/* 登入 */}
            <div className="Login-container-right-con">
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
                      <img
                        src={require("../images/facebookLogin.svg").default}
                      />
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
                {/* <label htmlFor="email">帳號</label> */}
                <input
                  type="text"
                  name="email"
                  id="email"
                  minLength="1"
                  maxLength="50"
                  placeholder="帳號(請輸入有效Email)"
                  value={accountData.email}
                  onChange={handleInputChange}
                />
                <BsPersonFill />
              </div>
              <div className="Login-container-right-inputCon">
                {/* <label htmlFor="password">密碼</label> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength="1"
                  maxLength="12"
                  placeholder="密碼(限8~12英數字)"
                  value={accountData.password}
                  onChange={handleInputChange}
                />
                <HiLockClosed />
              </div>

              {/* 錯誤訊息提示 */}
              {errorMsg && <ErrorMessage value={errorMsg} />}

              <div className="Login-container-right-button-con">
                <button
                  className={`login-submit-btn  ${
                    !isLoginSignupErr && " login-submit-btn-active"
                  }`}
                  onClick={handleLogin}
                >
                  登入
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
                <button
                  className="Login-container-right-bottom-btn Login-container-right-bottom-btnBlue"
                  onClick={handleChangeMode}
                >
                  <p>快速註冊</p>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>

            {/* 註冊 */}
            <div className="Login-container-right-con">
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
                      <img
                        src={require("../images/facebookLogin.svg").default}
                      />
                      <div>使用 Facebook 帳戶繼續</div>
                      <div></div>
                    </button>
                  )}
                />
              </div>

              <div className="Login-container-right-center">
                <div className="Login-container-right-center-text">
                  或使用Umai帳號註冊
                </div>
                <div className="Login-container-right-center-line"></div>
              </div>

              <div className="Login-container-right-inputCon">
                {/* <label htmlFor="email">帳號</label> */}
                <input
                  type="text"
                  name="email"
                  id="email"
                  minLength="1"
                  maxLength="50"
                  placeholder="帳號(請輸入有效Email)"
                  value={accountData.email}
                  onChange={handleInputChange}
                />
                <BsPersonFill />
              </div>
              <div className="Login-container-right-inputCon">
                {/* <label htmlFor="password">密碼</label> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength="1"
                  maxLength="12"
                  placeholder="密碼(限8~12英數字)"
                  value={accountData.password}
                  onChange={handleInputChange}
                />
                <HiLockClosed />
              </div>

              <div className="Login-container-right-inputCon">
                {/* <label htmlFor="confirmPassword">密碼確認</label> */}
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  minLength="1"
                  maxLength="12"
                  placeholder="請再次輸入密碼"
                  value={accountData.confirmPassword}
                  onChange={handleInputChange}
                />
                <HiLockClosed />
              </div>

              {/* 錯誤訊息提示 */}
              {errorMsg && <ErrorMessage value={errorMsg} />}

              <div className="Login-container-right-button-con">
                <button
                  className={`register-submit-btn  ${
                    !isLoginSignupErr && " register-submit-btn-active"
                  }`}
                  onClick={handleRegistration}
                >
                  註冊
                </button>
              </div>

              <div className="Login-container-right-bottom">
                <button
                  className="Login-container-right-bottom-btn"
                  // onClick={() => {
                  //   setFindPasswordOpen(true);
                  // }}
                ></button>

                <button
                  className="Login-container-right-bottom-btn Login-container-right-bottom-btnBlue"
                  onClick={handleChangeMode}
                >
                  <IoIosArrowBack />
                  登入
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 忘記密碼modal */}
      {findPasswordOpen && (
        <div
          className="Login-findPassword"
          onClick={(e) => {
            e.stopPropagation();
            // 清空錯誤訊息
            setErrorMsg2("");
            // 清空忘記密碼input
            setFindPasswordEmail("");
            // 關閉忘記密碼視窗
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
