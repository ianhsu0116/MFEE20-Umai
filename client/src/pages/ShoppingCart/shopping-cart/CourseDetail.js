/* eslint-disable default-case */
import { useState } from "react";
import { Link } from "react-router-dom";

function CourseDetail(props){
    const [discount,setdiscount]=useState(0);
    const [selectedIndex,setselectedIndex]=useState(0);
    let coursetitle = props.coursetitle;
    let coupon={};
    if(props.coupon[selectedIndex]!==undefined){
        coupon = props.coupon[selectedIndex];
    }
    let carddata = props.carddata;
    let OrderData = props.OrderData;
    let data = JSON.stringify({coursetitle:coursetitle,coupon:coupon,carddata:carddata,OrderData:OrderData});
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
                    <select onChange={(e)=>{setdiscount(e.target.value); setselectedIndex(e.target.options.selectedIndex)}}>
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
            state:{data: data}
        }}
        >
            <div className="ToShoppingList">
                <button>
                    <h4>選擇付款方式</h4>
                </button>
            </div>
        </Link>
    </>     
    )
}
export default CourseDetail;