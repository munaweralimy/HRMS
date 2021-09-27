import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { approverFields } from './FormFields';

export default (props) => {
  const { title, onClose, approver } = props;
  const { Title, Text } = Typography;
  const { control, errors, setValue, handleSubmit } = useForm();

  const onFinish = (values) => {};

  const onDeleteNationality = () => {
    deleteSingleReligion(approver.name)
      .then((response) => {
        message.success('Country Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Country Deleted Unsccessfully');
        onClose();
      });
  };

  useEffect(() => {
    if (approver.approver.length > 0) {
      setValue('approver_name', approver.approver);
    } else {
      reset();
    }
  }, [approver]);
  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>

        <Col span={24}>
          <Row gutter={[20, 30]}>
            {approverFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            {approver.name.length == 0 ? (
              <>
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
              </>
            ) : (
              <>
                <Col span={12}>
                  <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                    Delete
                  </Button>
                </Col>
                <Col span={12}>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                    Save
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
