import React, {useEffect} from 'react';
import { useTranslate } from 'Translate';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallTasks, getOverallTasksWithStatus, getTeamTasksWithStatus, getTeamTasks, emptyAllLeaves } from './ducks/actions';
import Search from './components/Search';
import SearchTeam from './components/SearchTeam';
import MyLeaves from './components/MyLeaves';
import moment from 'moment';
import Roles from '../../../../routing/config/Roles';
import {allowed} from '../../../../routing/config/utils';
import { getTeamsDetail } from '../../Application/ducks/actions';
import TeamStatistics from './components/TeamStatistics';
import LeaveCalendar from '../../../molecules/HRMS/LeaveCalendar';

const filtersOverall = [
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'History',
    value: 'History',
  },
];

const ListColOverall = [
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
    sorter: true,
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: true,
  },
  {
    title: 'Applied',
    dataIndex: 'creation',
    key: 'creation',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD')
    }
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD')
    }
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD')
    }
  },
  {
    title: 'Type',
    dataIndex: 'leave_type',
    key: 'leave_type',
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
    title: 'Status',
    dataIndex: 'application_status',
    key: 'application_status',
    align: 'center',
    width: 140,
    render: (text) => {
      let clname = '';
      if (text == 'Approved') {
        clname = 'c-success';
      } else if (text == 'Rejected') {
        clname = 'c-error';
      } else if (text == ('Pending')) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const ListColTeams = [
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
    title: 'Applied',
    dataIndex: 'creation',
    key: 'creation',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD')
    }
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD')
    }
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD')
    }
  },
  {
    title: 'Type',
    dataIndex: 'leave_type',
    key: 'leave_type',
    sorter: true,
  },
  {
    title: 'Period',
    dataIndex: 'leave_period',
    key: 'leave_period',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'application_status',
    key: 'application_status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'Approved') {
        clname = 'c-success';
      } else if (text == 'Rejected') {
        clname = 'c-error';
      } else if (text == ('Pending')) {
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
  const overallData = useSelector(state => state.leaves.overallTaskData);
  const overallDataList = useSelector(state => state.leaves.overallTaskDataWithStatus);
  const teamTaskData = useSelector(state => state.leaves.teamTaskData);
  const teamTaskDataList = useSelector(state => state.leaves.teamTaskDataWithStatus);
  
  const teamsDetailData = useSelector(state => state.global.teamsDetailData);
  const employeeId = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  let activeTab = ''

  if (allowed([Roles.LEAVES])) {
    activeTab = 'overall';
  } else if(allowed([Roles.LEAVES_TEAMS])) {
    activeTab = 'team';
  } else {
    activeTab = 'myleaves';
  }

  useEffect(() => {
    dispatch(getTeamsDetail(employeeId));
    return () => dispatch(emptyAllLeaves())
  }, [])

  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    if (type == 'list') {
      dispatch(getOverallTasksWithStatus(filter, page, limit, sort,'HR-EMP-00002', sortby))
    } else {
      dispatch(getOverallTasks(page, limit, sort,'HR-EMP-00002', sortby));
    }
  }

  const onTeamAction = (filter, page, limit, sort, sortby, type, searching, team) => {
    if (type == 'list') {
      dispatch(getTeamTasksWithStatus(team, filter, page, limit, sort, sortby))
    } else {
      dispatch(getTeamTasks(team, page, limit, sort, sortby));
    }
  }

  
  const tabs = [
    {
      visible: allowed([Roles.LEAVES]),
      title: 'Overall Leaves',
      key: 'overall',
      count: overallData?.count || overallDataList?.count || 0,
      Comp: MultiView,
      iProps: {
        carddata: overallData?.rows || [],
        cardcount: overallData?.count || 0,
        listdata: overallDataList?.rows || [],
        listcount: overallDataList?.count || 0,
        listCol: ListColOverall,
        Search: Search,
        link: '/leaves/',
        filters: filtersOverall,
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: [{ label: 'All', value: 'All' }],
          field2: [{ label: 'All', value: 'All' }],
          field3: [{ label: 'All', value: 'All' }],
        },
        addon: 'Timesheet',
        statusKey: 'application_status',
        extraComp1: <TeamStatistics />,
        extraComp2: <LeaveCalendar />,
      },
    },
    {
      visible: allowed([Roles.LEAVES_TEAMS]),
      title: 'Team Leaves',
      key: 'team',
      count: teamTaskData?.count || teamTaskDataList?.count || 0,
      iProps: {
        carddata: teamTaskData?.rows || [],
        cardcount: teamTaskData?.count || 0,
        listdata: teamTaskDataList?.rows || [],
        listcount: teamTaskDataList?.count || 0,
        listCol: ListColTeams,
        link: '/leaves/',
        filters: filtersOverall,
        updateApi: onTeamAction,
        Search: SearchTeam,
        searchDropdowns: {
          field1: [{ label: 'All', value: 'All' }],
        },
        addon: 'Leave Application',
        statusKey: 'application_status',
        extraComp1: <LeaveCalendar />,
        teamDrop: teamsDetailData
      },
      Comp: MultiView,
    },
    {
      visible: allowed([Roles.LEAVES_INDIVIDUAL]),
      title: 'My Leaves',
      key: 'myleaves',
      Comp: MyLeaves,
    },
  ]

  return (
      <CardListSwitchLayout tabs={tabs} active={activeTab} />
  )
}