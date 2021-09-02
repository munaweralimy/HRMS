import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Tabs, Typography } from 'antd';
import StaffDetails from '../../StaffDetails';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import Management from '../components/Managment';
import PostEmployment from '../components/PostEmployment';

const { Title } = Typography;
const { TabPane } = Tabs;

export default (props) => {

  const { id } = useParams();
  const history = useHistory();

  return (
    <StaffDetails id={id} section='Advancement' data={singleTaskDetail} title={'Tasks'}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex='auto'><Title level={4} className='mb-0'>Advancement</Title></Col>
          <Col>
            <Button icon={<LeftOutlined />} size='middle' className="c-graybtn small-btn" onClick={() => history.push('/requests')}>Categories</Button>
          </Col>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
              <TabPane tab={'Management'} key={'1'} forceRender>
                <Management />
              </TabPane>
              <TabPane tab={'Post Employment'} key={'2'} forceRender>
                <PostEmployment />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};