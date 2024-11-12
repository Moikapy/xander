import React from 'react';

import Login from '../../views/login';
export default {
  title: 'view/Login',
  component: Login,
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add any default props here
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Invalid email or password',
};

