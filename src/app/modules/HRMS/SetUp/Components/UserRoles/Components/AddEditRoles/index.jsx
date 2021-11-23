import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message, Spin, Collapse } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { rolesFields, totalRoles } from './FormFields';
import { getSingleRole, addUserRoles, updateUserRoles, deleteUserRoles } from '../../../../ducks/services';
import { LoadingOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { CheckboxGroup, InputField } from '../../../../../../../atoms/FormElement';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, roleData } = props;
  const { Title, Text } = Typography;
  const { Panel } = Collapse;
  const [teamData, setTeamData] = useState('');
  const [load, setLoad] = useState(false);
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
    // setLoad(true);
    // const newObj = {};
    // const keys = Object.keys(values);
    // for (const key of keys) {
    //   if (typeof values[key] === 'string') {
    //     newObj[key] = values[key];
    //     continue;
    //   } else if (values[key].length == 0) {
    //     newObj[key] = 0;
    //   } else {
    //     newObj[key] = values[key][0];
    //   }
    // }
    // const payload = {
    //   ...newObj,
    //   user_staff: userData.map((value) => ({ employee: value.id })),
    // };
    // console.log('roleData', roleData, payload);
    // !roleData.name
    //   ? addUserRoles(payload).then((response) => {
    //       if (response.data.message.success == true) {
    //         message.success(response.data.message.message);
    //       } else {
    //         message.error(response.data.message.message);
    //       }
    //       setLoad(false);
    //       onClose();
    //     })
    //   : updateUserRoles(roleData.name, payload).then((response) => {
    //       if (response.data.message.success == true) {
    //         message.success(response.data.message.message);
    //       } else {
    //         message.error(response.data.message.message);
    //       }
    //       setLoad(false);
    //       onClose();
    //     });
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
                  initValue=""
                />
              </Col>
              <Col span={24}>
                <Text className="c-gray">User Role Access</Text>
              </Col>
              {totalRoles.map((value, index) => (
                <Col span={12} key={index}>
                  <Collapse
                    bordered={false}
                    collapsible="header"
                    expandIcon={({ isActive }) => (!isActive ? <PlusOutlined /> : <MinusOutlined />)}
                  >
                    <Panel
                      style={{ border: '0px' }}
                      header={value}
                      extra={
                        <CheckboxGroup
                          fieldname={`${value}-main`}
                          label=""
                          class="mb-0 fullWidth-checbox"
                          control={control}
                          initValue=""
                          option={[{ label: '', value: 1 }]}
                        />
                      }
                    >
                      <CheckboxGroup
                        fieldname={`${value}-read`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        initValue=""
                        option={[{ label: 'Read', value: 1 }]}
                      />
                      <CheckboxGroup
                        fieldname={`${value}-write`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        initValue=""
                        option={[{ label: 'Write', value: 1 }]}
                      />
                      <CheckboxGroup
                        fieldname={`${value}-delete`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        initValue=""
                        option={[{ label: 'Delete', value: 1 }]}
                      />
                    </Panel>
                  </Collapse>
                </Col>
              ))}
              {/* {rolesFields().map((item, idx) => (
                <Fragment key={idx}>
                  {item.subheading && (
                    <Col span={24}>
                      <Text className="mb-0 c-gray">{item.subheading}</Text>
                    </Col>
                  )}
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))} */}
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
    </Spin>
  );
};
