/* eslint-disable react/jsx-pascal-case */
import Course_detail from './CourseDetail';
import PamentWay from './PamentWay';
import Receipt from './Receipt';
import { useLocation } from 'react-router-dom'

function PaymentMethod(props){
  const location = useLocation()
  let { coursetitle,coupon1 } = location.state;
 
   coursetitle = JSON.parse(coursetitle);
   let coupon = JSON.parse(coupon1);
    console.log(coupon1);
    // let coursetitle = {
    //     name:"築地創意壽司",
    //     value:3300,
    //     studentnumber:3
    //   }
    // let coupon = {
    //   coupon1:{
    //     name:"滿 5000 折 500",
    //     count:500,
    //     condition:((e)=>{
    //       if(e>=5000)
    //       return true;
    //       else 
    //       return false;
    //     })
    //   }
    // }
    return(
        <>
        <div className="main-block wrapper">
            <main className="mainblock">
                <div className="CourseList-title">
                    <h1>確認付款</h1>
                </div>
                <hr/>
                <PamentWay/>
                <Receipt/>
            </main>
            <aside className="avatar">
                <main>
                <Course_detail coursetitle={coursetitle} coupon={coupon}/>
                </main>
            </aside>
        </div>
        </>
    )
}
export default PaymentMethod;