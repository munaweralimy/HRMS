import React from 'react';
import ListCard from '../../../../../../../../molecules/ListCard';
import moment from 'moment';

const colName = [
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
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Last Date',
      dataIndex: 'last_date',
      key: 'start_date',
      sorter: true,
    },
    {
      title: 'Exit From',
      dataIndex: 'exit_date',
      key: 'exit_date',
      sorter: true,
      
    },
  ];

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible, mode } = props;

    return (
          <ListCard
          scrolling={500}
          title="Termination & Resignation"
          ListCol={colName}
          ListData={data?.term_Resign}
          pagination={false}
          extraBtn={'Terminate Employee'}
          extraAction={() => console.log('---')}
          btnClass='red-btn'
          scrolling={500}
          listClass="nospace-card"
          />
    )
}