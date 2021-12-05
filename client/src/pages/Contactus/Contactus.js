import React from "react";
import Swal from "sweetalert2";
import MultiLevelBreadcrumb from "../../components/MultiLevelBreadcrumb";
import { useState } from "react";

const Contactus = () => {
  // const [data, setData] = useState({});

  const success = (e) => {
    let name = document.getElementsByName("yourname");
    let email = document.getElementsByName("youremail");
    let title = document.getElementsByName("yourtitle");
    let content = document.getElementsByName("yourcontent");
    console.log(name[0].value);
    if (name[0].value && email[0].value && title[0].value && content[0].value) {
      Swal.fire({
        title: "我們將會盡快回覆",
        width: 450,

        padding: "3em",
        background: "#fff url(../images/coffee-gfe407c465_641.png)",
        backdrop: `
            rgba(0,0,123,0.4)
            url("../images/1111111111.gif")
            right top
            no-repeat
          `,
      }).then(function () {
        window.location.reload();
      });
      e.preventDefault();
    }
  };

  //  function Contact() {
  //  const [inputText,setInputText] = useState('')
  //  const [textArea,setTextArea] = useState('')

  return (
    <>
      <div>
        <header className="Classroom">
          <div className="contactus_breadCrum">
            <MultiLevelBreadcrumb />
            <h1>聯絡我們</h1>
          </div>
          <div className="Linktop1"></div>
        </header>
        <div className="Location-container">
          <div className="Location-container-word">
            <h1>Umai實體料理教室</h1>
            <p>
              地址:
              <br />
              台北市中山區新生北路二段29之一號
            </p>
            <p>
              連絡電話:
              <br />g
              +886 225373239
            </p>
            <p>
              營業時間:
              <br />
              詳見各課程上課日期及時段
            </p>
          </div>

          <div className="Map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4169259394744!2d121.52563651484232!3d25.05385428396309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a967addf0305%3A0xdd9ddf56dad0a6b1!2zMTA05Y-w5YyX5biC5Lit5bGx5Y2A5paw55Sf5YyX6Lev5LqM5q61MjktMeiZnw!5e0!3m2!1szh-TW!2stw!4v1636048486591!5m2!1szh-TW!2stw"
              width="480"
              height="330"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <form className="Contactus_height" action="">
          <div className="Detail">
            <h1 style={{ top: "-17px" }}>取得聯絡</h1>
            <p>
              如果您對Umai報名課程或開設課程有任何問題
              <br />
              歡迎留言給我們,專人將會主動與您聯繫
            </p>
            <div style={{ zIndex: "1" }} className="Container">
              <div className="Both">
                <p className="Urname">
                  <label>你的名字(必填)</label>
                  <input
                    type="text"
                    name="yourname"
                    cols="73"
                    rows="1"
                    class=""
                    aria-invalid="false"
                    required
                    // value={inputText}
                    // onChange={(e) =>{setInputText(e.target.value)
                    // }}
                  ></input>
                </p>

                <p className="Uremail">
                  <label>你的信箱(必填)</label>
                  <input
                    type="text"
                    name="youremail"
                    cols="73"
                    rows="1"
                    class=""
                    aria-invalid="false"
                    required
                  ></input>
                </p>
              </div>

              <p
                style={{ margin: "0", padding: "0", width: "600px" }}
                class="Urtitle"
              >
                <label>
                  主旨
                  <br />
                </label>
                <input
                  type="text"
                  name="yourtitle"
                  cols="73"
                  rows="1"
                  class=""
                  aria-invalid="false"
                  required
                ></input>
              </p>

              <p
                style={{ margin: "0", padding: "0", top: "20px" }}
                class="Urcontent"
              >
                <label></label>
                內容
                <br />
                <textarea
                  name="yourcontent"
                  cols="73"
                  rows="24"
                  class=""
                  aria-invalid="false"
                  required
                  // value={textArea}
                  // onChange={(e) =>{setTextArea(e.target.value)
                  // }}
                ></textarea>
              </p>
            </div>
            <p>
              <input
                type="submit"
                value="送出"
                className="Form-btn"
                onClick={success}
              />
            </p>

            <div className="" aria-hidden="true"></div>
            <div className="Trapezoid"></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contactus;
