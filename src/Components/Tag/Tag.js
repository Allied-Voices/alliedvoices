import React from 'react';
import TagStyles from './Tag.module.css'

const Tag = (props) => {
  return (
    <div className={TagStyles.Tag}>
      <p>{props.children}</p>
    </div>
  );
}

export
  default Tag;