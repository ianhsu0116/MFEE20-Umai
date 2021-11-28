/* eslint-disable default-case */
import { Link } from "react-router-dom";

function CourseDetail(props){
    let coursetitle = props.coursetitle;
    let coupon = props.coupon;
    let carddata = props.carddata;
    let OrderData = props.OrderData;
    let creditCards = props.creditCards;
    let paymenttype = props.paymenttype;
    let receipttype = props.receipttype;
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
                <td><h5>優惠券</h5></td>
                <td>
                    <select disabled="disabled">
                        <option>{props.coupon.title}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><h5>優惠折扣</h5></td>
                <td><h5>NT$ {Math.floor(props.coursetitle.value*props.coursetitle.studentnumber*(1-props.coupon.discount_percent/100))}</h5></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ {props.coursetitle.value*props.coursetitle.studentnumber-Math.floor(props.coursetitle.value*props.coursetitle.studentnumber*(1-props.coupon.discount_percent/100))}</h3></td>
            </tr>
        </table>
        <hr/>
        <Link 
        to={{
            pathname:"/ShoppingList",
            state:{data: data}
        }}
        >
            <div className="ToShoppingList">
                <button>
                    <h4>結帳</h4>
                </button>
            </div>
        </Link>
    </>     
    )
}
export default CourseDetail;