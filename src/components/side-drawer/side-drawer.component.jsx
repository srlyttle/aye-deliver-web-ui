import React from 'react';
import PropTypes from 'prop-types';

import './side-drawer.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ListItem from '../side-drawer-item/side-drawer-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const SideDrawer = ({ close, show }) => {
  let drawerClasses = 'side-drawer';
  if (show) {
    drawerClasses = 'side-drawer open';
  }
  const element = <FontAwesomeIcon icon={faTimes} />;

  const listItemsData = [
    {
      id: 1,
      text: 'Provide Delivery Services',
      route: '/deviveryservices',
      icon: 'deliver',
      alert: false
    },
    {
      id: 2,
      text: 'Sell goods for Delivery',
      route: '/sell',
      icon: 'sell',
      alert: false
    },
    { id: 3, text: 'FAQs', route: '/faq', icon: 'faq', alert: false },
    {
      id: 4,
      text: 'Notes',
      route: '/notes',
      icon: 'sticky-note',
      alert: false
    },
    { id: 5, text: 'Log Out', route: '/logout', icon: 'exit', alert: true }
  ];
  const listItems = listItemsData.map(li => (
    <ListItem
      key={li.id}
      text={li.text}
      route={li.route}
      icon={li.icon}
      alert={li.alert}
    />
  ));
  return (
    <nav className={drawerClasses}>
      <div className="sidedrawer__avatar_container">
        <div className="sidedrawer_avatar">
          <div className="avatar_icon">
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
          </div>
          <div className="avatar_username">Simon</div>
        </div>
        <div className="spacer"></div>
        <div className="close_button" onClick={close}>
          {element}
        </div>
      </div>
      <div className="side-drawer-signin-up">
        <CustomButton type="primary" block>
          Sign up or log in
        </CustomButton>
      </div>
      <ul className="side-drawer-list">{listItems}</ul>
    </nav>
  );
};

SideDrawer.propTypes = {
  click: PropTypes.func,
  show: PropTypes.func
};
export default SideDrawer;
