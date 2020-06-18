import React from 'react';
import PropTypes from 'prop-types';
import './side-drawer.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ListItem from '../side-drawer-item/side-drawer-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const SideDrawer = ({ close, show, user, signout }) => {
  let drawerClasses = 'side-drawer';
  if (show) {
    drawerClasses = 'side-drawer open';
  }
  const element = <FontAwesomeIcon icon={faTimes} />;
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const clickFunction = vw < 500 ? close : null;

  const listItemsData = [
    {
      id: 3,
      text: 'FAQs',
      route: '/faq',
      icon: 'faq',
      alert: false,
      clickHandle: clickFunction,
      authRequired: false
    },
    {
      id: 4,
      text: 'Venues',
      route: '/venues',
      icon: 'shopping-basket',
      alert: false,
      clickHandle: clickFunction,
      authRequired: true
    },
    {
      id: 5,
      text: 'Profile',
      route: '/profile',
      icon: 'user',
      alert: false,
      clickHandle: clickFunction,
      authRequired: true
    },
    {
      id: 6,
      text: !user ? 'Log In' : 'Log Out',
      route: '/login',
      icon: 'exit',
      alert: true,
      clickHandle: signout,
      authRequired: false
    }
  ];
  const currentAuth = !!user;

  const menuItems = currentAuth
    ? listItemsData
    : listItemsData.filter(l => l.authRequired === false);

  const listItems = menuItems.map(li => (
    <ListItem
      key={li.id}
      text={li.text}
      route={li.route}
      icon={li.icon}
      alert={li.alert}
      clickHandle={li.clickHandle}
    />
  ));

  return (
    <nav className={drawerClasses}>
      <div className="sidedrawer__avatar_container">
        <div className="sidedrawer_avatar">
          <div className="avatar_icon">
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
          </div>
          <div className="avatar_username">{user ? user.username : null}</div>
        </div>
        <div className="spacer"></div>
        <div className="close_button" onClick={close}>
          {element}
        </div>
      </div>
      <div className="side-drawer-signin-up">
        <CustomButton
          type="primary"
          block
          text={'Sign up or log in'}
        ></CustomButton>
      </div>
      <ul className="side-drawer-list">{listItems}</ul>
    </nav>
  );
};

SideDrawer.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  user: PropTypes.object,
  signout: PropTypes.func
};
export default SideDrawer;
