import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, InputNumber, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../molecules/FormGroup';
import { SliderFiled } from '../../../../../atoms/FormElement';
import { addSalaryAdvance } from './FomFields';
import { addNewSalaryAdvance, updateSalaryAdvance, deleteAdvanceSalary } from '../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

const antIcon = <LoadingOutlined spin />;

const AddSalaryAdvance = (props) => {
  const { id, data, onUpdateComplete } = props;
  const [load, setLoad] = useState(false);
  const { control, errors, watch, setValue, handleSubmit } = useForm();
  const { Title } = Typography;
  const amount = watch('amount');

  useEffect(() => {
    if (data) {
      setValue('date_applied', data?.date_applied ? moment(data.date_applied, 'YYYY-MM-DD') : '');
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
      status: 'Active',
    };
    setLoad(true);
    data?.name
      ? updateSalaryAdvance(data.name, payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onUpdateComplete();
        })
      : addNewSalaryAdvance({ employee_id: id, salary_advance: { ...payload } }).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onUpdateComplete();
        });
  };

  const onDeleteHandler = () => {
    setLoad(true);
    deleteAdvanceSalary(data.name, { status: 'Inactive' }).then((response) => {
      message.success(`Salary ${data.name} Deleted Seccussfully`);
      onUpdateComplete();
      setLoad(false);
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
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
                  rules={{
                    required: { value: true, message: 'Select Amount' },
                  }}
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
                {allowed([Roles.FINANCE], 'delete') && 
                  <Col>
                    <Button onClick={onDeleteHandler} size="large" type="primary" className="red-btn">
                      Delete Advance
                    </Button>
                  </Col>}
                  {allowed([Roles.FINANCE], 'write') && 
                  <Col>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn">
                      Save Changes
                    </Button>
                  </Col>}
                </>
              ) : (
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Add Advance
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddSalaryAdvance;
