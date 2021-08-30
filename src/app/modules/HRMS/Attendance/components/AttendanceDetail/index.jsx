import React from 'react';
import { Typography, Row, Col, Form, Button } from 'antd';
import { DateField, InputField, SelectField, TextAreaField, TimeField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const AttendanceDetails = (props) => {
  const { Title } = Typography;
  const { control, errors } = useForm();
  return (
    <Form layout="vertical" scrollToFirstError={true}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Attendance Details
          </Title>
        </Col>
        <Col span={12}>
          <DateField
            fieldname="date_in"
            label="Date In"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            isRequired={true}
            validate={errors.date_in && 'error'}
            validMessage={errors.date_in && errors.date_in.message}
          />
        </Col>
        <Col span={12}>
          <DateField
            fieldname="date_out"
            label="Date Out"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            isRequired={true}
            validate={errors.date_out && 'error'}
            validMessage={errors.date_out && errors.date_out.message}
          />
        </Col>
        <Col span={12}>
          <InputField
            fieldname="total_hours"
            label="Total Hours"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            isRequired={true}
            validate={errors.total_hours && 'error'}
            validMessage={errors.total_hours && errors.total_hours.message}
          />
        </Col>
        <Col span={12}>
          <SelectField
            fieldname="date_out"
            label="Date Out"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            selectOption={[]}
            isRequired={true}
            validate={errors.date_out && 'error'}
            validMessage={errors.date_out && errors.date_out.message}
          />
        </Col>
        <Col span={12}>
          <TimeField
            fieldname="time_in"
            label="Time In"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'h:mm a' }}
            initValue=""
            isRequired={true}
            validate={errors.time_in && 'error'}
            validMessage={errors.time_in && errors.time_in.message}
          />
        </Col>
        <Col span={12}>
          <TimeField
            fieldname="time_out"
            label="Time Out"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'h:mm a' }}
            initValue=""
            isRequired={true}
            validate={errors.time_out && 'error'}
            validMessage={errors.time_out && errors.time_out.message}
          />
        </Col>
        <Col span={24}>
          <TextAreaField
            fieldname="remarks"
            label="Remarks"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large' }}
            initValue=""
            selectOption={[]}
            isRequired={true}
            validate={errors.remarks && 'error'}
            validMessage={errors.remarks && errors.remarks.message}
          />
        </Col>
        <Col span={24}>
          <Row gutter={24} justify="end">
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

export default AttendanceDetails;
