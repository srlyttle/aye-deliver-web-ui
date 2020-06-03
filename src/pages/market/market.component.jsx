import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Divider } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
];

const MarketPage = ({ marketId }) => {
  return (
    <>
      <Divider orientation="left">Default Size</Divider>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </>
  );
};
MarketPage.propTypes = {
  marketId: PropTypes.string
};

export default MarketPage;
