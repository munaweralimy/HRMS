import React, { useState } from 'react';
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
  const dataPending = useSelector((state) => state.request.requestListPending);
  const dataYour = useSelector((state) => state.request.requestListYourRequest);
  const dataArchive = useSelector((state) => state.request.requestListArchive);
  
  const onAction1 = (status, page, sort) => {
      dispatch(getRequestPending('AQA', page, sort));
  }

  const onAction2 = (status, page, sort) => {
    dispatch(getYourRequest('AQA', page, sort));
  }

  const onAction3 = (status, page, sort) => {
      dispatch(getRequestArchive('AQA', page, sort));
  }

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
        innerKey: 'staff_id',
        activeTab: activeKey,
        updateApi: onAction1,
      },
    },
    {
      title: 'Your Requests',
      key: 'yourrequests',
      count: dataYour?.count,
      Comp: RequestSection,
      iProps : {
        key: 'yourrequests',
        data: dataYour?.rows || [],
        count: dataYour?.count || 0,
        link: '/requests/',
        innerKey: 'staff_id',
        activeTab: activeKey,
        updateApi: onAction2,
        addbtn: '+ New Request',
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
        link: '/aqa/requests/',
        innerKey: 'student id',
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