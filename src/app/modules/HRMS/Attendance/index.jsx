import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useTranslate } from 'Translate';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallAttendance, getTeamAttendance, getMyAttendance } from './ducks/actions';
import Search from './components/Search/OverallSearch';
import TeamSearch from './components/Search/TeamSearch';
import MyAttendance from './components/MyAttendance';
import moment from 'moment';
import Roles from '../../../../routing/config/Roles';
import {allowed} from '../../../../routing/config/utils';
import { getTeamsDetail } from '../../Application/ducks/actions';

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
    render: (text) => moment(text, 'h:mm:ss a').format('h:mm:ss a'),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => moment(text, 'h:mm:ss a').format('h:mm:ss a'),
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
    render: (text) => moment(text, 'h:mm:ss a').format('h:mm:ss a'),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => moment(text, 'h:mm:ss a').format('h:mm:ss a'),
  },
  {
    title: 'Status',
    dataIndex: 'status',
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

export default (props) => {
  const dispatch = useDispatch();
  const il8n = useTranslate();
  const { t } = il8n;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const overallAttendanceData = useSelector((state) => state.attendance.overallAttendance);
  const teamAttendance = useSelector((state) => state.attendance.teamAttendance);
  const myAttendance = useSelector((state) => state.attendance.myAttendance);
  const teamsDetailData = useSelector(state => state.global.teamsDetailData);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    console.log({ page, limit, sort, sortby });
    if (type == 'list') {
      dispatch(getOverallAttendance(page, limit, sort, sortby));
    } else {
      dispatch(getOverallAttendance(page, limit, sort, sortby));
    }
  };

  const onTeamAction = (filter, page, limit, sort, sortby, type, searching, team) => {
    if (type == 'list') {
      dispatch(getTeamAttendance(team, page, limit, sort, (sortby = 'creation')));
    } else {
      dispatch(getTeamAttendance(team, page, limit, sort, (sortby = 'creation')));
    }
  };

  let activeTab = ''

  if (allowed([Roles.TASK])) {
    activeTab = 'overall';
  } else if(allowed([Roles.TASK_TEAMS])) {
    activeTab = 'team';
  } else {
    activeTab = 'mytask';
  }

  useEffect(() => {
    dispatch(getMyAttendance(id, 1, 10, '', ''));
    dispatch(getTeamsDetail(id));
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getMyAttendance(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getMyAttendance(id, pagination.current, pagination.pageSize, '', ''));
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.ATTENDANCE]),
      title: 'Overall Attendance',
      key: 'overall',
      count: overallAttendanceData?.count,
      Comp: MultiView,
      iProps: {
        carddata: overallAttendanceData?.rows || [],
        cardcount: overallAttendanceData?.count || 0,
        listdata: overallAttendanceData?.rows || [],
        listcount: overallAttendanceData?.count || 0,
        listCol: ListColOverall,
        link: '/attendance/',
        Search: Search,
        statusKey: 'status',
        updateApi: onOverallAction,
      },
    },
    {
      visible: allowed([Roles.ATTENDANCE_TEAMS]),
      title: 'Team Attendance',
      key: 'team',
      count: teamAttendance?.count,
      iProps: {
        carddata: teamAttendance?.rows || [],
        cardcount: teamAttendance?.count || 0,
        listdata: teamAttendance?.rows || [],
        listcount: teamAttendance?.count || 0,
        listCol: ListColTeams,
        link: '/attendance/',
        Search: TeamSearch,
        statusKey: 'status',
        updateApi: onTeamAction,
        teamDrop: teamsDetailData
      },
      Comp: MultiView,
    },
    {
      visible: allowed([Roles.ATTENDANCE_INDIVIDUAL]),
      title: 'My Attendance',
      key: 'mytask',
      iProps: {
        listdata: myAttendance?.rows || [],
        listcount: myAttendance?.count || 0,
        onTableChange: onTableChange,
        page: page,
        limit: limit,
      },
      count: myAttendance?.count || 0,
      Comp: MyAttendance,
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} />
      </Col>
    </Row>
  );
};
