import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../../services/auth.service";
import MemberService from "../../services/member.service";
import getValidMessage from "../../validMessage/validMessage";
import { PUBLIC_URL } from "../../config/config";
import { BsPersonCircle, BsCheckCircle } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ImGift } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { VscListUnordered } from "react-icons/vsc";
import { MdBookmarkBorder, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaPen, FaIdCard, FaPencilAlt } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import avatar from "../images/avatar.svg";

const MemberSidebar = (props) => {
  let { currentBoard, setCurrentBoard, currentUser, setCurrentUser } = props;

  // 存avatar的二元編碼
  const [currentAvatar, setCurrentAvatar] = useState("");
  // 即時存取nickName改變得值
  const [nickNameValue, setNickNameValue] = useState("");
  // 存取暱稱編輯框狀態
  const [nickNameOpen, setNickNameOpen] = useState(false);

  // 即時更新當前使用者資料的function
  async function refreshUser() {
    try {
      // 更新成功後，更新當前使用者資料
      let newUser = await AuthService.memberInfo(currentUser.id);
      // 存入local
      localStorage.setItem("user", JSON.stringify(newUser.data.member));
      // 裝入state
      setCurrentUser(AuthService.getCurrentUser());
    } catch (error) {
      console.log(error);
      if (error.response) {
        let { code } = error.response.data;
        // 跳通知
        Swal.fire({
          icon: "error",
          title: getValidMessage("member", code),
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  // 如果nick_name有東西的話就設定進去state
  useEffect(() => {
    if (currentUser) {
      if (currentUser.nick_name) {
        setNickNameValue(currentUser.nick_name);
      }
    }
  }, [currentUser]);

  // 切換sidebar內容
  const handleChangeBoard = (e) => {
    setCurrentBoard(e.target.innerText);
  };

  // 即時顯示上傳的avatar
  const handleAvatarChange = async (e) => {
    let readFile = new FileReader(); //constructor 建構子(函數); 功能: 給初值
    let file = e.target.files[0];
    let imageType = /image.*/;

    // 格式符合就顯示，否則提醒
    if (file) {
      if (file.type.match(imageType) && file.size < 4000000) {
        // 將圖送到後端
        try {
          let result = await MemberService.avatarEdit(file);

          // 更新成功後，更新當前使用者資料
          let newUser = await AuthService.memberInfo(currentUser.id);

          // 存入local
          localStorage.setItem("user", JSON.stringify(newUser.data.member));

          // 裝入state
          setCurrentUser(AuthService.getCurrentUser());
          console.log(result);
          console.log("good");
        } catch (error) {
          console.log(error);
          if (error.response) {
            let { code } = error.response.data;

            // 跳通知
            Swal.fire({
              icon: "error",
              title: getValidMessage("member", code),
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }

        // 抓到二元編碼，即時顯示
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
          // 將二元編碼丟入state，即時顯示
          setCurrentAvatar(readFile.result);
        });
      } else {
        // 跳通知
        Swal.fire({
          icon: "warning",
          title: "只能上傳圖片歐！(檔案須小於4mb)",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  // 登出
  const history = useHistory();
  const handleLogout = async () => {
    try {
      let result = await AuthService.logout();
      //console.log(result);
      // 清空當前user資料
      setCurrentUser(null);
      // 跳通知
      Swal.fire({
        icon: "success",
        title: "登出成功！",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // nickName ref
  const nickNameRef = useRef(null);

  // 暱稱編輯框狀態切換
  const handleNickNameOpen = () => {
    setNickNameOpen(!nickNameOpen);
  };

  // 送出neckName
  const handleNickNameEdit = async () => {
    // 確認是否有修改(若是值跟之前的一樣，就不做任何事)
    if (nickNameValue === currentUser.nick_name) return;

    // 如果沒輸入東西，就不做任何事
    if (nickNameValue.length === 0) {
      setNickNameValue(currentUser.nick_name);
      return;
    }

    try {
      let result = await MemberService.nickNameEdit(
        currentUser.id,
        nickNameValue
      );
      // 跳通知
      Swal.fire({
        icon: "success",
        title: "暱稱更新成功！",
        showConfirmButton: false,
        timer: 1500,
      });

      // 更新使者茲料
      refreshUser();
    } catch (error) {
      console.log(error);
      if (error.response) {
        let { code } = error.response.data;

        // 跳通知
        Swal.fire({
          icon: "error",
          title: getValidMessage("member", code),
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // 將原本的nick_name設定回去
      setNickNameValue(currentUser.nick_name);
    }
  };

  // 如果當前nickName是打開的話，馬上讓其focus
  useEffect(() => {
    if (nickNameOpen) {
      nickNameRef.current.focus();
    }
  }, [nickNameOpen]);

  return (
    <div className="MemberSidebar">
      <div className="MemberSidebar-container">
        <div className="MemberSidebar-container-top">
          <div className="MemberSidebar-container-top-avatarCon">
            <div className="MemberSidebar-container-avatar">
              <input
                type="file"
                id="avatar"
                className="MemberSidebar-container-avatar-input"
                onChange={handleAvatarChange}
                multiple
              />
              <label
                htmlFor="avatar"
                className="MemberSidebar-container-avatar-label"
              >
                {/* 遮罩效果 */}
                <div className="MemberSidebar-container-avatar-mask"></div>
                {currentUser && currentUser.avatar && (
                  <img
                    src={`${PUBLIC_URL}/upload-images/${currentUser.avatar}`}
                    alt="使用者頭貼"
                    className="MemberSidebar-container-avatar-img"
                  />
                )}
                {currentUser && !currentUser.avatar && (
                  <img
                    src={avatar}
                    alt="使用者頭貼"
                    className="MemberSidebar-container-avatar-img"
                  />
                )}
              </label>
              <FaPencilAlt className="MemberSidebar-container-avatar-pen" />
            </div>
            {!nickNameOpen && (
              <div
                className="MemberSidebar-container-mamberName"
                onClick={handleNickNameOpen}
              >
                {currentUser &&
                  currentUser.nick_name &&
                  `${currentUser.nick_name}`}
                {currentUser && !currentUser.nick_name && `哈囉！`}
                <FaPencilAlt className="MemberSidebar-container-mamberName-pen" />
              </div>
            )}
            {nickNameOpen && (
              <input
                type="text"
                ref={nickNameRef}
                onChange={(e) => {
                  setNickNameValue(e.target.value);
                }}
                onBlur={() => {
                  handleNickNameOpen();
                  handleNickNameEdit();
                }}
                value={nickNameValue ? nickNameValue : ""}
                maxLength="10"
                placeholder="會員暱稱"
                className="MemberSidebar-container-mamberNameInput"
              />
            )}
          </div>

          {currentUser && currentUser.googleId && (
            <div className="MemberSidebar-container-loginType-con">
              <div className="MemberSidebar-container-loginType">
                <div className="MemberSidebar-container-loginType-left">
                  <img src={require("../images/googleLogin.svg").default} />
                  <p className="MemberSidebar-container-loginType-left-p">
                    Google
                  </p>
                </div>
                <div className="MemberSidebar-container-loginType-right">
                  <BsCheckCircle />
                </div>
              </div>
            </div>
          )}
          {currentUser && currentUser.facebookId && (
            <div className="MemberSidebar-container-loginType-con">
              <div className="MemberSidebar-container-loginType">
                <div className="MemberSidebar-container-loginType-left">
                  <img src={require("../images/facebookLogin.svg").default} />
                  <p className="MemberSidebar-container-loginType-left-p">
                    Facebook
                  </p>
                </div>
                <div className="MemberSidebar-container-loginType-right">
                  <BsCheckCircle />
                </div>
              </div>
            </div>
          )}
          {currentUser && currentUser.member_category === 2 && (
            <div className="MemberSidebar-container-loginType-con">
              <div className="MemberSidebar-container-loginType">
                <div className="MemberSidebar-container-loginType-left">
                  <GiCook />
                  <p className="MemberSidebar-container-loginType-left-p">
                    授課主廚帳戶
                  </p>
                </div>
                <div className="MemberSidebar-container-loginType-right">
                  <BsCheckCircle />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="MemberSidebar-container-bottom">
          <ul className="MemberSidebar-container-ul">
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "會員資訊" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <BsPersonCircle />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                會員資訊
              </span>
            </li>
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "預設學員" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <AiOutlineUsergroupAdd />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                預設學員
              </span>
            </li>
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "訂單資訊" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <VscListUnordered />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                訂單資訊
              </span>
            </li>
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "收藏課程" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <MdOutlineFavoriteBorder />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                收藏課程
              </span>
            </li>
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "收藏文章" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <MdBookmarkBorder />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                收藏文章
              </span>
            </li>
            <li
              className={`MemberSidebar-container-ul-li ${
                currentBoard === "優惠券" &&
                "MemberSidebar-container-ul-li-active"
              }`}
            >
              <ImGift />
              <span
                className="MemberSidebar-container-ul-li-text"
                onClick={handleChangeBoard}
              >
                優惠券
              </span>
            </li>
            {/* 當前登入者是廚師時，才能新增課程 */}
            {currentUser && currentUser.member_category === 2 && (
              <>
                <li
                  className={`MemberSidebar-container-ul-li MemberSidebar-container-ul-li2 ${
                    currentBoard === "主廚卡片" &&
                    "MemberSidebar-container-ul-li-active2"
                  }`}
                >
                  <FaIdCard />
                  <span
                    className="MemberSidebar-container-ul-li-text"
                    onClick={handleChangeBoard}
                  >
                    主廚卡片
                  </span>
                </li>
                <li
                  className={`MemberSidebar-container-ul-li MemberSidebar-container-ul-li2 ${
                    currentBoard === "新增課程" &&
                    "MemberSidebar-container-ul-li-active2"
                  }`}
                >
                  <GiCook />
                  <span
                    className="MemberSidebar-container-ul-li-text"
                    onClick={handleChangeBoard}
                  >
                    新增課程
                  </span>
                </li>
              </>
            )}
            <li
              className="MemberSidebar-container-ul-li"
              onClick={handleLogout}
            >
              <HiOutlineLogout />
              <span className="MemberSidebar-container-ul-li-text">登出</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberSidebar;
