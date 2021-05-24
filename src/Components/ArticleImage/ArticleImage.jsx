import React from 'react';
import useArticleImage from './useArticleImage';
import ArticleImageStyles from './ArticleImage.module.css';
import Logo from '../Logo/Logo';

const ArticleImage = ({imageUrl}) => {
  const {isImageLoaded, setLoadingState} = useArticleImage(imageUrl);

  const Image = () => {
    const placeHolderStyle = !isImageLoaded ? ArticleImageStyles.ImagePlaceHolder : ArticleImageStyles.Hidden;
    const imageStyle = isImageLoaded ? ArticleImageStyles.Image : ArticleImageStyles.Hidden;
    return (
      <>
        <div className={placeHolderStyle}>
          Loading Image
        </div>      
        <img className={imageStyle} src={imageUrl} onLoad={setLoadingState} alt="visual for article"/>
      </>
      )
  };

  const NoImagePlaceHolder = () => {
    return (
      <div className={ArticleImageStyles.ImagePlaceHolder}>
        No Image Found
        <Logo lg></Logo>
      </div>
    )
  };

  return (
    <>
      {imageUrl? 
      <Image></Image> :
      <NoImagePlaceHolder></NoImagePlaceHolder>}
    </>
  );
}

export default ArticleImage;