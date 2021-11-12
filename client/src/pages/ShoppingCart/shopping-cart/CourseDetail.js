/* eslint-disable default-case */
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

function CourseDetail(props){
    let [pathname, setPathname] = useState("/");
    let [nextpage, setNextpage] = useState("/");
    let [disabled, setDisabled] = useState("")

    useEffect(() => {
        setPathname(props.location);
        switch(pathname){
            case "/ShoppingCart":
                setNextpage("/PaymentMethod");
                setDisabled("");
                break;
            case "/PaymentMethod":
                setNextpage("/ShoppingList");
                setDisabled("disabled");
                break;
        };
      },);
    
    return(
    <>
        <div>
            <h2>訂單明細</h2>
            <hr/>
        </div>
        <table className="CourseDetail-Consumer-details">
            <tr>
                <td><h4>訂單小計</h4></td>
                <td><h4>NT$ {props.coursedata.value*props.coursedata.studentnumber}</h4></td>
            </tr>
            <tr>
                <td><h4>優惠券</h4></td>
                <td>
                    <select disabled={disabled}>
                        <option>{props.coupon.coupon1.name}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><h4>優惠折扣</h4></td>
                <td><h4>NT$ {props.coupon.coupon1.count}</h4></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ {props.coursedata.value*props.coursedata.studentnumber-props.coupon.coupon1.count}</h3></td>
            </tr>
        </table>
        <hr/>
        <Link to={nextpage}>
            <div className="ToShoppingList"><button><h4>
            {pathname === "/ShoppingCart" && ("選擇付款方式")}
            {pathname === "/PaymentMethod" && ("結帳")}
            </h4></button></div>
        </Link>
    </>     
    )
}
export default CourseDetail;