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
      if (/\d/.test(text)) {
        clname = 'c-error';
      } else if (text == 'Outstanding Loan') {
        clname = 'c-error';
      } else {
        clname = 'c-success';
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
          temp.push({ label: x.employee_name, value: x.employee_name });
        } else {
          temp.push({ label: x.employee_name, value: x.employee_name });
        }
      });
      setAllTeam(temp);
    }
  }, [team]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    if (type === 'list') {
      if (search) {
        let searchVal = {};
        searchVal = {
          employee_name: search?.name ? search?.name : '',
          company: search?.company ? search?.company.value : '',
          team_name: search?.team ? search?.team.value : '',
          contract_type: search?.contract ? search?.contract.value : '',
        };
        dispatch(getOverallFinanceList(filter, page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getOverallFinanceList(filter, page, limit, sort, sortby, null));
      }
    } else {
      dispatch(getOverallFinance(page, limit, sort, sortby));
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.FINANCE], 'read'),
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
