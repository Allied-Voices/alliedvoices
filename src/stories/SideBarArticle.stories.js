import React from "react";
import SideBarArticle from "../Components/SideBarArticle/SideBarArticle";
import "../Style/Global.css";

export default {
  title: "AlliedVoices/SideBarArticle",
  component: SideBarArticle,
};

const Template = (args) => <SideBarArticle {...args} />;

export const Article1 = Template.bind({});
Article1.args = {
  heading:
    "A man who allegedly tried to kill an Asian-American family because of the Coronavirus could face hate crime charges",
  date: "5/3/2020",
  publisher: "The Washington Post",
  type: "Incident",
  lat: 51.514969,
  lng: -102.156397,
};
