import React from 'react';
import LandingContentStyles from './LandingContent.module.css';

const LandingContent = ({ image, alt, title, content }) => {
 
  return (
    <div className={LandingContentStyles.Container}>
      <div className={LandingContentStyles.Images}>
        <img width="350px" height="250px" src={image} alt={alt}></img>
      </div>
      <div className={LandingContentStyles.Content}>
        <div>
          <p className={LandingContentStyles.Title}>{title}</p>
            <span className={LandingContentStyles.Body}>
              {content}
            </span>
        </div>
      </div>
    </div>
  );
}

export default LandingContent;