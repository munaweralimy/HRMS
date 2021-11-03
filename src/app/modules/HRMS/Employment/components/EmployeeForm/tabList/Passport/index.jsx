import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { employApi } from '../../../../ducks/services';
import MainForm from './MainForm';

export default (props) => {

  const { mode, data, updateApi, id, setLoad, controlOut, errorsOut } = props;
  const { control: controlIn, errors: errorsIn, setValue: setValueIn, handleSubmit: handleSubmitIn } = useForm();

  useEffect(() => {
    if(mode ==  'edit' && data && Object.keys(data).length > 0) {
      setValueIn('passport_number', data?.passport_number);
      setValueIn('passport_status', {label: data?.passport_status, value: data?.passport_status});
      setValueIn('date_of_issue', data?.date_of_issue ? moment(data?.date_of_issue, 'YYYY MM DD') : '');
      setValueIn('valid_upto', data?.valid_upto ? moment(data?.valid_upto, 'YYYY MM DD') : '');
      setValueIn('employment_pass_no', data.employment_pass_no);
      setValueIn('emp_pass_expiration_date', data?.emp_pass_expiration_date ? moment(data?.emp_pass_expiration_date, 'YYYY MM DD') : '');
    }
  }, [data]);

  const onFinish = (val) => {
    setLoad(true);
    const body = {
        passport_number: val.passport_number,
        passport_status: val.passport_status.value,
        date_of_issue: val.date_of_issue,
        valid_upto: val.valid_upto,
        employment_pass_no: val.employment_pass_no,
        emp_pass_expiration_date: val.emp_pass_expiration_date != 'Invalid date' ? val.emp_pass_expiration_date : ''
    }

    employApi(body, id).then(res => {
      setLoad(false);
      updateApi();
      message.success('Medical Record Successfully Saved')
    }).catch(e => {
      console.log(e);
      setLoad(false);
      message.error(e);
    });
  }

  return (
    <>
    {mode == 'edit' ?
    <Form layout='vertical' onFinish={handleSubmitIn(onFinish)} scrollToFirstError>
      <MainForm control={controlIn} errors={errorsIn} mode={mode}  />
    </Form>
    : 
    <MainForm control={controlOut} errors={errorsOut} mode={mode}  />}
    </>
  );
};