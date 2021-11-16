import React, { useState, useEffect } from "react";
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
  // 所有此會員的預設學員
  const [allStudents, setAllStudents] = useState([]);

  // 拿取學生資料的function
  async function refieshStudent() {
    let result = await MemberService.student();
    let { students } = result.data;
    //console.log(students);
    if (students.length > 0) setAllStudents(students);
  }

  // 初次渲染時，拿取當前使用者的預設學員
  useEffect(async () => {
    try {
      // 拿取所有學員料
      refieshStudent();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

      // 重新拿取學員資料
      refieshStudent();

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
          {allStudents.map((data, index) => (
            <DefaultStudentCard key={index} index={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultStudent;
