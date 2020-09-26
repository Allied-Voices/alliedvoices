import React from 'react';
import ButtonStyles from './ButtonStyles.module.css'

const Button = ({ label, active, ...props }) => {
  var classNames = `${ButtonStyles.Button}`;
  if (active) {
    classNames += ` ${ButtonStyles.Active}`
  }

  return (
    <button className={classNames} {...props}>
      {label}
    </button>
  );
}

export default Button;