import React from 'react';
import Logo from '../Logo/Logo';
import ArticleResourceTileStyles from './ArticleResourceTileStyles.module.css';

const ArticleResourceTile = ({resource}) => {
  return (
    <a className={ArticleResourceTileStyles.Container} rel="noopener noreferrer" target="_blank" href={resource["URL"]}>
      <div className={ArticleResourceTileStyles.ImgContainer}>
        {resource["Image"] ?
          <img src={resource["Image"]} alt={`${resource["Name"]}`} /> :
          <Logo primary height="45" width="45"></Logo>
        }
      </div>
      <div className={ArticleResourceTileStyles.TxtContainer}>
        <span className={ArticleResourceTileStyles.NameTxt}>{resource["Name"]}</span>
        <span className={ArticleResourceTileStyles.ResourceOwnerTxt}>{resource["Resource Owner"]}</span>
      </div>
    </a>
  )
}

export default ArticleResourceTile;