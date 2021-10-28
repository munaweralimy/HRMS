import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { getRequestPending } from '../../HRMS/Requests/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/HRMS/CardListSwitchLayout';
import DashboardMultiview from './Components/DashboardMultiview/';
import Search from './Components/Search/';
import { useHistory } from 'react-router-dom';
import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';
import { getStaffPerformance } from '../../Application/ducks/actions';

export default (props) => {
  const {performanceData} = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('pending');
  const staffData = useSelector(state => state.global.staffData);
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  
  const onAction1 = (status, page, sort) => {
    dispatch(getStaffPerformance(company));
  }

  useEffect(() => {
    // dispatch(getStaffPerformance(company));
    //dispatch(getCalenderData());
}, [])

  const data = {
    count: 49,
    rows: [
      {
        employee_id: "HR-EMP-00002",
        employee_name: "Owais Zafar",
        image: "/files/14.jpg",
        status: "Excellent",
        row_name: "1",
        fit_index: '86',
        attendance: '100',
        leaves: '20% Less than Average',
        leaves_list: '-20%',
        company: "Limkokwing University Creative Technology",
        team_name: "Development",
      },
      {
        employee_id: "HR-EMP-00002",
        employee_name: "Owais Zafar",
        image: "/files/14.jpg",
        status: "Average",
        row_name: "1",
        fit_index: '68',
        attendance: '100',
        leaves: '20% Less than Average',
        leaves_list: '-20%',
        company: "Limkokwing University Creative Technology",
        team_name: "Development",
      },
      {
        employee_id: "HR-EMP-00002",
        employee_name: "Owais Zafar",
        image: "/files/14.jpg",
        status: "Excellent",
        row_name: "1",
        fit_index: '86',
        attendance: '100',
        leaves: '20% Less than Average',
        leaves_list: '-20%',
        company: "Limkokwing University Creative Technology",
        team_name: "Development",
      },
      {
        employee_id: "HR-EMP-00002",
        employee_name: "Owais Zafar",
        image: "/files/14.jpg",
        status: "Poor",
        row_name: "1",
        fit_index: '32',
        attendance: '100',
        leaves: '20% More than Average',
        leaves_list: '-20%',
        company: "Limkokwing University Creative Technology",
        team_name: "Development",
      },
      {
        employee_id: "HR-EMP-00002",
        employee_name: "Owais Zafar",
        image: "/files/14.jpg",
        status: "Excellent",
        row_name: "1",
        fit_index: '86',
        attendance: '100',
        leaves: '20% Less than Average',
        leaves_list: '-20%',
        company: "Limkokwing University Creative Technology",
        team_name: "Development",
      },
      {
        employee_id: "HR-EMP-00002",
        employee_name: "Owais Zafar",
        image: "/files/14.jpg",
        status: "Average",
        row_name: "1",
        fit_index: '52',
        attendance: '88',
        leaves: '20% Less than Average',
        leaves_list: '-20%',
        company: "Limkokwing University Creative Technology",
        team_name: "Development",
      },
    ]
  }

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
      title: 'Fit Index',
      dataIndex: 'fit_index',
      key: 'fit_index',
      sorter: true,
      width: 100,
    },
    {
      title: 'Leaves',
      dataIndex: 'leaves_list',
      key: 'leaves_list',
      sorter: true,
      width: 100,
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      sorter: true,
      width: 100,
    },
    {
      title: 'Performance',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Excellent') {
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

  const tabs = [
    {
      visible: allowed([Roles.ADVANCEMENT]),
      title: 'Staff Performance',
      key: 'pending',
      count: staffData?.count,
      Comp: DashboardMultiview,
      iProps: {
        key: 'pending',
        carddata: staffData?.rows || [],
        cardcount: staffData?.count || 0,

        listdata: staffData?.rows || [],
        listcount: staffData?.count || 0,
        listCol: ListColOverall,

        link: '/requests/',
        innerKey: 'student id',
        activeTab: activeKey,
        statusKey: 'status',
        Search: Search,
        updateApi: onAction1,
        searchDropdowns: {
          field1: [{ label: 'All', value: 'All' }],
          field2: [{ label: 'All', value: 'All' }],
          field3: [{ label: 'All', value: 'All' }],
        },
      },
    },
  ]

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeKey} />
      </Col>
    </Row>
  );
};
