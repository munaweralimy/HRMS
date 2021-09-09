import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslate } from 'Translate';
import Search from './components/Search';
import MultiView from '../../../molecules/HRMS/MultiView';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import { getOverallFinance } from './ducks/action';
const colName = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorted: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorted: (a, b) => a.name - b.name,
  },
  {
    title: 'Job Title',
    dataIndex: 'jobtitle',
    key: 'jobtitle',
    sorted: (a, b) => a.jobtitle - b.jobtitle,
    align: 'center',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorted: (a, b) => a.company - b.company,
    align: 'center',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    sorted: (a, b) => a.team - b.team,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorted: (a, b) => a.status - b.status,
  },
];

const filters = [
  {
    label: 'Acative Employee',
    value: 'Acative Employee',
  },

  {
    label: 'Archive',
    value: 'Archive',
  },
];
const Finance = () => {
  const dispatch = useDispatch();
  const il8n = useTranslate();
  const overallFinance = useSelector((state) => state.finance.overallFinanceData);

  const onOverallAction = (filter, page, limit, sort, sortby) => {
    dispatch(getOverallFinance(page, limit));
  };

  const tabs = [
    {
      title: 'Overall Finance',
      key: 'overall',
      count: overallFinance?.count,
      Comp: MultiView,
      iProps: {
        carddata: overallFinance?.rows || [],
        cardcount: overallFinance?.count || 0,
        listdata: overallFinance?.rows || [],
        listcount: overallFinance?.count || 0,
        listCol: colName,
        Search: Search,
        link: '/finance/',
        statusKey: 'status',
        updateApi: onOverallAction,
      },
    },
  ];
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
    </Row>
  );
};

export default Finance;
