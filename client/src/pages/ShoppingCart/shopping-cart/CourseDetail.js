/* eslint-disable default-case */
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

function CourseDetail(props){
    let [pathname, setPathname] = useState("/");
    let [nextpage, setNextpage] = useState("/");

    useEffect(() => {
        setPathname(props.location);
        switch(pathname){
            case "/ShoppingCart":
                setNextpage("/PaymentMethod");
                break;
            case "/PaymentMethod":
                setNextpage("/ShoppingList");
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
                <td><h4>NT$ 9900</h4></td>
            </tr>
            <tr>
                <td><h4>優惠券</h4></td>
                <td>
                    <select>
                        <option>滿 5000 折 500</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><h4>優惠折扣</h4></td>
                <td><h4>NT$ 500</h4></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ 9400</h3></td>
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