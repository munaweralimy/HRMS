import React, { useState, useEffect } from 'react';
import { Typography, Col, Space } from 'antd';
import moment from 'moment';

const { Title } = Typography;

export default (props) => {
  const { uDate } = props;
  // const [uDate, setUDate] = useState({
  //     date: '',
  //     time: ''
  // });

  // useEffect(() => {
  //     setInterval(() => {
  //         setUDate({
  //             date: moment(new Date()).format('dddd, Do MMMM YYYY'),
  //             time: moment(new Date()).format('LT')
  //         })
  //     }, 1000);
  // }, []);
  return (
    <Col span={24}>
      <Space direction="vertical" size={0}>
        <Title level={3} className="mb-0">
          {uDate.date}
        </Title>
        <Title level={4} className="mb-0 c-default">
          {uDate.time}
        </Title>
      </Space>
    </Col>
  );
};
