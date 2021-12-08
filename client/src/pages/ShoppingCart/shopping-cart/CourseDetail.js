/* eslint-disable default-case */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import datacheck from "../validation";

function CourseDetail(props) {
  //優惠卷額度
  const [discount, setdiscount] = useState(100);
  //存取選到的優惠券
  const [selectedIndex, setselectedIndex] = useState(0);

  const [link, setlink] = useState("/PaymentMethod");
  const [dataerror, setdataerror] = useState(false);

  let coursetitle = props.coursetitle;
  let coupon = {};

  if (props.coupon[selectedIndex] !== undefined) {
    coupon = props.coupon[selectedIndex];
  }
  let carddata = props.carddata;
  let OrderData = props.OrderData;
  //自動抓每個物件內的 name，再比對物件內的值
  function checkdata() {
    // carddata.map((data)=>Object.keys(data))[0].map((index)=> {return index}).map((name)=>{if(carddata[0][name]===""){dataerror=true}});
    // Object.keys(OrderData).map((name)=>{if(OrderData[name]===""){dataerror=true}})
    if (datacheck.ordererValidation(OrderData).error !== undefined) {
      setdataerror(true)
      return
    }else{
      setdataerror(false)
    }
    for(let i=0;i<carddata.length;i++){
      if(datacheck.studentValidation(carddata[i]).error !==undefined){
        setdataerror(true)
        return
      }else{
        setdataerror(false)
      }
    }
  }
  useEffect(() => {
    checkdata(dataerror);
  });
  let data = JSON.stringify({
    coursetitle: coursetitle,
    coupon: coupon,
    carddata: carddata,
    OrderData: OrderData,
  });
  return (
    <>
      <div>
        <h2>訂單明細</h2>
        <hr />
      </div>
      <table className="CourseDetail-Consumer-details">
        <tr>
          <td>
            <h5>訂單小計</h5>
          </td>
          <td>
            <h5>NT$ {coursetitle.value * coursetitle.studentnumber}</h5>
          </td>
        </tr>

        <tr>
          <td>
            <h5>優惠折扣</h5>
          </td>
          <td>
            <h5>
              -NT${" "}
              {Math.floor(
                coursetitle.value *
                  coursetitle.studentnumber *
                  (1 - discount / 100)
              )}
            </h5>
          </td>
        </tr>
        <tr>
          <td>
            <h3>總金額</h3>
          </td>
          <td>
            <h3>
              NT${" "}
              {coursetitle.value * coursetitle.studentnumber -
                Math.floor(
                  coursetitle.value *
                    coursetitle.studentnumber *
                    (1 - discount / 100)
                )}
            </h3>
          </td>
        </tr>
      </table>

      <hr />
      <table className="CourseDetail-coupon">
        <tr>
          <td>
            <h5>優惠券</h5>
          </td>
          <td>
            <select
              onChange={(e) => {
                setdiscount(e.target.value);
                setselectedIndex(e.target.options.selectedIndex);
              }}
            >
              {props.coupon.map((data) => (
                <option value={data.discount_percent}>{data.title}</option>
              ))}
            </select>
          </td>
        </tr>
      </table>
      {dataerror?
        <div className="ToShoppingList">
          <button
            onClick={() => {
              if (dataerror === true) {
                Swal.fire({
                  icon: "error",
                  title: "訂單資料有誤",
                  text: "資料未輸入完整或資料有誤",
                });
              }
            }}
          >
            <h4>選擇付款方式</h4>
          </button>
        </div>:
        <Link to={{ pathname: "/paymentMethod", state: { data: data } }}>
        <div className="ToShoppingList">
          <button
            onClick={() => {
              if (dataerror === true) {
                Swal.fire({
                  icon: "error",
                  title: "訂單資料有誤",
                  text: "資料未輸入完整或資料有誤",
                });
              }
            }}
          >
            <h4>選擇付款方式</h4>
          </button>
        </div>
      </Link>
        }
    </>
  );
}
export default CourseDetail;
