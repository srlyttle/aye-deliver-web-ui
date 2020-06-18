import React, { useState } from 'react';

import PropTypes from 'prop-types';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Divider,
  Button
} from 'antd';
import AddSeatingModal from './add-seating-modal.component';

const originData = [];

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    name: `Table ${i}`,
    maxPeople: 32,
    outside: i % 2 === 0 ? 'Yes' : 'No'
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
EditableCell.propTypes = {
  editing: PropTypes.any,
  dataIndex: PropTypes.any,
  title: PropTypes.any,
  inputType: PropTypes.any,
  record: PropTypes.any,
  index: PropTypes.any,
  children: PropTypes.any
};

const EditableTable = ({
  seatingList,
  addSeatingItem,
  editSeatingItem,
  deleteSeatingItem
}) => {
  const transformedItems = seatingList.map((s, i) => {
    return { ...s, key: i, outside: s.outside ? 'Yes' : 'No' };
  });
  const [form] = Form.useForm();
  const [data, setData] = useState(transformedItems);
  const [editingKey, setEditingKey] = useState('');
  const [showAddSeatingModal, setShowAddSeatingModal] = useState(false);

  const isEditing = record => record.key === editingKey;

  const handleAdd = values => {
    setShowAddSeatingModal(false);
    const { name, maxPeople, outside } = values;
    const count = data.length + 1;
    const newData = {
      key: count,
      name,
      maxPeople,
      outside: outside ? 'Yes' : 'No'
    };
    addSeatingItem(newData);
    const newDataItems = [...data, newData];
    setData(newDataItems);
  };
  const edit = record => {
    form.setFieldsValue({
      name: '',
      maxPeople: '',
      outside: '',
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const input = { id: item.id, ...row };
        editSeatingItem(input);
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteRecord = async key => {
    try {
      const newData = [...data];
      const index = newData.findIndex(item => key.id === item.id);
      if (index > -1) {
        newData.splice(index, 1);
        const seatingToRemove = { id: key.id };
        deleteSeatingItem(seatingToRemove);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const actionsCell = (_, record) => {
    const editable = isEditing(record);
    return editable ? (
      <span>
        <span
          onClick={() => save(record.key)}
          style={{
            marginRight: 8
          }}
        >
          Save
        </span>
        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
          <span>Cancel</span>
        </Popconfirm>
      </span>
    ) : (
      <span disabled={editingKey !== ''} onClick={() => edit(record)}>
        Edit
      </span>
    );
  };
  const actionsCellDelete = (_, record) => {
    return (
      <span disabled={editingKey !== ''} onClick={() => deleteRecord(record)}>
        Delete
      </span>
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true
    },
    {
      title: 'Max People',
      dataIndex: 'maxPeople',
      width: '15%',
      editable: true
    },
    {
      title: 'Is Outside',
      dataIndex: 'outside',
      width: '40%',
      editable: true
    },
    {
      title: '',
      dataIndex: 'operation',
      render: actionsCell
    },
    {
      title: '',
      dataIndex: 'operation2',
      render: actionsCellDelete
    }
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'maxPeople' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  return (
    <>
      <Divider orientation="left">Venue Seating</Divider>
      <Button
        onClick={() => setShowAddSeatingModal(true)}
        type="primary"
        style={{
          marginBottom: 16
        }}
      >
        Add Seating
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
      <AddSeatingModal
        showAddSeatingModal={showAddSeatingModal}
        onCreate={handleAdd}
      />
    </>
  );
};

EditableTable.propTypes = {
  addSeatingItem: PropTypes.func,
  editSeatingItem: PropTypes.func,
  seatingList: PropTypes.array,
  deleteSeatingItem: PropTypes.func
};
export default EditableTable;
