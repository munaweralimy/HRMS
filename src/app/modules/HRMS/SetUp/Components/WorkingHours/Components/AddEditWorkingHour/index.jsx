import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { getWorkingHourTempDetail } from '../../../../ducks/services';
import ArrayForm from '../../../../../Employment/components/EmployeeForm/tabList/Personal/ArrayForm';
import { workType, timelap } from '../../../../../../../../configs/constantData';
import { LoadingOutlined } from '@ant-design/icons';
import { addWorkingHourTemp, updateWorkingHourTemp, deleteWorkingHourTemp } from '../../../../ducks/services';
const antIcon = <LoadingOutlined spin />;
const init = {
  day: '',
  time_hour: 0,
  time_min: 0,
  time_type: '',
  work_hour_type: '',
  work_hours: 0,
};
const custom = [
  {
    day: 'Monday',
    work_hour_type: 'Full Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
  {
    day: 'Tuesday',
    work_hour_type: 'Full Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
  {
    day: 'Wednesday',
    work_hour_type: 'Full Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
  {
    day: 'Thursday',
    work_hour_type: 'Full Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
  {
    day: 'Friday',
    work_hour_type: 'Full Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
  {
    day: 'Saturday',
    work_hour_type: 'Half Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
  {
    day: 'Sunday',
    work_hour_type: 'Rest Day',
    time_hour: 0,
    time_min: 0,
    time_type: 'am',
    work_hours: 0,
  },
];

export default (props) => {
  const { title, onClose, workingHourTemp } = props;
  const { Title } = Typography;
  const [workingHours, setWorkingHours] = useState('');
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const { fields } = useFieldArray({
    control: control,
    name: 'work_hours',
    defaultValue: init,
  });

  const workingHorFields = [
    {
      label: 'Template',
      name: 'template_name',
      type: 'input',
      twocol: true,
      placeholder: 'Type template name',
      req: true,
      reqmessage: 'Template Name required',
    },
    {
      label: 'Company',
      name: 'company',
      type: 'select',
      twocol: true,
      placeholder: 'Select company',
      req: true,
      reqmessage: 'Company Name required',
      options: [
        { label: 'Limkokwing University Creative Technology', value: 'Limkokwing University Creative Technology' },
      ],
    },

    {
      type: 'array',
      name: 'work_hours',
      twocol: false,
      colWidth: '1 0 100%',
      field: fields,
      single: false,
      noCard: true,
      child: [
        {
          type: 'input',
          name: 'day',
          label: '',
          static: true,
          req: false,
          twocol: false,
          colWidth: '1 0 100px',
        },
        {
          type: 'select',
          name: 'work_hour_type',
          label: '',
          placeholder: 'Please Select',
          req: true,
          options: workType,
          twocol: false,
          colWidth: '1 0 100px',
        },
        {
          type: 'input',
          name: 'time_hour',
          label: '',
          req: true,
          number: true,
          // min: 1,
          // max: 12,
          arrow: false,
          twocol: false,
          colWidth: '0 1 70px',
        },
        {
          type: 'input',
          name: 'time_min',
          label: '',
          number: true,
          arrow: false,
          req: true,
          // min: 0,
          // max: 59,
          twocol: false,
          colWidth: '0 1 70px',
        },
        {
          type: 'select',
          name: 'time_type',
          label: '',
          placeholder: 'Select',
          req: true,
          options: timelap,
          twocol: false,
          colWidth: '0 1 100px',
        },
        {
          type: 'input',
          name: 'work_hours',
          label: '',
          req: true,
          number: true,
          arrow: false,
          // min: 0,
          // max: 12,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 70px',
        },
      ],
    },
  ];

  useEffect(() => {
    if (workingHourTemp.name.length > 0) {
      setLoad(true);
      getWorkingHourTempDetail(workingHourTemp.name).then((response) => {
        let data = response?.data?.data;
        let working_hours = data?.work_hours.map((value) => ({
          day: value?.day,
          work_hour_type: value?.work_hour_type,
          time_type: value?.time_type,
          work_hours: value?.work_hours,
          time_hour: value?.start_time.split(':')[0],
          time_min: value?.start_time.split(':')[1],
        }));
        setValue('template_name', data.template_name);
        setValue('company', { label: data?.company, value: data?.company });
        setValue('work_hours', working_hours);
        setUserData(
          data?.user_staff.map((value) => ({
            full_name: value.employee_full_name,
            id: value.employee,
          })),
        );
        setLoad(false);
      });
    } else {
      reset();
      setValue('work_hours', custom);
      setUserData([]);
    }
  }, [workingHourTemp]);

  const onFinish = async (val) => {
    setLoad(true);
    const createWorkingHourTemp = {
      company: val?.company.value,
      template_name: val?.template_name,
      user_staff: userData.map((value) => ({ employee: value.id })),
      work_hours: val?.work_hours.map((value) => ({
        day: value.day,
        time_type: value.time_type.value,
        work_hour_type: value.work_hour_type.value,
        work_hours: parseInt(value?.work_hours),
        start_time: value?.time_hour.toString().concat(':', value?.time_min.toString(), ':00'),
      })),
    };
    workingHourTemp.name.length == 0
      ? addWorkingHourTemp(createWorkingHourTemp)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => {
            setLoad(false);
            onClose();
          })
      : updateWorkingHourTemp(workingHourTemp.name, createWorkingHourTemp)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => {
            setLoad(false);
            onClose();
          });
  };
  const onDeleteWorkingHourTemp = () => {
    setLoad(true);
    deleteWorkingHourTemp(workingHourTemp.name).then((response) => {
      if (response.data.message.success == true) {
        message.success(response.data.message.message);
      } else {
        message.error(response.data.message.message);
      }
      setLoad(false);
      onClose();
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
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

          <Col span={16}>
            <Row gutter={[24, 18]}>
              {workingHorFields.map((item, idx) => (
                <Fragment key={idx}>
                  {item?.subheader && (
                    <Col span={24}>
                      <Title level={item?.subheadlevel ? item?.subheadlevel : 5} className="mb-0 c-default">
                        {item.subheader}
                      </Title>
                    </Col>
                  )}
                  {item.type == 'array' ? (
                    <Col span={item.twocol ? 12 : 24}>
                      <Row gutter={[20, 30]}>
                        <Col span={24}>
                          <ArrayForm gap={item.gap} fields={item.field} item={item} control={control} errors={errors} />
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    <FormGroup item={item} control={control} errors={errors} />
                  )}
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={[24, 20]}>
              <Col span={24}>
                <AddUser userData={userData} setUserData={setUserData} title="Team Member" control={control} />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {workingHourTemp.name ? (
                    <>
                      <Col span={12}>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="button"
                          className="red-btn w-100"
                          onClick={onDeleteWorkingHourTemp}
                        >
                          Delete
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Save
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col span={12}>
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
                      <Col span={12}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Add
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
    </Spin>
  );
};
