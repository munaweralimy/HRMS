import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import ListCard from '../../../../../molecules/ListCard';
import EditAttendance from '../AttendanceDetail';
import { LeftOutlined } from '@ant-design/icons';
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

const listData = [
  {
    attendance_date: 'asdf',
    Attendance_date_out: 'asdg',
    time_in: 'asdfafd',
    time_out: 'asdf',
    total_work_hour: 'asfdasdf',
    status: 'Present',
  },
];
export default (props) => {
  const { Title, Text } = Typography;
  const [viewForm, setViewForm] = useState(false);

  const onRowClick = () => {
    return {
      onClick: () => {
        setViewForm(true);
      },
    };
  };
  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[24, 30]} align="bottom">
        {viewForm ? (
          <Col span={24}>
            <Button
              type="link"
              htmlType="button"
              className="mb-1 p-0 c-gray-linkbtn"
              icon={<LeftOutlined />}
              onClick={() => setViewForm(false)}
            >
              Attendance History
            </Button>
            <Col span={24}>
              <EditAttendance />
            </Col>
          </Col>
        ) : (
          <>
            <Col span={24}>
              <Card bordered={false} className={`mini-card req-card-pending`}>
                <Row gutter={[20, 30]}>
                  <Col span={24}>
                    <Space size={5} direction="vertical" align="start">
                      <Text className="mb-0 c-white">Number of Days Absent</Text>
                      <Title level={3} className="mb-0">
                        2 Days
                      </Title>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Title level={4} className="mb-0">
                Attendance History
              </Title>
            </Col>
            <Col span={24}>
              <ListCard
                ListCol={ListCol}
                ListData={listData}
                onRow={onRowClick}
                pagination={true}
                classes="clickRow"
                listClass="nospace-card"
              />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};
