import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, InputNumber } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { jobFields } from './FormFields';
import { useForm, useFieldArray } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { SliderFiled } from '../../../../../../../atoms/FormElement';
import { getSingleJob } from '../../../../ducks/services';

export default (props) => {
  const { title, onClose, jobPosition } = props;
  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, watch, reset, handleSubmit } = useForm();
  const { Title, Text } = Typography;

  const quality = watch('work_quality');
  const speed = watch('work_speed');
  const leadership = watch('leadership');
  const thinking = watch('critical_thinking');
  const team = watch('team_work');

  const skillSet = [
    { label: 'Work Quality', fieldname: 'work_quality', updateVal: quality },
    { label: 'Work Speed', fieldname: 'work_speed', updateVal: speed },
    { label: 'Leadership', fieldname: 'leadership', updateVal: leadership },
    { label: 'Critical Thinking', fieldname: 'critical_thinking', updateVal: thinking },
    { label: 'Team Work', fieldname: 'team_work', updateVal: team },
  ];

  useEffect(() => {
    if (jobPosition.name.length > 0) {
      getSingleJob(jobPosition.name).then((response) => {
        setTeamData(response?.data?.data);
        setUserData(
          response?.data?.data?.user_staff.map((value) => ({
            full_name: value.employee_full_name,
            id: value.employee,
          })),
        );
      });
    } else {
      reset();
      setUserData([]);
    }
  }, [jobPosition]);

  useEffect(() => {
    console.log({ teamData });
    if (Object.entries(teamData).length > 0) {
      setValue('job_position_name', teamData.job_position_name);
      setValue(
        'skills',
        teamData.skills.map((value) => ({ label: value.skill_name, value: value.skill_name })),
      );
      setValue('team_leader', { label: teamData.team_leader_name, value: teamData.team_leader_name });
      skillSet.map((value) => setValue(value.fieldname, teamData[value.fieldname]));
    }
  }, [teamData]);

  const onDeleteTeam = () => {};

  const onFinish = async (val) => {
    const payload = {
      job_position_name: val.job_position_name,
      work_quality: val.work_quality,
      work_speed: val.work_speed,
      leadership: val.leadership,
      critical_thinking: val.critical_thinking,
      team_work: val.team_work,
      skills: val.skills.map((value) => ({ skill_name: value.value })),
      user_staff: userData.map((value) => ({ employee: value.id })),
    };
    console.log({ payload });
  };

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

        <Col span={8}>
          <Row gutter={[24, 30]}>
            {jobFields().map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[24, 20]} align="middle">
            {skillSet.map((value, index) => (
              <Fragment key={index}>
                <Col span={20}>
                  <SliderFiled
                    fieldname={value.fieldname}
                    label={value.label}
                    control={control}
                    errors={errors}
                    iProps={{ min: 1, max: 5, marks: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber value={value.updateVal} disabled={true} className="w-100" />
                </Col>
              </Fragment>
            ))}
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[24, 30]}>
            <Col span={24}>
              <AddUser userData={userData} setUserData={setUserData} title="Team Member" control={control} />
            </Col>
            <Col span={24}>
              <Row gutter={24}>
                {jobPosition.name ? (
                  <>
                    <Col span={12}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className="red-btn w-100"
                        onClick={onDeleteTeam}
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
  );
};
