import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';
import { closeAllOpenForms } from '../../ducks/action';

const tabs = [
  {
    name: 'Account & Salary',
    Comp: 'AddEditAccountSalary',
  },
  {
    name: 'Assets',
    Comp: 'AddEditAssets',
  },
  {
    name: 'Loans',
    Comp: 'AddEditLoans',
  },
  {
    name: 'Salary Advance',
    Comp: 'AddEditSalaryAdvance',
  },
];

const EditFinanceForms = (props) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const dispatch = useDispatch();

  const onTabChangeHandler = (e) => {
    dispatch(closeAllOpenForms(false));
  };

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Tabs defaultActiveKey="2" type="card" className="custom-tabs -space30" onChange={onTabChangeHandler}>
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
export default EditFinanceForms;
