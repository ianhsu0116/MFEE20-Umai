/* eslint-disable default-case */
import { Link } from "react-router-dom";
import datacheck from "../validation";
import Swal from 'sweetalert2';
import { useState , useEffect} from "react";

function CourseDetail(props){

    let coursetitle = props.coursetitle;
    let coupon = props.coupon;
    let carddata = props.carddata;
    let OrderData = props.OrderData;
    let creditCards = props.creditCards;
    let paymenttype = props.paymenttype;
    let receipttype = props.receipttype;

    const [link,setlink]=useState("/ShoppingList")
    const [dataerror,setdataerror]=useState(false)

    function checkdata(){
        if(datacheck.creditCardValidation(creditCards).error!==undefined){
            setlink("/PaymentMethod")
            setdataerror(true)
            return
        }else{
            setlink("/ShoppingList")
            setdataerror(false)
        }
    }
    useEffect(()=>{
        checkdata()
    })

    //要傳送至下一個頁面的資料
    let data = JSON.stringify({coursetitle:coursetitle,coupon:coupon,carddata:carddata,OrderData:OrderData,creditCards:creditCards,paymenttype:paymenttype,receipttype:receipttype});

    return(
    <>
        <div>
            <h2>訂單明細</h2>
            <hr/>
        </div>
        <table className="CourseDetail-Consumer-details">
            <tr>
                <td><h5>訂單小計</h5></td>
                <td><h5>NT$ {props.coursetitle.value*props.coursetitle.studentnumber}</h5></td>
            </tr>
            <tr>
                <td><h5>優惠折扣</h5></td>
                <td><h5>-NT$ {Math.floor(props.coursetitle.value*props.coursetitle.studentnumber*(1-props.coupon.discount_percent/100))}</h5></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ {props.coursetitle.value*props.coursetitle.studentnumber-Math.floor(props.coursetitle.value*props.coursetitle.studentnumber*(1-props.coupon.discount_percent/100))}</h3></td>
            </tr>
        </table>
        <hr/>
        <table className="CourseDetail-coupon">
            <tr>
                <td><h5>優惠券</h5></td>
                <td>
                    <select disabled="disabled">
                        <option>{props.coupon.title}</option>
                    </select>
                </td>
            </tr>
        </table>
        <Link 
        to={{
            pathname:link,
            state:{data: data}
        }}
        >
            <div className="ToShoppingList">
                <button
                    onClick={()=>{
                    if(dataerror===true){
                        Swal.fire({
                            icon: 'error',
                            title: '信用卡資料有誤',
                            text:'資料未輸入完整或資料有誤'
                            })
                        }
                     }
                }
                >
                    <h4>結帳</h4>
                </button>
            </div>
        </Link>
    </>     
    )
}
export default CourseDetail;