/* eslint-disable react/jsx-pascal-case */
import Course_list from './CourseList';
import Course_detail from './CourseDetail';

function shopping_cart(props) {
  let pathname="/ShoppingCart";
  let coursedata = {
    name:"築地創意壽司",
    value:3300,
    studentnumber:3
  }
  let coupon = {
    coupon1:{
      name:"滿 5000 折 500",
      count:500,
      condition:((e)=>{
        if(e>=5000)
        return true;
        else 
        return false;
      })
    }
  }
  return (
    <>
      <div className="main-block wrapper">
          <main className="mainblock">
              <Course_list coursedata={coursedata}/>
          </main>
          <aside className="avatar">
            <main>
              <Course_detail location={pathname} coursedata={coursedata} coupon={coupon}/>
            </main>
          </aside>
      </div>
    </>
  );
}

export default shopping_cart;
