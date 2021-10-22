import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Descriptions, Button, message } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { Popup } from '../../../../../../../atoms/Popup';
import { InputField } from '../../../../../../../atoms/FormElement';
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import Users from '../Users';
const AddUser = (props) => {
  const { userData, setUserData, title, control, department } = props;
  const { Title, Text } = Typography;
  const [removeUser, setRemoveUser] = useState({});
  const [addUser, setAddUser] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let updatedUser = userData.filter((value) => value.full_name !== removeUser.full_name);
    setUserData(updatedUser);
  }, [removeUser]);

  useEffect(() => {
    if (addUser?.employee) {
      console.log({ addUser });
      let newEmpoyees = userData;
      if (newEmpoyees.filter((value) => value.id === addUser.employee.value).length > 0) {
        message.error(`${addUser.employee.label} already added`);
        setVisible(true);
      } else {
        newEmpoyees.push({ full_name: addUser.employee.label, id: addUser.employee.value });
        setUserData(newEmpoyees);
      }
    }
  }, [addUser]);

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <Users
        title={department?.bool ? 'Add New Team' : 'Add New User'}
        addNewUser={setAddUser}
        department={department}
        onClose={() => setVisible(false)}
      />
    ),
    width: 400,
    onCancel: () => setVisible(false),
  };

  return (
    <>
      <Card bordered={false} className="uni-card b-black">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Row gutter={20} justify="start">
              <Col span={24}>
                <Title className="mb-0" level={3}>
                  {userData.length}
                </Title>
              </Col>
              <Col span={24}>
                <Text className="c-gray">{title}</Text>
              </Col>
            </Row>
          </Col>
          {userData && userData.length > 0 && (
            <>
              <Col flex="auto">
                <InputField
                  fieldname="search"
                  label=""
                  control={control}
                  iProps={{ placeholder: 'Search team member' }}
                />
              </Col>
              <Col flex="20px">
                <Button size="large" type="primary" htmlType="button" icon={<SearchOutlined />} />
              </Col>
            </>
          )}
        </Row>
        <Card bordered={false} className="scrolling-card ultra-550 b-black">
          <Row gutter={[20, 20]} justify="center" align="middle">
            {userData && userData.length > 0 ? (
              <Col span={24}>
                <Descriptions bordered column={1} colon={false} className="add-user">
                  {userData.map((value, index) => {
                    return (
                      <Descriptions.Item key={index} label={value.full_name}>
                        <CloseCircleFilled onClick={() => setRemoveUser(value)} />
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
              </Col>
            ) : (
              <Col span={24}>
                <Row gutter={24} align="middle" justify="center">
                  <Col>
                    <PlusCircleFilled onClick={() => setVisible(true)} />
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Card>
        {userData && userData.length > 0 && (
          <Button size="large" type="dashed" className="w-100" onClick={() => setVisible(true)}>
            {`+ Add ${title}`}
          </Button>
        )}
      </Card>
      <Popup {...popup} />
    </>
  );
};

export default AddUser;
