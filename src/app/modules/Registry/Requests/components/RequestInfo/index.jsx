import React, { useEffect } from 'react';
import {Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const { control, errors, heading,  mode, t } = props;

    const tabs = [
        {
            name: t('Request.Registry.Tab1'),
            Comp: "Pending"
        },
        {
            name: t('Request.Registry.Tab2'),
            Comp: "Archive"
        }
    ]

    useEffect(() => {
        
    }, []);

    return (
    <Card bordered={false} className="uni-card h-auto">
        <Row gutter={[30, 20]}>
            <Col span={24}>
                <Title level={4}>{heading}</Title>
            </Col>
            <Col span={24}>
                <Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
                    {tabs.map((item, index) => {
                        const Cardi = TabCards[item.Comp];
                    return <TabPane tab={item.name} key={index + 1} forceRender={true}><Cardi {...props}/></TabPane>
                })}
                </Tabs>
            </Col>
        </Row>
    </Card>
    )
}