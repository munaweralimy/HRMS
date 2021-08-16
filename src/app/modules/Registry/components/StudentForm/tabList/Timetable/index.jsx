import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Typography, Select, Space } from 'antd';
import { getTimetable } from '../../../../Students/ducks/actions';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { semester } from '../../../../Students/ducks/constants';

const { Title, Text } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const [selected, setSelected] = useState(semester[0].label);
    const timetableApi = useSelector(state => state.students.timetableData)
    const { title, data, t } = props;

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            console.log('kkk', selected, data)
            dispatch(getTimetable(data?.program_details[0]?.program_code, selected));
        }
    }, [data]);

    const onChange = (e) => {
        setSelected(e);
        dispatch(getTimetable(data?.program_details[0]?.program_code, e));
    }

    return (
        <Row gutter={[20, 30]} align='bottom'>
            <Col span={24}>
                <Title level={4} className='mb-0 c-default'>{title}</Title>
            </Col>

            <Col span={24}>
                <Space direction='vertical' size={10} className='w-100'>
                    <Text className='smallFont12 c-gray'>Select Semester</Text>
                    <Select value={selected} placeholder='Select Semester' size='large' style={{ width: '100%' }} onChange={onChange}>
                        {semester.map((item, index) => ( 
                            <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                        ))}
                    </Select>
                </Space>
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                {timetableApi && Object.entries(timetableApi).map(([key, value]) => (
                    <>
                    {value.length > 0 && 
                   <Col span={24}>
                    <Card className='small-card12 b-black' bordered={false}>
                        <Row gutter={[20,15]}>
                            <Col span={24}>
                                <Text>{key}</Text>
                            </Col>
                            {value.map((item, i) => (
                                <Col span={24}>
                                    <Card bordered={false} className='mini-card mini-card10 b-primary'>
                                        <Row gutter={20} justify='space-between'>
                                            <Col><Title level={5} className='mb-0'>{item.subject_name}</Title></Col>
                                            <Col><Title level={5} className='mb-0'>{`${item.time_from && moment(item.time_from, 'hh:mm:ss').format('LT')} - ${item.time_to && moment(item.time_to, 'hh:mm:ss').format('LT')}`}</Title></Col>
                                            <Col span={24}><Text className='c-white op-6'>{item.classroom}</Text></Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                   </Col>
                   }
                   </> 
                ))}
            
                </Row>
            </Col>
        </Row>
    )
}