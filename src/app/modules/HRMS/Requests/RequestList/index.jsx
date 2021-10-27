import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import {
  getRequestPending, 
  getRequestArchive, 
  getYourRequest } 
from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../molecules/HRMS/CardListSwitchLayout';
import RequestSection from '../../../../molecules/RequestSection';
import { useHistory } from 'react-router-dom';
import Roles from '../../../../../routing/config/Roles';
import {allowed} from '../../../../../routing/config/utils';

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState();
  const dataPending = useSelector((state) => state.hrmsrequests.requestListPending);
  const dataYour = useSelector((state) => state.hrmsrequests.requestListYourRequest);
  const dataArchive = useSelector((state) => state.hrmsrequests.requestListArchive);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  
  const onAction1 = (status, page, sort, limit) => {
    if(allowed([Roles.REQUESTS])) {
      dispatch(getRequestPending(page, sort,limit, ''));
    } else {
      dispatch(getRequestPending(page, sort,limit, id));
    }
  }

  const onAction2 = (status, page, sort, limit) => {
    if(allowed([Roles.REQUESTS])) {
      dispatch(getYourRequest(page, sort,limit,''));
    } else {
      dispatch(getYourRequest(page, sort,limit,id));
    }
    
  }

  const onAction3 = (status, page, sort, limit) => {
    if(allowed([Roles.REQUESTS])) {
      dispatch(getRequestArchive(page, sort,limit, ''));
    } else {
      dispatch(getRequestArchive(page, sort,limit, id));
    }
      
  }

  useEffect(() => {
    console.log('pending', dataPending)
  }, [dataPending]);

  const onAdd = () => {
    history.push('/requests/addnew')
  }

  const tabs = [
    {
      visible: allowed([Roles.REQUESTS_MANAGER]),
      title: 'Staff Requests',
      key: 'pending',
      count: dataPending?.count,
      Comp: RequestSection,
      iProps : {
        key: 'pending',
        data: dataPending?.rows || [],
        count: dataPending?.count || 0,
        link: '/requests/',
        innerKey: 'employee_id',
        activeTab: activeKey,
        updateApi: onAction1,
        limit: props.dashboard== true ? 3 : 6
      },
    },
    {
      visible: allowed([Roles.REQUESTS_INDIVIDUAL]),
      title: 'My Requests',
      key: 'yourrequests',
      count: dataYour?.count,
      Comp: RequestSection,
      iProps : {
        key: 'yourrequests',
        data: dataYour?.rows || [],
        count: dataYour?.count || 0,
        link: '/requests/',
        innerKey: 'employee_id',
        activeTab: activeKey,
        updateApi: onAction2,
        addbtn: '+ New Request',
        btnclass: 'green-btn',
        btnAction: onAdd,
        limit: props.dashboard== true ? 3 : 6
      },
    },
    {
      visible: allowed([Roles.REQUESTS_MANAGER]),
      title: 'Archive',
      key: 'archive',
      Comp: RequestSection,
      iProps : {
        key: 'archive',
        data: dataArchive?.rows || [],
        count: dataArchive?.count || 0,
        link: '/requests/',
        innerKey: 'employee_id',
        activeTab: activeKey,
        updateApi: onAction3,
        limit: props.dashboard== true ? 3 : 6
      },
    },
  ]

  useEffect(() => {
    if (allowed(Roles.REQUESTS)) {
      setActiveKey('pending')
    } else {
      setActiveKey('yourrequests')
    }
  }, []);
  
  return (
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <CardListSwitchLayout tabs={tabs} active={activeKey} />
        </Col>
      </Row>
  );
};
