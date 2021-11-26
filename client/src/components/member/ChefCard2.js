import React, { useState, useEffect } from "react";
import Chef from "../images/avatar.svg";
import { PUBLIC_URL } from "../../config/config";
import { FaPen } from "react-icons/fa";

function ChefCard2(props) {
  const { image, name, chefInfomation, setChefInfomation } = props;

  // 每個input的顯示或關閉
  const [inputMode, setInputMode] = useState([false, false, false, false]);

  // 轉換後的主廚介紹
  const [newchefInfoTitle, setNewchefInfoTitle] = useState("");

  // 將\n轉換成<br />
  useEffect(() => {
    if (chefInfomation) {
      setNewchefInfoTitle(
        chefInfomation["chefInfoTitle"]
          ? chefInfomation["chefInfoTitle"].replaceAll("\n", "<br />")
          : chefInfomation["chefInfoTitle"]
      );
    }
  }, [chefInfomation]);

  // input 和 文字展示的切換
  const handleModeChange = (e, index) => {
    e.stopPropagation();

    let newInputMode = [...inputMode];
    newInputMode[index] = true;
    setInputMode(newInputMode);
  };

  // 按空白處恢復成文字狀態
  const handleModeChange2 = () => {
    setInputMode([false, false, false, false]);
  };

  // 即時更新輸入的資料
  const handleInputChange = (e, index) => {
    //console.log(e.target.name);
    setChefInfomation({ ...chefInfomation, [e.target.name]: e.target.value });

    // 條列式主廚經歷
    if (index === 0 || index) {
      let newChefInfomation = { ...chefInfomation };
      newChefInfomation.chefInfo[index] = e.target.value;
      setChefInfomation(newChefInfomation);
    }
  };

  // input為空時的錯誤判斷
  const inputError = (e) => {
    if (e.target.value.length === 0) {
      e.target.classList.add("st-input-error");
    } else {
      e.target.classList.remove("st-input-error");
    }
  };
  return (
    <>
      <div className="st-chefCard2" onClick={handleModeChange2}>
        {image && (
          <div className="st-chefCard2Picture">
            <img
              src={`${PUBLIC_URL}/upload-images/${image}`}
              alt="使用者頭貼"
            />
          </div>
        )}
        {!image && (
          <div className="st-chefCard2Picture">
            <img src={Chef} alt="使用者頭貼" />
          </div>
        )}
        <div className="st-chefCard2Top">
          {!inputMode[0] && (
            <p
              className="chefCard2Top-introduce1"
              onClick={(e) => {
                handleModeChange(e, 0);
              }}
            >
              「
              {chefInfomation.chefIntroduce1 ||
                "請點擊輸入主廚卡片開頭介紹，建議可簡單介紹主廚的特色及專長(50字以內)..."}
              」
              <FaPen className="chefCard2Top-introduce1-pen" />
            </p>
          )}
          {inputMode[0] && (
            <textarea
              name="chefIntroduce1"
              className="st-chefCard2Top-chefIntroduce1"
              id=""
              cols="5"
              rows="4"
              placeholder="請輸入主廚簡介。"
              value={chefInfomation.chefIntroduce1}
              maxLength="50"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                handleInputChange(e);
                inputError(e);
              }}
            ></textarea>
          )}
          <div className="st-chefCard2Line"></div>
          <div className="st-chefCard2TopChefName">
            <div
              className="st-chefCard2TopChefName-chefIntroduce2"
              dangerouslySetInnerHTML={{
                __html:
                  "我是 " + name + ",<br /> " + "我想與您一起開心地做料理！",
              }}
            ></div>
          </div>
        </div>
        <div className="st-chefCard2Down">
          {!inputMode[2] && (
            <div className="st-chefCard2Down-chefInfoTitle">
              <div
                className="st-chefCard2Down-chefInfoTitle-textBox"
                onClick={(e) => {
                  handleModeChange(e, 2);
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    newchefInfoTitle ||
                    "請點擊輸入開課餐廳名稱及主廚頭銜(40字以內)...",
                }}
              ></div>
              <FaPen className="st-chefCard2Down-chefInfoTitle-pen" />
            </div>
          )}
          {inputMode[2] && (
            <textarea
              name="chefInfoTitle"
              maxLength="40"
              cols="5"
              rows="2"
              placeholder="請輸入餐廳名稱 + 主廚Title。"
              value={chefInfomation.chefInfoTitle}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                handleInputChange(e);
                inputError(e);
              }}
            ></textarea>
          )}

          {!inputMode[3] && (
            <ul
              className="st-chefCard2Down-ul"
              onClick={(e) => {
                handleModeChange(e, 3);
              }}
            >
              <li>{chefInfomation.chefInfo[0] || "請點擊輸入..."}</li>
              <li>{chefInfomation.chefInfo[1] || "請點擊輸入..."}</li>
              <li>{chefInfomation.chefInfo[2] || "請點擊輸入..."}</li>
              <li>{chefInfomation.chefInfo[3] || "請點擊輸入..."}</li>
              <FaPen className="st-chefCard2Down-ul-pen" />
            </ul>
          )}
          {inputMode[3] && (
            <div className="st-chefCard2Down-inputCon">
              <input
                type="text"
                name="chefInfo"
                maxLength="19"
                value={chefInfomation.chefInfo[0]}
                placeholder="主廚經歷"
                className="st-chefCard2Down-chefInfo"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  handleInputChange(e, 0);
                  inputError(e);
                }}
              />
              <input
                type="text"
                name="chefInfo"
                maxLength="19"
                value={chefInfomation.chefInfo[1]}
                placeholder="主廚經歷"
                className="st-chefCard2Down-chefInfo"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  handleInputChange(e, 1);
                  inputError(e);
                }}
              />
              <input
                type="text"
                name="chefInfo"
                maxLength="19"
                value={chefInfomation.chefInfo[2]}
                placeholder="主廚經歷"
                className="st-chefCard2Down-chefInfo"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  handleInputChange(e, 2);
                  inputError(e);
                }}
              />
              <input
                type="text"
                name="chefInfo"
                maxLength="19"
                value={chefInfomation.chefInfo[3]}
                placeholder="主廚經歷"
                className="st-chefCard2Down-chefInfo"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  handleInputChange(e, 3);
                  inputError(e);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChefCard2;
