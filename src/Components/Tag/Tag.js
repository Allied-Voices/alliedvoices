import React from 'react';
import TagStyles from './Tag.module.css'

const Tag = (props) => {

  const colorTypes = {
    Incident: '#98A2FF',
    Location: '#EC9EFF'
  }

  return (
    <div className={TagStyles.Tag} style={{ background: colorTypes[props.type] }}>
      <p>{props.children}</p>
    </div>
  );
}

export
  default Tag;