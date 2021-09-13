import React from 'react';
import { Row, Col, Typography, Form, Button, InputNumber } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../molecules/FormGroup';
import { SliderFiled } from '../../../../../atoms/FormElement';
import { addSalaryAdvance } from './FomFields';

const AddSalaryAdvance = () => {
  const { control, errors, watch, handleSubmit } = useForm();
  const { Title } = Typography;

  const onSubmitHandler = (values) => {
    console.log({ values });
  };
  const amount = watch('amount');

  return (
    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Salary Advance Details
          </Title>
        </Col>
        {addSalaryAdvance.map((value, key) => (
          <FormGroup key={key} item={value} control={control} errors={errors} />
        ))}
        <Col span={24}>
          <Row gutter={24} align="middle">
            <Col span={20}>
              <SliderFiled
                fieldname="amount"
                label="Amount"
                control={control}
                errors={errors}
                initValue={''}
                iProps={{ min: 0, max: 5000, marks: { 0: 'RM 0', 5000: 'RM 5,000' } }}
              />
            </Col>
            <Col span={4}>
              <InputNumber value={amount} disabled={true} className="w-100" />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="red-btn">
                Delete Advance
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

export default AddSalaryAdvance;
