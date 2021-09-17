import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslate } from 'Translate';
import Search from './components/Search';
import MultiView from '../../../molecules/HRMS/MultiView';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';

const data = [
  {
    employee_id: 'HR-EMP-00001',
    employee_name: 'sheeraz kaleem',
    row_name: '8f36e8e809',
    project: 'CMS2',
    hours: 9,
    date: '2021-07-28',
    status: 'Pending',
    tasks: 'Testing Marketing APIs',
  },
  {
    employee_id: 'HR-EMP-00001',
    employee_name: 'sheeraz kaleem',
    row_name: '8f36e8e809',
    project: 'CMS2',
    hours: 9,
    date: '2021-07-28',
    status: 'Pending',
    tasks: 'Testing Marketing APIs',
  },
  {
    employee_id: 'HR-EMP-00001',
    employee_name: 'sheeraz kaleem',
    row_name: '8f36e8e809',
    project: 'CMS2',
    hours: 9,
    date: '2021-07-28',
    status: 'Pending',
    tasks: 'Testing Marketing APIs',
  },
  {
    employee_id: 'HR-EMP-00001',
    employee_name: 'sheeraz kaleem',
    row_name: '8f36e8e809',
    project: 'CMS2',
    hours: 9,
    date: '2021-07-28',
    status: 'Pending',
    tasks: 'Testing Marketing APIs',
  },
  {
    employee_id: 'HR-EMP-00001',
    employee_name: 'sheeraz kaleem',
    row_name: '8f36e8e809',
    project: 'CMS2',
    hours: 9,
    date: '2021-07-28',
    status: 'Pending',
    tasks: 'Testing Marketing APIs',
  },
  {
    employee_id: 'HR-EMP-00001',
    employee_name: 'sheeraz kaleem',
    row_name: '8f36e8e809',
    project: 'CMS2',
    hours: 9,
    date: '2021-07-28',
    status: 'Pending',
    tasks: 'Testing Marketing APIs',
  },
];
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
const tableData = [
  {
    id: 123456,
    name: 'Walater Gibson',
    jobtitle: 'Graphics Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    team: 'Development',
    status: '3 Issues',
  },
  {
    id: 123456,
    name: 'Walater Gibson',
    jobtitle: 'Graphics Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    team: 'Development',
    status: '3 Issues',
  },
  {
    id: 123456,
    name: 'Walater Gibson',
    jobtitle: 'Graphics Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    team: 'Development',
    status: '3 Issues',
  },
  {
    id: 123456,
    name: 'Walater Gibson',
    jobtitle: 'Graphics Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    team: 'Development',
    status: '3 Issues',
  },
  {
    id: 123456,
    name: 'Walater Gibson',
    jobtitle: 'Graphics Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    team: 'Development',
    status: '3 Issues',
  },
  {
    id: 123456,
    name: 'Walater Gibson',
    jobtitle: 'Graphics Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    team: 'Development',
    status: '3 Issues',
  },
];
const filters = [
  {
    label: 'Active Employee',
    value: 'Active',
  },

  {
    label: 'Archive',
    value: 'Archive',
  },
];
const Finance = () => {
  const il8n = useTranslate();
  const [girdView, setGridView] = useState('2');
  const { t } = il8n;
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const tabs = [
    {
      title: 'Overall Finance',
      key: 'overall',
      count: data?.count || tableData?.count || 6,
      Comp: MultiView,
      iProps: {
        carddata: data || [],
        cardcount: (data && data?.count) || 10,
        listdata: tableData || [],
        listcount: (tableData && tableData?.count) || 0,
        listCol: colName,
        Search: Search,
        link: '/finance/',
        filters: filters,
        updateApi: () => {},
        searchDropdowns: {
          field1: [{ label: 'All', value: 'All' }],
          field2: [{ label: 'All', value: 'All' }],
          field3: [{ label: 'All', value: 'All' }],
        },
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
