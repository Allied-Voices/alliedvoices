import React from 'react';
import LandingStoriesStyles from './LandingStories.module.css';
import Placeholder from '../../Images/placeholder-AV.png';

function addDefaultSrc(ev){
    ev.target.src = Placeholder
  }

const LandingStories = React.memo(({ heading, image, url}) => {
    return (
<div className={LandingStoriesStyles.StoryDiv}>
    <a href={url} 
    target="_blank" 
    rel="noreferrer noopener">
    <div className={LandingStoriesStyles.StoryImgContainer}>
    <img className={LandingStoriesStyles.StoryImg} src={image ?image:Placeholder} alt="News Story" onError={addDefaultSrc}></img>
    
    </div>

    <p className={LandingStoriesStyles.StoryText}>{heading}</p>
</a> 
</div>
    );
})


export default LandingStories