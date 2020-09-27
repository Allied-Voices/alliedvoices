import React from 'react';
import ButtonMenu from '../Components/ButtonMenu/ButtonMenu';

export default {
  title: "AlliedVoices/ButtonMenu",
  component: ButtonMenu
}

const Template = (args) => <ButtonMenu {...args} />

export const Type = Template.bind({})
Type.args = {
  label: "Type",
  options: ['Option1', 'Option2']
};