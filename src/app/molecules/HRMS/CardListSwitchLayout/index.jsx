import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Space, Badge } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const { tabs, active } = props;
  const [activeKey, setActiveKey] = useState(active);

  useEffect(() => {}, []);

  return (
    <Tabs activeKey={activeKey} type="card" className="tab-bold" onChange={(key) => setActiveKey(key)}>
      {tabs.map((item, index) => {
        const { Comp, title, count, key, iProps } = item;
        return (
          <TabPane
            tab={
              <Space size={20}>
                <Title className="tab-header mb-0" level={4}>
                  {title}
                </Title>
                {count && count != 0 && <Badge count={count} className="tab-badge" />}
              </Space>
            }
            key={key}
            forceRender={true}
          >
            {Comp && <Comp iProps={iProps} />}
          </TabPane>
        );
      })}
    </Tabs>
  );
};
