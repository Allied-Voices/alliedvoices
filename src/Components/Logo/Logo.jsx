import React from "react";
import LogoStyles from "./LogoStyles.module.css";

const Logo = ({ primary, secondary, lg, width, height }) => {
  let logoColor;
  let logoWidth;
  let logoHeight;

  if (primary) {
    logoColor = "#7895FF";
  } else if (secondary) {
    logoColor = "#ffffff";
  }

  if (width && height) {
    logoWidth = width.toString();
    logoHeight = height.toString();
  } else if (lg) {
    logoWidth = "40";
    logoHeight = "42.37";
  } else {
    logoWidth = (21).toString();
    logoHeight = (21 / 0.94).toString();
  }

  return (
    <div className={LogoStyles.Container}>
      <svg
        width={logoWidth}
        height={logoHeight}
        viewBox="0 0 14 14"
        fill={logoColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.2889 0H1.71111C0.762222 0 0 0.715556 0 1.60222V9.64444C0 10.5311 0.762222 11.2467 1.71111 11.2467H2.83111V13.6267C2.83111 13.7667 2.92444 13.9067 3.06444 13.9689C3.12667 14 3.17333 14 3.23556 14C3.32889 14 3.42222 13.9689 3.5 13.9222L7.03111 11.2467H12.2889C13.2378 11.2467 14 10.5311 14 9.64444V1.60222C14 0.715556 13.2378 0 12.2889 0ZM13.2067 9.62889C13.2067 10.0956 12.8022 10.4689 12.3044 10.4689H6.87556C6.78222 10.4689 6.68889 10.5 6.61111 10.5467L3.64 12.8022V10.8422C3.64 10.64 3.45333 10.4689 3.23556 10.4689H1.71111C1.21333 10.4689 0.808889 10.0956 0.808889 9.62889V1.63333C0.808889 1.16667 1.21333 0.793333 1.71111 0.793333H12.32C12.8178 0.793333 13.2222 1.16667 13.2222 1.63333V9.62889H13.2067Z" />
        <path d="M4.62004 3.3125L3.00226 7.85472H3.99781L4.30893 6.92139H5.98893L6.28448 7.85472H7.31115L5.69337 3.3125H4.62004ZM4.55781 6.14361L5.14893 4.35472L5.72448 6.14361H4.55781Z" />
        <path d="M9.06887 6.76583L8.08887 3.3125H7.07776L8.6022 7.85472H9.50443L11.06 3.3125H10.0644L9.06887 6.76583Z" />
      </svg>
    </div>
  );
};

export default Logo;
