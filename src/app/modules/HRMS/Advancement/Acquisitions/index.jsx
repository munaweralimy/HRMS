import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import AddEditJob from '../components/AddEditJob';
import ListCard from '../../../../molecules/ListCard';
import { onAddJob } from '../dcuks/action';
import { useDispatch, useSelector } from 'react-redux';

const colName = [
  {
    title: 'Job Title',
    dataIndex: 'jobtitle',
    key: 'jobtitle',
    sorted: (a, b) => a.jobtitle - b.jobtitle,
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

const Acquisitions = () => {
  const [viewJobOpenings, setViewJobOpenings] = useState(false);
  const [rowData, setRowData] = useState();
  const dispatch = useDispatch();
  const viewAddJob = useSelector((state) => state.advancement.addJob);
  console.log({ viewAddJob });

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowData(record);
        setViewJobOpenings(true);
      },
    };
  };

  const onGoBack = () => {
    setRowData('');
    setViewJobOpenings(false);
    dispatch(onAddJob(false));
  };
  return viewJobOpenings || viewAddJob ? (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Row gutter={[24, 30]} align="bottom">
            <Col span={24}>
              <Button
                type="link"
                htmlType="button"
                className="p-0 c-gray-linkbtn"
                icon={<LeftOutlined />}
                onClick={onGoBack}
              >
                Job Openings
              </Button>
            </Col>
            <Col span={24}>
              <AddEditJob rowData={rowData} colName={colName} data={data} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  ) : (
    <ListCard ListCol={colName} ListData={data} title="Job Openings" onRow={onClickRow} />
  );
};

export default Acquisitions;
