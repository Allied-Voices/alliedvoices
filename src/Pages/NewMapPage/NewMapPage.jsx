import React, { Component } from 'react';
import Map from '../../Components/Map/Map';
import SideBar from '../../Components/SideBar/SideBar';
import NewMapPageStyles from './NewMapPageStyles.module.css'

class NewMapPage extends Component {

  render() {

    return (
      <div className={NewMapPageStyles.Container}>
        <SideBar />
        <Map />
      </div>
    );
  }
}

export default NewMapPage;