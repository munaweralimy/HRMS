import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { addNewTeamFields } from './FormFields';
import AddUser from '../AddUser';
import { addSingleTeam, updateSingleTeam, deleteSingleTeam, getSingleTeam } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, team } = props;
  const { Title, Text } = Typography;
  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (team.name.length > 0) {
      setLoad(true);
      getSingleTeam(team.name).then((response) => {
        setTeamData(response?.data?.data);
        setUserData(
          response?.data?.data?.user_staff.map((value) => ({
            full_name: value.employee_full_name,
            id: value.employee,
          })),
        );
        setLoad(false);
      });
    } else {
      reset();
      setUserData([]);
    }
  }, [team]);

  useEffect(() => {
    console.log({ teamData });
    if (Object.entries(teamData).length > 0) {
      setValue('team_name', teamData.team_name);
      setValue('company', { label: teamData.company, value: teamData.company });
      setValue('team_leader', { label: teamData.team_leader_name, value: teamData.team_leader_name });
    }
  }, [teamData]);

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      team_name: values.team_name,
      team_leader: values.team_leader.value,
      company: values.company.value,
      user_staff: userData.map((value) => ({ employee: value.id })),
    };
    team.name.length == 0
      ? addSingleTeam(payload).then((response) => {
          message.success('Team Added Successfully');
          setLoad(false);
          onClose(false);
        })
      : updateSingleTeam(team.name, payload).then((response) => {
          message.success('Team Updated Successfully');
          setLoad(false);
          onClose(false);
        });
  };

  const onDeleteTeam = () => {
    setLoad(true);
    deleteSingleTeam(team.name)
      .then((response) => {
        message.success('Team Deleted Successfully');
        setLoad(false);
        onClose(false);
      })
      .catch((error) => message.error('Cant delte a team'));
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

          <Col span={12}>
            <Row gutter={[24, 30]}>
              {addNewTeamFields().map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[24, 30]}>
              <Col span={24}>
                <AddUser userData={userData} setUserData={setUserData} title="Team Member" control={control} />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {team.name ? (
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
    </Spin>
  );
};
