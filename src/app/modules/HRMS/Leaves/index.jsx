import React, {useEffect, Fragment} from 'react';
import { Row, Col, ConfigProvider, Calendar, Card, Button, Typography, Space, Badge, Collapse, Avatar } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useTranslate } from 'Translate';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import MultiView from '../../../molecules/HRMS/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallTasks, getOverallTasksWithStatus, getTeamTasksWithStatus, getTeamTasks, 
        getLeaveStatisticList, getLeaveStatisticBar
} from './ducks/actions';
import Search from './components/Search';
import SearchTeam from './components/SearchTeam';
import MyLeaves from './components/MyLeaves';
import ListCard from '../../../molecules/ListCard';
import moment from 'moment';
import Roles from '../../../../routing/config/Roles';
import {allowed} from '../../../../routing/config/utils';
import { getTeamsDetail } from '../../Application/ducks/actions';

const { Title, Text } = Typography;
const { Panel } = Collapse;

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

  const leaveStatAnnualList = useSelector(state => state.leaves.leaveStatAnnualList);
  const leaveStatisticsBar = useSelector(state => state.leaves.leaveStatisticsBar);
  const teamsDetailData = useSelector(state => state.global.teamsDetailData);
  
  const employeeId = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  useEffect(() => {
    dispatch(getLeaveStatisticBar());
    dispatch(getTeamsDetail(employeeId));
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

  const getCompanyPercent = (totalLeaves, totalTaken) => {
    const percent = totalTaken/totalLeaves * 100;
    return percent ? parseFloat(percent).toFixed(2) : 0;
  }

  const getStaffPercent = (totalLeaves, totalTaken) => {
    const percent = totalTaken/totalLeaves * 100
    return percent ? parseFloat(percent).toFixed(2) : 0;
  }

  const leavesPanelHeader = (item,index) => (
    <Fragment key={index}>
      <Row justify="space-between">
        <Col>
          <Title level={4} className="m-0">{item?.leave_type}</Title>
          <Title level={5} className="m-0">Company Average</Title>
          <Title level={3} className="m-0">{getCompanyPercent(item?.total_employees_entitlement, item?.total_taken_employees_leaves)}%</Title>
        </Col>
        <Col>
          <Space className='w-100' size={30} align="start">
            <Avatar.Group
              maxCount={5}  
              size={70}
            >
              {item?.employee_list?.length > 0 && item?.employee_list?.map((list, ind) => (
                <Fragment key={ind}>
                  <Space direction="vertical" align="center" style={{margin:'0 10px'}}>
                    <Avatar src={list?.image ? `http://cms2dev.limkokwing.net${list?.image}` : ''} size={70} />
                    <Text className='c-error'>{getStaffPercent(list?.employee_total_entitlement, list?.taken_employee_leaves)}%</Text>
                  </Space>
                </Fragment>
              ))}
            </Avatar.Group>
          </Space>
        </Col>
      </Row>
    </Fragment>
  );

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
        statusKey: 'application_status'
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
        statusKey: 'application_status'
      },
      Comp: MultiView,
      teamDrop: teamsDetailData
    },
    {
      visible: allowed([Roles.LEAVES_INDIVIDUAL]),
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

  const customHeader = ({ value, type, onChange, onTypeChange }) => {

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

  const onClickRow = (record) => {
    return {
      onClick: () => { },
    };
  }

  function callback(key) {
    dispatch(getLeaveStatisticList(leaveStatisticsBar[key]?.leave_type));
  }

  const ListCol = [
    {
      title: 'Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      sorted: (a, b) => a.employee_name - b.employee_name,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorted: (a, b) => a.job_title - b.job_title,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorted: (a, b) => a.company - b.company,
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      sorted: (a, b) => a.team - b.team,
    },
    {
      title: 'Contract',
      dataIndex: 'contract',
      key: 'contract',
      sorted: (a, b) => a.contract - b.contract,
    },
    {
      title: 'Leaves Taken',
      dataIndex: 'taken_employee_leaves',
      key: 'taken_employee_leaves',
      sorted: (a, b) => a.taken_employee_leaves - b.taken_employee_leaves,
      align: 'center',
      width: '100px',
      render: (text) => {
        return <span className="c-error">{text}</span>;
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      <Col span={24}>
        {leaveStatisticsBar && (
          <>
            <Collapse accordion onChange={callback}>
                {leaveStatisticsBar.map((item, index) => (
                    <Panel header={leavesPanelHeader(item,index)} key={index} showArrow={false}>
                      <ListCard
                        onRow={onClickRow}
                        ListCol={ListCol}
                        ListData={leaveStatAnnualList?.rows}
                        pagination={true}
                      />
                    </Panel>
                ))}
            </Collapse>
          </>
        )}
        
      </Col>
      <Col span={24}>
        <Card bordered={false} className='uni-card dashboard-card'>
          <ConfigProvider locale={en_GB}>
            <Calendar
              className='custom-calendar'
              dateCellRender={dateCellRender}
              disabledDate={
                current => {
                  return moment(current).day() === 0 || moment(current).day() === 6
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