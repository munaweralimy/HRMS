import React from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField, DateField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (val) => {
    props.onSearch(val);
  };

  return (
    <Space size={15} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Search Criteria:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <SelectField
          fieldname="leave_type"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Leave Type' }}
          selectOption={[{ label: 'All Courses', value: 1 }]}
        />
        <SelectField
          fieldname="leave_entitlement_name"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Entitlement Name' }}
          selectOption={[{ label: 'All Courses', value: 1 }]}
        />
        <SelectField
          fieldname="entitlement_days"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Entilement Days' }}
          selectOption={[{ label: 'All Courses', value: 1 }]}
        />
        <SelectField
          fieldname="min_years"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Minimum Year' }}
          selectOption={[{ label: 'All Courses', value: 1 }]}
        />
        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
