/* eslint-disable default-case */
import { Link } from "react-router-dom";

function CourseDetail(props){
    let coursetitle = props.coursetitle;
    let coupon = props.coupon;
    let carddata = props.carddata;
    let OrderData = props.OrderData;
    let creditCards = props.creditCards;
    let data = JSON.stringify({coursetitle:coursetitle,coupon:coupon,carddata:carddata,OrderData:OrderData,creditCards:creditCards});
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
                    <select disabled="disabled">
                        <option>{props.coupon.name}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><h4>優惠折扣</h4></td>
                <td><h4>NT$ {props.coupon.count}</h4></td>
            </tr>
            <tr>
                <td><h3>總金額</h3></td>
                <td><h3>NT$ {props.coursetitle.value*props.coursetitle.studentnumber-props.coupon.count}</h3></td>
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