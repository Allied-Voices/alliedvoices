import React from "react";
import ButtonMenuOption from "../Components/ButtonMenuOption/ButtonMenuOption";
import "../Style/Global.css";

export default {
  title: "AlliedVoices/ButtonMenuOption",
  component: ButtonMenuOption,
};

const Template = (args) => <ButtonMenuOption {...args} />;

export const Option1 = Template.bind({});

Option1.args = {
  option: "Option1",
};
