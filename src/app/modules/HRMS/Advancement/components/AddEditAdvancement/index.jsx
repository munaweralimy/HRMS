import React from 'react';
import { Card, Row, Col, Tabs } from 'antd';
import * as TabCards from './tabList';

const tabs = [
  {
    comp: 'EditManagment',
    name: 'Management',
  },
  {
    comp: 'EditPostEmployment',
    name: 'Post Employment',
  },
];

const AddEditAdvancement = (props) => {
  const { TabPane } = Tabs;
  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs -space30">
            {tabs.map((value, index) => {
              const Cardi = TabCards[value.comp];
              return (
                <TabPane tab={value.name} key={index + 1} forceRender>
                  <Cardi title={value.title} {...props} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default AddEditAdvancement;
