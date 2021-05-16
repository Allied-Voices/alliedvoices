import React, {useState, useEffect} from 'react';
import ArticleImageStyles from './ArticleImage.module.css'
import Logo from '../Logo/Logo'

const ArticleImage = ({imageUrl}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const setLoadingState = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    setIsImageLoaded(false);
  },[imageUrl]);

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