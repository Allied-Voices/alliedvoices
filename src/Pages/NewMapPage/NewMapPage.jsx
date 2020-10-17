import React, { Component } from 'react';
import Article from '../../Components/Article/Article';
import Map from '../../Components/Map/Map';
import SideBar from '../../Components/SideBar/SideBar';
import NewMapPageStyles from './NewMapPageStyles.module.css'

class NewMapPage extends Component {

  render() {

    return (
      <div className={NewMapPageStyles.Container}>
        <SideBar />
        <Article/>
        <Map />
      </div>
    );
  }
}

export default NewMapPage;