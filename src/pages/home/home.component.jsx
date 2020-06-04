import React from 'react';
import PropTypes from 'prop-types';
import './home.styles.scss';
import { Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { ReactComponent as SplashImage } from './splash.svg';
import { Typography } from 'antd';
import { withRouter } from 'react-router-dom';

const { Text } = Typography;

const HomePage = ({ history }) => {
  const getStartedClick = () => {
    history.push('/markets');
  };

  return (
    <>
      <div className="landing-container">
        <div className="text-container">
          <div className="title">
            <h1>Make your deliveries more efficient and grow profits</h1>
          </div>
          <div className="sub-text">
            <Text>
              Our platform enables you to sell and then deliver your products
              through a network of delivery providers
            </Text>
          </div>
          <div className="home-get-start-button">
            <Button
              type="primary"
              shape="round"
              icon={<PlayCircleOutlined />}
              size="large"
              onClick={getStartedClick}
            >
              Get started
            </Button>
          </div>
        </div>
        <div className="image-container">
          <SplashImage />
        </div>
      </div>
    </>
  );
};
HomePage.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func }),
  show: PropTypes.bool,
  user: PropTypes.object,
  signout: PropTypes.func
};
export default withRouter(HomePage);
