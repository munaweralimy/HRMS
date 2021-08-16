import React from 'react';
import { Row, Col, Card } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import SideDetails from '../../../../molecules/SideDetails';
import MemberList from '../components/MemberList';
import UpdateSection from '../../../../molecules/UpdateSection';
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
    title: 'Issue Warning Letter',
    type: 'button',
    class: 'black-btn',
    action: () => {},
  },
];

// const data = [
//   {
//     team: 'Graphic Designer',
//     company: 'Centre for Content Creation Sdn. Bhd.',
//     teammember: '9',
//     created: '15th February 2021',
//     status: '3 Issues',
//   },
// ];
const TeamDetails = () => {
  const il8n = useTranslate();
  const { t } = il8n;
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <HeadingChip title={'Team Details'} />
      </Col>
      <Col span={8}>
        <SideDetails data={sideData} cardType="empty" type="button" bottom={bottomList} />
      </Col>
      <Col span={16}>
        <Card bordered={false} className="scrolling-card">
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <MemberList />
            </Col>
            <Col span={24}>
              <UpdateSection data={[]} module={'HRMS'} updateComment={[]} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default TeamDetails;
