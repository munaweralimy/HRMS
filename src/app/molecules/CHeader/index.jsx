import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Button, Input, Select, Avatar, Dropdown, Typography, Menu, Card, Form } from 'antd';
import { useTranslate } from 'Translate';
import { useDispatch } from 'react-redux';
import userImage from '../../../assets/img/dummy-profile.png';
import { logout } from '../../../features/userSlice';
import { useHistory } from 'react-router-dom';
import { SearchIcon, ChangePasswordIcon, UserIcon, LogOutIcon } from '../../atoms/CustomIcons';
import LanguageSwitcher from '../../molecules/LanguageSwitcher';
import { Popup } from '../../atoms/Popup';
import PopupPassword from '../../modules/Application/component/PopupPassword';

const { Text } = Typography;
export default (props) => {
  const [visible, setVisisble] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = JSON.parse(localStorage.getItem('userdetails')).user_image;

  const i18n = useTranslate();
  const { t } = i18n;

  const popup = {
    closable: true,
    visibility: visible,
    content: <PopupPassword title="Change Password" onClose={() => setVisisble(false)} />,
    width: 410,
    onCancel: () => setVisisble(false),
  };

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logout());
    history.push('/');
  };

  const menu = (
    <Menu className="pofile-menu">
      <Menu.Item>
        <Button onClick={() => history.push('/myprofile')} type="link" className="btn-link" icon={<UserIcon />}>
          My Profile
        </Button>
      </Menu.Item>

      <Menu.Item>
        <Button onClick={() => setVisisble(true)} type="link" className="btn-link" icon={<ChangePasswordIcon />}>
          Change Password
        </Button>
      </Menu.Item>

      <Menu.Item>
        <Button onClick={logoutHandler} type="link" className="btn-link" icon={<LogOutIcon />}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Card bordered={false} className="c-header" style={{ backgroundColor: 'transparent' }}>
        <Row gutter={24} align="middle">
          <Col span={17}>
            <Space size={20}>
              <Select
                className="custom-select"
                size="large"
                placeholder="Select option"
                style={{ width: 190 }}
                options={[
                  { value: 'Marketing', label: 'Marketing' },
                  { value: 'Faculty', label: 'Faculty' },
                  { value: 'Quality Assurance', label: 'Quality Assurance' },
                ]}
              />
              <Input
                size="large"
                prefix={<SearchIcon />}
                className="search-input"
                placeholder="Search Quality Assurance..."
              />
            </Space>
          </Col>
          <Col span={7} className="text-right">
            {/* <LanguageSwitcher></LanguageSwitcher> */}
            <Dropdown className="userDropdown" overlay={menu} placement="bottomRight">
              <Space size={20}>
                <Text style={{ textTransform: 'capitalize' }}>{window.localStorage.getItem('user')}</Text>
                <Avatar
                  className="userImage"
                  size={60}
                  src={userProfile ? `http://cms2dev.limkokwing.net${userProfile}` : userImage}
                />
              </Space>
            </Dropdown>
          </Col>
        </Row>
      </Card>
      <Popup {...popup} />
    </>
  );
};
