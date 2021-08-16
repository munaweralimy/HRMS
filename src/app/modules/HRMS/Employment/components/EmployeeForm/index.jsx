import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';
//
const EmployeeForm = (props) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { control, errors, setValue, heading, mode, deleted, setDeleted, t } = props;

  //   useEffect(() => {
  //     dispatch(getCountry());
  //     // setValue('attached_document_bg', {fileList: [{uid: '-1', name: 'acb.jpg', status: 'done', url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}]})
  //   }, []);

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
          {mode == 'edit' && (
            <Row gutter={24} justify="end">
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn save-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default EmployeeForm;
