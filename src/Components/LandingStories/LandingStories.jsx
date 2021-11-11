import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import LandingStoriesStyles from './LandingStories.module.css';


const LandingStories = React.memo(({ heading, img}) => {
    return (
            <div className={LandingStoriesStyles.StoryContainer}> 
<div className={LandingStoriesStyles.StoryDiv}>
<img className={LandingStoriesStyles.StoryImg} src={img} alt="News Story"></img>
<p className={LandingStoriesStyles.StoryText}>{heading}</p> 
</div>
{/* <div className={LandingHeaderStyles.StoryDiv}>
<img className={LandingHeaderStyles.StoryImg} src={Ally2} alt="Ally 2"></img> 
<p className={LandingHeaderStyles.StoryText}>I just got off a virtual networking where I was asked "Where are you from?" When I answered that I was from Chicago, the woman then asked "where are your parents from?"</p> 
</div>
<div className={LandingHeaderStyles.StoryDiv}>
<img className={LandingHeaderStyles.StoryImg} src={Ally3} alt="Ally 3"></img>
<p className={LandingHeaderStyles.StoryText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>  
</div> */}
</div>
    );
})


export default LandingStories