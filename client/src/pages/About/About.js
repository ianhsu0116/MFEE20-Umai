import React, { useState } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'



const Course = (props) => {


  return (
    <>
    <div className="Course">
    <div className="CourseBreadbox"><MultiLevelBreadcrumb /></div>
    <h1>關於我們</h1>
    </div>
    </>
  );
};

export default Course;