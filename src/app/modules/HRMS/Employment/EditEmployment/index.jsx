import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import SideDetails from '../../../../molecules/SideDetails';
import EditEmployee from '../components/EditEmployeeForm';
import UpdateSection from '../../../../molecules/UpdateSection';
import ListCard from '../../../../molecules/ListCard';
import { DownloadIcon } from '../../../../atoms/CustomIcons';

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
const upoloadedDocs = [
  {
    title: 'Type',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.faculty.length - b.faculty.length,
    ellipsis: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sorter: (a, b) => a.faculty.length - b.faculty.length,
    ellipsis: true,
  },
  {
    title: 'Applied',
    dataIndex: 'applied',
    key: 'applied',
    sorter: (a, b) => a.faculty.length - b.faculty.length,
    // render: (text, record) => moment(text).format('LL'),
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    key: 'expiry',
    sorter: (a, b) => a.term_start.length - b.term_start.length,
    // render: (text, record) => moment(text).format('LL'),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => <DownloadIcon />,
    // render: (text, record) => moment(text).format('LL'),
  },
];

const EditEmployment = () => {
  return (
    <Fragment>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/hrms/employment">Back</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[30, 24]}>
        <Col span={24}>
          <HeadingChip title="Staff Details" />
        </Col>
        <Col span={8}>
          <SideDetails data={sideData} type="button" bottom={bottomList} />
        </Col>
        <Col span={16}>
          <Card bordered={false} className="scrolling-card">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <EditEmployee
                // setValue={setValue}
                //mode="add"
                // deleted={deleted}
                // setDeleted={setDeleted}
                // t={t}
                />
              </Col>
              <Col span={24}>
                <Card bordered={false} className="uni-card h-auto">
                  <ListCard title={'Documents'} ListCol={upoloadedDocs} ListData={[]} pagination={false} />
                  <Row gutter={24} justify="end">
                    <Col>
                      <Button size="large" type="primary">
                        + Upload Document
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={24}>
                <UpdateSection data={[]} module={'HRMS'} updateComment={[]} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditEmployment;
