import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import ListCard from '../../../../../molecules/ListCard';

const colName = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorted: (a, b) => a.id - b.id,
    render: (text) => (
      <Button type="text" className="p-0" onClick={() => {}}>
        {text}
      </Button>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorted: (a, b) => a.name - b.name,
  },
  {
    title: 'Job Title',
    dataIndex: 'jobtitle',
    key: 'jobtitle',
    sorted: (a, b) => a.jobtitle - b.jobtitle,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorted: (a, b) => a.status - b.status,
    align: 'center',
    render: (text) => (Number(text) > 0 ? <span className="c-pending">{text}</span> : text),
  },
];
const data = [
  {
    id: 1,
    name: 'Ahmed Faraz',
    jobtitle: 'Senior Software Engineer',
    status: '1 issues',
  },
  {
    id: 1,
    name: 'Ahmed Faraz',
    jobtitle: 'Senior Software Engineer',
    status: '1 issues',
  },
  {
    id: 1,
    name: 'Ahmed Faraz',
    jobtitle: 'Senior Software Engineer',
    status: '1 issues',
  },
  {
    id: 1,
    name: 'Ahmed Faraz',
    jobtitle: 'Senior Software Engineer',
    status: '1 issues',
  },
];
const MemberList = () => {
  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <ListCard ListCol={colName} ListData={data} pagination={true} title="Job Opening" />
        </Col>
      </Row>
    </Card>
  );
};

export default MemberList;
