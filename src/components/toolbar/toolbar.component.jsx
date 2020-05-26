import React from 'react';
import PropTypes from 'prop-types';

import DrawerToggleButton from '../side-drawer/drawer-toggle-button.component';
import Logo from '../logo/logo.component';
import './toolbar.styles.scss';

const Toolbar = ({ drawerClickHandler }) => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <Logo />
      <div className="spacer" />

      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={drawerClickHandler} />
      </div>
    </nav>
  </header>
);
Toolbar.propTypes = {
  drawerClickHandler: PropTypes.any
};

export default Toolbar;
