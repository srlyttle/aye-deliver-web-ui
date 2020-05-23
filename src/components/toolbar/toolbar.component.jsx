import React, { useState } from "react";

import DrawerToggleButton from '../side-drawer/drawer-toggle-button.component';
import Logo from '../logo/logo.component';
import './toolbar.styles.scss';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">

   
     <Logo/>
        <div className="spacer" />
     
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
    </nav>
  </header>
);

export default toolbar;
