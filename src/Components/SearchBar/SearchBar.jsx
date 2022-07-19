import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import { AppContext } from "../../Context/AppContext";
import SideBarStyles from "./SearchBar.module.css";

const SearchBar = () => {
  const appContext = useContext(AppContext);
  return (
    <div className={SideBarStyles.Container}>
      <div className={SideBarStyles.Header}>
        <Link to="/" className={SideBarStyles.Logo}>
          <Logo primary width="42" height="40" />
          <h3>Allied Voices</h3>
        </Link>
      </div>
      <div className={SideBarStyles.SearchSection}>
        <Search
          placeholder={"Find voices in your area"}
          searchFunction={appContext.updateLocation}
        />
      </div>

      <div className={SideBarStyles.FilterSection}>
        <ButtonMenu
          buttonLabel="Content Type"
          optionsTitle="Filter by Content Type"
          options={[
            "Incidents",
            "Acts of Allyship",
            "Stories of Empowerment",
            "General News",
            "Resources",
          ]}
          filterFunction={appContext.filterVoices}
          clearFunction={appContext.clearVoices}
          filterKey="Type"
        />
        {/* <ButtonMenu
            buttonLabel="Source"
            optionsTitle="Filter by Source"
            options={[
              "News",
              "Reporting Center",
              "Social Media",
              "User Submissions",
            ]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Content Type"
          /> */}
        {/* <ButtonMenu
            buttonLabel="Incident Tags"
            optionsTitle="Filter by Incident Tags"
            options={["Physical", "Verbal", "Vandalism"]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Incident type"
          /> */}
        {/* <ButtonMenu
            buttonLabel="Race"
            optionsTitle="Filter by Race"
            options={["Asian", "Black"]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Race"
          /> */}
      </div>
    </div>
  );
};
export default SearchBar;
