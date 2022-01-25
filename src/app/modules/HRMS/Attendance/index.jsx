import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useTranslate } from 'Translate';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOverallAttendance,
  getOverallAttendanceList,
  getTeamAttendance,
  getTeamAttendanceList,
} from './ducks/actions';
import Search from './components/Search/OverallSearch';
import TeamSearch from './components/Search/TeamSearch';
import MyAttendance from './components/MyAttendance';
import moment from 'moment';
import Roles from '../../../../routing/config/Roles';
import { allowed } from '../../../../routing/config/utils';
import { getCompany, getTeams, getTeamsDetail } from '../../Application/ducks/actions';

const ListColOverall = [
  {
    title: 'Date In',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'Date Out',
    dataIndex: 'Attendance_date_out',
    key: 'Attendance_date_out',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
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
    ellipsis: true,
  },
  {
    title: 'In',
    dataIndex: 'time_in',
    key: 'time_in',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
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
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
    key: 'status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'On Duty' || text == 'Rest Day' || text == 'On Leave') {
        clname = 'c-success';
      } else if (text == 'Absent') {
        clname = 'c-error';
      } else if (
        text == 'Late Clock In' ||
        text == 'Late Clock Out' ||
        text == 'Early Clock In' ||
        text == 'Early Clock Out'
      ) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const ListColTeams = [
  {
    title: 'Date In',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'Date Out',
    dataIndex: 'Attendance_date_out',
    key: 'Attendance_date_out',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
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
    ellipsis: true,
  },
  {
    title: 'In',
    dataIndex: 'time_in',
    key: 'time_in',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'On Duty' || text == 'Rest Day' || text == 'On Leave') {
        clname = 'c-success';
      } else if (text == 'Absent') {
        clname = 'c-error';
      } else if (
        text == 'Late Clock In' ||
        text == 'Late Clock Out' ||
        text == 'Early Clock In' ||
        text == 'Early Clock Out'
      ) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const statusList = [
  { label: 'All Status', value: '' },
  { label: 'Absent', value: 'Absent' },
  { label: 'On Leave', value: 'On Leave' },
  { label: 'Half Day', value: 'Half Day' },
  { label: 'On Duty', value: 'On Duty' },
  { label: 'Rest Day', value: 'Rest Day' },
  { label: 'Holiday', value: 'Holiday' },
  { label: 'Late Clock In', value: 'Late Clock In' },
  { label: 'Early Clock Out', value: 'Early Clock Out' },
  { label: 'Replacement Leave', value: 'Replacement Leave' },
  { label: 'Late Clock Out', value: 'Late Clock Out' },
];

export default (props) => {
  const dispatch = useDispatch();
  const il8n = useTranslate();
  const { t } = il8n;

  const overallAttendanceData = useSelector((state) => state.attendance.overallAttendance);
  const overallAttendanceDataList = useSelector((state) => state.attendance.overallAttendanceList);
  const teamAttendance = useSelector((state) => state.attendance.teamAttendance);
  const teamAttendanceList = useSelector((state) => state.attendance.teamAttendanceList);

  const teamsDetailData = useSelector((state) => state.global.teamsDetailData);
  const team = useSelector((state) => state.global.teams);
  const [allTeam, setAllTeam] = useState([]);
  const company1 = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company;
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  let activeTab = '';

  if (allowed([Roles.ATTENDANCE], 'read')) {
    activeTab = 'overall';
  } else if (allowed([Roles.ATTENDANCE_TEAMS], 'read')) {
    activeTab = 'team';
  } else {
    activeTab = 'mytask';
  }

  useEffect(() => {
    dispatch(getTeamsDetail(id));
    dispatch(getCompany());
    dispatch(getTeams());
  }, []);

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
    if (type == 'list') {
      if (search) {
        let searchVal = {};
        searchVal = {
          name: search?.id ? search?.id : '',
          employee_name: search?.name ? search?.name : '',
          attendance_date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
          company: search?.company ? search?.company.value : '',
          team: search?.team ? search?.team.value : '',
          m_status: search?.status ? search?.status.value : '',
        };
        dispatch(getOverallAttendanceList(page, limit, sort, sortby, searchVal, company1));
      } else {
        dispatch(getOverallAttendanceList(page, limit, sort, sortby, null, company1));
      }
    } else {
      dispatch(getOverallAttendance(page, limit, sort, sortby, company1));
    }
  };

  const onTeamAction = (filter, page, limit, sort, sortby, type, search, team) => {
    if (type == 'list') {
      if (search) {
        let searchVal = {};
        searchVal = {
          name: search?.id ? search?.id : '',
          employee_name: search?.name ? search?.name : '',
          date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
          m_status: search?.status ? search?.status.value : '',
        };
        dispatch(getTeamAttendanceList(team, page, limit, sort, sortby, searchVal, company1));
      } else {
        dispatch(getTeamAttendanceList(team, page, limit, sort, sortby, null, company1));
      }
    } else {
      dispatch(getTeamAttendance(team, page, limit, sort, sortby, company1));
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.ATTENDANCE], 'read'),
      title: 'Overall Attendance',
      key: 'overall',
      count: overallAttendanceData?.count || overallAttendanceDataList?.count || 0,
      Comp: MultiView,
      iProps: {
        carddata: overallAttendanceData?.rows || [],
        cardcount: overallAttendanceData?.count || 0,
        listdata: overallAttendanceDataList?.rows || [],
        listcount: overallAttendanceDataList?.count || 0,
        listCol: ListColOverall,
        link: '/attendance/',
        Search: Search,
        statusKey: 'status',
        updateApi: onOverallAction,
        searchDropdowns: {
          field2: allTeam,
          field3: statusList,
        },
      },
    },
    {
      visible: allowed([Roles.ATTENDANCE_TEAMS], 'read'),
      title: 'Team Attendance',
      key: 'team',
      count: teamAttendance?.count || teamAttendanceList?.count || 0,
      iProps: {
        carddata: teamAttendance?.rows || [],
        cardcount: teamAttendance?.count || 0,
        listdata: teamAttendanceList?.rows || [],
        listcount: teamAttendanceList?.count || 0,
        listCol: ListColTeams,
        link: '/attendance/',
        Search: TeamSearch,
        statusKey: 'status',
        updateApi: onTeamAction,
        teamDrop: teamsDetailData,
        searchDropdowns: {
          field1: statusList,
        },
      },
      Comp: MultiView,
    },
    {
      visible: allowed([Roles.ATTENDANCE_INDIVIDUAL], 'read'),
      title: 'My Attendance',
      key: 'mytask',
      Comp: MyAttendance,
    },
  ];

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} />
      </Col>
    </Row>
  );
};
