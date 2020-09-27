import React from 'react';

import Button from '../Components/Button/Button'

export default {
  title: "AlliedVoices/Buttons",
  component: Button,
}

const Template = (args) => <Button {...args} />

export const Type = Template.bind({});
Type.args = {
  label: 'Type',
  active: true
};

export const MoreFilters = Template.bind({});
MoreFilters.args = {
  label: 'More Filter',
  active: true
};