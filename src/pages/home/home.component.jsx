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
    history.push('/venues');
  };

  return (
    <>
      <div className="landing-container">
        <div className="text-container">
          <div className="title">
            <h1>Maximising occupancy and tracking customers</h1>
          </div>
          <div className="sub-text">
            <Text>
              Our platform enables you to provide real time availability and
              venue customer tracking
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
