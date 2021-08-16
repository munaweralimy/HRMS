import React from 'react';
import { Card, Row, Col, Space, Typography } from 'antd';
import { calculateDays } from '../../modules/AQA/utils/dateCalc';
import { TickIcon } from '../CustomIcons';

const { Text, Title } = Typography;

export default (props) => {

    const { status, title, text, date, extraClass, page } = props;

    return (
        <Card bordered={false} className={`uni-card-small ${extraClass ? extraClass : ''} ${status == 'pending' ? 'b-error' : 'b-black'}`}>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Row gutter={20}>
                        <Col flex='auto'><Title level={5} className={status == 'done' && page ? 'mb-2' : 'mb-0'}>{status == 'done' ? 'Completed' : status == 'pending' ? 'Pending' : ''}{" "}{title}</Title></Col>
                        {status == 'done' && <>
                        {page ? 
                        <Col span={24}>
                            <Space size={20} direction='vertical' className='w-100 text-center mt-2'>
                                <span className='sole-icon b-success'><TickIcon /></span>
                                <Title level={4} className='mb-0'>Completed</Title>
                            </Space>
                        </Col>
                        :
                        <Col>
                            <span className='sole-icon-small b-success'><TickIcon /></span>
                        </Col>}
                        </>}
                        {status != 'done' && <Col span={24}><Title level={5} className='m-0 op-6'>{text}</Title></Col>}
                    </Row>
                </Col>
                {status == 'pending' && 
                <Col span={24}>
                    <Title level={3} className='mb-0'>{calculateDays(date)} days</Title>
                </Col>}
            </Row>
        </Card>
    )
}