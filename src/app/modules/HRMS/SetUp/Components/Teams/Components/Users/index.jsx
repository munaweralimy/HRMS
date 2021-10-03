import React from 'react';
import { Row, Col, Typography, Form, Button } from 'antd';
import { SelectField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
const Users = (props) => {
  const { title, addNewUser, onClose } = props;
  const { Title } = Typography;
  const { control, handleSubmit } = useForm();
  const employeeList = useSelector((state) => state.setup.employeeList);
  const onFinish = (values) => {
    addNewUser(values);
    onClose();
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
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
          <SelectField
            label="Select Employee"
            fieldname="employee"
            class="mb-0 w-100"
            control={control}
            iProps={{ placeholder: 'Select one' }}
            selectOption={employeeList.map((value) => ({ label: value.employee_name, value: value.name }))}
          />
        </Col>
        <Col span={24}>
          <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Users;
