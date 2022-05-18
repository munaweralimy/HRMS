import React, {useEffect, useState} from 'react';
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
import { getTeams } from '../../Application/ducks/actions';

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
  const team = useSelector(state => state.global.teams);
  const [allTeam, setAllTeam] = useState([]);

  useEffect(() => {
    dispatch(getTeams())
  }, []);

  useEffect(() => {
    if (Object.keys(team).length > 0) {
      let temp = []
      team?.map((x, i) => {
        if (i == 0) {
          temp.push({label: 'All', value: ''})
          temp.push({label: x.team_name, value: x.team_name})
        } else {
          temp.push({label: x.team_name, value: x.team_name})
        }
      });
      setAllTeam(temp);
    }
  }, [team]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    if (type == 'list') {
      if (search) {
        let searchVal = {};
          searchVal = {
            employee_id: search?.id ? search?.id : '',
            employee_name: search?.name ? search?.name : '',
            team_name: search?.team ? search?.team.value : '',
            contract_type: search?.contract ? search?.contract.value : '',
          }
          dispatch(getOverallList(filter, page, limit, sort, sortby, searchVal))
        } else {
          dispatch(getOverallList(filter, page, limit, sort, sortby, null))
        }
    } else {
      dispatch(getOverallList(filter, page, limit, sort, sortby, null))
      dispatch(getOverallCard(page, limit, sort, sortby));
    }
  }

  const tabs = [
    {
      visible: allowed([Roles.EMPLOYMENT], 'read'),
      title: 'Overall Employment',
      key: 'overall',
      count: datalist?.count,
      Comp: MultiView,
      iProps: {
        carddata: datalist?.rows || [],
        cardcount: datalist?.count,
        listdata: datalist?.rows,
        listcount: datalist?.count,
        listCol: colName,
        Search: Search,
        link: '/employment/',
        listLink: '/employment/',
        filters: filters,
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: allTeam,
          field2: [{label:'All', value: ''},{label:'Permanent', value: 'Permanent'},{label:'Contract', value: 'Contract'},{label:'Probation', value: 'Probation'},],
        },
        statusKey:'contract_type',
        addonkey: 'exp_type',
        topbtn: {
          topAction: () => history.push('/employment/add'),
          title: allowed([Roles.EMPLOYMENT], 'write') ? '+ Add New Employee' : null
        },
        issueComponent: true,
        issueComponentData: data?.rows || [],
        issueComponentCount: data?.count,
        issueStatusKey:'status',
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