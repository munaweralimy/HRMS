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

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('pending');
  const dataPending = useSelector((state) => state.hrmsrequests.requestListPending);
  const dataYour = useSelector((state) => state.hrmsrequests.requestListYourRequest);
  const dataArchive = useSelector((state) => state.hrmsrequests.requestListArchive);
  
  const onAction1 = (status, page, sort) => {
      dispatch(getRequestPending(page, sort));
  }

  const onAction2 = (status, page, sort) => {
    dispatch(getYourRequest(page, sort));
  }

  const onAction3 = (status, page, sort) => {
      dispatch(getRequestArchive(page, sort));
  }

  useEffect(() => {
    console.log('pending', dataPending)
  }, [dataPending]);

  const onAdd = () => {
    history.push('/requests/addnew')
  }

  const tabs = [
    {
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
      },
    },
    {
      title: 'Myr Requests',
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
        btnAction: onAdd
      },
    },
    {
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
      },
    },
  ]
 
  return (
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <CardListSwitchLayout tabs={tabs} active={activeKey} />
        </Col>
      </Row>
  );
};
