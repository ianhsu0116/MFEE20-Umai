/* eslint-disable react/jsx-pascal-case */
import PaymentDetails from './PaymentDetails';
import Shopping_bill from './ShoppingBill';
import { useLocation } from 'react-router-dom'
function ShoppingList(props){
    const location = useLocation();
    let {data} = location.state;
    let coursetitle = JSON.parse(data).coursetitle;
    let coupon = JSON.parse(data).coupon;
    let carddata = JSON.parse(data).carddata;
    let OrderData = JSON.parse(data).OrderData;
    let creditCards = JSON.parse(data).creditCards;
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
                    OrderData={OrderData}
                />
                <div className="ShoppingBill-payment-details">
                    <h3>付款明細</h3>
                    <PaymentDetails
                    OrderData={OrderData}
                    />
                </div>
            </div>
        </div>
        </>
    )
}
export default ShoppingList;