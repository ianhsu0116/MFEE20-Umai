/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-pascal-case */
import Course_list from './CourseList';
import Course_detail from './CourseDetail';
import React, { useState } from "react";

function shopping_cart(props) {
  let pathname="/ShoppingCart";
  let [coursedata, setcoursedata] = useState({
    name:"築地創意壽司",
    value:3300,
    studentnumber:2
  });


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
  let studentnumber=(num)=>{
    let studentnumber = coursedata.studentnumber+num;
    setcoursedata({...coursedata,studentnumber:studentnumber})
  }
  return (
    <>
      <div className="main-block wrapper">
          <main className="mainblock">
              <Course_list coursedata={coursedata} changestudentnumber={(e)=>{studentnumber(e)}}/>
          </main>
          <aside className="avatar">
            <main>
              <Course_detail location={pathname} coursedata={coursedata} coupon={coupon}/>
            </main>
          </aside>
      </div>
    </>
  );
}

export default shopping_cart;
