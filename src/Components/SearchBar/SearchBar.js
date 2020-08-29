import React, { Component } from 'react';
import SearchBarStyles from './SearchBar.module.css'

const BASE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const API_KEY = '&key=AIzaSyBjrzncwvY7Af3BhEwJpAqw_7rH7X6J7Gs'

class SearchBar extends Component {
  state = {
    searchInput: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(BASE_API_URL + encodeURIComponent(this.state.searchInput) + API_KEY, {
      methods: "GET",
    })
    const responseData = await response.json();

    try {
      console.log(responseData.results[0].geometry.location);
      const { lat, lng } = responseData.results[0].geometry.location
      this.props.changeLocation(lat, lng, 13)

      const ATresponse = await fetch(`.netlify/functions/Articles?lat=${lat}&lng=${lng}`, {
        methods: "GET",
      })
      const ATresponseData = await ATresponse.json();
      this.props.refreshVoices(ATresponseData)
      console.log(ATresponseData)
    } catch (error) {
      console.log(error)
    }

    // This is just for testing
    // const ATresponse = await fetch(`.netlify/functions/Articles?lat=${40.7}&lng=${-74.0}`, {
    //   methods: "GET",
    // })
    // const ATresponseData = await ATresponse.json();
    // this.props.refreshVoices(ATresponseData)
  }

  render() {
    return (
      <div className={SearchBarStyles.Container}>
        <div className={SearchBarStyles.Section}>
          <div className={SearchBarStyles.InnerSection}>
            <label className={SearchBarStyles.InputLabel} htmlFor="search_input">
              <img className={SearchBarStyles.Icon} src="/assets/search.svg" alt="search icon"></img>
            </label>
            <form className={SearchBarStyles.Form} onSubmit={this.handleSubmit}>
              <input name="searchInput" onChange={this.handleChange} value={this.state.searchInput} autoComplete="off" id="search_input" className={SearchBarStyles.Input}></input>
              <button className={SearchBarStyles.ArrowContainer} type="submit">
                <img className={SearchBarStyles.Arrow} alt="arrow to enter form" src="/assets/arrow.svg"></img>
              </button>
            </form>
          </div>
        </div>
        <div className={SearchBarStyles.Section}>
          <select className={SearchBarStyles.Select}>
            <option>All Races</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <div className={SearchBarStyles.Section}>
          <select className={SearchBarStyles.Select}>
            <option>All Types</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select></div>
      </div>
    );
  }
}

export default SearchBar;