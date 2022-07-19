import React from "react";
import LandingResourceStyles from "./LandingResources.module.css";

const LandingResources = React.memo(({ heading, image, url }) => {
  return (
    <div className={LandingResourceStyles.ResourceDiv}>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <div className={LandingResourceStyles.ResourceImgContainer}>
          <img
            className={LandingResourceStyles.ResourceImg}
            src={image}
            alt="Learning Resource"
          ></img>
        </div>

        <p className={LandingResourceStyles.ResourceText}>{heading}</p>
      </a>
    </div>
  );
});

export default LandingResources;
