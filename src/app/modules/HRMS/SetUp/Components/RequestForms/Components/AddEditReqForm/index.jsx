import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Form, Spin, message } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { SelectField, InputField } from '../../../../../../../atoms/FormElement';
import ApprovalFields from './ApprovalFields';
import { addRequest } from '../../../../ducks/services';
import { LoadingOutlined } from "@ant-design/icons";

const initQ = {
  approvers: '',
  approvers_detail: '',
};

const initF = {
  field_name: '',
};

const categoryList = [
  { label: 'Carry Forward Leave Extension', value: 'Carry Forward Leave Extension' },
  { label: 'Email Activation', value: 'Email Activation' },
  { label: 'Card Activation', value: 'Card Activation' },
  { label: 'Warning Letter Approval', value: 'Warning Letter Approval' },
  { label: 'Show Cause Letter', value: 'Show Cause Letter' },
]


const { Title, Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const { title, onClose, onUpdate, data } = props;
  const { control, errors, reset, setValue, handleSubmit } = useForm();
  const [ load, setLoad ] = useState(false);

  const { fields: fields1, append: append1, remove: remove1 } = useFieldArray({
    control,
    name: 'approvers_fields',
  });

  const { fields: fields2, append: append2, remove: remove2 } = useFieldArray({
    control,
    name: 'form_fields',
  });
  
  useEffect(() => {
    if (data) {
      console.log('data', data)
      setValue('form_name', data.form_name);
      setValue('sender', {label: data.sender, value: data.sender});
      setValue('category', data?.category ? {label: data.category, value: data.category } : '');
      setValue('approvers_fields', approvers);
      setValue('form_fields', form_fields);
    } else {
      append1(initQ);
    }
  }, []);
  
  const onFinish = (val) => {
    let approver = [];
    val.approvers_fields.map(x => {
      approver.push({
        approvers: x.approvers.label,
        approvers_detail: x.approvers_detail?.label ? x.approvers_detail.label : '' 
      })
    })

    const body = {
      form_name: val.form_name,
      sender:val.sender.label,
      status: "Active",
      category: val?.category?.label ? val?.category?.label : '',
      approvers: approver,
      form_fields: []
    }

    addRequest(body).then(res => {
      message.success('Request Successfully Added');
      setLoad(false);
      reset();
      onUpdate();
    }).catch(e => {
      message.error('Request Successfully Added');
      console.log(e);
    })
  };

  const fieldList = []

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}><Title level={3} className='mb-0 text-center'>{title}</Title></Col>
        <Col span={24}>
          <InputField
            required={true}
            fieldname={'form_name'}
            label={'Type Form Name'}
            control={control}
            class={`mb-0`}
            iProps={{ placeholder: 'Please state', size: 'large' }}
            initValue={''}
            rules={{
              required: 'Required',
            }}
            validate={errors.form_name && 'error'}
            validMessage={errors.form_name && errors.form_name.message}
          />
        </Col>
        <Col span={24}>
          <SelectField
            required={true}
            fieldname={'sender'}
            label={'Sender'}
            control={control}
            class={`mb-0`}
            iProps={{ placeholder: 'Please select' }}
            initValue={''}
            selectOption={[
              { label: 'Staff', value: 'Staff' },
              { label: 'HR Admin', value: 'HR Admin' },
              { label: 'IT Technician', value: 'IT Technician' },
              { label: 'Supervisor', value: 'Supervisor' },
            ]}
            rules={{ required: 'Required' }}
            validate={errors.sender && 'error'}
            validMessage={errors.sender && errors.sender.message}
          />
        </Col>
        <Col span={24}>
          <SelectField
            fieldname={'category'}
            label={'Category'}
            control={control}
            class={`mb-0`}
            iProps={{ placeholder: 'Please select' }}
            initValue={''}
            selectOption={categoryList}
            />
        </Col>
        {fields1.map((item, index) => (
          <Fragment key={item.id}>
            <Col span={24}>
                <ApprovalFields item={item} index={index} control={control} errors={errors} />
            </Col>
            
          </Fragment>
        ))}
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append1(initQ)}>
              + Add Approver
          </Button>
        </Col>
        {fields2.map((item, index) => (
          <Fragment key={item.id}>
          <Col span={24}>
              <SelectField
                fieldname={`form_fields[${index}].field_name`}
                label={''}
                control={control}
                class={`mb-0`}
                iProps={{ placeholder: 'Please select' }}
                initValue={item?.field_name ? { label: item?.field_name, value: item?.field_name } : ''}
                selectOption={fieldList}
              />
          </Col>
          </Fragment>
        ))}
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append2(initF)}>
              + Add Field
          </Button>
        </Col>
        <Col span={12}><Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>Close</Button></Col>
        <Col span={12}><Button size="large" type="primary" htmlType="submit" className="green-btn w-100">Save</Button></Col>
      </Row>

    </Form>
    </Spin>
  );
};
