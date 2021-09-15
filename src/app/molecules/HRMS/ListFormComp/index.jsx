import React, { Fragment, useEffect } from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';
import FormGroup from '../../FormGroup';
import { LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default (props) => {

    const { control, errors, title, fieldsList, record, backbtnTitle, extrabtn, setValue, btnMain, onBack } = props;

    useEffect(() => {
        if(record) {
            record.map(x => {
                setValue(x.field, x.value)
            })
        } 
    }, [record]);

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <Space direction='vertical' size={20}>
                    <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={onBack} htmlType="button"><LeftOutlined />{backbtnTitle}</Button>
                    {title && <Title level={4} className='c-default mb-0'>{title}</Title>}
                </Space>
            </Col>
            {fieldsList.map((item, index) => (
            <Fragment key={index}>
                {item?.subheader && (
                <Col span={24}>
                    <Title level={5} className="mb-0 c-default">
                    {item.subheader}
                    </Title>
                </Col>
                )}
                <FormGroup item={item} control={control} errors={errors} />
            </Fragment>
            ))}
            <Col span={24}>
            <Row gutter={20} justify='end'>
                {extrabtn && record != null && <Col><Button type='primary' htmlType='button' size='large' className={extrabtn?.class ? extrabtn?.class: ''} onClick={extrabtn?.onAction}>{extrabtn?.title}</Button></Col>}
                <Col><Button type='primary' htmlType='submit' size='large' className={btnMain?.class ? btnMain.class : 'green-btn'}>{btnMain?.title ? btnMain.title : 'Save Changes'}</Button></Col>
            </Row>
            </Col>
        </Row>
    )
}