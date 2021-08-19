import React from 'react';
import { Card, Row, Col, Typography, Progress, Divider, Badge } from 'antd';

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
                    <Title level={4} className='mb-0 c-default'>Timesheet</Title>
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
                    <Divider />
                    <Badge status="success" text='Approved' />
                    <Badge status="default" text='Pending' />
                </Col>
            </Row>
        </Card>
    )
}