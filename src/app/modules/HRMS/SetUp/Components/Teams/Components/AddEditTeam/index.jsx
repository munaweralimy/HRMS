import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { addNewTeamFields } from './FormFields';
import { getSingleTeam } from '../../../../ducks/services';
import { Popup } from '../../../../../../../atoms/Popup';
import AddUser from '../AddUser';
import Users from '../Users';
import { addSingleTeam, updateSingleTeam, deleteSingleTeam } from '../../../../ducks/services';
export default (props) => {
  const { title, onClose, team } = props;
  const { Title, Text } = Typography;
  const [teamData, setTeamData] = useState('');
  const [visible, setVisible] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const [userData, setUserData] = useState([]);
  const [addUser, setAddUser] = useState('');

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: <Users title="Add New User" addNewUser={setAddUser} onClose={() => setVisible(false)} />,
    width: 400,
    onCancel: () => setVisible(false),
  };

  useEffect(() => {
    if (team.name.length > 0) {
      getSingleTeam(team.name).then((response) => {
        setTeamData(response?.data?.data);
        setUserData(
          response?.data?.data?.user_staff.map((value) => ({
            full_name: value.employee_full_name,
            id: value.employee,
          })),
        );
      });
    }
  }, [team]);

  useEffect(() => {
    if (addUser?.employee) {
      console.log({ addUser });
      let newEmpoyees = userData;
      newEmpoyees.push({ full_name: addUser.employee.label, id: addUser.employee.value });
      setUserData(newEmpoyees);
    }
  }, [addUser]);

  useEffect(() => {
    if (Object.entries(teamData).length > 0) {
      setValue('team_name', teamData.team_name);
      setValue('company', { label: teamData.company, value: teamData.company });
      setValue('team_leader', { label: teamData.team_leader_name, value: teamData.team_leader_name });
    }
  }, [teamData]);

  const onFinish = (values) => {
    const payload = {
      team_name: values.team_name,
      team_leader: values.team_leader.value,
      company: values.company.value,
      user_staff: userData.map((value) => ({ employee: value.id })),
    };
    addSingleTeam(payload).then((response) => {
      message.success('Team Added');
      onClose(false);
    });
  };

  return (
    <>
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
                <AddUser userData={userData} setUserData={setUserData} />
              </Col>
              <Col span={24}>
                <Button size="large" type="primary" onClick={() => setVisible(true)}>
                  Add User
                </Button>
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                      Close
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Popup {...popup} />
    </>
  );
};
