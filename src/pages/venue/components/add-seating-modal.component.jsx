import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Form, Modal, Switch } from 'antd';

const AddSeating = ({ showAddSeatingModal, onCreate }) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="Add New Seating"
        visible={showAddSeatingModal}
        onCancel={() => {}}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <div>
          <Form
            form={form}
            labelCol={{
              span: 6
            }}
            wrapperCol={{
              span: 12
            }}
            layout="horizontal"
            initialValues={{
              size: 'small'
            }}
            onValuesChange={() => {}}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input the seating name'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Max Guests" name="maxPeople">
              <InputNumber type="number" min={1} max={10} />
            </Form.Item>
            <Form.Item
              label="Is Outside"
              valuePropName="checked"
              name="outside"
            >
              <Switch />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
AddSeating.propTypes = {
  showAddSeatingModal: PropTypes.bool,
  onCreate: PropTypes.func
};
export default AddSeating;
