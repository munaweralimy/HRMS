import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import SideDetails from '../../../../molecules/SideDetails';
import EmpAttendance from '../components/EmpAttendance';
const sideData = [
  {
    type: 'code',
    text: 'Scholarship',
    title: '',
  },
  {
    type: 'reversetitleValue',
    title: 'Schemes',
    level1: 3,
    level2: 4,
    value: '',
  },
  {
    type: 'reversetitleValue',
    title: 'Active Students',
    level1: 3,
    level2: 4,
    value: '',
  },
  {
    type: 'titleValue',
    title: 'Created',
    space: 10,
    level: 4,
    value: '',
    noDivider: true,
  },
];

const bottomList = [
  {
    title: 'Delete Term',
    type: 'button',
    class: 'black-btn',
    action: () => setVisible(true),
  },
];
const EmpAttendanceDetail = () => {
  const { Title } = Typography;
  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title="Staff Details" />
      </Col>
      <Col span={8}>
        <SideDetails data={sideData} type="button" bottom={[]} />
      </Col>
      <Col span={16}>
        <Card bordered={false} className="scrolling-card">
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <EmpAttendance />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default EmpAttendanceDetail;
