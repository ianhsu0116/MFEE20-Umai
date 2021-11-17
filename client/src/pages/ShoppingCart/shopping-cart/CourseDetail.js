/* eslint-disable default-case */
import { useState } from "react";
import { Link } from "react-router-dom";

function CourseDetail(props){
    const [discount,setdiscount]=useState(0)
    let coursetitle = JSON.stringify(props.coursetitle)
    let coupon = JSON.stringify(props.coupon)
    let carddata = JSON.stringify(props.carddata)
    return(
    <>
        <div>
            <h2>訂單明細</h2>
            <hr/>
        </div>
        <table className="CourseDetail-Consumer-details">
            <tr>
                <td><h4>訂單小計</h4></td>
                <td><h4>NT$ {props.coursetitle.value*props.coursetitle.studentnumber}</h4></td>
            </tr>
            <tr>
                <td><h4>優惠券</h4></td>
                <td>
                    <select onChange={(e)=>{setdiscount(e.target.value)}}>
                        <option value = "0">請選擇優惠券</option>
                        {props.coupon.map((data) => <option value={data.count}>{data.name}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td><h4>優惠折扣</h4></td>
                <td><h4>NT$ {discount}</h4></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ {props.coursetitle.value*props.coursetitle.studentnumber-discount}</h3></td>
            </tr>
        </table>
        <hr/>
        <Link 
        to={{
            pathname:"/PaymentMethod",
            state:{coursetitle: coursetitle, coupon1:coupon}
        }}
        >
            <div className="ToShoppingList">
                <button>
                    <h4>"選擇付款方式"</h4>
                </button>
            </div>
        </Link>
    </>     
    )
}
export default CourseDetail;