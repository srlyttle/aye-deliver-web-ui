import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import './all-venues.scss';

const AllVenues = ({ tableData, confirmVenueDelete }) => {
  const { Column } = Table;
  return (
    <>
      <div className="sub-title"></div>
      <Table dataSource={tableData} rowKey="id">
        <Column title="Name" dataIndex="name" key="name" />

        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/venue/${record.id}`} className="sidedrawer_item_link">
                Details
              </Link>

              <Popconfirm
                title="Are you sure delete this venue?"
                onConfirm={() => {
                  confirmVenueDelete(record.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <span>Delete</span>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
AllVenues.propTypes = {
  tableData: PropTypes.array,
  confirmVenueDelete: PropTypes.func
};

export default AllVenues;
