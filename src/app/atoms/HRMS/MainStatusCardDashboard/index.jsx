import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space, Descriptions } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
  const { data, link, statusKey } = props;
  //console.log('data', data)
  const history = useHistory();
  const statuses = (status) => {
    switch (status) {
      case 'Execllent':
        return 'b-success';
      case 'Poor':
        return 'b-error';
      case 'Average':
        return 'b-pending';
    }
  };

  return (
    <Link
      to={{
        pathname: link ? `${link}${data.employee_id}` : '',
        state: { tab: link == '/employment/' ? "1" : data?.status },
      }}
    >
      <Card bordered={false} className="uni-card">
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Space size={17}>
              <Avatar size="large" size={70} src={`http://cms2dev.limkokwing.net${data?.image}`} />
              <Space direction="vertical" size={0}>
                <Title level={5} className="c-default mb-0">
                  {data?.employee_name}
                </Title>
                <Text className="c-gray lineHeight20">{data?.employee_id}</Text>
              </Space>
            </Space>
          </Col>

          <Col span={24}>
            <Card bordered={false} className={`mini-card ${statuses(data[statusKey])}`}>
              <Row gutter={24} wrap={false} align="middle">
                <Col span={24}>
                  <Space direction="vertical" size={2}>
                    <Title level={5} className="mb-0">
                      {data[statusKey]}
                    </Title>
                  </Space>
                </Col>
              </Row>
            </Card>
            <Card bordered={false} className="mini-card b-black dashboard-FitCard">
              <Descriptions>
                  <Descriptions.Item span={24} label="Fit Index Score"><span className={`${Number(data?.fit_index) > 80 ? 'c-success' : Number(data?.fit_index) > 50 ? 'c-pending' : 'c-error'}`}>{data?.fit_index}</span></Descriptions.Item>
                  <Descriptions.Item span={24} label="Attendance"><span className={`${Number(data?.attendance) > 90 ? 'c-success' : Number(data?.attendance) > 70 ? 'c-pending' : 'c-error'}`}>{data?.attendance}</span></Descriptions.Item>
                  <Descriptions.Item span={24} label="Leaves"><span>{data?.percentage_leaves}</span></Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};
