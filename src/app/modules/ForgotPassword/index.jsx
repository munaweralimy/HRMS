import React, { useState } from 'react';
import { Row, Col, Typography, Form, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { InputField } from '../../atoms/FormElement';
import { useTranslate } from 'Translate';

const { Title } = Typography;

export default (props) => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, errors, setValue } = useForm();

  const i18n = useTranslate();
  const { t } = i18n;

  const onFinish = (values) => {
    // setLoading(true);
    console.log('values', values)
  };
  return (
        <Row gutter={[30, 24]}>
          <Col span={24}>
            <Title level={3} className="text-center mb-0">{t('Forget.title')}</Title>
          </Col>
          <Col span={24}>
      <Form name="normal_forget" onFinish={handleSubmit(onFinish)}>
            <InputField
              fieldname="email"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
                placeholder: t('Forget.email'),
              }}
              rules={{
                required: 'Please input email',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Input email without space!',
                },
              }}
              validate={errors.email && 'error'}
              validMessage={errors.email && errors.email.message}
            />
            <Button type="primary" htmlType="submit" className="w-100" size="large">
              {t('Forget.button')}
            </Button>
      </Form>
          </Col>
          <Col span={24} className="text-center">
            <Link to="/login">
              {t('Forget.back')}
            </Link>
            </Col>
        </Row>
  );
};
