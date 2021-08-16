import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import PersoanFoarm from '../../../EmployeeForm/tabList/Personal';
import { useForm } from 'react-hook-form';

const EditPersonal = () => {
  const { control, errors, handleSubmit } = useForm();

  return (
    <Form layout="vertical" scrollToFirstError={true}>
      <PersoanFoarm control={control} errors={errors} />
      <Row gutter={24} justify="end">
        <Col>
          <Button size="large" type="primary" htmlType="submit" className="green-btn save-btn">
            Save Changes
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EditPersonal;
