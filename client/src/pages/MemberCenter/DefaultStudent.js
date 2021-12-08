import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
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

  // studentInfo的各個input的ref
  const infoRef = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  // 拿取學生資料的function
  async function refreshStudent() {
    try {
      let result = await MemberService.student();
      let { students } = result.data;
      setAllStudents(students);
    } catch (error) {
      console.log(error);
      // 跳通知
      Swal.fire({
        icon: "error",
        title: "拿取學員資料錯誤！",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // 初次渲染時，拿取當前使用者的預設學員
  useEffect(async () => {
    try {
      // 拿取所有學員料
      refreshStudent();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 送出新增學員
  const handleAddStudent = async (e) => {
    // 前端錯誤阻擋
    let validArray = [
      "first_name",
      "last_name",
      "telephone",
      "email",
      "birthday",
    ];
    // 先拿掉所有errorInput的calssName
    new Array(4).fill(0).forEach((item, i) => {
      infoRef[i].current.classList.remove("inputError-red");
    });
    // 如果其中一項為空值，再加上紅色框框
    for (let i = 0; i < validArray.length; i++) {
      // i < 4 因為只有前四項有賦予ref，超過就會報錯
      if (i < 4 && !newStudentData[validArray[i]]) {
        //console.log(i);
        infoRef[i].current.classList.add("inputError-red");
      }
    }

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
      refreshStudent();

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "新學員資料新增成功！",
        showConfirmButton: false,
        timer: 1500,
      });

      // 拿掉所有errorInput的calssName
      new Array(4).fill(0).forEach((item, i) => {
        infoRef[i].current.classList.remove("inputError-red");
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        let { code } = error.response.data;
        setErrorMsg(getValidMessage("member", code));
      }
    }
  };

  // 送出編輯學生
  const handleEditStudent = async (index, studentData) => {
    console.log(index);
    try {
      let result = await MemberService.studentEdit(studentData);

      // 清空指定卡片錯誤訊息
      setErrorMsgEdit({
        ...errorMsgEdit,
        [index]: "",
      });

      // 重新拿取學員資料
      refreshStudent();

      // 跳通知
      Swal.fire({
        icon: "success",
        title: "學員資料編輯成功！",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;
      setErrorMsgEdit({
        ...errorMsgEdit,
        [index]: getValidMessage("member", code),
      });
    }
  };

  // 存要被刪除的學生資料
  const [studentDataDelete, setStudentDataDelete] = useState({});
  // 存要被刪除的學生的index （給清空指定卡片的錯誤訊息使用）
  const [deleteIndex, setDeleteIndex] = useState(-1);
  // 按下確認刪除的didUpdate(非同步)
  const [didDelete, setDidDelete] = useState(false);

  // 按下刪除學生(跳確認)
  const handleDeleteStudent = (index, studentData) => {
    //console.log(index);
    //console.log(studentData);

    // 將當看卡片的 index 放入
    setDeleteIndex(index);

    // 將此次要刪除的學生資料存進state備份，等使用者按下確認刪除
    setStudentDataDelete(studentData);
    Swal.fire({
      title: "確認刪除?",
      text: "刪除後即無法復原學生資料!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0078b3",
      cancelButtonColor: "#eb6b6a",
      confirmButtonText: "刪除!",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 按下確認刪除後 改變狀態
        setDidDelete(true);
        // Swal.fire("刪除成功!", "學生資料已被刪除！", "success");
      }
    });
  };

  // 按下確認刪除學員(真進資料庫刪除)
  useEffect(async () => {
    // 只有didDelete === tru時才執行
    if (didDelete) {
      let { id } = studentDataDelete;
      try {
        let result = await MemberService.studentDelete(id);

        //清空待刪除的學員資料
        setStudentDataDelete({});

        // 清空指定卡片錯誤訊息
        setErrorMsgEdit({
          ...errorMsgEdit,
          [deleteIndex]: "",
        });

        // 將didDelete恢復成false
        setDidDelete(false);

        // 重新拿取學員資料
        refreshStudent();

        // 跳通知
        Swal.fire({
          icon: "success",
          title: "學生資料已被刪除！",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        //console.log(error.response);
        Swal.fire({
          icon: "error",
          title: "學員資料刪除失敗！",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }, [didDelete]);

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
            infoRef={infoRef}
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

          {allStudents.length === 0 && (
            <div className="MemberCenter-defaultText">
              目前還沒有任何已儲存的學員資料喔！
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultStudent;
