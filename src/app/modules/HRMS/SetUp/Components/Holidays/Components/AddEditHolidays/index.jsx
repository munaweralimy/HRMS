import React, { useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { holidayInputFields } from './FormFields';
import { addSingleHoliday, updateSingleHoliday, deleteSingleHoliday } from '../../../../ducks/services';
import moment from 'moment';

export default (props) => {
  const { title, onClose, holidayFields } = props;
  console.log({ holidayFields });
  const { Title, Text } = Typography;
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    console.log({ values });
    const payload = {
      holiday_name: values.holiday_name,
      company: 'Limkokwing University Creative Technology',
      holiday_date: moment(values.holiday_date).format('YYYY-MM-DD'),
      note: values.note,
    };
    holidayFields.holiday.length == 0
      ? addSingleHoliday(payload)
          .then((response) => {
            message.success('Holiday Added Successfully');
            onClose();
          })
          .catch((error) => message.error('Holiday exists'))
      : updateSingleHoliday(holidayFields.name, {
          holiday_name: values.holiday_name,
          holiday_date: moment(values.holiday_date).format('YYYY-MM-DD'),
        })
          .then((response) => {
            message.success('Holiday Updated Successfully');
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteHoliday = () => {
    deleteSingleHoliday(holidayFields.name)
      .then((response) => {
        message.success('Holiday Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Holiday Deleted Unsccessfully');
        onClose();
      });
  };

  useEffect(() => {
    if (holidayFields.holiday.length > 0) {
      setValue('holiday_name', holidayFields.holiday);
      console.log(holidayFields?.date);
      setValue('holiday_date', holidayFields?.date ? moment(holidayFields?.date, 'YYYY-MM-DD') : '');
      setValue('note', holidayFields.note);
    } else {
      reset();
    }
  }, [holidayFields]);

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            {holidayInputFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            {holidayFields.holiday.length == 0 ? (
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
                  <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteHoliday}>
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
        </Col>
      </Row>
    </Form>
  );
};
