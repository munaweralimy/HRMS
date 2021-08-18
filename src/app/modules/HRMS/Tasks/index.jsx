import React from 'react';
import { Row, Col } from 'antd';
import { useTranslate } from 'Translate';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallTasks, getOverallTasksWithStatus, getTeamTasksWithStatus, getTeamTasks, emptyOverall } from './ducks/actions';
import Search from './components/Search';
import SearchTeam from './components/SearchTeam';
import MyTasks from './components/MyTasks';

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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
    width: 120,
  },
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
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    sorter: true,
    width: 100,
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    sorter: true,
    width: 100,
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
    dataIndex: 'status',
    key: 'status',
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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
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
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    sorter: true,
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    sorter: true,
  },
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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
  const overallData = useSelector(state => state.tasks.overallTaskData);
  const overallDataList = useSelector(state => state.tasks.overallTaskDataWithStatus);
  const teamTaskData = useSelector(state => state.tasks.teamTaskData);
  const teamTaskDataList = useSelector(state => state.tasks.teamTaskDataWithStatus);

  const onOverallAction = (filter, page, limit, sort, sortby, type) => {
    // dispatch(emptyOverall());
    if (type == 'list') {
      dispatch(getOverallTasksWithStatus(filter, page, limit, sort, sortby))
    } else {
      dispatch(getOverallTasks(page, limit, sort, sortby));
    }
  }

  const onTeamAction = (filter, page, limit, sort, sortby, type) => {
    if (type == 'list') {
      dispatch(getTeamTasksWithStatus('Development', filter, page, limit, sort, sortby))
    } else {
      dispatch(getTeamTasks('Development', page, limit, sort, sortby));
    }
  }

  const tabs = [
    {
      title: 'Overall Tasks',
      key: 'overall',
      count: overallData?.count || overallDataList?.count || 0,
      iProps : {
        carddata: overallData?.rows || [],
        cardcount: overallData?.count || 0,
        listdata: overallDataList?.rows || [],
        listcount: overallDataList?.count || 0,
        listCol: ListColOverall,
        Search: Search,
        link: '/tasks/',
        filters: filtersOverall,
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: [{label: 'All', value: 'All'}],
          field2: [{label: 'All', value: 'All'}],
          field3: [{label: 'All', value: 'All'}],
        }
      },
      Comp: MultiView,
    },
    {
      title: 'Team Tasks',
      key: 'team',
      count: teamTaskData?.count || teamTaskDataList?.count || 0,
      iProps : {
        carddata: teamTaskData?.rows || [],
        cardcount: teamTaskData?.count || 0,
        listdata: teamTaskDataList?.rows || [],
        listcount: teamTaskDataList?.count || 0,
        listCol: ListColTeams,
        link: '/tasks/',
        filters: filtersOverall,
        updateApi: onTeamAction,
        Search: SearchTeam,
        searchDropdowns: {
          field1: [{label: 'All', value: 'All'}],
        }
      },
      Comp: MultiView,
    },
    {
      title: 'My Tasks',
      key: 'mytask',
      Comp: MyTasks,
    },
  ]

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      {/* <Col span={24}>
        <TaskTabs t={t} />
      </Col> */}
    </Row>
  );
};