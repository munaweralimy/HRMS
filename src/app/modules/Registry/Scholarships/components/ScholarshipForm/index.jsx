import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';
import { getCountry } from '../../../../Application/ducks/actions';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { control, errors, setValue, heading, mode, deleted, setDeleted, t } = props;

  useEffect(() => {
    dispatch(getCountry());
    // setValue('attached_document_bg', {fileList: [{uid: '-1', name: 'acb.jpg', status: 'done', url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}]})
  }, []);

  const tabs = [
    {
      name: 'Summary',
      Comp: 'Summary',
    },
    {
      name: 'Schemes',
      Comp: 'Schemes',
    },
    {
      name: 'Billing',
      Comp: 'Billing',
    },
  ];

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        {heading && 
        <Col span={24}>
          <Title level={4} className='c-default mb-0'>{heading}</Title>
        </Col>}
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs -space30">
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
