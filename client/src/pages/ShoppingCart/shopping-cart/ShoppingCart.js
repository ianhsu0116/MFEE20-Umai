/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-pascal-case */
import Course_list from "./CourseList";
import Course_detail from "./CourseDetail";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function shopping_cart(props) {
  const location = useLocation();
  if (location.state === undefined) {
    window.location.href = "http://localhost:3000/";
  }
  let { data } = location.state;

  const checkoutCourse = JSON.parse(data);
  //如果沒有取得資料則跳回首頁
  if (
    !checkoutCourse ||
    checkoutCourse === {} ||
    checkoutCourse.member_id === "" ||
    checkoutCourse.course_id === "" ||
    checkoutCourse.batch_id === "" ||
    checkoutCourse.amount < 1
  ) {
    window.location.href = "http://localhost:3000/";
  }

  //會員ID
  const { currentUser } = props;
  //課程資訊
  const [coursetitle, setCoursetitle] = useState({});
  useEffect(async () => {
    console.log(`http://localhost:8080/api/course/${checkoutCourse.course_id}`);
    try {
      let course = await axios.get(
        `http://localhost:8080/api/course/${checkoutCourse.course_id}`,
        {
          withCredentials: true,
        }
      );

      for (let i = 0; i <= course.data.course_batch.length; i++) {
        if (course.data.course_batch[i]["id"] === checkoutCourse.batch_id)
          setCoursetitle({
            course_id: checkoutCourse.course_id,
            batch_id: checkoutCourse.batch_id,
            name: course.data.course[0].course_name,
            value: course.data.course[0].course_price * 0.9,
            studentnumber: checkoutCourse.amount,
            courseimage: course.data.course[0].course_image,
            memberlimit: course.data.course[0].member_limit,
            membercount: course.data.course_batch[i].member_count,
          });
      }
    } catch (error) {}
  }, []);

  //優惠券
  const [coupon, setcoupon] = useState([
    {
      title: "請選擇優惠券",
      discount_percent: 100,
    },
  ]);
  useEffect(async () => {
    try {
      let result = await axios.get(
        `http://localhost:8080/api/member/coupons/${currentUser.id}?type=1`,
        { withCredentials: true }
      );
      let data = [...coupon];
      data = data.concat(result.data.coupons);
      setcoupon(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //預設卡片資料格式
  let defaultcarddata = {
    first_name: "",
    last_name: "",
    telephone: "",
    birthday: "",
    email: "",
    addIntoStudent: false,
    autoUpdateMember: false,
  };

  const [carddata, setCarddata] = useState([]);
  const [OrderData, setOrderData] = useState({});
  //修改訂購人資料
  function changeorderdata(data) {
    setOrderData(data);
  }

  //新增刪除卡片 修改卡片資料
  function changecarddata(i, newdata) {
    let card = [...carddata];
    card[i - 1] = newdata;
    setCarddata(card);
  }

  function deletecarddata(i, deletecarddata, coursetitle) {
    if (deletecarddata.length === 1) return;
    deletecarddata.splice(i - 1, 1);
    setCarddata(deletecarddata);
    setCoursetitle({ ...coursetitle, studentnumber: deletecarddata.length });
  }

  function newcarddata(newcarddata) {
    if (
      newcarddata.length ===
      coursetitle.memberlimit - coursetitle.membercount
    )
      return;
    newcarddata.push({
      ...defaultcarddata,
      index: newcarddata.length + 1,
    });
    setCarddata(newcarddata);
    setCoursetitle({ ...coursetitle, studentnumber: newcarddata.length });
  }

  //第一次進入頁面時生成學員資料卡片
  if (carddata.length === 0) {
    let defultcard = [];
    for (let i = 0; i < checkoutCourse.amount; i++) {
      defultcard.push({
        ...defaultcarddata,
      });
    }
    setCarddata(defultcard);
  }

  return (
    <>
      <div className="main-block wrapper">
        <main className="mainblock">
          <Course_list
            carddata={carddata}
            coursetitle={coursetitle}
            currentUser={currentUser}
            newcarddata={(carddata) => {
              newcarddata(carddata);
            }}
            changeorderdata={(data) => {
              changeorderdata(data);
            }}
            changecarddata={(index, newdata) => {
              changecarddata(index, newdata);
            }}
            deletecarddata={(index, newdata, coursetitle) => {
              deletecarddata(index, newdata, coursetitle);
            }}
          />
        </main>
        <aside className="avatar">
          <main>
            <Course_detail
              coursetitle={coursetitle}
              coupon={coupon}
              carddata={carddata}
              OrderData={OrderData}
            />
          </main>
        </aside>
      </div>
    </>
  );
}

export default shopping_cart;
