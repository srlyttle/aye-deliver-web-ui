import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PageHeader,
  Button,
  Descriptions,
  Statistic,
  Card,
  Row,
  Col,
  Divider,
  Tag
} from 'antd';

import Loading from '../../components/loading/loading.component';
import SeatingList from './components/seating-list.component';
import {
  gqlGetVenue,
  gqlCreateSeating,
  gqlEditSeating,
  gqlDeleteSeating
} from './services/venue.service';
import './venue.styles.scss';

const VenuePage = ({ venueId, user }) => {
  const [currentVenue, setCurrentVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    const getVenueByParam = async () => {
      const venue = { id: venueId };
      try {
        const venueResult = await gqlGetVenue(venue);
        if (mounted) {
          console.log('venue is', venueResult.data.getVenue);
          setCurrentVenue(venueResult.data.getVenue);
          setLoading(false);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    getVenueByParam();
    return () => (mounted = false);
  }, []);

  const handleAddSeating = seatingData => {
    try {
      const seating = {
        name: seatingData.name,
        maxPeople: seatingData.maxPeople,
        outside: seatingData.outside,
        seatingVenueId: currentVenue.id
      };
      gqlCreateSeating(seating, user);
    } catch (error) {
      console.log('erroroooo', error);
    }
  };

  const handleEditSeating = editSeatingData => {
    try {
      gqlEditSeating(editSeatingData, user);
    } catch (error) {
      console.log('erroroooo', error);
    }
  };

  const handleDeleteSeating = deleteSeatingData => {
    try {
      gqlDeleteSeating(deleteSeatingData, user);
    } catch (error) {
      console.log('erroroooo', error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="venue-page">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={currentVenue.name}
        subTitle="This is a subtitle"
        extra={[
          <Button key="3">De-Activate</Button>,
          <Button key="2">History</Button>,
          <Button key="1" type="primary">
            Edit
          </Button>
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Tags">
            {currentVenue.tags.map(tag => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Address">Belfast, BT1</Descriptions.Item>
          <Descriptions.Item label="Venue Added">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Opening Hours">
            12pm - 2am
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            A very cool bar ...
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider orientation="left">Current Occupancy</Divider>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Occupied Seating"
              value={75}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Seats Available"
              value={5}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Seats Occupied"
              value={15}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Customers"
              value={46}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
      <SeatingList
        seatingList={currentVenue.Seatings.items}
        addSeatingItem={handleAddSeating}
        editSeatingItem={handleEditSeating}
        deleteSeatingItem={handleDeleteSeating}
      />
      <Row className="venue-tabs-container" gutter={16}>
        <Col span={24}></Col>
      </Row>
    </div>
  );
};
VenuePage.propTypes = {
  venueId: PropTypes.string,
  user: PropTypes.object
};

export default VenuePage;
