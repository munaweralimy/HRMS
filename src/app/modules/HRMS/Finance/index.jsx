import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import HeadingChip from '../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import CardView from '../../../molecules/CardView';
import TableView from '../../../molecules/ListCard';
import Search from './components/Search';
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
    label: 'Acative Employee',
    value: 'active_employee',
  },

  {
    label: 'Archive',
    value: 'archive',
  },
];
const Finance = () => {
  const il8n = useTranslate();
  const [girdView, setGridView] = useState('2');
  const { t } = il8n;
  const [filterVal, setFilterVal] = useState(filters[0].value);

  const btnList = [
    {
      type: 'GridViewChanger',
      action: (key) => {
        setGridView(key);
      },
    },
  ];
  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };
  const onSearch = () => {};
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <HeadingChip title={t('HRMS.Finance.title1')} />
      </Col>
      <Col span={24}>
        <CardView data={data} link="/finance" />
      </Col>
      <Col span={24}>
        <TableView
          Search={Search}
          filters={filters}
          ListCol={colName}
          ListData={tableData}
          onFilter={onFilter}
          filterValue={filterVal}
          onSearch={onSearch}
        />
      </Col>
    </Row>
  );
};

export default Finance;
