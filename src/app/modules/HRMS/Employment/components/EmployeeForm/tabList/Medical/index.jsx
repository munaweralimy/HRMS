import React, { Fragment } from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { insuranceDetails, medicalRecord } from './MedicalFields';
const Medical = (props) => {
  const { control, errors } = props;
  const { Title } = Typography;
  return (
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0">
          Insurance Details
        </Title>
      </Col>
      {insuranceDetails.map((item, index) => (
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
        <Title level={4} className="mb-0">
          Medical Record
        </Title>
      </Col>
      {medicalRecord.map((item, index) => (
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
    </Row>
  );
};

export default Medical;
