import React from "react";
import DefaultStudentCard from "../../components/DefaultStudentCard";
import DefaultStudentCard2 from "../../components/member/DefaultStudentCard2";

const DefaultStudent = (props) => {
  return (
    <div className="DefaultStudent">
      <div className="DefaultStudent-container">
        <header className="DefaultStudent-container-header">
          <h2>預設學員</h2>
        </header>

        <div className="DefaultStudent-container-cards">
          <DefaultStudentCard2 />
          {new Array(5).fill(1).map((data, index) => (
            <DefaultStudentCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultStudent;
