import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { rolesFields } from './FormFields';
import { getSingleRole, addUserRoles, updateUserRoles, deleteUserRoles } from '../../../../ducks/services';

export default (props) => {
  const { title, onClose, roleData } = props;
  const { Title, Text } = Typography;
  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  useEffect(() => {
    if (roleData.name.length > 0) {
      getSingleRole(roleData.name).then((response) => {
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
  }, [roleData]);

  useEffect(() => {
    if (Object.entries(teamData.length > 0)) {
      Object.entries(teamData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          setValue(key, value);
        } else {
          setValue(key, [value]);
        }
      });
    }
  }, [teamData]);

  const onFinish = (values) => {
    console.log({ values });
    const newObj = {};
    const keys = Object.keys(values);
    for (const key of keys) {
      if (typeof values[key] === 'string') {
        newObj[key] = values[key];
        continue;
      } else if (values[key].length == 0) {
        newObj[key] = 0;
      } else {
        newObj[key] = values[key][0];
      }
    }
    const payload = {
      ...newObj,
      user_staff: userData.map((value) => ({ employee: value.id })),
    };
    roleData.name.length === 0
      ? addUserRoles(payload).then((response) => {
          message.success('New User Role Added');
          onClose();
        })
      : updateUserRoles(roleData.name, payload).then((response) => {
          message.success('User Role Updated ');
          onClose();
        });
  };

  const onDeleteTeam = () => {
    deleteUserRoles(roleData.name)
      .then((response) => {
        message.success('User Role Deleted Successfully');
        onClose(false);
      })
      .catch((error) => message.error('Cant delte a user role'));
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

        <Col span={16}>
          <Row gutter={[24, 18]}>
            {rolesFields().map((item, idx) => (
              <Fragment key={idx}>
                {item.subheading && (
                  <Col span={24}>
                    <Text className="mb-0 c-gray">{item.subheading}</Text>
                  </Col>
                )}
                <FormGroup item={item} control={control} errors={errors} />
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
                {roleData.name ? (
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
