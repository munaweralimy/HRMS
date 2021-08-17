import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import SideDetails from '../../../../molecules/SideDetails';
import EditFinanceForms from '../components/EditFinanceForms';
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
const EditFinance = () => {
  return (
    <Fragment>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/finance">Back</Breadcrumb.Item>
      </Breadcrumb>
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
                <EditFinanceForms />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditFinance;
