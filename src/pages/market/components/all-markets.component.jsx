import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { listMarkets } from '../../../graphql/queries';
import { deleteMarket } from '../../../graphql/mutations';
import { onCreateMarket, onDeleteMarket } from '../../../graphql/subscriptions';
import ErrorMessage from '../../../components/error/errror.component';
import Loading from '../../../components/loading/loading.component';
import { Table, Tag, Space, Popconfirm, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './all-markeets.scss';

const AllMarkets = () => {
  const onNewMarket = (previousQuery, newData) => {
    const updatedQuery = { ...previousQuery };
    const updatedMarketList = [
      newData.onCreateMarket,
      ...previousQuery.listMarkets.items
    ];
    updatedQuery.listMarkets.items = updatedMarketList;
    return updatedQuery;
  };

  const confirm = async id => {
    const market = { id };
    try {
      await API.graphql(
        graphqlOperation(deleteMarket, {
          input: market
        })
      );
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <>
      <div className="sub-title">
        <Divider orientation="left">Markets</Divider>
      </div>
      <Connect
        query={graphqlOperation(listMarkets)}
        subscription={graphqlOperation(onCreateMarket)}
        onSubscriptionMsg={onNewMarket}
      >
        {({ data, loading, errors }) => {
          if (errors.length > 0) {
            return (
              <ErrorMessage
                errors={errors}
                message="An error occured getting markets"
              ></ErrorMessage>
            );
          }
          if (loading || !data.listMarkets) {
            const displayMessage = loading
              ? 'Loading Markets...'
              : 'No Markets exist';
            return <Loading message={displayMessage} />;
          }
          const { Column } = Table;
          return (
            <Table dataSource={data.listMarkets.items} rowKey="id">
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
                    <Link
                      to={`/market/${record.id}`}
                      className="sidedrawer_item_link"
                    >
                      Edit
                    </Link>

                    <Popconfirm
                      title="Are you sure delete this market?"
                      onConfirm={() => {
                        confirm(record.id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#">Delete</a>
                    </Popconfirm>
                  </Space>
                )}
              />
            </Table>
          );
        }}
      </Connect>
    </>
  );
};

export default AllMarkets;
