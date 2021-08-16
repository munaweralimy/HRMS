import React, { useState } from 'react';
import { Row, Col, Card, Typography, Select, Table, Button, Space } from 'antd';
import { semester } from '../../../../Students/ducks/constants';

const { Title, Text } = Typography;
const { Option } = Select;

export default (props) => {

    const [tableCard, setTableCard] = useState();
    const [selected, setSelected] = useState();

    const onChange = (e) => {
        setSelected(e)
    }

    const ListCol = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Module Name',
            dataIndex: 'module_name',
            key: 'module_name',
            elipsis: true
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            render: text => {
                let clname = '';
                if (text.includes('A')) {
                    clname= 'c-success';
                } else if (text.includes('B')) {
                    clname= 'c-primary';
                } else if (text.includes('C')) {
                    clname= 'c-pending';
                } else {
                    clname= 'c-error';
                }
                return <span className={`SentanceCase ${clname}`}>{text}</span>
            },
        },
        {
            title: 'Credits',
            dataIndex: 'credits',
            key: 'credits',
            render: (text) => (text).toFixed(1)
        },
        {
            title: 'Attempt',
            dataIndex: 'attempt',
            key: 'attempt',
            render: (text) => (text).toFixed(1)
        },
        {
            title: 'Earned',
            dataIndex: 'earned',
            key: 'earned',
            render: (text) => (text).toFixed(1)
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
            render: (text) => (text).toFixed(2)
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => <span className='c-default'>{(record.points * record.attempt).toFixed(2)}</span>
        },
    ]

    const ListData = [
        {
            code: 'UCC1113',
            module_name: 'Co Curriculum 1 Performance',
            type: 'Comp',
            grade: 'A',
            credits: 3,
            attempt: 0,
            earned: 0,
            points: 4,
        },
        {
            code: 'BA11552',
            module_name: 'Environmental Pscychology',
            type: 'Comp',
            grade: 'B+',
            credits: 2,
            attempt: 2,
            earned: 2,
            points: 3.33,
        },

    ]


    return (
        <Row gutter={[20, 30]}>
            <Col flex={'auto'}>
                <Title level={4} className='mb-0 c-default'>Transcript</Title>
            </Col>
            <Col>
                <Button type='primary' htmlType='button' className='green-btn'>Download PDF</Button>
            </Col>

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
            <Col span={24}>
                <Space size={30}>
                    <Space size={0} direction='vertical'>
                        <Text className='c-gray'>GPA</Text>
                        <Title level={3} className='mb-0'>2.77</Title>
                    </Space>
                    <Space size={0} direction='vertical'>
                        <Text className='c-gray'>CGPA</Text>
                        <Title level={3} className='mb-0'>2.97</Title>
                    </Space>
                </Space>
            </Col>
            <Col span={24}>
                <Table className="custom-table table-header-highlight" bordered={false} columns={ListCol} dataSource={ListData} pagination={false}
                summary={pageData => {
                    let totalRow = 0;
                    let totalcredit = 0;
                    let totalattempt = 0;
                    let totalearned = 0;
                    let totalpoints = 0;
            
                    pageData.forEach(({ total, credits, attempt, earned, points }) => {
                        totalcredit += credits;
                        totalattempt += attempt;
                        totalearned += earned;
                        totalpoints += points;
                        totalRow += points*attempt;
                    });
            
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={2} className='thick-border-bottom highlight-border'>Total</Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={2} className='thick-border-bottom'></Table.Summary.Cell>
                          <Table.Summary.Cell className='thick-border-bottom'>
                            <Text className='c-white'>{totalcredit.toFixed(1)}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell className='thick-border-bottom'>
                            <Text className='c-white'>{totalattempt.toFixed(1)}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell className='thick-border-bottom'>
                            <Text className='c-white'>{totalearned.toFixed(1)}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell className='thick-border-bottom'></Table.Summary.Cell>
                          <Table.Summary.Cell className='thick-border-bottom'>
                            <Text className='c-white'>{totalRow.toFixed(2)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
            </Col>
        </Row>
    )
}