import {useState, useEffect} from 'react';

const useArticleImage = (imageUrl) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const setLoadingState = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    setIsImageLoaded(false);
  },[imageUrl]);

  return { isImageLoaded, setLoadingState };
};

export default useArticleImage;