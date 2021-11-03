import React, { Fragment, useState } from 'react';
import { Row, Col, Card, Typography, Select, Space, Divider } from 'antd';
import { semester } from '../../../../Students/ducks/constants';

const { Title, Text } = Typography;

export default (props) => {

    const [selected, setSelected] = useState();

    const onChange = (e) => {
        setSelected(e)
    }

    const semester = [
        {
            name: 'sem1',
            label: 'Semester 1'
        },
        {
            name: 'sem2',
            label: 'Semester 2'
        },
        {
            name: 'sem3',
            label: 'Semester 3'
        },
        {
            name: 'sem4',
            label: 'Semester 4'
        },
        {
            name: 'sem5',
            label: 'Semester 5'
        },
        {
            name: 'sem6',
            label: 'Semester 6'
        },
    ]

    const grades = [
        {
            grade: 'A+',
            title: 'Introduction to AutoCAD Design',
            total: '8.00'
        },
        {
            grade: 'D',
            title: 'Material and Technology in Landscape',
            total: '8.00'
        },
        {
            grade: 'D',
            title: 'Landscape Design Studio 1',
            total: '8.00'
        },
    ]

    return (
        <Row gutter={[20, 30]} align='bottom'>
            <Col span={24}>
                <Title level={4} className='mb-0 c-default'>Academic Performance</Title>
            </Col>

            <Col span={24}>
                <Row gutter={[20,20]}>

                    <Col span={24}>
                        <Space direction='vertical' size={10} className='w-100'>
                            <Text className='smallFont12 c-gray'>Select Semester</Text>
                            <Select value={selected} placeholder='Select Semester' size='large' style={{ width: '100%' }} onChange={onChange}>
                                {semester.map((item, index) => ( 
                                <Option key={index} value={item.name}>{item.label}</Option>
                                ))}
                            </Select>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Card className='small-card8 b-black' bordered={false}>
                            <Space size={5} direction='vertical' className='w-100'>
                                <Title level={5} className='mb-0 c-white'>GPA</Title>
                                <Title level={3} className='mb-0 c-success'>3.69</Title>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className='small-card8 b-black' bordered={false}>
                            <Space size={5} direction='vertical' className='w-100'>
                                <Title level={5} className='mb-0 c-white'>CGPA</Title>
                                <Title level={3} className='mb-0 c-success'>3.22</Title>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card className='small-card8 b-black' bordered={false}>
                            <Space size={10} direction='vertical' className='w-100'>
                                <Space size={5} direction='vertical' className='w-100'>
                                    <Title level={5} className='mb-0 c-white'>Attendance</Title>
                                    <Title level={3} className='mb-0 c-success'>80%</Title>
                                </Space>
                                <Text className='c-gray'>According to Malaysia Government's Law, a minimum of 80% attendance rate must be maintained.</Text>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card className='small-card8 b-black' bordered={false}>
                            <Title level={5} className='mb-1 c-white'>Grades</Title>
                            <Row gutter={[20, 15]}>
                            {grades.map((item, index) => (
                                <Fragment key={index}>
                                    <Col flex='auto'>
                                        <Space size={20}>
                                            <Title level={3} className={`mb-0 ${item.grade.includes('A') ? 'c-success' : item.grade.includes('B') ? 'c-primary' : item.grade.includes('C') ? 'c-pending' : 'c-error' }`}>{item.grade}</Title>
                                            <Title level={5} className='mb-0 c-default'>{item.title}</Title>
                                        </Space>
                                    </Col>
                                    <Col>
                                        <Text className='c-gray'>Total Grades : <span className='c-default'>{item.total}</span></Text>
                                    </Col>
                                    <Col span={24}><Divider className='m-0' /></Col>
                                </Fragment>
                            ))}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}