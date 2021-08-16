import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';

const EditEmployee = (props) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { heading, mode, t } = props;

  const tabs = [
    {
      name: 'Personal',
      Comp: 'EditPersonal',
    },
    {
      name: 'Contract',
      Comp: 'EditContract',
    },
    {
      name: 'Passport',
      Comp: 'EditPassport',
    },
    {
      name: 'Medical',
      Comp: 'EditMedical',
    },
  ];

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Title level={4}>{heading}</Title>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="2" type="card" className="custom-tabs -space30">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1} forceRender>
                  <Cardi title={item.title} {...props} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default EditEmployee;
