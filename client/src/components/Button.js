import React from "react";

const Button = (props) => {
  let { value, className, onClick, dataBsToggle, dataBsTarget } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
    >
      {value}
    </button>
  );
};

export default Button;
