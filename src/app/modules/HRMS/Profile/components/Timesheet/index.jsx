import React, { useState, useEffect } from 'react';
import { Tabs, Button, Spin, message } from 'antd';
import ListWithDetails from './ListWithDetails';
import { apiMethod } from '../../../../../../configs/constants';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../../../../services/axiosInterceptor';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const { id, data, tabSelected, updateApi } = props;
  const [load, setLoad] = useState(false);
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState(tabSelected ? tabSelected : 'Pending');

  const ListCol = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      elipsis: true,
      sorter: true,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      align: 'center',
      sorter: true,
    },
    {
      title: 'Task',
      dataIndex: 'tasks',
      key: 'tasks',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      render: (text) => {
        let clname = '';
        if (text == 'Approved') {
          clname = 'c-success';
        } else if (text == 'Rejected') {
          clname = 'c-error';
        } else if (~text.indexOf('Pending')) {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
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
    title: 'Pending',
    key: 'Pending',
    heading: 'Pending Timesheet List',
    data: data,
    column: ListCol,
    nodetail: false,
    detailTitle: 'Pending Timesheet Details',
    onAction1: onApprove,
    onAction2: onReject,
  }

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <ListWithDetails details={tabs} updateApi={updateApi} update={update} />
    </Spin>
  )
}