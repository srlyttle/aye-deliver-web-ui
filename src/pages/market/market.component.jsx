import React from 'react';
import PropTypes from 'prop-types';

const MarketPage = ({ marketId }) => {
  return <div>Markets {marketId}</div>;
};
MarketPage.propTypes = {
  marketId: PropTypes.string
};

export default MarketPage;
