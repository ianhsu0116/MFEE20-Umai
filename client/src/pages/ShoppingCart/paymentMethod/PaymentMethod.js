/* eslint-disable react/jsx-pascal-case */
import Course_detail from '../shopping-cart/CourseDetail';
import PamentWay from './PamentWay';
import Receipt from './Receipt';

function PaymentMethod(props){
    let pathname="/PaymentMethod";
    return(
        <>
        <div className="main-block wrapper">
            <main className="mainblock">
                <div className="CourseList-title">
                    <h1>訂單結帳</h1>
                    <h5>總計4堂課</h5>
                </div>
                <hr/>
                <PamentWay/>
                <Receipt/>
            </main>
            <aside className="avatar">
                <main>
                    <Course_detail location={pathname}/>
                </main>
            </aside>
        </div>
        </>
    )
}
export default PaymentMethod;