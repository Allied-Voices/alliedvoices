import React from 'react';
import LandingContentStyles from './LandingContent.module.css';

const LandingContent = ({ image, alt, title, content }) => {
 
  return (
    <div className={LandingContentStyles.Container}>
      <img className={LandingContentStyles.Images} src={image} alt={alt}></img>
      <div className={LandingContentStyles.Contents}>
        <p className={LandingContentStyles.Title}>{title}</p>
          <span className={LandingContentStyles.Body}>
            {content}
          </span>
      </div>
    </div>
  );
}

export default LandingContent;