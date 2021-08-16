import React from 'react';
import { Button } from 'antd';
import ListCard from '../../../../molecules/ListCard';
const Acquisitions = () => {
  const colName = [
    {
      title: 'Job Title',
      dataIndex: 'jobtitle',
      key: 'jobtitle',
      sorted: (a, b) => a.jobtitle - b.jobtitle,
      render: (text) => (
        <Button type="text" className="p-0" onClick={() => {}}>
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
      title: 'Date Open',
      dataIndex: 'dateopen',
      key: 'dateopen',
      sorted: (a, b) => a.dateopen - b.dateopen,
    },
    {
      title: 'Suitable Application',
      dataIndex: 'suitableappalication',
      key: 'suitableappalication',
      sorted: (a, b) => a.suitableappalication - b.suitableappalication,
      align: 'center',
      render: (text) => (Number(text) > 0 ? <span className="c-pending">{text}</span> : text),
    },
  ];
  const data = [
    {
      jobtitle: 'Graphic Designer',
      company: 'Centre for Content Creation Sdn. Bhd.',
      dateopen: '15th February 2021',
      suitableappalication: '3',
    },
  ];
  return <ListCard ListCol={colName} ListData={data} title="Job Openings" />;
};

export default Acquisitions;
