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
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    return (
      <div className={SearchBarStyles.Container}>
        <div className={SearchBarStyles.Section}>
          <div className={SearchBarStyles.InnerSection}>
            <label className={SearchBarStyles.InputLabel} htmlFor="search_input">
              <img className={SearchBarStyles.Icon} src="/search.svg" alt="search icon"></img>
            </label>
            <form className={SearchBarStyles.Form} onSubmit={this.handleSubmit}>
              <input name="searchInput" onChange={this.handleChange} value={this.state.searchInput} autoComplete="off" id="search_input" className={SearchBarStyles.Input}></input>
              <button className={SearchBarStyles.ArrowContainer} type="submit">
                <img className={SearchBarStyles.Arrow} alt="arrow to enter form" src="/arrow.svg"></img>
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

// const SearchBar = () => {
//   return (
//     <div className={SearchBarStyles.Container}>
//       <div className={SearchBarStyles.Section}>
//         <div className={SearchBarStyles.InnerSection}>
//           <label className={SearchBarStyles.InputLabel} for="search"><img className={SearchBarStyles.Icon} src="/search.svg" alt="search icon"></img></label>
//           <input autoComplete="off" id="search" className={SearchBarStyles.Input}></input>
//         </div>
//       </div>
//       <div className={SearchBarStyles.Section}>
//         <select className={SearchBarStyles.Select}>
//           <option>All Races</option>
//           <option>Option 1</option>
//           <option>Option 2</option>
//           <option>Option 3</option>
//         </select>
//       </div>
//       <div className={SearchBarStyles.Section}>
//         <select className={SearchBarStyles.Select}>
//           <option>All Types</option>
//           <option>Option 1</option>
//           <option>Option 2</option>
//           <option>Option 3</option>
//         </select></div>
//     </div>
//   );
// }

// export default SearchBar;