import React, { Component } from 'react';
import LandingHeader from '../../Components/LandingHeader/LandingHeader';
import LandingBody from '../../Components/LandingBody/LandingBody';
class LandingPage extends Component {
  state = {}
  render() {
    return (
      <div>
        <LandingHeader />
        <LandingBody />
      </div>
    );
  }
}

export default LandingPage;