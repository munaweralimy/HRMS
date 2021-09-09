import React from 'react';
import { Row, Col, ConfigProvider, Calendar, Card, Button, Typography, Space, Badge } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useTranslate } from 'Translate';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallTasks, getOverallTasksWithStatus, getTeamTasksWithStatus, getTeamTasks, emptyOverall } from './ducks/actions';
import Search from './components/Search';
import SearchTeam from './components/SearchTeam';
import MyLeaves from './components/MyLeaves';
import moment from 'moment';
const { Title } = Typography;
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

  const onOverallAction = (filter, page, limit, sort, sortby, type, searching) => {
    // dispatch(emptyOverall());
    if (type == 'list') {
      dispatch(getOverallTasksWithStatus(filter, page, limit, sort, sortby))
    } else {
      dispatch(getOverallTasks(page, limit, sort, sortby));
    }
  }

  const onTeamAction = (filter, page, limit, sort, sortby, type, searching) => {
    if (type == 'list') {
      dispatch(getTeamTasksWithStatus('Development', filter, page, limit, sort, sortby))
    } else {
      dispatch(getTeamTasks('Development', page, limit, sort, sortby));
    }
  }

  const tabs = [
    {
      title: 'Overall Leaves',
      key: 'overall',
      count: overallData?.count || overallDataList?.count || 0,
      Comp: MultiView,
      iProps : {
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
          field1: [{label: 'All', value: 'All'}],
          field2: [{label: 'All', value: 'All'}],
          field3: [{label: 'All', value: 'All'}],
        }
      },
    },
    {
      title: 'Team Leaves',
      key: 'team',
      count: teamTaskData?.count || teamTaskDataList?.count || 0,
      iProps : {
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
          field1: [{label: 'All', value: 'All'}],
        }
      },
      Comp: MultiView,
    },
    {
      title: 'My Leaves',
      key: 'myleaves',
      Comp: MyLeaves,
    },
  ]

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 23:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'purple', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    const unique = [...new Map(listData.map(item => [item.type, item])).values()];
    return (
      <Space size={3} className='justify-cetner' wrap>
        {unique.map(item => (
          <Badge status={item.type} />
        ))}
      </Space>
    );
  }

  const customHeader = ({value, type, onChange, onTypeChange}) => {

    const nextMonth = () => {
      let newValue = value.clone();
      let currentmonth = value.month();
      let currentyear = value.year();
      if (currentmonth > 11) {
        currentmonth = 0;
        currentyear + 1;
      } else {
        currentmonth = currentmonth + 1
      }
      newValue.month(parseInt(currentmonth, 10));
      onChange(newValue);
    }

    const prevMonth = () => {
      let newValue = value.clone();
      let currentmonth = value.month();
      let currentyear = value.year();
      if (currentmonth < 0) {
        currentmonth = 11;
        currentyear - 1;
      } else {
        currentmonth = currentmonth - 1
      }
      newValue.month(parseInt(currentmonth, 10));
      onChange(newValue);
    }

    const updateValue = (value) => {
      return moment(value).format('MMMM YYYY')
    }
    
    return (
      <Card bordered={false} className='mini-card mini-card10 b-dark-gray'>
        <Row gutter={20} justify='space-between'>
          <Col><Button onClick={prevMonth} type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<LeftOutlined />} /></Col>
          <Col><Title level={5} className='c-default mb-0'>{updateValue(value)}</Title></Col>
          <Col><Button onClick={nextMonth} type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<RightOutlined />} /></Col>
        </Row>
      </Card>
    );
  }

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      <Col span={24}>
        Leave Statistics
      </Col>
      <Col span={24}>
        <Card bordered={false} className='uni-card dashboard-card'>
          <ConfigProvider locale={en_GB}>
              <Calendar 
              className='custom-calendar' 
              dateCellRender={dateCellRender} 
              disabledDate = {
                  current => {
                  return  moment(current).day() === 0 || moment(current).day() === 6 
                  }
              }
              headerRender={customHeader}
              />
          </ConfigProvider>
        </Card>
      </Col>
    </Row>
    )
}