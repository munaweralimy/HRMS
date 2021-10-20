import React, { useState, useEffect } from 'react';
import { Tabs, Button, Spin, message } from 'antd';
import ListWithDetails from './ListWithDetails';
import { apiMethod } from '../../../../../../configs/constants';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../../../../services/axiosInterceptor';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const { id, data, updateApi } = props;
  const [load, setLoad] = useState(false);
  const [update, setUpdate] = useState(false);
  
  const ListCol = [
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
      sorter: true,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      elipsis: true,
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      elipsis: true,
      sorter: true,
    },
    {
      title: 'Start',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: true,
    },
    {
      title: 'End',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: true,
    },
  ]

  const onApprove = async (name) => {
    setLoad(true)
    let url = `${apiMethod}/hrms.api.approve_reject_timesheet?employee_id=${id}&name=${name}&status=Approved`
    try {
      await axios.get(url);
      setLoad(false)
      message.success('Timesheet Successfully Approved');
      setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);

    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      setLoad(false)
    }

  }

  const onReject = async (name) => {
    setLoad(true)
    let url = `${apiMethod}/hrms.api.approve_reject_timesheet?employee_id=${id}&name=${name}&status=Rejected`
    try {
      await axios.get(url);
      setLoad(false)
      message.success('Timesheet Successfully Rejected');
      setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);

    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      setLoad(false)
    }
  }

  const tabs = {
    data: data,
    column: ListCol,
  }

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <ListWithDetails details={tabs} />
    </Spin>
  )
}