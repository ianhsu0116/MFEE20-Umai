/* eslint-disable react/jsx-pascal-case */
import Course_detail from './CourseDetail';
import PamentWay from './PamentWay';
import Receipt from './Receipt';
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
function PaymentMethod(props){
    //接收上一頁傳來的資料
    const location = useLocation();
    let { data} = location.state;
    
    let coursetitle = JSON.parse(data).coursetitle;
    let coupon = JSON.parse(data).coupon;
    let carddata = JSON.parse(data).carddata;
    let OrderData = JSON.parse(data).OrderData;
    const [creditCards,setcreditCards]=useState({})
    const [paymenttype,setpaymenttype]=useState(0)
    const [receipttype,setreceipttype]=useState(0)
    //修改信用卡資料
    function getcreditCards(data){
        setcreditCards(data)
    }

    // 修改付款方式
    function getpaymenttype(data){
        setpaymenttype(data)
    }

    //修改發票處理方式
    function getreceipttype(data){
        setreceipttype(data)
    }

    return(
        <>
        <div className="main-block wrapper">
            <main className="mainblock">
                <div className="CourseList-title">
                    <h1>確認付款</h1>
                </div>
                <hr/>
                <PamentWay
                    getpaymenttype={(data)=>{getpaymenttype(data)}}
                    getcreditCards={(data)=>{getcreditCards(data)}}
                />
                <Receipt
                    getreceipttype={(data)=>{getreceipttype(data)}}
                />
            </main>
            <aside className="avatar">
                <main>
                <Course_detail 
                coursetitle = {coursetitle} 
                coupon = {coupon}
                carddata = {carddata}
                OrderData = {OrderData}
                creditCards = {creditCards}
                paymenttype = {paymenttype}
                receipttype = {receipttype}
                />
                </main>
            </aside>
        </div>
        </>
    )
}
export default PaymentMethod;