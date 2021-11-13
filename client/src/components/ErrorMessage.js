import React from "react";

const ErrorMessage = (props) => {
  let { value } = props;
  return <span className="ErrorMessage">{value}</span>;
};

export default ErrorMessage;
