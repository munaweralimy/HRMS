import React, { Fragment } from 'react';
import { Form, Row, Col, Button, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { warningDetail } from './warningFields';
import FormGroup from '../../../../../../../molecules/FormGroup';
const WarningLetter = () => {
  const { Title } = Typography;
  const { control, errors, handleSubmit } = useForm();

  return (
    <Form layout="vertical" scrollToFirstError={true}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Warning Letter Details
          </Title>
        </Col>
        {warningDetail.map((item, index) => (
          <Fragment key={index}>
            {item?.subheader && (
              <Col span={24}>
                <Title level={5} className="mb-0 c-default">
                  {item.subheader}
                </Title>
              </Col>
            )}
            <FormGroup item={item} control={control} errors={errors} />
          </Fragment>
        ))}
        <Col span={24}>
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="w-100 red-btn">
                Proceed
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default WarningLetter;
