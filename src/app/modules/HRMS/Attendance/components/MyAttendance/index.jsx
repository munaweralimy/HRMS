import React from 'react';
import { Card, Typography } from 'antd';
import Search from '../Search/OverallSearch';
import ListCard from '../../../../../molecules/ListCard';
import moment from 'moment';

const { Title } = Typography;

const ListCol = [
  {
    title: 'Date in',
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
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
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
  const { iProps } = props;
  const { listdata, listcount, onTableChange, limit, page } = iProps;
  const onSearch = (value) => {
    console.log('check values', value);
  };

  return (
    <Card bordered={false} className="uni-card">
      <ListCard
        Search={Search}
        ListCol={ListCol}
        ListData={listdata}
        onSearch={onSearch}
        pagination={true}
        listClass="nospace-card"
        onChange={onTableChange}
        pagination={{
          total: listcount,
          current: page,
          pageSize: limit,
        }}
      />
    </Card>
  );
};
