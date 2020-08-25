import React, { Component } from 'react';
import SearchBarStyles from './SearchBar.module.css'

class SearchBar extends Component {
  state = {}

  render() {
    return (
      <div className={SearchBarStyles.Container}>
        <div className={SearchBarStyles.Section}>
          <div className={SearchBarStyles.InnerSection}>
            <label className={SearchBarStyles.InputLabel} for="search"><img className={SearchBarStyles.Icon} src="/search.svg" alt="search icon"></img></label>
            <input autoComplete="off" id="search" className={SearchBarStyles.Input}></input>
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