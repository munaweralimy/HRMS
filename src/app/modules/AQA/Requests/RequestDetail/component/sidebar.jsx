import React from "react";
import {
  Col,
  Card,
  Space,
  Button,
  Typography,
  Divider,
  Avatar,
} from "antd";
import { UserOutlined, PhoneFilled, MailFilled } from "@ant-design/icons";

const SidebarApplication = () => {
  const { Title, Text } = Typography;
  return (
    <Card className="formCard appDetailBox" bordered={false}>
        <Avatar size={100}  icon={<UserOutlined />} />
        <Button type="ghost">Staff</Button>
        <Title level={2} className="text-offwhite font-500 mb-0">Rose Chavez</Title>
        <Title level={3} className="text-gray font-500 mt-0">123686234</Title>
        <Divider className="profileDivider" />
        <Title level={3} className="text-offwhite font-500 mb-0">Faculty Department</Title>
        <Divider className="profileDivider" />
        <Title level={3} className="text-offwhite font-500 mb-0 mt-0">Cyberjaya Campus</Title>
        <Title level={5} className="text-gray font-300 mt-0">Malaysia</Title>
        
        <Space size={15} style={{width:'100%'}} className="mt-auto">
          <PhoneFilled className="actionIcon theme2Bg" rotate={90} />
          <Text className="text-offwhite RegularFont">013 115 6692</Text>
        </Space>
        <Space size={15} style={{width:'100%'}}>
          <MailFilled className="actionIcon theme2Bg" />
          <Text className="text-offwhite RegularFont">rebeccaholmes@gmail.com</Text>
        </Space>
    </Card>       
  );
};

export default SidebarApplication;
