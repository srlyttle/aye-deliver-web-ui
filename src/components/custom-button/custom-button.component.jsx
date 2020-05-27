import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const CustomButton = ({ text }) => {
  return (
    <Button type="primary" block>
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string
};
export default CustomButton;
