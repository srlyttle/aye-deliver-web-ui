import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";


import HomePage from "../src/pages/home/home.component";
import Toolbar from "./components/toolbar/toolbar.component";
import SideDrawer from "./components/side-drawer/side-drawer.component";
import Backdrop from "./components/backdrop/backdrop.component";
import "./App.scss";

function App() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  return (
    <>
      <div style={{ height: "100%" }}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer close={backdropClickHandler} show={sideDrawerOpen} />
        {backdrop}
        <div className="main__content">
        <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
     
        </Switch>
        </main>
        </div>
      
      </div>
    </>
  );
}

export default App;
