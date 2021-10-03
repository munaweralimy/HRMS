import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Card, Divider, Space, Button } from "antd";
import moment from 'moment';

const { Title, Text} = Typography;

export default (props) => {
    const {checkInData} = props;
    console.log('checkInData', checkInData)
    const clockin = '11:00';
    const clockout = '18:20';

    function getTimeDiff(start, end) {
        let diff = moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
        let hour = diff.hours();
        let min =  diff.minutes();
        let duration = `${hour} ${hour > 1 ? 'Hours' : 'Hour'} ${min} ${min > 1 ? 'Mins' : 'Min'}`  
        return duration;
    }

    const [uDate, setUDate] = useState({
        date: '',
        time: ''
    });

    useEffect(() => {
        setInterval(() => {
            setUDate({
                date: moment(new Date()).format('dddd, Do MMMM YYYY'),
                time: moment(new Date()).format('LT')
            })
        }, 1000);
    }, []);

    return (
        <Card bordered={false} className='uni-card'>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <Space direction='vertical' size={0}>
                        <Title level={3} className='mb-0'>{uDate.date}</Title>
                        <Title level={4} className='mb-0 c-default'>{uDate.time}</Title>
                    </Space>
                </Col>
                <Col span={24}><Divider className='m-0' /></Col>
                <Col span={24}>
                    <Row gutter={[20,20]} align='bottom'>
                        <Col flex='0 1 150px'>
                            <Space direction='vertical' size={4}>
                                <Text className='c-gray smallFont12'>Clock In Time</Text>
                                <Title level={4} className='mb-0 c-default'>{moment(clockin, 'hh:mm').format('LT')}</Title>
                            </Space>
                        </Col>
                        <Col flex='0 1 180px'>
                            <Space direction='vertical' size={4}>
                                <Text className='c-gray smallFont12'>Work Duration</Text>
                                <Title level={4} className='mb-0 c-default'>{getTimeDiff(clockin, clockout)}</Title>
                            </Space>
                        </Col>
                        <Col flex='auto'>
                            <Row gutter={[20,20]} justify='end' wrap={false}>
                                <Col flex='0 1 200px'>
                                    <Button type='primary' size='large' htmlType='button' className='w-100 green-btn'>Add Timesheet</Button>
                                </Col>
                                <Col flex='0 1 200px'>
                                    <Button type='primary' size='large' htmlType='button' className='w-100 red-btn'>Clock Out</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        
    )
}