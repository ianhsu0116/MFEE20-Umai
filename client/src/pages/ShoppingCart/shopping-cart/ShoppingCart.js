import Course_list from './CourseList';
import Course_detail from './CourseDetail';

function shopping_cart() {
  return (
    <>
      <div className="main-block wrapper">
          <main>
              <div className="title">
                  <h2>訂單結帳</h2>
                  <h4>總計4堂課</h4>
              </div>
              <hr/>
              <Course_list/>
          </main>
          <aside className="avatar">
              <main>
                  <div>
                      <h2>消費明細</h2>
                      <hr/>
                  </div>
                  <Course_detail/>
                  <hr/>
                  <div><button><h5>選擇付款方式</h5></button></div>
              </main>
          </aside>
      </div>
    </>
  );
}

export default shopping_cart;
