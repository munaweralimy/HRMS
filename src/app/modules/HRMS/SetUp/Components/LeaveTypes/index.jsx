import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import {CloseCircleFilled} from '@ant-design/icons';

export default (props) => {
  const [visible, setVisible] = useState(false);

  const ListCol = [
    {
      title: 'Leave Type',
      dataIndex: 'LeaveType',
      key: 'LeaveType',
      sorted: (a, b) => a.LeaveType - b.LeaveType,
    },
    {
      title: 'Approval Level',
      dataIndex: 'ApprovalLevel',
      key: 'ApprovalLevel',
      sorted: (a, b) => a.ApprovalLevel - b.ApprovalLevel,
      align: 'center',
    },
    {
      title: 'Contract Type',
      dataIndex: 'ContractType',
      key: 'ContractType',
      sorted: (a, b) => a.ContractType - b.ContractType,
      align: 'center',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      sorted: (a, b) => a.Gender - b.Gender,
      align: 'center',
    },
    {
      title: 'Marital Status',
      dataIndex: 'MaritalStatus',
      key: 'MaritalStatus',
      sorted: (a, b) => a.MaritalStatus - b.MaritalStatus,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links">
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const ListData = [
    {
      LeaveType: 'Annual Leave',
      ApprovalLevel: '2',
      ContractType: 'Permanent',
      Gender: 'All',
      MaritalStatus: 'All',
      Action: 'Cancel'
    },
    {
      LeaveType: 'Annual Leave',
      ApprovalLevel: '2',
      ContractType: 'Permanent',
      Gender: 'All',
      MaritalStatus: 'All',
      Action: 'Cancel'
    },
    {
      LeaveType: 'Annual Leave',
      ApprovalLevel: '2',
      ContractType: 'Permanent',
      Gender: 'All',
      MaritalStatus: 'All',
      Action: 'Cancel'
    },
    {
      LeaveType: 'Annual Leave',
      ApprovalLevel: '2',
      ContractType: 'Permanent',
      Gender: 'All',
      MaritalStatus: 'All',
      Action: 'Cancel'
    },
    {
      LeaveType: 'Annual Leave',
      ApprovalLevel: '2',
      ContractType: 'Permanent',
      Gender: 'All',
      MaritalStatus: 'All',
      Action: 'Cancel'
    },
    {
      LeaveType: 'Annual Leave',
      ApprovalLevel: '2',
      ContractType: 'Permanent',
      Gender: 'All',
      MaritalStatus: 'All',
      Action: 'Cancel'
    },
  ];

  const btnList = [
    {
      text: '+ New Leave Type',
      classes: 'green-btn',
      action: () => { setVisible(true);},
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <AddPopup
        title='Add New Policy'
        onClose={() => setVisible(false)}
    />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => { },
    };
  }

  const onSearch = (value) => {
    console.log('check values', value);
  }

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Leave Types" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={ListData}
            pagination={true}
          />
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};