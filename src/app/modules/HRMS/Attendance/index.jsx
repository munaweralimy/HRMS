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
  getMyAttendance,
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

export default (props) => {
  const dispatch = useDispatch();
  const il8n = useTranslate();
  const { t } = il8n;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const overallAttendanceData = useSelector((state) => state.attendance.overallAttendance);
  const overallAttendanceDataList = useSelector((state) => state.attendance.overallAttendanceList);
  const teamAttendance = useSelector((state) => state.attendance.teamAttendance);
  const teamAttendanceList = useSelector((state) => state.attendance.teamAttendanceList);
  const myAttendance = useSelector((state) => state.attendance.myAttendance);
  const teamsDetailData = useSelector((state) => state.global.teamsDetailData);
  const company = useSelector(state => state.global.companies);
  const team = useSelector(state => state.global.teams);
  const [allCompany, setAllCompany] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  let activeTab = '';

  if (allowed([Roles.ATTENDANCE])) {
    activeTab = 'overall';
  } else if (allowed([Roles.ATTENDANCE_TEAMS])) {
    activeTab = 'team';
  } else {
    activeTab = 'mytask';
  }

  useEffect(() => {
    dispatch(getMyAttendance(id, 1, 10, '', ''));
    dispatch(getTeamsDetail(id));
    dispatch(getCompany());
    dispatch(getTeams())
  }, []);

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      let temp = []
      company.map((x, i) => {
        if (i == 0) {
          temp.push({label: 'All', value: ''})
          temp.push({label: x.name, value: x.name})
        } else {
          temp.push({label: x.name, value: x.name})
        }
      });
      setAllCompany(temp);
    }
  }, [company]);

  useEffect(() => {
    if (Object.keys(team).length > 0) {
      let temp = []
      team.map((x, i) => {
        if (i == 0) {
          temp.push({label: 'All', value: ''})
          temp.push({label: x.team_name, value: x.name})
        } else {
          temp.push({label: x.team_name, value: x.name})
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
            company:  search?.company ? search?.company.value : '',
            team: search?.team ? search?.team.value : '',
            m_status: search?.status ? search?.status.value : '',
          }
          dispatch(getOverallAttendanceList(page, limit, sort, sortby, searchVal));
        } else {
          dispatch(getOverallAttendanceList(page, limit, sort, sortby, null));
        }
    } else {
      dispatch(getOverallAttendance(page, limit, sort, sortby));
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
        }
        dispatch(getTeamAttendanceList(team, page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getTeamAttendanceList(team, page, limit, sort, sortby, null));
      }
      
    } else {
      dispatch(getTeamAttendance(team, page, limit, sort, sortby));
    }
  };

  

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
          field1: allCompany,
          field2: allTeam,
        },
      },
    },
    {
      visible: allowed([Roles.ATTENDANCE_TEAMS]),
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
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} />
      </Col>
    </Row>
  );
};
