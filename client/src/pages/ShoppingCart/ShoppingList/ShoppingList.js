/* eslint-disable react/jsx-pascal-case */
import PaymentDetails from './PaymentDetails';
import Shopping_bill from './ShoppingBill';
function ShoppingList(){
    return(
        <>
        <div className="ShoppingBill-background">
            <div className="ShoppingBill-wrapper">
                <div className="ShoppingBill-title">
                    <h1>完成訂購</h1>
                    <h5>總計4堂課</h5>
                </div>
                <hr/>
                <h3>消費帳單</h3>
                <Shopping_bill/>
                <div className="ShoppingBill-payment-details">
                    <h3>付款明細</h3>
                    <PaymentDetails/>
                </div>
            </div>
        </div>
        </>
    )
}
export default ShoppingList;