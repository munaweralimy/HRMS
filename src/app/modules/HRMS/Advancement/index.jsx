import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Acquisitions from './Acquisitions';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import Search from './components/Search';
import { getOverallFit, getOverallFitCard } from './dcuks/action';
import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';
import { getCompany, getTeams } from '../../Application/ducks/actions';

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
    title: 'Fit Index',
    dataIndex: 'index_ratio',
    key: 'index_ratio',
    align: 'center',
    sorter: true,
    render: (text) => (
      <span className={`${Number(text) > 65 ? 'c-success' : Number(text) > 35 ? 'c-pending' : 'c-error'}`}>{text}</span>
    ),
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

export default (props) => {
  const dispatch = useDispatch();
  const il8n = useTranslate();
  const { t } = il8n;
  const data = useSelector((state) => state.advancement.fitindexcard);
  const datalist = useSelector((state) => state.advancement.fitindexlist);
  const company = useSelector((state) => state.global.companies);
  const team = useSelector((state) => state.global.teams);
  const [allCompany, setAllCompany] = useState([]);
  const [allTeam, setAllTeam] = useState([]);

  useEffect(() => {
    dispatch(getCompany());
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      let temp = [];
      company.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All', value: '' });
          temp.push({ label: x.name, value: x.name });
        } else {
          temp.push({ label: x.name, value: x.name });
        }
      });
      setAllCompany(temp);
    }
  }, [company]);

  useEffect(() => {
    if (Object.keys(team).length > 0) {
      let temp = [];
      team?.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Teams', value: '' });
          temp.push({ label: x.team_name, value: x.team_name });
        } else {
          temp.push({ label: x.team_name, value: x.team_name });
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
          employee_name: search?.name ? search?.name : '',
          company: search?.company ? search?.company.value : '',
          team: search?.team ? search?.team.value : '',
          contract_type: search?.contract ? search?.contract.value : '',
        };
        dispatch(getOverallFit(filter, page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getOverallFit(filter, page, limit, sort, sortby, null));
      }
    } else {
      dispatch(getOverallFitCard(page, limit, sort, sortby));
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.ADVANCEMENT], 'read'),
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
          field1: allCompany,
          field2: allTeam,
          field3: [
            { label: 'All', value: '' },
            { label: 'Permanent', value: 'Permanent' },
            { label: 'Contract', value: 'Contract' },
            { label: 'Probation', value: 'Probation' },
          ],
        },
        statusKey: 'index_status',
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      {allowed([Roles.ADVANCEMENT], 'read') && (
        <Col span={24}>
          <Acquisitions />
        </Col>
      )}
    </Row>
  );
};
