import React from 'react';
import { Card, Row, Col, Typography, Progress, Divider, Badge, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default (props) => {

    const pending = 5;
    const approved = 15;
    const total = pending + approved;
    const percentage = approved/total *100;

    return (
        <Card bordered={false} className='uni-card dashboard-card main-card-hover'>
            <Row gutter={[20,30]} align='stretch'>
                <Col span={24}>
                    <Title level={4} className='mb-10PX c-default'>Timesheet</Title>
                    <Card bordered={false} className='mini-card mini-card10 b-dark-gray'>
                        <Row gutter={20} justify='space-between'>
                        <Col><Button type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<LeftOutlined />} /></Col>
                        <Col><Title level={5} className='c-default mb-0'>August 2021</Title></Col>
                        <Col><Button type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<RightOutlined />} /></Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24} className='text-center'>
                    <Progress 
                    type="circle" 
                    className='c-progress' 
                    width={200}
                    percent={percentage} 
                    format={() => <><div className="percent-text">{approved}</div> <div className="percent-numb">Approved</div></>}
                    />
                </Col>
                <Col span={24}>
                    <Divider className='mt-0' />
                    <Row gutter={20} justify='center'>
                        <Col>
                            <Badge className='bottom-badge' status="success" text='Approved' />
                        </Col>
                        <Col>
                            <Badge className='bottom-badge' status="default" text='Pending' />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}