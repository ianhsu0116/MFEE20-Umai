/* eslint-disable default-case */
import { useState } from "react";
import { Link } from "react-router-dom";

function CourseDetail(props){
    const [discount,setdiscount]=useState(100);
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
                <td><h5>訂單小計</h5></td>
                <td><h5>NT$ {coursetitle.value*coursetitle.studentnumber}</h5></td>
            </tr>
            
            <tr>
                <td><h5>優惠折扣</h5></td>
                <td><h5>NT$ {Math.floor(coursetitle.value*coursetitle.studentnumber*(1-discount/100))}</h5></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ {coursetitle.value*coursetitle.studentnumber-Math.floor(coursetitle.value*coursetitle.studentnumber*(1-discount/100))}</h3></td>
            </tr>
        </table>
        
        <hr/>
        <table className="CourseDetail-coupon">
            <tr>
                <td><h5>優惠券</h5></td>
                <td>
                    <select onChange={(e)=>{setdiscount(e.target.value); setselectedIndex(e.target.options.selectedIndex)}}>
                        {props.coupon.map((data) => <option value={data.discount_percent}>{data.title}</option>)}
                    </select>
                </td>
            </tr>
        </table>
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