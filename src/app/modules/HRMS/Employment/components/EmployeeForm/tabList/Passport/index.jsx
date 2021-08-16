import React, { Fragment } from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { passportInformation } from './PassportFields';

const Passport = (props) => {
  const { control, errors } = props;
  const { Title } = Typography;

  return (
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0">
          Passport Information
        </Title>
      </Col>
      {passportInformation.map((item, index) => (
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

export default Passport;
