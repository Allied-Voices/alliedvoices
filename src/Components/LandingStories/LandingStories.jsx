import React, { useContext } from 'react';
import LandingStoriesStyles from './LandingStories.module.css';


const LandingStories = React.memo(({ heading, image, url}) => {
    return (
<div className={LandingStoriesStyles.StoryDiv}>
    <a href={url}>
    <div className={LandingStoriesStyles.StoryImgContainer}><img className={LandingStoriesStyles.StoryImg} src={image} alt="News Story"></img></div>

<p className={LandingStoriesStyles.StoryText}>{heading}</p>
</a> 
</div>
    );
})


export default LandingStories