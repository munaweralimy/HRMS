import React, { useEffect } from 'react';
import { Row, Col, Typography, Form, Button, InputNumber, message } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../molecules/FormGroup';
import { SliderFiled } from '../../../../../atoms/FormElement';
import { addSalaryAdvance } from './FomFields';
import { addNewSalaryAdvance, updateSalaryAdvance } from '../../ducks/services';
import moment from 'moment';

const AddSalaryAdvance = (props) => {
  const { id, data, onUpdateComplete } = props;
  const { control, errors, watch, setValue, handleSubmit } = useForm();
  const { Title } = Typography;
  const amount = watch('amount');

  useEffect(() => {
    if (data) {
      setValue('applied_date', data?.applied_date ? moment(data.applied_date, 'YYYY-MM-DD') : '');
      setValue('deduction_date', data?.deduction_date ? moment(data.deduction_date, 'YYYY-MM-DD') : '');
      setValue('description', data?.description);
      setValue('amount', data?.amount);
    }
  }, [data]);

  const onSubmitHandler = (values) => {
    const payload = {
      date_applied: moment(values?.date_applied).format('YYYY-MM-DD'),
      deduction_date: moment(values?.deduction_date).format('YYYY-MM-DD'),
      amount: values?.amount,
      description: values?.description,
    };
    data?.name
      ? updateSalaryAdvance(data.name, payload).then((response) => {
          message.success(`Advance Salary ${data.name} Updated Successfully`);
          onUpdateComplete();
        })
      : addNewSalaryAdvance({ employee_id: id, salary_advance: { ...payload, status: 'Active' } }).then((response) => {
          message.success(`Advance Salary Added Successfully`);
          onUpdateComplete();
        });
  };

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
            {data?.name ? (
              <>
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
              </>
            ) : (
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn">
                  Add Allowance
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AddSalaryAdvance;
