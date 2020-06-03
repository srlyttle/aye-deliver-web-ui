import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Input, Form, Select, message, PageHeader } from 'antd';
import { Auth } from 'aws-amplify';
import { createMarket } from '../../graphql/mutations';
import { UserContext } from '../../App';
import AllMarkets from './components/all-markets.component';
import './market-list.styles.scss';

const { Option } = Select;

const MarketList = () => {
  const tagsData = ['Cafe', 'Restaurant', 'Groceries', 'Alchohol'];
  const children = [];
  for (let i = 0; i < tagsData.length; i++) {
    children.push(
      <Option value={tagsData[i]} key={tagsData[i]}>
        {tagsData[i]}
      </Option>
    );
  }
  const layout = {
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getAuthUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: false
      });
      setUser(authUser.username);
    };
    getAuthUser();
  }, []);
  const [form] = Form.useForm();
  const key = 'updatable';
  const addMessages = market => {
    message.loading({ content: 'Adding...', key });
    setTimeout(() => {
      message.success({ content: `${market} Added!`, key, duration: 2 });
    }, 1000);
  };

  const onFinish = async values => {
    console.log(values);
    const { tags } = values;
    const market = { name: values.market, owner: user, tags };
    try {
      await API.graphql(
        graphqlOperation(createMarket, {
          input: market,
          owner: user
        })
      );
      addMessages(market.name);
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
      market: 'New Market!',
      tags: [...tagsData]
    });
  };

  const FormItem = Form.Item;

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Market List"
        subTitle="Add New Market"
      />
      <div className="market-list">
        ,
        <UserContext.Consumer>
          {({ user }) => (
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
              <FormItem
                name="market"
                label="market"
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
                    message: 'Please select a tag for the market',
                    type: 'array'
                  }
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Please select a tag for the market"
                >
                  {children}
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={() => onReset(user)}>
                  Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                  Fill form
                </Button>
              </Form.Item>
            </Form>
          )}
        </UserContext.Consumer>
        <AllMarkets />
      </div>
    </>
  );
};
export default MarketList;
