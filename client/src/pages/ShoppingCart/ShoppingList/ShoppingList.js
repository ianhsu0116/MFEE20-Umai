/* eslint-disable react/jsx-pascal-case */
import Shopping_bill from './ShoppingBill';

function ShoppingList(){
    return(
        <>
        <div className="ShoppingBill-background">
            <div className="ShoppingBill-wrapper">
                <div className="ShoppingBill-title">
                    <h2>消費明細</h2>
                    <h4>總計4堂課</h4>
                </div>
                <hr/>
                <h3>消費帳單</h3>
                <Shopping_bill/>
                <div className="ShoppingBill-remind">
                    <h3>我懶得打</h3>
                </div>
            </div>
        </div>
        </>
    )
}
export default ShoppingList;