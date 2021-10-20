import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, Radio, message, Spin } from 'antd';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { leaveFields } from './FormFields';
import { InputRadio } from '../../../../../../../atoms/FormElement';
import { createLeave, updateSingleLeave, deleteSingleLeave } from '../../../../ducks/services';
import { getSingleLeave, leaveTypeSelect } from '../../../../ducks/actions';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { SelectField } from '../../../../../../../atoms/FormElement';
import Select from 'react-select';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const ConditionalInput = (props) => {
  const { control, index, field } = props;
  console.log({ field });
  const approverList = useSelector((state) => state.setup.allApprovers);
  const fieldVales = useWatch({
    name: 'approvers',
    control,
  });
  console.log({ fieldVales });
  return (
    <Col span={24}>
      <Controller
        name={`approvers.${index}.approver`}
        control={control}
        defaultValue={
          props.field.approver
            ? {
                label: props.field.approver.value,
                value: props.field.approver.value,
                id: props.field.approver.approver_id,
              }
            : ''
        }
        render={({ onBlur, onChange, value }) => {
          if (fieldVales?.[index]?.approver_level.value === 'Individual') {
            return (
              <Select
                value={value}
                className="customSelect"
                styles={{
                  control: (val) => ({ ...val, minHeight: 32 }),
                  valueContainer: (vcontain) => ({
                    ...vcontain,
                    padding: '5px 15px',
                    textTransform: 'capitalize',
                  }),
                  dropdownIndicator: (icontain) => ({ ...icontain, padding: 5 }),
                  indicatorSeparator: (icontain) => ({
                    ...icontain,
                    backgroundColor: '#000',
                  }),
                  option: (vcontain, state) => ({
                    ...vcontain,
                    textTransform: 'capitalize',
                    color: '#BEBEBE',
                    backgroundColor: state.isFocused ? '#0077B6' : '#171717',
                  }),
                }}
                onChange={(e) => {
                  onChange(e);
                }}
                options={approverList.map((value) => ({
                  label: value.approver_name,
                  value: value.approver_name,
                  id: value.approver_id,
                }))}
                {...props.field}
              />
            );
          } else {
            return <></>;
          }
        }}
      />
    </Col>
  );
};

export default (props) => {
  const { title, onClose, onUpdate, leaveType } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, reset, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const singleLeaveValues = useSelector((state) => state.setup.singleLeave);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'approvers',
  });

  const value = useWatch({
    name: 'approvers',
    control,
  });
  const initQ = {
    approver_level: '',
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
      setLoad(true);
      setValue('leave_type', { label: singleLeaveValues?.leave_type, value: singleLeaveValues?.leave_type });
      setValue('contract_type', { label: singleLeaveValues?.contract_type, value: singleLeaveValues?.contract_type });
      setValue('gender', { label: singleLeaveValues?.gender, value: singleLeaveValues?.gender });
      setValue('marital_status', {
        label: singleLeaveValues?.marital_status,
        value: singleLeaveValues?.marital_status,
      });
      setValue('add_leave_statistics', singleLeaveValues?.add_leave_statistics);

      let approvers = singleLeaveValues?.approvers.map((value) =>
        value.approver_level === 'Individual'
          ? {
              approver_level: 'Individual',
              approver: { label: value.approver, value: value.approver, approver_id: value.approver_id },
            }
          : { approver_level: value.approver_level },
      );
      setValue('approvers', approvers);
      setLoad(false);
    } else {
      reset();
    }
  }, [singleLeaveValues]);

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      leave_type: values?.leave_type.value,
      contract_type: values?.contract_type.label,
      company: 'Limkokwing University Creative Technology',
      gender: values?.gender.label,
      marital_status: values?.marital_status.label,
      add_leave_statistics: values?.add_leave_statistics,
      doctype: 'HRMS Leave Type',
      approvers: values?.approvers.map((value) =>
        value.approver_level.label === 'Individual'
          ? {
              approver_level: value.approver_level.value,
              approver: value.approver.value,
              approver_id: value.approver.id,
              doctype: 'HRMS Leave Type Approvers',
            }
          : { approver_level: value.approver_level.value, doctype: 'HRMS Leave Type Approvers' },
      ),
    };
    leaveType.leave_type.length == 0
      ? createLeave(payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        })
      : updateSingleLeave(leaveType.name, payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        });
  };
  const onDeleteEducationField = () => {
    setLoad(true);
    deleteSingleLeave(leaveType.name).then((response) => {
      if (response.data.message.success == true) {
        message.success(response.data.message.message);
      } else {
        message.error(response.data.message.message);
      }
      setLoad(false);
      onClose();
    });
  };

  const onRemoveSelect = (index) => {
    console.log({ index });
    // if (value[index].approver_level.value == 'Individual') {
    //   dispatch(leaveTypeSelect(false));
    // }
    remove(index);
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3}>{title}</Title>
              </Col>
            </Row>
          </Col>
          {leaveFields().map((item, idx) => (
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
                    {fields.map((elem, index) => {
                      console.log({ elem });
                      return (
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
                                        onClick={() => onRemoveSelect(index)}
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
                              <ConditionalInput control={control} errors={errors} index={index} field={elem} />
                            </Fragment>
                          ))}
                        </Row>
                      );
                    })}

                    <Button
                      htmlType="button"
                      type="dashed"
                      size="large"
                      className="w-100"
                      onClick={() => append(initQ)}
                    >
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
                  initValue={'No'}
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
    </Spin>
  );
};
