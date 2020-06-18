import React, { useState, useEffect } from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { listVenues } from '../../graphql/queries';
import { onCreateVenue } from '../../graphql/subscriptions';
import {
  Button,
  Input,
  Form,
  Select,
  message,
  PageHeader,
  Divider
} from 'antd';
import { UserContext } from '../../App';
import AllVenues from './components/all-venues.component';
import SearchBox from '../../components/search/search-box.component';
import ErrorMessage from '../../components/error/errror.component';
import Loading from '../../components/loading/loading.component';
import {
  tagList,
  layout,
  gqlCreateVenue,
  gqlGetAuthUser,
  gqlOnVenueSearch,
  gqlOnNewVenue,
  gqlVenueDelete
} from './services/venue.service';
import './venue-list.styles.scss';

const { Option } = Select;

const VenueList = () => {
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const FormItem = Form.Item;

  useEffect(() => {
    const getAuthUser = async () => {
      const authUser = await gqlGetAuthUser();
      setUser(authUser.username);
    };
    getAuthUser();
  }, []);

  const tagOptions = [];
  for (let i = 0; i < tagList.length; i++) {
    tagOptions.push(
      <Option value={tagList[i]} key={tagList[i]}>
        {tagList[i]}
      </Option>
    );
  }
  const addMessages = market => {
    const key = 'updatable';
    message.loading({ content: 'Adding...', key });
    setTimeout(() => {
      message.success({ content: `${market} Added!`, key, duration: 2 });
    }, 1000);
  };

  const onFinish = async values => {
    const { tags } = values;
    const venue = { name: values.venue, owner: user, tags };
    try {
      await gqlCreateVenue(venue, user);
      addMessages(venue.name);
      onReset();
    } catch (error) {
      console.log('error', error);
    }
  };

  const onReset = user => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      market: 'New Venue!',
      tags: [...tagList]
    });
  };

  const onVenueSearch = async value => {
    try {
      const results = await gqlOnVenueSearch(searchTerm);
      setSearchResults(results.data.searchVenues.items);
    } catch (error) {}
  };

  const onSearchTermChange = e => {
    const textValue = e.target.value;
    setSearchTerm(textValue);
    onVenueSearch(textValue);
  };

  const confirmVenueDelete = async id => {
    const venue = { id };
    try {
      await gqlVenueDelete(venue);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Venue List"
      />
      <Divider orientation="left">Add New</Divider>
      <div className="market-list">
        <UserContext.Consumer>
          {({ user }) => (
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
              <FormItem
                name="venue"
                label="venue"
                rules={[
                  {
                    required: true,
                    min: 3
                  }
                ]}
              >
                <Input />
              </FormItem>
              <Form.Item
                name="tags"
                label="Category Tags"
                rules={[
                  {
                    required: true,
                    message: 'Please select a tag for the venue',
                    type: 'array'
                  }
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Please select a tag for the venue"
                >
                  {tagOptions}
                </Select>
              </Form.Item>

              <div className="custom-form-buttons">
                <div className="buttons-spacer"></div>
                <div className="form-buttons">
                  <div className="button-item">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        margin: '0 8px'
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="button-item">
                    <Button htmlType="button" onClick={() => onReset(user)}>
                      Reset
                    </Button>
                  </div>
                  <div className="button-item">
                    <Button type="link" htmlType="button" onClick={onFill}>
                      Fill form
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </UserContext.Consumer>
        <Divider orientation="left">My Venues</Divider>
        <SearchBox
          searchTerm={searchTerm}
          loading={false}
          changed={onSearchTermChange}
          onSearch={onVenueSearch}
        />
        <Connect
          query={graphqlOperation(listVenues)}
          subscription={graphqlOperation(onCreateVenue)}
          onSubscriptionMsg={gqlOnNewVenue}
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
            if (loading || !data.listVenues) {
              const displayMessage = loading
                ? 'Loading Venues...'
                : 'No Venues exist';
              return <Loading message={displayMessage} />;
            }

            const tableData = data.listVenues.items;
            const allVenueData =
              searchTerm.length > 0 ? searchResults : tableData;

            return (
              <AllVenues
                tableData={allVenueData}
                confirmVenueDelete={confirmVenueDelete}
              />
            );
          }}
        </Connect>
      </div>
    </>
  );
};
export default VenueList;
