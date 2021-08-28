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
      title: 'Team Name',
      dataIndex: 'TeamName',
      key: 'TeamName',
      sorted: (a, b) => a.TeamName - b.TeamName,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorted: (a, b) => a.company - b.company,
    },
    {
      title: 'Team Leader',
      dataIndex: 'TeamLeader',
      key: 'TeamLeader',
      sorted: (a, b) => a.TeamLeader - b.TeamLeader,
    },
    {
      title: 'Team Member',
      dataIndex: 'TeamMember',
      key: 'TeamMember',
      sorted: (a, b) => a.TeamMember - b.TeamMember,
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
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
    {
      TeamName: 'Development',
      company: 'Centre For Content Creation Sdn. Bhd.',
      TeamLeader: 'Rose Chavez',
      TeamMember: '20',
      Action: 'Cancel'
    },
  ];

  const btnList = [
    {
      text: '+ New Team',
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
          <HeadingChip title="Teams" btnList={btnList} />
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