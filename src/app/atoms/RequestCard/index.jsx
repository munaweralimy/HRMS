import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space } from 'antd';
import SmallStatusCard from '../SmallStatusCard';
import { ClockCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
const { Title, Text } = Typography;

export default (props) => {
  const { data, link, stateKey } = props;
  const history = useHistory();
  console.log('----', link, stateKey)
  return (
    <Card
      bordered={false}
      className="uni-card"
      style={{ cursor: 'pointer' }}
      onClick={() => history.push({ pathname: link, state: {rstatus: stateKey, rid: data?.name}})}
    >
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space size={17}>
            <Avatar size="large" src="" />
            <Space direction="vertical" size={0}>
              <Text className="c-gray lineHeight20">{data?.employee_name}</Text>
              <Text className="lineHeight20">{data?.name}</Text>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Card
            bordered={false}
            className='mini-card b-black'
          >
            {/* <Row gutter={24} wrap={false} align="middle">
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
            </Row> */}
            <Row gutter={24} wrap={false} align="middle">
              <Col flex='auto'>
                <Space direction="vertical" size={0} className='w-100'>
                  {data?.department && <Text className="d-block c-white op-6 smallFont12">{data?.department}</Text>}
                  <Title level={5} className="text-cutout d-block mb-0 lineHeight20">
                    {data?.form_name}
                  </Title>
                </Space>
              </Col>
              <Col flex='0 1 130px'>
                <SmallStatusCard
                  status={stateKey == 'yourrequests' ? 'Pending' : data?.status == 'Archive' ? data['department status'] : data?.status}
                  icon={
                    stateKey == 'yourrequests' ? <ClockCircleFilled /> : 
                    (data?.status == 'Archive' ? data['department status'] == 'Approved' ? <CheckCircleFilled /> : data['department status'] == 'Reject' ? <CloseCircleFilled /> : '' : '') ||
                    (data?.status == 'Pending' && <ClockCircleFilled />) ||
                    (data?.status == 'Approved' && <CheckCircleFilled />) ||
                    (data?.status == 'Rejected' && <CloseCircleFilled />)
                  }
                  iColor={
                    stateKey == 'yourrequests' ? 'b-pending' : 
                    (data?.status == 'Archive' ? data['department status'] == 'Reject' ? 'b-error' : 'b-success': '' ) ||
                    (data?.status == 'Pending' && 'b-pending') ||
                    (data?.status == 'Approved' && 'b-success') ||
                    (data?.status == 'Reject' && 'b-error')
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
