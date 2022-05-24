import React from 'react'
import LandingResourceStyles from './LandingResources.module.css';

const LandingResources = React.memo(({ heading, image, url}) => {
    return (
        <div className={LandingResourceStyles.ResourceDiv}>
                <a href={url}>
        <img className={LandingResourceStyles.ResourceImg} src={image} alt="Learning Resource"></img> 
        <p className={LandingResourceStyles.ResourceText}>{heading}</p> 
        </a> 
        </div>
    );
})


export default LandingResources
