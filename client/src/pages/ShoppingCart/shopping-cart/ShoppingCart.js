/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-pascal-case */
import Course_list from './CourseList';
import Course_detail from './CourseDetail';
import React, { useState } from "react";


function shopping_cart(props) {
  let pathname="/ShoppingCart";

  let coursetitle = {
    name:"築地創意壽司",
    value:3300,
    studentnumber:3
  };
  
  let defaultcarddata={
      firstName: "",
      lastName: "",
      telephone: "",
      birthday: "",
      email: "",
  };
  const [ carddata, setCarddata] = useState([]);
  
//新增刪除卡片
  function changecarddata(i,newdata){
    setCarddata([...carddata][i-1]= Object.assign([...carddata][i-1],newdata))
  }

  function deletecarddata(i){
    const newcard =[...carddata]
    newcard.splice(i-1,1)
    setCarddata(newcard)
  }

  function newcarddata(){
    let newcard=[...carddata];
    let count = newcard.push({
      ...defaultcarddata,
      index:newcard.length+1,
      changecarddata:(index,newdata)=>{changecarddata(index,newdata)},
      deletecarddata:(index)=>{deletecarddata(index)}
      });
    setCarddata(newcard)  
  }

  let defultcard=[];
  for(let i = 1; i <= coursetitle.studentnumber; i++){
    if(carddata.length!==0)
      break;
    defultcard.push({
      ...defaultcarddata,
      changecarddata:(index,newdata)=>{changecarddata(index,newdata)},
      deletecarddata:(index)=>{deletecarddata(index)}
      })
    if(i===coursetitle.studentnumber)
      setCarddata(defultcard)
  }

  let coupon = {
    coupon1:{
      name:"滿 5000 折 500",
      count:500,
      condition:((e)=>{
        if(e>=5000)
        return true;
        else 
        return false;
      })
    }
  }

  return (
    <>
      <div className="main-block wrapper">
          <main className="mainblock">
              <Course_list carddata={carddata} coursetitle={coursetitle} newcarddata={()=>{newcarddata()}}/>
          </main>
          <aside className="avatar">
            <main>
              <Course_detail location={pathname} coursetitle={coursetitle} coupon={coupon}/>
            </main>
          </aside>
      </div>
    </>
  );
}

export default shopping_cart;
