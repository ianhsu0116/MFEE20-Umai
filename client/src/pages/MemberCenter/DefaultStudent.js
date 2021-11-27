import React, { useState, useEffect } from "react";
import MemberService from "../../services/member.service";
import getValidMessage from "../../validMessage/validMessage";
import DefaultStudentCard from "../../components/DefaultStudentCard";
import DefaultStudentCard2 from "../../components/member/DefaultStudentCard2";
import BsModalAlert from "../../components/BsModalAlert";

const DefaultStudent = (props) => {
  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgEdit, setErrorMsgEdit] = useState({});
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
    setAllStudents(students);
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
    //console.log("新增學員");
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

  // 按下編輯學生
  const handleEditStudent = async (index, studentData) => {
    console.log(index);
    try {
      let result = await MemberService.studentEdit(studentData);

      // 清空錯誤訊息
      setErrorMsgEdit({
        ...errorMsgEdit,
        [index]: "",
      });

      // 重新拿取學員資料
      refieshStudent();

      window.alert("編輯成功！");
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsgEdit({
        ...errorMsgEdit,
        [index]: getValidMessage("member", code),
      });
    }
  };

  // 按下刪除學生
  const [studentDataDelete, setStudentDataDelete] = useState({});
  const handleDeleteStudent = (index, studentData) => {
    //console.log(index);
    //console.log(studentData);

    // 將此次要刪除的學生資料存進state備份，等使用者按下確認刪除
    setStudentDataDelete(studentData);
  };

  const handleDeleteConfirm = async () => {
    let { id } = studentDataDelete;
    try {
      let result = await MemberService.studentDelete(id);

      //清空待刪除的學員資料
      setStudentDataDelete({});

      // 重新拿取學員資料
      refieshStudent();

      window.alert("刪除成功！");
    } catch (error) {
      //console.log(error.response);
      window.alert("學員資料刪除失敗！");
    }
  };
  return (
    <div className="DefaultStudent">
      {/* Bootstrap5 Modal */}
      <BsModalAlert
        id={"DefaultStudent-delete-alert"}
        handleDelete={handleDeleteConfirm}
      />
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
        </div>
        <header className="DefaultStudent-container-header">
          <h2>已儲存</h2>
        </header>
        <div className="DefaultStudent-container-cards DefaultStudent-container-cards-bottom">
          {allStudents.map((data, index) => (
            <DefaultStudentCard
              key={index}
              index={index}
              data={data}
              handleEditStudent={handleEditStudent}
              handleDeleteStudent={handleDeleteStudent}
              errorMsg={errorMsgEdit}
            />
          ))}

          {allStudents.length === 0 && "目前還沒有任何已儲存的學員資料喔！"}
        </div>
      </div>
    </div>
  );
};

export default DefaultStudent;
