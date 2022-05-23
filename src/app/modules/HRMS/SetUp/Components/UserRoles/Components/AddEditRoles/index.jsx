import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin, Collapse, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AddUser from '../../../Teams/Components/AddUser';
import { totalRoles } from './FormFields';
import { getSingleRole, addUserRoles, updateUserRoles, deleteUserRoles } from '../../../../ducks/services';
import { LoadingOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { CheckboxGroup, InputField } from '../../../../../../../atoms/FormElement';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;
const disableRole = {
  'CMS-Portal': 'CMS-Portal',
  'CMS-Faculty': 'CMS-Faculty',
  'CMS-AQA': 'CMS-AQA',
  'CMS-Registry': 'CMS-Registry',
  'CMS-Marketing': 'CMS-Marketing',
  'CMS-Eligibility': 'CMS-Eligibility',
  'CMS-Finance': 'CMS-Finance',
};
export default (props) => {
  const { title, onClose, roleData } = props;
  const { Panel } = Collapse;
  const [teamData, setTeamData] = useState('');
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  // const [totalRoles, setSearachRole] = useState(totalRoles);
  const { control, errors, setValue, reset, handleSubmit, getValues } = useForm();
  const employeeList = useSelector((state) => state.setup.employeeList);
  const [seachPermission, setSearchPermission] = useState('');

  useEffect(() => {
    if (roleData.name.length > 0) {
      setLoad(true);
      getSingleRole(roleData.name).then((response) => {
        setTeamData(response?.data?.message[0]);
        setUserData(
          response?.data?.message[0]?.user_staff.map((value) => ({
            employee_name: value.employee_full_name,
            name: value.employee,
          })),
        );
        setLoad(false);
      });
    } else {
      reset();
      setUserData([]);
    }
  }, [roleData]);

  useEffect(() => {
    if (Object.entries(teamData).length) {
      setValue('role_name', teamData.role_name);
      if (teamData.grand_permissions.length) {
        teamData.grand_permissions.map((value) => {
          setValue(`${value.permission_name}-read`, value.read == 1 ? [value.read] : []);
          setValue(`${value.permission_name}-write`, value.write == 1 ? [value.write] : []);
          setValue(`${value.permission_name}-delete`, value.delete == 1 ? [value.delete] : []);
          if ((value.read == 1 && value.write == 1 && value.delete == 1) || value.read == 1) {
            setValue(`${value.permission_name}`, [1]);
          } else {
            setValue(`${value.permission_name}`, []);
          }
        });
      } else {
        reset({ role_name: teamData.role_name });
      }
    }
  }, [teamData]);

  const onFinish = (values) => {
    console.log({ values });
    setLoad(true);
    let permissions = [];
    totalRoles.map((value) => {
      permissions.push({
        permission_name: value,
        read: values[`${value}-read`].length ? 1 : 0,
        write: values[`${value}-write`].length ? 1 : 0,
        delete: values[`${value}-delete`].length ? 1 : 0,
      });
    });
    console.log({ permissions });
    const payload = {
      role_name: values.role_name,
      grand_permissions: permissions,
      user_staff: userData.map((value) => ({ employee: value.name })),
    };
    console.log({ payload });
    !roleData.name
      ? addUserRoles(payload)
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
            message.error('Something went wrong');
          })
      : updateUserRoles(roleData.name, payload)
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
            message.error('Something went wrong');
          });
  };

  const onDeleteTeam = () => {
    setLoad(true);
    deleteUserRoles(roleData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => message.error('Cant delte a user role'));
  };

  const onCheckMainHandler = (value, screen) => {
    console.log({ value }, screen);
    if (value[0] == 1) {
      setValue(`${screen}-read`, [1]);
      setValue(`${screen}-write`, [1]);
      setValue(`${screen}-delete`, [1]);
    } else {
      setValue(`${screen}-read`, []);
      setValue(`${screen}-write`, []);
      setValue(`${screen}-delete`, []);
    }
  };
  const onSingelCheckhandler = (screen) => {
    let allVals = getValues();
    if (
      (allVals[`${screen}-read`].length && allVals[`${screen}-write`].length && allVals[`${screen}-delete`].length) ||
      allVals[`${screen}-read`].length
    ) {
      setValue(screen, [1]);
    } else {
      setValue(screen, [0]);
    }
  };

  // const onSearchRoleHandler = (e) => {
  //   console.log({ e });
  //   if (e.target.value.length) {
  //     setSearachRole(totalRoles.filter((value) => value.includes(e.target.value)));
  //   } else {
  //     setSearachRole(totalRoles);
  //   }
  // };

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
              <Col span={24}>
                <InputField
                  fieldname="role_name"
                  class="mb-0 w-100"
                  label="User Role Name"
                  control={control}
                  iProps={{ placeholder: 'Type role name', size: 'large' }}
                  rules={{ required: 'Type role name' }}
                  initValue=""
                  validate={errors.role_name && 'error'}
                  validMessage={errors.role_name && errors.role_name.message}
                />
              </Col>
              <Col span={24}>
                <Text className="c-gray">User Role Access</Text>
              </Col>
              <Col span={24}>
                <Input placeholder="Type permission name" onChange={(e) => setSearchPermission(e.target.value)} />
              </Col>
              {totalRoles.map((value, index) => (
                <Col
                  span={12}
                  key={index}
                  style={{
                    display: `${
                      value.toLowerCase().includes(seachPermission.toLowerCase()) && seachPermission.length
                        ? 'block'
                        : !seachPermission.length
                        ? ''
                        : 'none'
                    }`,
                  }}
                >
                  <Collapse
                    className="custom-collapse"
                    bordered={false}
                    collapsible={disableRole[value] == value ? 'disabled' : 'header'}
                    expandIcon={({ isActive }) =>
                      disableRole[value] !== value ? !isActive ? <PlusOutlined /> : <MinusOutlined /> : null
                    }
                  >
                    <Panel
                      forceRender={true}
                      style={{ border: '0px' }}
                      header={value}
                      extra={
                        <CheckboxGroup
                          fieldname={`${value}`}
                          label=""
                          class="mb-0 fullWidth-checbox"
                          control={control}
                          initValue=""
                          option={[{ label: '', value: 1 }]}
                          onChange={(e) => onCheckMainHandler(e, value)}
                        />
                      }
                    >
                      <CheckboxGroup
                        fieldname={`${value}-read`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        initValue=""
                        option={[{ label: 'Visibility', value: 1 }]}
                        onChange={() => onSingelCheckhandler(value)}
                      />
                      <CheckboxGroup
                        fieldname={`${value}-write`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        initValue=""
                        option={[{ label: 'Modify', value: 1 }]}
                        onChange={() => onSingelCheckhandler(value)}
                      />
                      <CheckboxGroup
                        fieldname={`${value}-delete`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        initValue=""
                        option={[{ label: 'Delete', value: 1 }]}
                        onChange={() => onSingelCheckhandler(value)}
                      />
                    </Panel>
                  </Collapse>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={[24, 20]}>
              <Col span={24}>
                <AddUser
                  userData={userData}
                  setUserData={setUserData}
                  title="Team Member"
                  control={control}
                  allListing={employeeList}
                />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {roleData.name ? (
                    <>
                      {allowed([Roles.SETUP], 'delete') && (
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
                      )}
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
