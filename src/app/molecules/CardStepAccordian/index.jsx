import React, { Fragment } from 'react';
import { Row, Col, Collapse, Space, Typography } from 'antd';
import StatusCard from '../../atoms/StatusCard';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default (props) => {

    const { data, page } = props;

    return (
        <Collapse bordered={false} accordion defaultActiveKey={["0"]} className='app-collapse' expandIconPosition='right'>
            {data.map((item, index) => (
                <Panel key={index} header={
                    <Space direction='vertical' size={0}>
                        <Title level={5} className='mb-0 c-gray'>Step {index + 1}</Title>
                        <Title level={4} className='mb-0 c-default'>{item.title}</Title>
                    </Space>
                }>
                    <Row gutter={[20, 20]}>
                        {item.cards.map((ids, idx) => (
                            <Fragment key={idx}>
                                <Col flex={page ? '1 0 200px' : '1 0 280px'}>
                                    <StatusCard 
                                        title={ids.title} 
                                        text={ids.text} 
                                        status={ids.status}
                                        date={ids.date}
                                        page={page}
                                    />
                                </Col>
                            </Fragment>
                        ))}
                    </Row>
                </Panel>
            ))}
            
                
        </Collapse>
    )
}