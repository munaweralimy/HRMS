import React, { useState, useEffect } from 'react';
import { Row, Tabs, Button } from 'antd';
import ListWithDetails from './ListWithDetails';

const { TabPane } = Tabs;

export default (props) => {

    const { data, tabSelected } = props;
    const [activeTab, setActiveTab] = useState(tabSelected ? tabSelected : 'pending');

    const ListCol = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            elipsis: true
        },
        {
            title: 'Hours',
            dataIndex: 'hours',
            key: 'hours',
            align: 'center',
        },
        {
            title: 'Task',
            dataIndex: 'tasks',
            key: 'tasks',
            ellipsis: true,
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

      const ListCol2 = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 250,
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
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: 120,
            render: (text) => (
                <Button type="primary" htmlType='button' danger>Notify</Button>
            ),
        },
      ]

      const onPendingAction = (status, id) => {
          console.log('apr', status, id);
      }
      

    const tabs = [
        {
            title: 'Pending',
            key: 'pending',
            heading: 'Pending Timesheet List',
            data: data?.pending,
            column: ListCol,
            nodetail: false,
            detailTitle: 'Pending Timesheet Details',
            onAction1: onPendingAction,
            onAction2: onPendingAction,
        },
        {
            title: 'Issues',
            key: 'issues',
            data: data?.issues,
            heading: 'Missed Timesheet List',
            column: ListCol2,
            nodetail: true,
        },
        {
            title: 'History',
            key: 'history',
            data: data?.history,
            heading: 'Timesheet Archive',
            column: ListCol,
            nodetail: false,
            detailTitle: 'Timesheet Details',
        },
    ]
 
    return (
        <Tabs activeKey={activeTab} type="card" className="gray-tabs" onChange={(e) => setActiveTab(e)}>
            {tabs.map((item) => (
                <TabPane tab={item.title} key={item.key}>
                    <ListWithDetails details={item} />
                </TabPane>
            ))}
        </Tabs>
    )
}