import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import HeadingChip from '../../../molecules/HeadingChip';
import OverallEmployment from './OverallEmployment';
import TeamList from './TeamList';
import { useTranslate } from 'Translate';
import { PlusOutlined } from '@ant-design/icons';
const data = [
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    status: 'Pending Request',
    onClick: () => history.push,
  },
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    status: 'Pending Request',
  },
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    status: 'Pending Request',
  },
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    status: 'Pending Request',
  },
];

const Employment = () => {
  const il8n = useTranslate();
  const [girdView, setGridView] = useState('2');
  const { t } = il8n;
  const history = useHistory();

  const btnList = [
    {
      type: 'GridViewChanger',
      action: (key) => {
        console.log({ key });
        setGridView(key);
      },
    },
    {
      text: '+ Add New Employment',
      classes: 'green-btn',
      action: () => history.push('/employment/addnew'),
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <HeadingChip title={t('HRMS.Employment.title1')} btnList={btnList} />
      </Col>
      <Col span={24}>{girdView === '1' ? <TeamList /> : girdView === '2' ? <OverallEmployment data={data} /> : ''}</Col>
      <Col span={24}>
        <HeadingChip title={t('HRMS.Employment.title2')} />
      </Col>
      <Col span={24}>
        <TeamList />
      </Col>
    </Row>
  );
};

export default Employment;
