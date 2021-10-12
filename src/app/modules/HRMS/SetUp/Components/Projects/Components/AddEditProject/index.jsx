import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { getSingleProject, addProject, updateProjecat, deleteProject } from '../../../../ducks/services';
import { projectFields } from './FormFields';
export default (props) => {
  const { title, onClose, projectData } = props;

  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  const { Title, Text } = Typography;

  useEffect(() => {
    if (projectData.name.length > 0) {
      getSingleProject(projectData.name).then((response) => {
        console.log({ response });
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
  }, [projectData]);

  useEffect(() => {
    if (Object.entries(teamData).length > 0) {
      setValue('project', teamData.project);
    }
  }, [teamData]);

  const onFinish = (values) => {
    const payload = {
      project_code: values.project,
      project: values.project,
      company: 'Limkokwing University Creative Technology',
      user_staff: userData.map((value) => ({ employee: value.id })),
    };
    projectData.name.length == 0
      ? addProject(payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          onClose();
        })
      : updateProjecat(projectData.name, {
          project: values.project,
          user_staff: userData.map((value) => ({ employee: value.id })),
        }).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          onClose();
        });
  };
  const onDeleteTeam = () => {
    deleteProject(projectData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        onClose();
      })
      .catch((error) => message.error('Cant delte a project'));
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

        <Col span={24}>
          <Row gutter={[24, 18]}>
            {projectFields().map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 20]}>
            <Col span={24}>
              <AddUser userData={userData} setUserData={setUserData} title="Team Member" control={control} />
            </Col>
            <Col span={24}>
              <Row gutter={24}>
                {projectData.name ? (
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
