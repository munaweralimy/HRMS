import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Spin, Form, Typography, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { InputPassword } from '../../../../atoms/FormElement';
import { LoadingOutlined } from '@ant-design/icons';
import { changePassword } from '../../../../../services/dashboard';
const antIcon = <LoadingOutlined spin />;
const emailID = JSON.parse(localStorage.getItem('userdetails')).name;

const ForgetPassword = (props) => {
  const { title, onClose, lateData } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit, watch, reset } = useForm();

  let new_password = watch('new');
  let confirm_password = watch('confirm');

  const onSubmitHandler = (values) => {
    const payload = {
      username: emailID,
      old: values?.current,
      new: values?.new,
    };
    changePassword(payload)
      .then((response) => {
        if (response?.data?.message?.success === true) {
          message.success(response?.data?.message.message);
          reset();
          onClose();
        } else {
          message.error(response?.data?.message.message);
        }
      })
      .catch((e) => {
        message.error('something went wrong');
        onClose();
      });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[20, 20]} justify="center">
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <InputPassword
              fieldname="current"
              label="Current Password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
              }}
              rules={{
                required: 'Please enter password',
              }}
              validate={errors.current && 'error'}
              validMessage={errors.current && errors.current.message}
            />
          </Col>
          <Col span={24}>
            <InputPassword
              fieldname="new"
              label="New Password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
              }}
              rules={{
                required: 'Please enter password',
              }}
              validate={errors.new && 'error'}
              validMessage={errors.new && errors.new.message}
            />
          </Col>
          <Col span={24}>
            <InputPassword
              fieldname="confirm"
              label="Re-type Password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
              }}
              rules={{
                required: 'Please enter password',
              }}
              validate={confirm_password != new_password ? 'error' : ''}
              validMessage={confirm_password != new_password ? <p>Password does not match</p> : <></>}
            />
          </Col>
          <Col span={24}>
            <Row gutter={24} align="middle">
              <Col span={12}>
                <Button type="primary" size="large" className="w-100 black-btn" htmlType="button" onClick={onClose}>
                  Close
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  disabled={new_password != confirm_password}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-100 green-btn"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default ForgetPassword;
