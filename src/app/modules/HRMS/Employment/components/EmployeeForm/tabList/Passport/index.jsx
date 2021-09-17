import React, { Fragment, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { apiresource } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';

const { Title } = Typography;
const pStatus = [
  {label: 'Expiring', value: 'Expiring'},
  {label: 'Expired', value: 'Expired'},
  {label: 'Active', value: 'Active'},
]

export default (props) => {

  const { mode, data, updateApi, id, setLoad } = props;
  const { control, errors, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if(mode ==  'edit' && data && Object.keys(data).length > 0) {
      setValue('passport_number', data?.passport_number);
      setValue('passport_status', {label: data?.passport_status, value: data?.passport_status});
      setValue('date_of_issue', data?.date_of_issue ? moment(data?.date_of_issue, 'YYYY MM DD') : '');
      setValue('valid_upto', data?.valid_upto ? moment(data?.valid_upto, 'YYYY MM DD') : '');
      setValue('employment_pass_no', data.employment_pass_no);
      setValue('emp_pass_expiration_date', data?.emp_pass_expiration_date ? moment(data?.emp_pass_expiration_date, 'YYYY MM DD') : '');
    }
  }, [data]);

  const passportFields = [
    {
      type: 'input',
      label: 'Passport No.',
      name: 'passport_number',
      twocol: true,
      placeholder: 'Passport Number',
      req: true,
      reqmessage: 'Please enter passport no',
    },
    {
      type: 'select',
      label: 'Passport Status',
      name: 'passport_status',
      twocol: true,
      options: pStatus,
      req: true,
      reqmessage: 'Please enter passport status',
    },
    {
      type: 'date',
      label: 'Issued Date',
      name: 'date_of_issue',
      twocol: true,
      req: false,
      format: 'Do MMMM YYYY'
    },
    {
      type: 'date',
      label: 'Expiration Date',
      name: 'valid_upto',
      twocol: true,
      req: true,
      reqmessage: 'Please enter expiration date',
      format: 'Do MMMM YYYY'
    },
    {
      type: 'input',
      label: 'Employment Pass No.',
      name: 'employment_pass_no',
      placeholder: 'Pass Number',
      twocol: true,
      req: false
    },
    {
      type: 'date',
      label: 'Expiration Date',
      name: 'emp_pass_expiration_date',
      twocol: true,
      req: false,
      format: 'Do MMMM YYYY'
    },
  ];

  const onFinish = async (val) => {
    setLoad(true);
    const body = {
        passport_number: val.passport_number,
        passport_status: val.passport_status.value,
        date_of_issue: val.date_of_issue,
        valid_upto: val.valid_upto,
        employment_pass_no: val.employment_pass_no,
        emp_pass_expiration_date: val.emp_pass_expiration_date != 'Invalid date' ? val.emp_pass_expiration_date : ''
    }

    let url = `${apiresource}/Employee/${id}`;
    try {
      await axios.put(url, body);
      setLoad(false);
      if (mode == 'edit') {
        updateApi();
      } else {
        
      }
    } catch(e) {
      const {response} = e;
      console.log(response);
      message.error('Something went wrong');
    }
  }

  return (
    <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Title level={4} className="mb-0 c-default">Passport Information</Title>
        </Col>
        {passportFields.map((item, index) => (
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
          <Row gutter={20} justify='end'>
            <Col><Button type='primary' htmlType='submit' size='large' className='green-btn'>Save Changes</Button></Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};