import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Acquisitions from './Acquisitions';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import Search from './components/Search';
import { getOverallFit, getOverallFitCard } from './dcuks/action';

const colName = [
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
    align: 'center',
  },
  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: true,
  },
  {
    title: 'Contract',
    dataIndex: 'contract',
    key: 'contract',
    sorter: true,
  },
  {
    title: 'Fit Index',
    dataIndex: 'index_ratio',
    key: 'index_ratio',
    sorter: true,
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

export default (props) => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.advancement.fitindexcard);
  const datalist = useSelector(state => state.advancement.fitindexlist);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const il8n = useTranslate();
  const { t } = il8n;

  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    if (type == 'list') {
      dispatch(getOverallFit(filter, page, limit, sort, sortby))
    } else {
      dispatch(getOverallFitCard(page, limit, sort, sortby));
    }
  }

  const tabs = [
    {
      title: 'Overall Fit Index',
      key: 'overall',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: data.rows || [],
        cardcount: data.count,
        listdata: datalist.rows,
        listcount: datalist.count,
        listCol: colName,
        Search: Search,
        link: '/advancement/',
        filters: filters,
        updateApi: onOverallAction,
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
      <Col span={24}>
        <Acquisitions />
      </Col>
    </Row>
  );
};