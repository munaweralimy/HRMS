import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import EditAttendance from '../AttendanceDetail';
import { LeftOutlined } from '@ant-design/icons';
import { getMyAttendance, getSingleAttendanceDetail } from '../../ducks/actions';
import moment from 'moment';
const ListCol = [
  {
    title: 'Date in',
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
    title: 'Hours',
    dataIndex: 'total_job_hour',
    key: 'total_job_hour',
    align: 'center',
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
  const { Title, Text } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [viewForm, setViewForm] = useState(false);
  const [empID, setEmpID] = useState('');
  const myAttendance = useSelector((state) => state.attendance.myAttendance);
  const singleAttendanceDetail = useSelector((state) => state.attendance.singleAttendance);

  const onRowClick = (record) => {
    return {
      onClick: () => {
        console.log({ record });
        setViewForm(true);
        setEmpID(record?.name);
      },
    };
  };

  useEffect(() => {
    dispatch(getMyAttendance(id, 1, 6, 'desc', 'creation'));
  }, [id]);

  useEffect(() => {
    if (empID && viewForm === true) {
      dispatch(getSingleAttendanceDetail(empID));
    }
  }, [empID, viewForm]);

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Attendance
          </Title>
        </Col>
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
              <EditAttendance attendanceData={singleAttendanceDetail} onViewForm={setViewForm} />
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
                ListData={myAttendance?.rows}
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
