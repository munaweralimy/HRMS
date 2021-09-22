import React from 'react';
import { Tabs } from 'antd';
import * as TabCards from './tabList';

const { TabPane } = Tabs;

const tabs = [
  {
    name: 'Personal',
    Comp: 'Personal',
  },
  {
    name: 'Contract',
    Comp: 'Contract',
  },
  {
    name: 'Passport',
    Comp: 'Passport',
  },
  {
    name: 'Medical',
    Comp: 'Medical',
  },
];

export default (props) => {

  return (
      <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
        {tabs.map((item, index) => {
          const Cardi = TabCards[item.Comp];
          return (
            <TabPane tab={item.name} key={index + 1} forceRender>
              <Cardi title={item.title} {...props} />
            </TabPane>
          )
        })}
      </Tabs>
  );
};