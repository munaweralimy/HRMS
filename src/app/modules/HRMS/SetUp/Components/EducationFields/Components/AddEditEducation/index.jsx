import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { educationFields } from './FormFields';
import { addEducationField, getSingleEducation, updateSingleEducation } from '../../../../ducks/services';

export default (props) => {
  const { title, onClose, onUpdate, educationField } = props;
  const { Title, Text } = Typography;
  const [fieldData, setFieldData] = useState('');
  const { control, errors, reset, setValue, handleSubmit } = useForm();

  const onFinish = (values) => {
    educationField.length == 0
      ? addEducationField(values).then((response) => {
          message.success('Education Field Added Successfully');
          onClose();
        })
      : updateSingleEducation(educationField, values).then((response) => {
          message.success('Education Field Updated Successfully');
          onClose();
        });
  };

  useEffect(() => {
    if (educationField.length > 0) {
      setValue('education_field', educationField);
    } else {
      reset();
    }
  }, [educationField]);

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            {educationFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            <Col span={12}>
              <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                Close
              </Button>
            </Col>
            <Col span={12}>
              <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
