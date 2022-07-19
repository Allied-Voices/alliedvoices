import React from "react";
import ButtonStyles from "./Button.module.css";

const Button = ({ label, active, alternative, ...props }) => {
  var classNames = `${ButtonStyles.Button}`;

  if (active) {
    classNames += ` ${ButtonStyles.Active}`;
  }

  if (alternative) {
    classNames += ` ${ButtonStyles.Alternative}`;
  }

  return (
    <button className={classNames} {...props}>
      {label}
    </button>
  );
};

export default Button;
