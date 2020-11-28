import React from "react";
import ButtonMenuOptionStyles from "./ButtonMenuOptionStyles.module.css";

const ButtonMenuOption = ({ option, onChange, selected, ...props }) => {
  return (
    <label
      className={ButtonMenuOptionStyles.CheckboxLabel}
      htmlFor={"MenuOption-" + option}
    >
      <input
        className={ButtonMenuOptionStyles.Checkbox}
        id={"MenuOption-" + option}
        type="checkbox"
        onChange={onChange ? onChange : null}
        checked={selected}
      />
      <span className={ButtonMenuOptionStyles.CheckboxSquare}>
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            margin: "3px auto 0 auto",
            display: "block",
            fill: "none",
            height: 16,
            width: 16,
            stroke: "currentcolor",
            strokeWidth: 4,
            overflow: "visible",
          }}
        >
          <path fill="none" d="m4 16.5 8 8 16-16"></path>
        </svg>
      </span>
      <p className={ButtonMenuOptionStyles.CheckboxText}>{option}</p>
    </label>
  );
};

export default ButtonMenuOption;
