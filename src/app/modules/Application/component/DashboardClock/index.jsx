import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Card, Divider, Space, Button, message } from "antd";
import moment from 'moment';
import { useHistory } from 'react-router';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import DateTime from './DateTime'
import { getCheckInData } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { Title, Text} = Typography;

export default (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
    
    const checkInData = useSelector(state => state.global.checkInData);
    const todayDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log('todayDateTime', todayDateTime)
    const todayDate = moment().format('YYYY-MM-DD');
    const clockin = checkInData?.last_log_time ? moment(checkInData?.last_log_time).format("hh:mm") : '';
    const clockout = '18:20';

    function getTimeDiff(start, end) {
        let diff = moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
        let hour = diff.hours();
        let min =  diff.minutes();
        let duration = `${hour} ${hour > 1 ? 'Hours' : 'Hour'} ${min} ${min > 1 ? 'Mins' : 'Min'}`  
        return duration;
    }

    
    useEffect(() => {
        dispatch(getCheckInData(id, todayDate));
    }, [])

    const getTimeInOut = async () => {
        let log = '';
        let logMessage = ''
        if (checkInData?.log_type_last == 'IN') {
            log = 'OUT';
            logMessage = 'Clock OUT Successfully'
        } else {
            log = 'IN';
            logMessage = 'Clock In Successfully'
        }
        let url = `${apiMethod}/hrms.api.employee_check_in_out?employee=${id}&log_type=${log}&attendance_date=${todayDateTime}`;
        try {
            await axios.post(url);
            message.success(logMessage);
            dispatch(getCheckInData(id, todayDate));
        } catch(e) {
            const { response } = e;
            message.error(e);
        }
    }

    return (
        <Card bordered={false} className='uni-card'>
            <Row gutter={[20,20]}>
                <DateTime />
                <Col span={24}><Divider className='m-0' /></Col>
                <Col span={24}>
                    <Row gutter={[20,20]} align='bottom'>
                        {clockin && (
                            <>
                                <Col flex='0 1 150px'>
                                    <Space direction='vertical' size={4}>
                                        <Text className='c-gray smallFont12'>Clock {checkInData?.log_type_last == 'IN' ? 'In' : 'Out'} Time</Text>
                                        <Title level={4} className='mb-0 c-default'>{moment(clockin, 'hh:mm').format('LT')}</Title>
                                    </Space>
                                </Col>

                                <Col flex='0 1 180px'>
                                    <Space direction='vertical' size={4}>
                                        <Text className='c-gray smallFont12'>Work Duration</Text>
                                        <Title level={4} className='mb-0 c-default'>{checkInData?.total_work_hour}</Title>
                                    </Space>
                                </Col>
                            </>
                        )}
                        
                        
                        <Col flex='auto'>
                            <Row gutter={[20,20]} justify='end' wrap={false}>
                                <Col flex='0 1 200px'>
                                    <Button onClick={() => history.push({ pathname: '/tasks', state: { addTimeSheet: true } })} type='primary' size='large' htmlType='button' className='w-100 green-btn'>
                                        Add Timesheet
                                    </Button>
                                </Col>
                                <Col flex='0 1 200px'>
                                    <Button onClick={getTimeInOut} type='primary' size='large' htmlType='button' className='w-100 red-btn'>
                                        {checkInData?.log_type_last == 'IN' ? 'Clock Out' : 'Clock IN'}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        
    )
}