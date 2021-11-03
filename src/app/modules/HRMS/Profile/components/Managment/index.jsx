import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Typography, Space, Tag, Card, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import StatsCard from './components/Stats';
import JobRelatedSkills from './components/JobRelatedSkills';
import OtherSkills from './components/OtherSkills'

import { getFitFigure } from '../../../Advancement/dcuks/action';

let arr = [
  { percent: 65, jobRole: 'Front-end Developer' },
  { percent: 48, jobRole: 'Project Manager' },
  { percent: 42, jobRole: 'Sales' },
  { percent: 10, jobRole: 'Animator' },
];

const { Title, Text } = Typography;

export default ({id}) => {

  const dispatch = useDispatch();
  const figures = useSelector(state => state.advancement.fitFigures)

  useEffect(() => {
    updateApi();
  }, []);

  const updateApi = () => {
    dispatch(getFitFigure(id));
  }

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20,20]}>
          <Col span={24}>
            <StatsCard mainHeading={true} percent={76} jobRole="Graphic Designer" />
          </Col>
          <Col span={24}>
            <Space direction='vertical' size={30} className='w-100'>
              <Title level={4} className="mb-0 c-default">Other Job Opportunities</Title>
              <Row gutter={[20,20]}>
              {arr.map((value, index) => (
                <Fragment key={index}>
                  <Col flex="1 0 150px">
                    <StatsCard percent={value.percent} jobRole={value.jobRole} />
                  </Col>
                </Fragment>
              ))}
              </Row>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
          <JobRelatedSkills data={figures} updateApi={updateApi} id={id} />
      </Col>
      <Col span={24}>
          <OtherSkills data={figures} updateApi={updateApi} id={id} />
      </Col>
    </Row>
  );
};