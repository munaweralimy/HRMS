import React from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import OverallFit from './OverallFit';
import Acquisitions from './Acquisitions';
import { useTranslate } from 'Translate';
import { PlusOutlined } from '@ant-design/icons';
const data = [
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    department: 'Exp Date: 16 Feb 2020',
    status: 'Pending Request',
  },
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    department: 'Exp Date: 16 Feb 2020',
    status: 'Pending Request',
  },
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    department: 'Exp Date: 16 Feb 2020',
    status: 'Pending Request',
  },
  {
    name: 'Walter Gibson',
    student: '123686234',
    form_name: 'Low Fit Index',
    department: 'Exp Date: 16 Feb 2020',
    status: 'Pending Request',
  },
];
const btnList = [
  {
    text: 'Add Job Oppening',
    icon: <PlusOutlined />,
    action: () => {},
  },
];

const Advancement = () => {
  const il8n = useTranslate();
  const { t } = il8n;
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <HeadingChip title={t('HRMS.Advancement.title1')} />
      </Col>
      <Col span={24}>
        <OverallFit data={data} />
      </Col>
      <Col span={24}>
        <HeadingChip title={t('HRMS.Advancement.title2')} btnList={btnList} />
      </Col>
      <Col span={24}>
        <Acquisitions />
      </Col>
    </Row>
  );
};

export default Advancement;
