import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space } from 'antd';
import SmallStatusCard from '../SmallStatusCard';
import { ClockCircleOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import './_taskCard.scss';
const { Title, Text } = Typography;

export default (props) => {
  const { data, link } = props;
  const history = useHistory();
  return (
    <Card
      bordered={false}
      className="uni-card"
      onClick={() => history.push({ pathname: link, state: { code: data['student id'] } })}
    >
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space size={17}>
            <Avatar size="large" src="" />
            <Space direction="vertical" size={0}>
              <Text className="c-gray lineHeight20">{data?.employee_name}</Text>
              <Text className="lineHeight20">{data?.employee_id}</Text>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Card
            bordered={false}
            className={data?.status == 'Missed' ? 'task-card-missed' : 'task-card-pending'}
          >
            <Row gutter={24} wrap={false} align="middle">
              {data?.status == 'Missed' && (
                <>
                  <Col span={14}>
                    <Space direction="vertical" size={0}>
                      <Text className="d-block c-white">{data?.status} Timesheet</Text>
                      <Title level={5} className="d-block mb-0 lineHeight20">
                        {data?.date}
                      </Title>
                    </Space>
                  </Col>
                </>
              )}
              {data?.status == 'Pending' && (
                <>
                  <Col span={24}>
                    <Space direction="vertical" size={0}>
                      <Text className="d-block c-white">{data?.status} Timesheet</Text>
                      <Title level={5} className="d-block mb-0 lineHeight20">
                        {data?.date}
                      </Title>
                    </Space>
                  </Col>
                </>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
