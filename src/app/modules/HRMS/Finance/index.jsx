import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslate } from 'Translate';
import Search from './components/Search';
import MultiView from '../../../molecules/HRMS/MultiView';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import { getOverallFinance, getOverallFinanceList } from './ducks/action';
import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';

const colName = [
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: true,
  },
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    sorter: true,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (text) => {
      let clname = '';
      if (Number.isInteger(text) || text == 'Expiring Asset Possession') {
        clname = 'c-pending';
      } else if (text == 'Outstanding Loan') {
        clname = 'c-error';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const filters = [
  {
    label: 'Active',
    value: 'Active',
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
  const overallFinanceList = useSelector((state) => state.finance.overallFinanceListData);

  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    if (type === 'list') {
      dispatch(getOverallFinanceList(filter, page, limit, sort, sortby));
    } else {
      dispatch(getOverallFinance(page, limit, sort, sortby));
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.FINANCE]),
      title: 'Overall Finance',
      key: 'overall',
      count: overallFinance?.count,
      Comp: MultiView,
      iProps: {
        carddata: overallFinance?.rows || [],
        cardcount: overallFinance?.count || 0,
        listdata: overallFinanceList?.rows || [],
        listcount: overallFinanceList?.count || 0,
        listCol: colName,
        filters: filters,
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
