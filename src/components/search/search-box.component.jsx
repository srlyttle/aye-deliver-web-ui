import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

const { Search } = Input;
const SearchBox = ({ loading, searchTerm, onSearch, changed }) => {
  const layout = {
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 16
    }
  };
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  return (
    <>
      <Form {...layout} form={form} name="control-hooks">
        <FormItem name="search-market" label="Search">
          <Search
            placeholder="input search loading deault"
            loading={loading}
            onSearch={onSearch}
            value={searchTerm}
            onChange={changed}
            allowClear={true}
          />
        </FormItem>
      </Form>
    </>
  );
};
SearchBox.propTypes = {
  loading: PropTypes.bool,
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func,
  changed: PropTypes.func
};
export default SearchBox;
