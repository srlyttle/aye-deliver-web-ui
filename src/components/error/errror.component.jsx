import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

const Error = ({ errors, message }) => {
  const errorDescription = errors
    ? errors.map(err => err.message).join(' ,')
    : null;
  return (
    <Alert
      message={message}
      description={errorDescription}
      type="error"
      closable
    />
  );
};

Error.propTypes = {
  errors: PropTypes.array,
  message: PropTypes.string
};
export default Error;
