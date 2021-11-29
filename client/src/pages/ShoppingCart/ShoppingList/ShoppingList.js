/* eslint-disable react/jsx-pascal-case */
import PaymentDetails from './PaymentDetails';
import Shopping_bill from './ShoppingBill';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../../../config/config";
import { useEffect } from 'react';

function ShoppingList(props){
    //會員ID
    const { currentUser } = props;

    const location = useLocation();
    let {data} = location.state;
    let coursetitle = JSON.parse(data).coursetitle;
    let coupon = JSON.parse(data).coupon;
    let carddata = JSON.parse(data).carddata;
    let OrdererData = JSON.parse(data).OrderData;
    let creditCards = JSON.parse(data).creditCards;
    let paymenttype = JSON.parse(data).paymenttype;
    let receipttype = JSON.parse(data).receipttype;
    async function insert(){
        const orderdata={
            memberid: currentUser.id,
            courseid: coursetitle.course_id,
            batchid: coursetitle.batch_id,
            firstName: OrdererData.firstName,
            lastName: OrdererData.lastName,
            telephone: OrdererData.telephone,
            birthday: OrdererData.birthday,
            email: OrdererData.email,
            paymenttype: paymenttype,
            receipttype: receipttype,
            ordersprice: coursetitle.value*coursetitle.studentnumber-Math.floor(coursetitle.value*coursetitle.studentnumber*(1-coupon.discount_percent/100))
        };
        try{
            let insert_order_data =await axios.post( API_URL + "/order/insertOrderData",orderdata,{ withCredentials: true });
            
        }catch(error){
            console.log(error.response.data);
        }
    }
    async function insertstudentdata(){
        carddata.map(async (data)=>{
            data={...data,memberid:currentUser.id}
            console.log(data);
            try{
                let inset_student_data =await axios.post( API_URL + "/order/insertStudentData",data,{ withCredentials: true });
            }catch(error){
                console.log(error.response.data);
            }
        })
    }
    useEffect(()=>{
        insert()
        insertstudentdata()
    },[])

    return(
        <>
        <div className="ShoppingBill-background">
            <div className="ShoppingBill-wrapper">
                <div className="ShoppingBill-title">
                    <h1>完成訂購</h1>
                </div>
                <hr/>
                <h3>消費帳單</h3>
                <Shopping_bill
                    coursetitle={coursetitle}
                    coupon={coupon}
                    carddata={carddata}
                    OrdererData={OrdererData}
                />
                <div className="ShoppingBill-payment-details">
                    <h3>付款明細</h3>
                    <PaymentDetails
                    OrdererData={OrdererData}
                    />
                </div>
            </div>
        </div>
        </>
    )
}
export default ShoppingList;