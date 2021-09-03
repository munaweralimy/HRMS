import React, { useEffect } from 'react';
import { Typography, Row, Col, Form, Button, message } from 'antd';
import { DateField, InputField, SelectField, TextAreaField, TimeField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { updateAttendance } from '../../ducks/services';
import moment from 'moment';

const AttendanceDetails = (props) => {
  const { attendanceData, onViewForm } = props;
  const { Title } = Typography;
  const { control, errors, setValue, handleSubmit } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (attendanceData) {
      setValue(
        'attendance_date',
        attendanceData?.attendance_date ? moment(attendanceData?.attendance_date, 'YYYY-MM-DD') : '',
      );
      setValue(
        'Attendance_date_out',
        attendanceData?.Attendance_date_out ? moment(attendanceData?.Attendance_date_out, 'YYYY-MM-DD') : '',
      );
      setValue('total_job_hour', attendanceData?.total_job_hour);
      setValue('status', { value: attendanceData?.status, label: attendanceData.status });
      setValue('time_in', attendanceData?.time_in ? moment(attendanceData?.time_in, 'h:mm:ss a') : '');
      setValue('time_out', attendanceData?.time_out ? moment(attendanceData?.time_out, 'h:mm:ss a') : '');
      setValue('remarks', attendanceData?.remarks);
    }
  }, [attendanceData]);

  const onSubmitHandler = (values) => {
    const payload = {
      name: attendanceData.name,
      attendance_date: moment(values.attendance_date).format('YYYY-MM-DD'),
      Attendance_date_out: moment(values.Attendance_date_out).format('YYYY-MM-DD'),
      total_job_hour: values.total_job_hour,
      time_in: moment(values.time_in).format('HH:mm:ss'),
      time_out: moment(values.time_out).format('HH:mm:ss'),
      remarks: values.remarks,
      // status: values.status.value,
    };
    updateAttendance(attendanceData.name, payload).then((response) => {
      if (response.status === 200) {
        message.success(`${attendanceData.name} Attendance Update Successfully`);
        onViewForm(false);
      }
    });
  };

  return (
    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Attendance Details
          </Title>
        </Col>
        <Col span={12}>
          <DateField
            fieldname="attendance_date"
            label="Date In"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            isRequired={true}
            validate={errors.attendance_date && 'error'}
            validMessage={errors.attendance_date && errors.attendance_date.message}
          />
        </Col>
        <Col span={12}>
          <DateField
            fieldname="Attendance_date_out"
            label="Date Out"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            isRequired={true}
            validate={errors.Attendance_date_out && 'error'}
            validMessage={errors.Attendance_date_out && errors.Attendance_date_out.message}
          />
        </Col>
        <Col span={12}>
          <TimeField
            fieldname="time_in"
            label="Time In"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select time', size: 'large', format: 'h:mm:ss a' }}
            initValue=""
            isRequired={true}
            validate={errors.time_in && 'error'}
            validMessage={errors.time_in && errors.time_in.message}
          />
        </Col>
        <Col span={12}>
          <TimeField
            fieldname="time_out"
            label="Time Out"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select time', size: 'large', format: 'h:mm:ss a' }}
            initValue=""
            isRequired={true}
            validate={errors.time_out && 'error'}
            validMessage={errors.time_out && errors.time_out.message}
          />
        </Col>
        <Col span={12}>
          <InputField
            fieldname="total_job_hour"
            label="Total Hours"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'hours', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            isRequired={true}
            validate={errors.total_job_hour && 'error'}
            validMessage={errors.total_job_hour && errors.total_job_hour.message}
          />
        </Col>
        <Col span={12}>
          <SelectField
            fieldname="status"
            label="Status"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please Select status', size: 'large', format: 'DD-MM-YYYY' }}
            initValue=""
            selectOption={[
              { value: 'On Duty', label: 'On Duty' },
              { value: 'Absent', label: 'Absent' },
              { value: 'Late Clock Out', label: 'Late Clock Out' },
              { value: 'Late Clock In', label: 'Late Clock In' },
            ]}
            isRequired={true}
            validate={errors.date_out && 'error'}
            validMessage={errors.date_out && errors.date_out.message}
          />
        </Col>
        <Col span={24}>
          <TextAreaField
            fieldname="remarks"
            label="Remarks"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Remarks', size: 'large' }}
            initValue=""
          />
        </Col>
        <Col span={24}>
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AttendanceDetails;
