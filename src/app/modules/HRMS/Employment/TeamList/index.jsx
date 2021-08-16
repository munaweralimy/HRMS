import React from 'react';
import { Button } from 'antd';
import ListCard from '../../../../molecules/ListCard';
import Search from '../components/Search';
import { useHistory } from 'react-router-dom';
const TeamList = () => {
  const history = useHistory();
  const colName = [
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      sorted: (a, b) => a.team - b.team,
      render: (text) => (
        <Button
          type="text"
          className="p-0"
          onClick={() => {
            history.push('/hrms/employment/teamdetails');
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorted: (a, b) => a.company - b.company,
    },
    {
      title: 'Team Member',
      dataIndex: 'teammember',
      key: 'teammember',
      sorted: (a, b) => a.teammember - b.teammember,
      align: 'center',
    },
    {
      title: 'Crated',
      dataIndex: 'created',
      key: 'created',
      sorted: (a, b) => a.created - b.created,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorted: (a, b) => a.created - b.created,
    },
  ];
  const data = [
    {
      team: 'Graphic Designer',
      company: 'Centre for Content Creation Sdn. Bhd.',
      teammember: '9',
      created: '15th February 2021',
      status: '3 Issues',
    },
  ];

  const onSearch = () => {};

  return <ListCard ListCol={colName} ListData={data} Search={Search} onSearch={onSearch} />;
};

export default TeamList;
