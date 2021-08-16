import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space } from 'antd';
import SmallStatusCard from '../SmallStatusCard';
import { ClockCircleOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
const { Title, Text } = Typography;

export default (props) => {
  const { data, link } = props;
  const history = useHistory();
  return (
    <Card
      bordered={false}
      className="uni-card"
      style={{ cursor: 'pointer' }}
      onClick={() => history.push({ pathname: link, state: { code: data['student id'] } })}
    >
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space size={17}>
            <Avatar size="large" src="" />
            <Space direction="vertical" size={0}>
              <Text className="c-gray lineHeight20">{data?.name}</Text>
              <Text className="lineHeight20">{data?.student}</Text>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Card
            bordered={false}
            className={data?.status == 'Pending Request' ? 'uni-card req-card-pending' : 'uni-card req-card'}
          >
            <Row gutter={24} wrap={false} align="middle">
              {data?.status != 'Pending Request' && (
                <>
                  <Col span={14}>
                    <Space direction="vertical" size={0}>
                      <Text className="d-block c-white op-6 smallFont12">{data?.department}</Text>
                      <Title level={5} className="d-block mb-0 lineHeight20">
                        {data?.form_name}
                      </Title>
                    </Space>
                  </Col>
                  <Col span={10}>
                    <SmallStatusCard
                      status={data?.status}
                      icon={
                        (data?.status == 'Pending' && <ClockCircleOutlined />) ||
                        (data?.status == 'Approved' && <CheckCircleOutlined />) ||
                        (data?.status == 'Rejected' && <CloseCircleOutlined />)
                      }
                      iColor={
                        (data?.status == 'Pending' && 'b-pending') ||
                        (data?.status == 'Approved' && 'b-success') ||
                        (data?.status == 'Rejected' && 'b-error')
                      }
                    />
                  </Col>
                </>
              )}
              {data?.status == 'Pending Request' && (
                <Col span={24}>
                  <Space direction="vertical" size={0}>
                    <Text className="d-block c-white op-6 smallFont12">{data?.department}</Text>
                    <Title level={5} className="d-block mb-0 lineHeight20">
                      {data?.form_name}
                    </Title>
                  </Space>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
