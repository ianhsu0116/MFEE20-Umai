import React from "react";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberInfo from "./MemberInfo";

const MemberCenter = () => {
  return (
    <div className="MemberCenter">
      <div className="MemberCenter-container">
        <MemberSidebar />
        <MemberInfo />
      </div>
    </div>
  );
};

export default MemberCenter;
