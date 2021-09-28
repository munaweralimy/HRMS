import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Descriptions } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
const AddUser = (props) => {
  const { userData, setUserData } = props;
  console.log({ userData });
  const { Title, Text } = Typography;
  const [removeUser, setRemoveUser] = useState({});

  useEffect(() => {
    // let updatedUser = userData;
    let updatedUser = userData.filter((value) => value.full_name !== removeUser.full_name);
    setUserData(updatedUser);
  }, [removeUser]);

  return (
    <Card bordered={false} className="scrolling-card ultra-550 b-black">
      <Row gutter={24}>
        <Col span={24}>
          <Row gutter={24} justify="">
            <Col span={24}>
              <Title className="mb-0" level={4}>
                {userData.length}
              </Title>
            </Col>
            <Col span={24}>
              <Text className="mb-0 c-gray">Team Members</Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Descriptions bordered column={1} colon={false} className="add-user">
            {userData &&
              userData.length > 0 &&
              userData.map((value, index) => {
                return (
                  <Descriptions.Item key={index} label={value.full_name}>
                    <CloseCircleFilled onClick={() => setRemoveUser(value)} />
                  </Descriptions.Item>
                );
              })}
            {/* <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <CloseCircleFilled />
            </Descriptions.Item> */}
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default AddUser;
