import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Form, Button, Popover, message } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField, InputPassword } from '../../atoms/FormElement';
import { authentications } from '../../../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/userSlice';
import { useTranslate } from 'Translate';

const { Title } = Typography;

export default (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm();

  const i18n = useTranslate();
  const { t } = i18n;

  
  const onFinish = (values) => {
    props.setLoading(true);
    authentications(values.username, values.password)
      .then((response) => {
        console.log('respon', response.data)
        let res = {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
        };

        if (res) {
          localStorage.setItem('userdetails', JSON.stringify(response.data.user_detail_role[0]));
          localStorage.setItem('access', JSON.stringify(response.data.user_screen_acces_role_list));
          localStorage.setItem('user', values.username);
          localStorage.setItem('token', JSON.stringify(res));
          dispatch(
            login({
              username: values.username,
            }),
          );
          setTimeout(() => {
            history.push('/dashboard');
          }, 1000);
        }
      })
      .catch((error) => {
        props.setLoading(false);
        message.error('Email or Password is incorrect');
        console.log({ error });
      });
  };
  return (
    
        <Row gutter={[30, 24]}>
          <Col span={24}>
          <Title level={3} className="text-center mb-0">{t('Login.title')}</Title>
          </Col>
          <Col span={24}>
      <Form name="normal_login" onFinish={handleSubmit(onFinish)}>
            <InputField
              fieldname="username"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
                placeholder: t('Login.username'),
              }}
              rules={{
                required: 'Please input username',
                pattern: {
                  value: /(?=^.{1,50}$)^\S*$/,
                  message: 'Input username without space!',
                },
              }}
              validate={errors.username && 'error'}
              validMessage={errors.username && errors.username.message}
            />
            <InputPassword
              fieldname="password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
                placeholder: t('Login.password'),
              }}
              rules={{
                // pattern: {
                //   value: /(?=^.{1,50}$)^\S*$/,
                //   message: 'Please enter correct password',
                // },
                required: 'Please enter password',
              }}
              validate={errors.password && 'error'}
              validMessage={errors.password && errors.password.message}
            />
            <Button type="primary" htmlType="submit" className="w-100" size="large">
              {t('Login.button')}
            </Button>
      </Form>
          </Col>
          <Col span={24} className="text-center">
            <Link to="/forgot-password" className="login-form-forgot">
              {t('Login.forget')}
            </Link>
            </Col>
        </Row>
  );
};
