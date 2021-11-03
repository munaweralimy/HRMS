import React, {useEffect} from 'react';
import { Row, Col } from 'antd';
// import Acquisitions from './Acquisitions';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import Search from './components/Search';
import TeamList from './TeamList';
import { getOverallCard, getOverallList } from './ducks/action';
import { useHistory } from 'react-router';
import {allowed} from '../../../../routing/config/utils';
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
  },
  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: true,
  },
  {
    title: 'Contract',
    dataIndex: 'contract_type',
    key: 'contract_type',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (text, record) => <span className={`${record?.status != 'No Issues' ? 'c-error' : ''}`}>{text}</span>
  },
];

const filters = [
  {
    label: 'Active Employee',
    value: 'Active',
  },
  {
    label: 'Draft',
    value: 'Draft',
  },
  {
    label: 'Archive',
    value: 'Archive',
  },
];

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const il8n = useTranslate();
  const { t } = il8n;
  const data = useSelector(state => state.employment.empcard);
  const datalist = useSelector(state => state.employment.emplist);

  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    if (type == 'list') {
      dispatch(getOverallList(filter, page, limit, sort, sortby))
    } else {
      dispatch(getOverallCard(page, limit, sort, sortby));
    }
  }

  const tabs = [
    {
      visible: allowed([Roles.EMPLOYMENT]),
      title: 'Overall Employment',
      key: 'overall',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: data?.rows || [],
        cardcount: data?.count,
        listdata: datalist?.rows,
        listcount: datalist?.count,
        listCol: colName,
        Search: Search,
        link: '/employment/',
        listLink: '/requests/',
        filters: filters,
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: [{ label: 'All', value: 'All' }],
          field2: [{ label: 'All', value: 'All' }],
          field3: [{ label: 'All', value: 'All' }],
        },
        statusKey:'status',
        addonkey: 'exp_type',
        topbtn: {
          topAction: () => history.push('/employment/add'),
          title: '+ Add New Employee'
        }
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      <Col span={24}>
        <TeamList />
      </Col>
    </Row>
  );
};