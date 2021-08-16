import React from 'react';
import { Card, Space, Typography, Row, Col, Button } from 'antd';
import { calculateDays } from '../../modules/AQA/utils/dateCalc';
import { CloseCircleFilled } from "@ant-design/icons";
import { TickIcon } from '../../atoms/CustomIcons';

const { Text, Title } = Typography;

export default (props) => {

    const { title, title2, title3, status, data, action, btnTitle, reason} = props;

    return (
        <Space size={30} direction='vertical' className='w-100'>
            {title && <Title level={4} className='mb-0'>{title}</Title>}
            <Card bordered={false} className={`uni-card-small ${status == 'pending' ? 'b-error' : 'b-black'}`}>
                <Row gutter={[20,20]} align='middle'>
                    <Col flex='auto'>
                        <Space size={3} direction='vertical' className='w-100'>
                            <Title level={5} className='mb-0'>{title2}</Title>
                            <Text className={`${status == 'done' ? 'c-gray' : 'op-6'}`}>{title3}</Text>
                        </Space>
                    </Col>
                    {status == 'pending' && (
                        <>
                            <Col span={24}>
                                <Title level={3} className='mb-0'>{`${calculateDays(data)} Days`}</Title>
                            </Col>
                            <Col span={24}>
                                <Button htmlType='button' className='btnoutline-white w-100' onClick={action} size='large'>{btnTitle}</Button>
                            </Col>
                        </>
                    )}
                    {status == 'done' && (
                        <>
                            <Col span={24}>
                                <Space size={10} direction='vertical' className='w-100 text-center'>
                                    <span className='sole-icon b-success'><TickIcon /></span>
                                    <Title level={3} className='mb-0'>Eligible</Title>
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Button type='primary' htmlType='button' className='green-btn w-100' onClick={action} size='large'>{btnTitle}</Button>
                            </Col>
                        </>
                    )}
                    {status == 'rejected' && (
                        <>
                            <Col span={24}>
                                <Space size={10} direction='vertical' className='w-100 text-center'>
                                    <CloseCircleFilled className='sole-anticon c-error' />
                                    <Title  level={3} className='mb-0'>Not Eligible</Title>
                                </Space>
                            </Col>
                            <Col span={24}><Title level={5} className='c-gray mb-0 text-center'>{reason}</Title></Col>
                            <Col span={24}>
                                <Button type='primary' htmlType='button' className='red-btn w-100' onClick={action} size='large'>{btnTitle}</Button>
                            </Col>
                        </>
                    )}
                </Row>
            </Card>
        </Space>
    )
}