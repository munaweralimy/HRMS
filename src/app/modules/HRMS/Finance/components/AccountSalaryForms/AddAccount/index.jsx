import React from 'react';
import { Row, Col, Typography, Form, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { addAccount } from './FormFileds';
import FormGroup from '../../../../../../molecules/FormGroup';
const AddAccount = () => {
  const { Title } = Typography;
  const { control, errors, handleSubmit } = useForm();
  return (
    <Form layout="vertical" scrollToFirstError={true}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Account Details
          </Title>
        </Col>
        {addAccount.map((value, key) => (
          <FormGroup key={key} item={value} control={control} errors={errors} />
        ))}
        <Col span={24}>
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="red-btn">
                Delete Account
              </Button>
            </Col>
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AddAccount;
