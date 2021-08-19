import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';

export default (props) => {
  const [visible, setVisible] = useState(false);

  const ListCol = [
    {
      title: 'Job Title',
      dataIndex: 'jobtitle',
      key: 'jobtitle',
      sorted: (a, b) => a.jobtitle - b.jobtitle,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorted: (a, b) => a.company - b.company,
    },
    {
      title: 'Date Open',
      dataIndex: 'dateopen',
      key: 'dateopen',
      sorted: (a, b) => a.dateopen - b.dateopen,
    },
    {
      title: 'Suitable Application',
      dataIndex: 'suitableappalication',
      key: 'suitableappalication',
      sorted: (a, b) => a.suitableappalication - b.suitableappalication,
      align: 'center',
    },
  ];
  const ListData = [
    {
      jobtitle: 'Graphic Designer',
      company: 'Centre for Content Creation Sdn. Bhd.',
      dateopen: '15th February 2021',
      suitableappalication: '3',
    },
  ];

  const btnList = [
    {
      text: '+ New Working Hours',
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
          <HeadingChip title="Working Hours" btnList={btnList} />
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