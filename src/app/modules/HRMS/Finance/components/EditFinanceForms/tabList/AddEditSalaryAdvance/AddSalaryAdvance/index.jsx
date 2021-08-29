import React from 'react';
import { Row, Col, Typography, Form, Button } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../../../../molecules/FormGroup';
import { addSalaryAdvance } from './FomFields';

const AddSalaryAdvance = () => {
  const { control, errors, handleSubmit } = useForm();
  const { Title } = Typography;
  return (
    <Form layout="vertical" scrollToFirstError={true}>
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
