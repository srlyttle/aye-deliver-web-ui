import PropTypes from 'prop-types';
import React from 'react';
import './backdrop.styles.scss';

const Backdrop = props => <div className="backdrop" onClick={props.click} />;

Backdrop.propTypes = {
  click: PropTypes.any
};

export default Backdrop;
