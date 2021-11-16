import React, { useState } from "react";
import MemberService from "../../services/member.service";
import getValidMessage from "../../validMessage/validMessage";
import DefaultStudentCard from "../../components/DefaultStudentCard";
import DefaultStudentCard2 from "../../components/member/DefaultStudentCard2";
import ErrorMessage from "../../components/ErrorMessage";

const DefaultStudent = (props) => {
  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");
  // 存要新增的學生資料
  const [newStudentData, setNewStudentData] = useState({
    first_name: "",
    last_name: "",
    telephone: "",
    birthday: "",
    email: "",
  });

  // 按下新增學員
  const handleAddStudent = async (e) => {
    console.log("新增學員");
    try {
      let result = await MemberService.studentInsert(newStudentData);

      // 清空當前input
      setNewStudentData({
        first_name: "",
        last_name: "",
        telephone: "",
        birthday: "",
        email: "",
      });
      // 清空錯誤訊息
      setErrorMsg("");

      window.alert("新增成功！");
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsg(getValidMessage("member", code));
    }
  };
  return (
    <div className="DefaultStudent">
      <div className="DefaultStudent-container">
        <header className="DefaultStudent-container-header">
          <h2>預設學員</h2>
        </header>

        <div className="DefaultStudent-container-cards">
          <DefaultStudentCard2
            newStudentData={newStudentData}
            setNewStudentData={setNewStudentData}
            handleAddStudent={handleAddStudent}
            errorMsg={errorMsg}
          />
          {new Array(5).fill(1).map((data, index) => (
            <DefaultStudentCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultStudent;
