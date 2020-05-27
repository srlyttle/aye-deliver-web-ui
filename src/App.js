import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import PropTypes from 'prop-types';
import HomePage from '../src/pages/home/home.component';
import MarketPage from '../src/pages/market/market.component';
import ProfilePage from '../src/pages/profile/profile.component';
import Toolbar from './components/toolbar/toolbar.component';
import SideDrawer from './components/side-drawer/side-drawer.component';
import Backdrop from './components/backdrop/backdrop.component';
import NotesPage from './pages/notes/notes.component';

import './App.scss';

function App({ history }) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const getAuthUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: false
      });
      if (authUser) {
        setUser(authUser);
      }
    } catch (error) {
      // handle not authenticated
      setUser(null);
    }
  };

  const hubListener = () => {
    Hub.listen('auth', data => {
      const { payload } = data;
      switch (payload.event) {
        case 'signIn':
          history.push('/');
          setSideDrawerOpen(false);
          getAuthUser();
          break;
        case 'signOut':
          setUser(null);
          break;

        default:
          break;
      }
    });
  };

  useEffect(() => {
    getAuthUser();
    hubListener();
    return () => {
      Hub.remove();
    };
  }, []);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  const signout = async () => {
    setSideDrawerOpen(false);
    await Auth.signOut();
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  return (
    <>
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer
          close={backdropClickHandler}
          show={sideDrawerOpen}
          user={user}
          signout={signout}
        />
        {backdrop}
        <div className="main__content">
          <main style={{ height: '100vh' }}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/notes" component={NotesPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route
                exact
                path="/login"
                component={() => {
                  return user ? null : <Authenticator />;
                }}
              />
              <Route
                exact
                path="/markets/:marketId"
                component={({ match }) => {
                  const marketId = match.params.marketId;
                  return <MarketPage marketId={marketId} />;
                }}
              />
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
}
App.propTypes = {
  history: PropTypes.any
};

export default withRouter(App);
