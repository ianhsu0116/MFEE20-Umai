/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-pascal-case */
import Course_list from './CourseList';
import Course_detail from './CourseDetail';
import React, { useState, useEffect } from "react";
import axios from "axios";

function shopping_cart(props) {
  //會員ID
  const { currentUser } = props;

  //課程資訊
  const [ coursetitle, setCoursetitle] = useState({});
  useEffect(async () => {
    try {
      let result = await axios.get(`http://localhost:8080/api/course/9`, {
        withCredentials: true,
      });
      console.log(result.data.course);
      setCoursetitle({
        name:result.data.course[0].course_name,
        value:result.data.course[0].course_price,
        studentnumber:1
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //優惠券
  const [ coupon, setcoupon] = useState([{
    title:"請選擇優惠券",
    discount_percent:100
  }])
  useEffect(async () => {
    try {
      let result = await axios.get(`http://localhost:8080/api/member/coupons/${currentUser.id}?type=1`, {
        withCredentials: true,
      });
      let data=[...coupon]
      data=data.concat(result.data.coupons)
      setcoupon(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //預設卡片資料格式
  let defaultcarddata={
    firstName: "",
    lastName: "",
    telephone: "",
    birthday: "",
    email: "",
  };
  

  const [ carddata, setCarddata] = useState([]);
  const [ OrderData, setOrderData] = useState({})

//修改訂購人資料
  function changeorderdata(data){
    setOrderData(data)
  }

//新增刪除卡片 修改卡片資料
  function changecarddata(i,newdata,carddata){
    carddata[i-1]=Object.assign(carddata[i-1],newdata)
    setCarddata(carddata);
  }

  function deletecarddata(i,carddata){
    if(carddata.length===1)
      return;
    carddata.splice(i-1,1)
    setCarddata(carddata)
    setCoursetitle({...coursetitle,studentnumber:carddata.length})
  }

  function newcarddata(carddata){
    carddata.push({
      ...defaultcarddata,
      index:carddata.length+1,
      changecarddata:(index,newdata,carddata)=>{changecarddata(index,newdata,carddata)},
      deletecarddata:(index,newdata)=>{deletecarddata(index,newdata)}
      });
    setCoursetitle({...coursetitle,studentnumber:carddata.length})
  }
  
  //第一次進入頁面時生成學員資料卡片
  if(carddata.length===0){
    let defultcard=[];
    defultcard.push({
      ...defaultcarddata,
      changecarddata:(index,newdata,carddata)=>{changecarddata(index,newdata,carddata)},
      deletecarddata:(index,newdata)=>{deletecarddata(index,newdata)}
      })
    setCarddata(defultcard)
  }

  return (
    <>
      <div className="main-block wrapper">
          <main className="mainblock">
              <Course_list 
              carddata={carddata} 
              coursetitle={coursetitle} 
              newcarddata={(carddata)=>{newcarddata(carddata)}} 
              changecarddata={(index,newdata,carddata)=>{changecarddata(index,newdata,carddata)}} 
              deletecarddata={(index,newdata)=>deletecarddata(index,newdata)}
              changeorderdata={(data)=>{changeorderdata(data)}} 
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
