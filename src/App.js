import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import PropTypes from 'prop-types';
import HomePage from '../src/pages/home/home.component';
import MarketPage from '../src/pages/market/market.component';
import MarketListPage from '../src/pages/market/market-list.component';
import ProfilePage from '../src/pages/profile/profile.component';
import Toolbar from './components/toolbar/toolbar.component';
import SideDrawer from './components/side-drawer/side-drawer.component';
import Backdrop from './components/backdrop/backdrop.component';

import './App.scss';

export const UserContext = React.createContext();
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
          setSideDrawerOpen(false);

          getAuthUser();
          history.push('/markets');
          break;
        case 'signOut':
          setUser(null);
          history.push('/markets');
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
      <div className="app-container" style={{ height: '100%' }}>
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
            <UserContext.Provider value={{ user }}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                {/* <Route exact path="/markets" component={MarketListPage} /> */}
                <Route
                  exact
                  path="/markets"
                  component={() => {
                    return user ? <MarketListPage /> : <Redirect to="/login" />;
                  }}
                />
                <Route exact path="/profile" component={ProfilePage} />
                <Route
                  exact
                  path="/login"
                  component={() => {
                    return user ? (
                      <Redirect to="/markets" />
                    ) : (
                      <Authenticator />
                    );
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
            </UserContext.Provider>
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
