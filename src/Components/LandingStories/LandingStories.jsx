import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import LandingStoriesStyles from './LandingStories.module.css';


const LandingStories = React.memo(({ heading, image, url}) => {
    return (
<div className={LandingStoriesStyles.StoryDiv}>
    <a href={url}>
<img className={LandingStoriesStyles.StoryImg} src={image} alt="News Story"></img>
<p className={LandingStoriesStyles.StoryText}>{heading}</p>
</a> 
</div>
    );
})


export default LandingStories