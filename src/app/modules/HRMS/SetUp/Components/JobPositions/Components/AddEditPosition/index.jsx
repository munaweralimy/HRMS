import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import { uniquiFileName, getSingleUpload } from '../../../../../../../../features/utility';

export default (props) => {
  const { title, onClose, onUpdate } = props;
  const { control, errors, setValue, handleSubmit } = useForm();
  const { Title, Text } = Typography;

  const onFinish = async (val) => {};

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Space direction="vertical" size={20} className="w-100 text-center">
            <Title level={3} className="mb-0">
              {title}
            </Title>
            <Text>Please specify the details</Text>
          </Space>
        </Col>

        <Col span={24}>
          <Row gutter={[20, 30]}>
            {formFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            <Col span={12}>
              <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                Close
              </Button>
            </Col>
            <Col span={12}>
              <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                Save
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
