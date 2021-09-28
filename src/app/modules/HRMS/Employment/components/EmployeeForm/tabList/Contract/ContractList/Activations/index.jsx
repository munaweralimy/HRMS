import React from 'react';
import { Row, Col, Space, Card, Button, Typography } from 'antd';
import { PopupSuccess } from '../../../../../../../../../atoms/Popup';

const { Title, Text } = Typography;

const popup = {
    closable: false,
    className: 'black-modal',
    title: 'Email Activation Sent',
    content: '',
    width: 536,
};

const popup1 = {
    closable: false,
    className: 'black-modal',
    title: 'Card Activation Sent',
    content: '',
    width: 536,
};

export default (props) => {

    const { id, data } = props;

    const sendEmailRequest = () => {
        PopupSuccess(popup);
    }

    const sendCardRequest = () => {
        PopupSuccess(popup1);
    }

    return (
        <Row gutter={[20,30]}>
            <Col span={24}><Title level={4} className='mb-0 c-default'>Email & Card Activation</Title></Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]} align='middle'>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Email Activation</Title>
                                        <Text className='c-gray smallFont12'>Please ensure all of the fields are filled before sending request</Text>
                                    </Space>
                                </Col>
                                <Col><Button htmlType='button' type='primary' size='large' className='' onClick={sendEmailRequest}>Send Request</Button></Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]}>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Card Activation</Title>
                                        <Text className='c-gray smallFont12'>Please ensure all of the fields are filled before sending request</Text>
                                    </Space>
                                </Col>
                                <Col><Button htmlType='button' type='primary' size='large' className='' onClick={sendCardRequest}>Send Request</Button></Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}