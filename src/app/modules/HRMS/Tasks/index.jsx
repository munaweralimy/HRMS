import React from 'react';
import {Row, Col, Card, Typography, Tabs, Tag } from 'antd';
import * as TabCards from './components/tabList';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
    const tabs = [
        {
            name: 'Overall Tasks',
            Comp: "OverallTasks"
        },
        {
            name: 'Team Tasks',
            Comp: "TeamTasks",
        },
        {
            name: 'My Tasks',
            Comp: "MyTasks"
        }
    ]
    return (
    <Row gutter={[30, 20]}>
        <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className="tab-bold grid-container">
                {tabs.map((item, index) => {
                    const Cardi = TabCards[item.Comp];
                    return <TabPane tab={<>{item.name} <Tag className="totalCount">{tabs?.length}</Tag></>} key={index + 1} forceRender={true}><Cardi {...props}/></TabPane>
                })}
            </Tabs>
        </Col>
    </Row>
    )
}