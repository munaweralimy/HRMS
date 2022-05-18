import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Image, Menu, Typography, Card, Badge } from 'antd';
import loginLogo from '../../../assets/img/limkokwing-logo.svg';
import {
  DashboardIcon2,
  ApplicationsIcon,
  FacultyIcon,
  RequestIcon,
  CalendarIcon,
  ReportsIcon,
  TaskIcon,
  PolicyIcon,
  SetupIcon,
  AdvancementIcon,
  StaffIcon,
  ClockIcon,
} from '../../atoms/CustomIcons';
import { Link, useLocation } from 'react-router-dom';
import RoutingList from '../../../routing/config/RoutingList';
import { allowedRoutes } from '../../../routing/config/utils';
import { baseUrl } from '../../../configs/constants';

const { SubMenu } = Menu;
const IconList = {
  DashboardIcon2,
  ApplicationsIcon,
  TaskIcon,
  AdvancementIcon,
  StaffIcon,
  ClockIcon,
  FacultyIcon,
  RequestIcon,
  CalendarIcon,
  ReportsIcon,
  PolicyIcon,
  SetupIcon,
};

export default (props) => {
  const [menuList, setMenuList] = useState([]);
  const location = useLocation().pathname;
  const subkey = location.split('/')[1];
  const selected = location.split('/').length > 1 ? `/${location.split('/')[1]}` : location;
  const appLogo = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_logo
    useEffect(() => {
        ModifyJson(allowedRoutes(RoutingList));
    }, []);


  const ModifyJson = (data) => {
    var result = data.reduce(function (r, a) {
      if (a.parent) {
        r[a['menu']] = r[a['menu']] || [];
        if (a.submenu) {
          r[a['menu']].push(a);
        } else {
          r[a['menu']] = a;
        }
      }
      return r;
    }, Object.create(null));

    setMenuList(result);
  };

  const mainIcon = (icon) => {
    const IconComp = IconList[icon];
    return <IconComp />;
  };

    return (
        <Card bordered={false} className='navBar'>
        <Row gutter={[30, 24]}>
            <Col span={24} className='text-center'>
                <Image style={{width: 160, height: 'auto'}} preview={false} src={appLogo ? baseUrl + appLogo : loginLogo}  alt="Logo" />
            </Col>
            <Col span={24}>
                <Card bordered={false} className='transparent-card' style={{ height: 'calc(100vh - 220px)'}}>
                    <Menu mode="inline" theme= 'dark' defaultSelectedKeys={[selected]} defaultOpenKeys={[subkey]} className="main-menu">
                        {Object.entries(menuList).map(([key, val], index) => (
                            <Fragment key={index}>
                                {Array.isArray(val) ? 
                                    <SubMenu key={val[0].key} title={key} className='submenu-item'>
                                    {val.map((item, i) => {
                                        const IconComp = IconList[item.icon];
                                        return <Menu.Item key={item.path} className="menu-item" icon={<IconComp />}>
                                            <Link to={item.path}>
                                                {item.badge ? 
                                                <Row gutter={20}>
                                                    <Col flex='auto'>{item.submenu}</Col>
                                                </Row>
                                                : item.submenu}
                                            </Link>
                                        </Menu.Item>
                                    }
                                    )}
                                    </SubMenu>
                                    :
                                    <>
                                    <Menu.Item key={val.path} className="menu-item" icon={mainIcon(val.icon)}>
                                        <Link to={val.path}>{val.menu}</Link>
                                    </Menu.Item>
                                    {val.menu == 'Dashboard' && 
                                    <Menu.Item disabled key="hrms" className='static-menu'>HUMAN RESOURCE</Menu.Item>}
                                    </>
                                }
                            </Fragment>
                        ))}
                    </Menu>
                </Card>
            </Col>
        </Row>
        </Card>
    )
}