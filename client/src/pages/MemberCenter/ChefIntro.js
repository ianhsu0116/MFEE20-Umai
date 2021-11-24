import React, { useState, useEffect } from "react";
import MemberService from "../../services/member.service";
import AuthService from "../../services/auth.service";
import ChefCard2 from "../../components/member/ChefCard2";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";

const ChefIntro = (props) => {
  const { currentUser, setCurrentUser } = props;

  // 即時更新當前使用者資料的function
  async function refreshUser() {
    // 更新成功後，更新當前使用者資料
    let newUser = await AuthService.memberInfo(currentUser.id);
    // 存入local
    localStorage.setItem("user", JSON.stringify(newUser.data.member));
    // 裝入state
    setCurrentUser(AuthService.getCurrentUser());
  }

  // 將chef_intro從currentUser解析出來
  async function parseIntro() {
    // 先確認有使用者，且使用者的chef_intro有東西
    if (currentUser && currentUser.chef_introduction) {
      let parsedIntro = JSON.parse(currentUser.chef_introduction);
      setChefInfomation({
        chefIntroduce1: parsedIntro.chefIntroduce1,
        chefIntroduce2: "Name",
        chefInfoTitle: parsedIntro.chefInfoTitle,
        chefInfo: [
          parsedIntro.chefInfo[0],
          parsedIntro.chefInfo[1],
          parsedIntro.chefInfo[2],
          parsedIntro.chefInfo[3],
        ],
      });
    }
  }

  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");

  // 主廚資訊
  const [chefInfomation, setChefInfomation] = useState({
    chefIntroduce1: "",
    chefIntroduce2: "Name",
    chefInfo: ["", "", "", ""],
  });

  // 初次拿取chef_introduction的json
  useEffect(() => {
    parseIntro();
  }, [currentUser]);

  // 送出主廚資訊
  const handleSubmit = async () => {
    // 錯誤判斷
    let validArr = [
      "chefIntroduce1",
      "chefIntroduce2",
      "chefInfoTitle",
      "chefInfo",
    ];
    let isError = false;
    validArr.forEach((item, index) => {
      if (chefInfomation[item].length === 0) {
        isError = true;
      }

      if (chefInfomation.chefInfo[index].length === 0) {
        isError = true;
      }
    });
    // 如果有任何欄位空白就抱錯
    if (isError) return setErrorMsg("欄位不可空白！");

    try {
      // 先將json string化
      let stringChefInfomation = JSON.stringify({ ...chefInfomation });

      // 送出資料
      let result = await MemberService.chefIntroEdit(
        currentUser.id,
        stringChefInfomation
      );

      window.alert("編輯完成！");

      // 清空errorMsg
      setErrorMsg("");

      // 重新render一次使用者資料
      refreshUser();
    } catch (error) {
      console.log(error);
    }
  };

  // 取消修改
  const handleCancel = () => {
    // 清空errorMsg
    setErrorMsg("");
    // 重新拿一次原本的chef_introduction
    parseIntro();
  };
  return (
    <div className="ChefIntro">
      <div className="ChefIntro-container">
        <header className="ChefIntro-container-header">
          <h2>主廚卡片</h2>
        </header>

        <div className="ChefIntro-container-cards">
          <ChefCard2
            image={currentUser && currentUser.avatar}
            name={
              currentUser.first_name
                ? currentUser.first_name + " " + currentUser.last_name
                : "XXX"
            }
            chefInfomation={chefInfomation}
            setChefInfomation={setChefInfomation}
          />

          {errorMsg && (
            <div className="ChefIntro-container-errorCon">
              <ErrorMessage value={errorMsg} />
            </div>
          )}

          <div className="ChefIntro-container-buttomCon">
            <Button
              value="取消修改"
              className="button-darkColor"
              onClick={handleCancel}
            />
            <Button
              value="確定送出"
              className="button-themeColor"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefIntro;
