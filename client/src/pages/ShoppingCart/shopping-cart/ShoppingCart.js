/* eslint-disable react/jsx-pascal-case */
import Course_list from './CourseList';
import Course_detail from './CourseDetail';

function shopping_cart() {
  return (
    <>
      <div className="main-block wrapper">
          <main className="mainblock">
              <Course_list/>
          </main>
          <aside className="avatar">
              <main>
                  <Course_detail/>
              </main>
          </aside>
      </div>
    </>
  );
}

export default shopping_cart;
