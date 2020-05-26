import React from 'react';
import PropTypes from 'prop-types';

import './drawer-toggle-button.styles.scss';

const DrawerToggleButton = props => (
  <button className="toggle-button" onClick={props.click}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>
);

DrawerToggleButton.propTypes = {
  click: PropTypes.any
};

export default DrawerToggleButton;
