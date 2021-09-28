import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, Radio, message } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { leaveFields } from './FormFields';
import { InputRadio } from '../../../../../../../atoms/FormElement';
import { createLeave, updateSingleLeave, deleteSingleLeave } from '../../../../ducks/services';
import { getSingleLeave } from '../../../../ducks/actions';
import FormGroup from '../../../../../../../molecules/FormGroup';

export default (props) => {
  const { title, onClose, onUpdate, leaveType } = props;
  const { Title, Text } = Typography;
  const { control, errors, reset, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const singleLeaveValues = useSelector((state) => state.setup.singleLeave);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'approvers',
  });

  const initQ = {
    approver_select: '',
  };

  useEffect(() => {
    if (leaveType.name.length > 0) {
      dispatch(getSingleLeave(leaveType.name));
    } else {
      reset();
    }
  }, [leaveType]);

  useEffect(() => {
    if (Object.entries(singleLeaveValues).length > 0) {
      setValue('leave_type', singleLeaveValues?.leave_type);
      setValue('contract_type', { label: singleLeaveValues?.contract_type, value: singleLeaveValues?.contract_type });
      setValue('gender', { label: singleLeaveValues?.gender, value: singleLeaveValues?.gender });
      setValue('marital_status', {
        label: singleLeaveValues?.marital_status,
        value: singleLeaveValues?.marital_status,
      });
      setValue('add_leave_statistics', singleLeaveValues?.add_leave_statistics);
      setValue(
        'approvers',
        singleLeaveValues?.approvers.map((value) => ({ label: value.approver, value: value.approver })),
      );
    } else {
      reset();
    }
  }, [singleLeaveValues]);

  const onFinish = (values) => {
    const payload = {
      leave_type: values?.leave_type,
      contract_type: values?.contract_type.label,
      gender: values?.gender.label,
      marital_status: values?.marital_status.label,
      add_leave_statistics: values?.add_leave_statistics,
      doctype: 'HRMS Leave Type',
      approvers: values?.approvers.map((value) => ({
        approver: value.approver_select.label,
        approver_id: value.approver_select.id,
        doctype: 'HRMS Leave Type Approvers',
      })),
    };

    leaveType.leave_type.length == 0
      ? createLeave(payload)
          .then((response) => {
            message.success('Leave created successfully');
            onClose();
          })
          .catch((error) => message.error('Leave type alrady exists'))
      : updateSingleLeave(leaveType, payload)
          .then((response) => {
            message.success('Leave update successfully');
            onClose();
          })
          .catch((error) => message.error('Leave type already exisits'));
  };
  const onDeleteEducationField = () => {
    deleteSingleLeave(leaveType.name)
      .then((response) => {
        message.success('Leave Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Leave Deleted Unsccessfully');
        onClose();
      });
  };
  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={24} justify="center">
            <Col>
              <Title level={3}>{title}</Title>
            </Col>
          </Row>
        </Col>
        {leaveFields.map((item, idx) => (
          <Fragment key={idx}>
            {item.title && (
              <Col span={24}>
                <Title className="mb-0 " level={4}>
                  {item.title}
                </Title>
              </Col>
            )}
            {item.type == 'array' ? (
              <Col span={24}>
                <Space size={15} direction="vertical" className="w-100">
                  {fields.map((elem, index) => (
                    <Row gutter={[24, 8]}>
                      {item.child.map((x, i) => (
                        <Fragment key={i}>
                          {x?.subheader && (
                            <Col span={24}>
                              <Row gutter={24} justify="space-between">
                                <Col>
                                  <Text className="mb-0 c-gray">{`${x.subheader} ${index + 1}`}</Text>
                                </Col>

                                <Col>
                                  <Button
                                    type="link"
                                    htmlType="button"
                                    className="p-0 h-auto c-gray-linkbtn"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          )}
                          <FormGroup
                            elem={elem}
                            index={index}
                            parent={item}
                            item={x}
                            control={control}
                            errors={errors}
                          />
                        </Fragment>
                      ))}
                    </Row>
                  ))}

                  <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append(initQ)}>
                    + Add approver level
                  </Button>
                </Space>
              </Col>
            ) : (
              <FormGroup item={item} control={control} errors={errors} />
            )}
          </Fragment>
        ))}
        <Col span={24}>
          <Row gutter={[24, 4]} justify="start">
            <Col span={24}>
              <Text className="mb-0 c-gray">Add Leave Statistics?</Text>
            </Col>
            <Col span={24}>
              <InputRadio
                fieldname="add_leave_statistics"
                control={control}
                errors={errors}
                options={
                  <Row gutter={24}>
                    <Col span={24}>
                      <Radio value="Yes">Yes</Radio>
                    </Col>
                    <Col span={24}>
                      <Radio value="No">No</Radio>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Col>

        {leaveType.leave_type.length == 0 ? (
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
              <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteEducationField}>
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
    </Form>
  );
};
