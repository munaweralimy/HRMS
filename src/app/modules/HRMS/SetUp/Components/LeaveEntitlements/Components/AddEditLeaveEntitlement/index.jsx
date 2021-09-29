import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { leaveEntitlementLeaves } from './FormFields';
import {
  addSingleLeaveEntitlement,
  updateSingleLeaveEntitlement,
  deleteSingleLeaveEntitlement,
} from '../../../../ducks/services';
import moment from 'moment';
export default (props) => {
  const { title, onClose, leaveEtitlement } = props;
  const { Title, Text } = Typography;
  const { control, errors, reset, setValue, handleSubmit } = useForm();

  const onFinish = (values) => {
    console.log({ values });
    const payload = {
      leave_entitlement_name: values.leave_entitlement_name,
      leave_type: values.leave_type.value,
      entitlement: values.entitlement.value,
      min_years: values.min_years.value,
      is_limit: values.is_limit[0],
      overdraft: values.overdraft[0],
      apply_before_current_date: values.apply_before_current_date[0],
      carries_forward: values.carries_forward[0],
      is_prorate: values.is_prorate[0],
      carry_forward_days: 60,
    };
    leaveEtitlement.leave_entitlement_name.length == 0
      ? addSingleLeaveEntitlement(payload)
          .then((response) => {
            message.success('Leave Entitlement Added Successfully');
            onClose();
          })
          .catch((error) => message.error('Leave Entitlemen exists'))
      : updateSingleLeaveEntitlement(leaveEtitlement.name, payload)
          .then((response) => {
            message.success('Leave Etitlement Updated Successfully');
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteHoliday = () => {
    deleteSingleLeaveEntitlement(leaveEtitlement.name)
      .then((response) => {
        message.success('Leave Etitlement Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Leave Etitlement Deleted Unsccessfully');
        onClose();
      });
  };

  useEffect(() => {
    if (leaveEtitlement.leave_entitlement_name.length > 0) {
      setValue('leave_entitlement_name', leaveEtitlement.leave_entitlement_name);
      setValue('leave_type', { label: leaveEtitlement.leave_type, value: leaveEtitlement.leave_type });
      setValue('entitlement', { label: leaveEtitlement.entitlement, value: leaveEtitlement.entitlement });
      setValue('min_years', { label: leaveEtitlement.min_years, value: leaveEtitlement.min_years });
      setValue('is_limit', leaveEtitlement.is_limit == 'Yes' ? [1] : [0]);
      setValue('overdraft', leaveEtitlement.overdraft == 'Yes' ? [1] : [0]);
      setValue('apply_before_current_date', leaveEtitlement.apply_before_current_date == 'Yes' ? [1] : [0]);
      setValue('carries_forward', leaveEtitlement.carries_forward == 'Yes' ? [1] : [0]);
      setValue('is_prorate', leaveEtitlement.is_prorate == 'Yes' ? [1] : [0]);
      //   setValue('carry_forward_days', leaveEtitlement.carry_forward_days);
    } else {
      reset();
    }
  }, [leaveEtitlement]);

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={24} justify="center">
            <Col>
              <Title level={3} className="mb-0">
                {title}
              </Title>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row gutter={[24, 30]}>
            {leaveEntitlementLeaves().map((item, idx) => (
              <Fragment key={idx}>
                {item.subheading && (
                  <Col span={24}>
                    <Title className="mb-0" level={4}>
                      {item.subheading}
                    </Title>
                  </Col>
                )}
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            <Col span={24}>
              <Row gutter={24} justify="end">
                {leaveEtitlement.leave_entitlement_name.length == 0 ? (
                  <>
                    <Col span={6}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className="black-btn w-100"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                        Add
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col span={6}>
                      <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteHoliday}>
                        Delete
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                        Save
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
