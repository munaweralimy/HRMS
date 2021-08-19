import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
  const { data, link } = props;
  const history = useHistory();

  const statuses = (status) => {
    switch(status) {
      case 'Missed': return 'b-error';
      case 'Pending': return 'b-pending';
    }
  }

  return (
    <Link to={link ? `${link}${data.employee_id}` : ''}>
    <Card bordered={false} className="uni-card">
      
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space size={17}>
            <Avatar size="large" size={70} src="" />
            <Space direction="vertical" size={0}>
              <Title level={5} className="c-default mb-0">{data?.employee_name}</Title>
              <Text className="c-gray lineHeight20">{data?.employee_id}</Text>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Card
            bordered={false}
            className={`mini-card ${statuses(data?.status)}`}
          >
            <Row gutter={24} wrap={false} align="middle">
                <Col span={14}>
                  <Space direction="vertical" size={2}>
                    <Title level={5} className="mb-0">{data?.status} Timesheet</Title>
                    <Title level={5} className="mb-0 op-6">{data?.date && moment(data?.date).format('Do MMMM YYYY')}</Title>
                  </Space>
                </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
    </Link>
  );
};