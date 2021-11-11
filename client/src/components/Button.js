import React from "react";

const Button = (props) => {
  let { value, className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
