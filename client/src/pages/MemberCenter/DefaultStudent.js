import React from "react";
import DefaultStudentCard from "../../components/DefaultStudentCard";

const DefaultStudent = (props) => {
  return (
    <div className="DefaultStudent">
      <div className="DefaultStudent-container">
        <header className="DefaultStudent-container-header">
          <h1>預設學員</h1>
        </header>

        <div className="DefaultStudent-container-cards">
          {new Array(5).fill(1).map((data, index) => (
            <DefaultStudentCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultStudent;
