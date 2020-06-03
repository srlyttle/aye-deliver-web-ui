import React from 'react';
import { Spin, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const Loading = ({ message }) => {
  return (
    <>
      <>
        <Row>
          <Col span={24} offset={10}>
            <Spin tip={message} />
          </Col>
        </Row>
      </>
    </>
  );
};

Loading.propTypes = {
  message: PropTypes.string
};

export default Loading;
