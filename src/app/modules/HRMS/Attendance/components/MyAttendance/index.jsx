import React, { useState, useEffect } from 'react';
import { Card, Tabs, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../Search/OverallSearch';
import ListCard from '../../../../../molecules/ListCard';
import moment from 'moment';

const { Title } = Typography;

const ListCol = [
  {
    title: 'Date in',
    dataIndex: 'attendance_date',
    key: 'attendance_date',
  },
  {
    title: 'Date Out',
    dataIndex: 'Attendance_date_out',
    key: 'Attendance_date_out',
  },
  {
    title: 'In',
    dataIndex: 'time_in',
    key: 'time_in',
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
  },
  {
    title: 'Hours',
    dataIndex: 'total_work_hour',
    key: 'total_work_hour',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'right',
    render: (text) => {
      let clname = '';
      if (text == 'on Duty') {
        clname = 'c-success';
      } else if (text == 'Absent') {
        clname = 'c-error';
      } else if (text == 'Late Clockout' || text == 'Late Clockin') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const { listData } = props;
  const onSearch = (value) => {
    console.log('check values', value);
  };

  return (
    <Card bordered={false} className="uni-card">
      <ListCard
        Search={Search}
        ListCol={ListCol}
        ListData={listData}
        onSearch={onSearch}
        pagination={true}
        classes="clickRow"
        listClass="nospace-card"
      />
    </Card>
  );
};
