import React, { useState, useEffect } from 'react';
import ListCard from '../../../../../../../molecules/ListCard';
import DetailsComponent from '../../../../../../../molecules/HRMS/DetailsComponent';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../../../configs/constantData';
import moment from 'moment';

export default ({details}) => {

  const { title, key, heading, data, column, nodetail, detailTitle, onAction1,onAction2 } = details;
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const btnList = [
    {
      text: '+ Add New Timesheet',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1')},
    },
  ];

  const onClickRow = (record) => {

    return {
      onClick: () => {
        setRowDetail(true)
        let temp = [
          {
            label: 'Timesheet Date',
            value: record?.date ? moment(record.date).format('Do MMMM YYYY') : ''
          },
          {
            label: 'Project Name',
            value: record?.project
          },
          {
            label: 'Total Hours',
            value: record?.hours
          },
          {
            label: 'Task',
            value: record?.tasks
          },
          {
            label: 'Status',
            value: record?.status,
            classi: record?.status =='Rejected' ? 'c-error' : record?.status == 'Approve' ? 'c-success' : 'c-pending' 
          },
        ];
        console.log('temping', temp)
        setRowData(temp)
      },
    };
  }

    return (
        <>
        {!rowDetails ?
            <ListCard 
            title={heading}
            onRow={!nodetail ? onClickRow : null}
            ListCol={column} 
            ListData={data} 
            pagination={true}
            classes={`${!nodetail ? 'clickRow' : ''}`}
            scrolling={500}
            listClass="nospace-card"
            headclass='mt-1'
            />
            :
            <DetailsComponent 
            setRowDetail={setRowDetail} 
            mainTitle={detailTitle}
            backbtnTitle={heading}
            data={rowData}
            btn1title={'Approve'}
            btn2title={'Reject'}
            onAction1={onAction1}
            onAction2={onAction2}
            btnClass1='green-btn'
            btnClass2='red-btn'
            />
            }
        </>
    )
}