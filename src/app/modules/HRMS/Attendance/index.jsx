import React, { useEffect } from 'react';
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

const ListColOverall = [
  {
    title: 'Date In',
    dataIndex: 'attendance_date',
    key: 'attendance_date',
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
      if (text == 'On Duty') {
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
    dataIndex: 'attendance_date',
    key: 'attendance_date',
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
      if (text == 'On Duty') {
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
  let empID = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].name;

  const overallAttendanceData = useSelector((state) => state.attendance.overallAttendance);
  const teamAttendance = useSelector((state) => state.attendance.teamAttendance);
  const myAttendance = useSelector((state) => state.attendance.myAttendance);
  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    console.log({ page, limit, sort, sortby });
    if (type == 'list') {
      dispatch(getOverallAttendance(page, limit, sort, (sortby = 'creation')));
    } else {
      dispatch(getOverallAttendance(page, limit, sort, (sortby = 'creation')));
    }
  };

  const onTeamAction = (filter, page, limit, sort, sortby, type, searching) => {
    if (type == 'list') {
      dispatch(getTeamAttendance('TM000367', page, limit, sort, (sortby = 'creation')));
    } else {
      dispatch(getTeamAttendance('TM000367', page, limit, sort, (sortby = 'creation')));
    }
  };

  useEffect(() => {
    dispatch(getMyAttendance(empID, 1, 6, 'desc', 'creation'));
  }, [empID]);

  const tabs = [
    {
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
        updateApi: onOverallAction,
      },
    },
    {
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
        updateApi: onTeamAction,
      },
      Comp: MultiView,
    },
    {
      title: 'My Attendance',
      key: 'mytask',
      iProps: {
        listdata: myAttendance?.rows || [],
        listcount: myAttendance?.count || 0,
      },
      count: myAttendance?.count || 0,
      Comp: MyAttendance,
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
