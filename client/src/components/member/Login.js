import React from "react";

const Login = (props) => {
  const preventLoginClose = (e) => {
    e.stopPropagation();
    console.log("preventLoginClose");
  };
  return (
    <div className="Login">
      <div className="Login-container" onClick={preventLoginClose}></div>
    </div>
  );
};

export default Login;
