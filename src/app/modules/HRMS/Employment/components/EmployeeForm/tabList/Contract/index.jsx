import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useFieldArray } from 'react-hook-form';
import FormGroup from '../../../../../../../molecules/FormGroup';
import {
  contractDetails,
  employmentDetails,
  workHours,
  workingDays,
  alternateSaturday,
} from '../FormFields/FormFields';

const Contract = (props) => {
  const { control, errors, t } = props;
  const { Title } = Typography;
  const mode = 'add';
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'program_requirements',
  });

  // const filedArrayList = () => {
  //   workingDays.map((value, key) => append(value));
  // };

  useEffect(() => {
    workingDays.map((value, key) => append(value));
  }, [workingDays]);

  const _ = require('lodash');
  return (
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0">
          Contract Details
        </Title>
      </Col>
      {contractDetails.map((item, index) => (
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
          Employment Details
        </Title>
      </Col>
      {employmentDetails.map((item, index) => (
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
          Work Hours
        </Title>
      </Col>
      {workHours.map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={24}>
              {fields.map((elem, index) => {
                return (
                  <Row gutter={[20, 20]}>
                    {item.child.map((x, i) => (
                      <Fragment key={i}>
                        <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                      </Fragment>
                    ))}
                  </Row>
                );
              })}
            </Col>
          ) : (
            ''
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      {alternateSaturday.map((item, index) => (
        <Fragment key={index}>
          {item?.subheader ? (
            <Col span={24}>
              <Row gutter={24} justify="space-between">
                <Col span={12}>
                  <Title level={4} className="mb-0">
                    {item.subheader}
                  </Title>
                </Col>
                <Col span={3} offset={4}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Col>
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
    </Row>
  );
};

export default Contract;
