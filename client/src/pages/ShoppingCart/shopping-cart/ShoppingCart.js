/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-pascal-case */
import Course_list from './CourseList';
import Course_detail from './CourseDetail';
import React, { useState } from "react";


function shopping_cart(props) {
  //課程資訊
  const [ coursetitle, setCoursetitle] = useState({
    name:"築地創意壽司",
    value:3300,
    studentnumber:1
  });
  //預設卡片資料格式
  let defaultcarddata={
    firstName: "",
    lastName: "",
    telephone: "",
    birthday: "",
    email: "",
  };
  //優惠券
  let coupon = [{
    name:"請選擇優惠券",
    count:0
  },{
      name:"滿 5000 折 500",
      count:500,
      condition:((e)=>{
        if(e>=5000)
        return true;
        else 
        return false;
      })
    },
    {
      name:"滿 5000 折 400",
      count:400,
      condition:((e)=>{
        if(e>=5000)
        return true;
        else 
        return false;
      })
    }
  ];

  const [ carddata, setCarddata] = useState([]);
  const [ OrderData, setOrderData] = useState({})

//修改訂購人資料
  function changeorderdata(data){
    setOrderData(data)
  }

//新增刪除卡片 修改卡片資料
  function changecarddata(i,newdata,carddata){
    let data = [...carddata]
    data[i-1]=Object.assign(carddata[i-1],newdata)
    setCarddata(data);
  }

  function deletecarddata(i,carddata){
    const newcard =carddata;
    newcard.splice(i-1,1)
    setCoursetitle({...coursetitle,studentnumber:newcard.length})
  }

  function newcarddata(carddata){
    let newcard=carddata;
    newcard.push({
      ...defaultcarddata,
      index:newcard.length+1,
      changecarddata:(index,newdata,carddata)=>{changecarddata(index,newdata,carddata)},
      deletecarddata:(index,newdata)=>{deletecarddata(index,newdata)}
      });
    setCoursetitle({...coursetitle,studentnumber:newcard.length})
  }

//生成卡片資料陣列
  let defultcard=[];
    for(let i = 1; i <= coursetitle.studentnumber; i++){
        if(carddata.length!==0)
        break;
        defultcard.push({
        ...defaultcarddata,
        changecarddata:(index,newdata,carddata)=>{changecarddata(index,newdata,carddata)},
        deletecarddata:(index,newdata)=>{deletecarddata(index,newdata)}
        })
        if(i===coursetitle.studentnumber)
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
