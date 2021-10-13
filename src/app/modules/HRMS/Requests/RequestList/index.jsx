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
  const [activeKey, setActiveKey] = useState('pending');
  const dataPending = useSelector((state) => state.hrmsrequests.requestListPending);
  const dataYour = useSelector((state) => state.hrmsrequests.requestListYourRequest);
  const dataArchive = useSelector((state) => state.hrmsrequests.requestListArchive);
  
  const onAction1 = (status, page, sort, limit) => {
      dispatch(getRequestPending(page, sort,limit));
  }

  const onAction2 = (status, page, sort, limit) => {
    dispatch(getYourRequest(page, sort,limit));
  }

  const onAction3 = (status, page, sort, limit) => {
      dispatch(getRequestArchive(page, sort,limit));
  }

  useEffect(() => {
    console.log('pending', dataPending)
  }, [dataPending]);

  const onAdd = () => {
    history.push('/requests/addnew')
  }

  const tabs = [
    {
      visible: allowed([Roles.REQUESTS]),
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
        btnAction: onAdd,
        limit: props.dashboard== true ? 3 : 6
      },
    },
    {
      visible: allowed([Roles.REQUESTS_INDIVIDUAL]),
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
 
  return (
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <CardListSwitchLayout tabs={tabs} active={activeKey} />
        </Col>
      </Row>
  );
};
