/* eslint-disable react/jsx-pascal-case */
import Course_detail from './CourseDetail';
import PamentWay from './PamentWay';
import Receipt from './Receipt';
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
function PaymentMethod(props){
    const location = useLocation();
    let { data} = location.state;
    const [creditCards,setcreditCards]=useState({})
    let coursetitle = JSON.parse(data).coursetitle;
    let coupon = JSON.parse(data).coupon;
    let carddata = JSON.parse(data).carddata;
    let OrderData = JSON.parse(data).OrderData;
    
    function getcreditCards(data){
        setcreditCards(data)
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
                    getcreditCards={(data)=>{getcreditCards(data)}}
                />
                <Receipt/>
            </main>
            <aside className="avatar">
                <main>
                <Course_detail 
                coursetitle={coursetitle} 
                coupon={coupon}
                carddata={carddata}
                OrderData={OrderData}
                creditCards={creditCards}
                />
                </main>
            </aside>
        </div>
        </>
    )
}
export default PaymentMethod;