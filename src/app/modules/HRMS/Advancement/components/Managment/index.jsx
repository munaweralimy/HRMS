import React, { useState } from 'react';
import { Row, Col, Typography, Radio, Space, Tag, Card, Form, Button } from 'antd';
import StatsCard from '../Stats';
import EmployerStaus from '../development';
import { customIcon } from '../Rating';
import { RateField } from '../FormElement';
import Aptitudes from '../Aptitudes';
import { useForm, useFieldArray } from 'react-hook-form';
import { CloseCircleFilled } from '@ant-design/icons';
let arr = [
  { percent: 65, jobRole: 'Front-end Developer' },
  { percent: 48, jobRole: 'Project Manager' },
  { percent: 42, jobRole: 'Sales' },
  { percent: 10, jobRole: 'Animator' },
];
let tenure = [
  {
    years: '10 Years',
    status: 'Total Tenureship',
  },
  {
    years: '6 Years',
    status: 'Current Job Tenureship',
  },
];

const eligibal = [
  {
    status: 'Current Positon',
    iColor: 'info-tag w-100',
    title: 'Junior Executive',
    experience: '0-3 Years of Tenureship',
  },
  {
    status: 'Eligible',
    iColor: 'info-tag b-success w-100',
    title: 'Senior Executive',
    experience: '3-7 Years of Tenureship',
  },
];

const jobRelated = [
  {
    title: 'Adobe Photoshop',
    value1: 4,
    value2: 5,
  },
  {
    title: 'Adobe Illustrator',
    value1: 3,
    value2: 4,
  },
  {
    title: 'Adobe XD',
    value1: 2,
    value2: 4,
  },
];

const otherJobSkills = [
  'Figma',
  'Procreate',
  'Adobe in Design',
  'Microsoft PowerPoint',
  'Microsoft Word',
  'Microsoft Excel',
];
const initQ = {
  name: '',
  status: '',
  department: '',
  remarks: false,
};
export default (props) => {
  const { Title, Text } = Typography;
  const { control, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'other skills',
  });

  const onAdd = () => {
    append(initQ);
  };
  const onRemove = (name, index) => {
    remove(index);
  };

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <StatsCard mainHeading={true} percent={76} jobRole="Graphic Designer" />
      </Col>
      <Col span={24}>
        <Title level={4} className="mb-0">
          Other Job Opportunities
        </Title>
      </Col>
      {arr.map((value, key) => (
        <Col flex="1 0 150px" key={key}>
          <StatsCard percent={value.percent} jobRole={value.jobRole} />
        </Col>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Career Development
        </Title>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]} justify="start">
          {tenure.map((value, key) => (
            <Col key={key}>
              <Space size={5} direction="vertical" className="w-100" align="start">
                <Text className="mb-0 c-gray">{value.status}</Text>
                <Title level={3} className={`mb-0 c-white`}>
                  {value.years}
                </Title>
              </Space>
            </Col>
          ))}
        </Row>
      </Col>
      {eligibal.map((value, key) => (
        <Col span={12} key={key}>
          <EmployerStaus
            iColor={value.iColor}
            status={value.status}
            title={value.title}
            experience={value.experience}
          />
        </Col>
      ))}
      <Col span={24}>
        <Space size={8} direction="vertical" className="w-100" align="start">
          <Title level={4} className="mb-0">
            Job Releated Skills
          </Title>
          <Text className="c-white">Graphics Desinger</Text>
        </Space>
      </Col>
      <Col span={24}>
        <Form layout="vertical">
          <Row gutter={[24, 30]}>
            {jobRelated.map((value, index) => (
              <Col span={24} key={index}>
                <Card className="small-card8 b-black" bordered={false}>
                  <Row gutter={[24, 30]} align="middle" justify="space-between">
                    <Col span={24}>
                      <Row gutter={[20, 30]} align="middle" justify="space-between">
                        <Col>
                          <Title level={4} className="mb-0">
                            {value.title}
                          </Title>
                        </Col>
                        <Col flex="40px">
                          <Button
                            type="link"
                            size="large"
                            className="cross-iconbtn"
                            htmlType="button"
                            icon={<CloseCircleFilled />}
                            onClick={() => onRemove(item.name, index)}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <RateField
                        fieldname="rate"
                        label="Supervisor Assessment"
                        control={control}
                        initValue={value.value1}
                        iProps={{ character: ({ index }) => customIcon[index + 1] }}
                      />
                    </Col>
                    <Col>
                      <RateField
                        fieldname="rate"
                        label="Staff Self Assessment"
                        control={control}
                        initValue={value.value2}
                        iProps={{ character: ({ index }) => customIcon[index + 1] }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
            <Col span={24}>
              <Text className="c-white">Other Job Related Skills</Text>
            </Col>
            <Col span={24}>
              <Row gutter={20}>
                {otherJobSkills.map((value, index) => (
                  <Col key={index}>
                    <Tag className="info-tag w-100">{value}</Tag>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={20} justify="end">
                <Col>
                  <Button type="primary" className="green-btn w-100">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Title level={4} className="mb-0">
                Other Skills
              </Title>
            </Col>
            <Col span={24}>
              <Space direction="vertical" size={15} className="w-100">
                {fields.map((item, index) => (
                  <Card className="small-card8 b-black" bordered={false}>
                    <Row gutter={[24, 30]} align="middle" justify="space-between">
                      <Col span={24}>
                        <Row gutter={[20, 30]} align="middle" justify="space-between">
                          <Col>
                            <Title level={4} className="mb-0">
                              Rating Component
                            </Title>
                          </Col>
                          <Col flex="40px">
                            <Button
                              type="link"
                              size="large"
                              className="cross-iconbtn"
                              htmlType="button"
                              icon={<CloseCircleFilled />}
                              onClick={() => onRemove(item.name, index)}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <RateField
                          fieldname="rate"
                          label="Supervisor Assessment"
                          control={control}
                          initValue=""
                          iProps={{ character: ({ index }) => customIcon[index + 1] }}
                        />
                      </Col>
                      <Col>
                        <RateField
                          fieldname="rate"
                          label="Staff Self Assessment"
                          control={control}
                          initValue=""
                          iProps={{ character: ({ index }) => customIcon[index + 1] }}
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Col>
            <Col span={24}>
              <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={onAdd}>
                + Add other Skills
              </Button>
            </Col>
            <Col span={24}>
              <Row gutter={20} justify="end">
                <Col>
                  <Button type="primary" className="green-btn w-100">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Title level={4} className="mb-0">
                Aptitudes
              </Title>
            </Col>
            <Col span={24}>
              <Aptitudes control={control} errors={errors} />
            </Col>
            <Col span={24}>
              <Row gutter={20} justify="end">
                <Col>
                  <Button type="primary" className="green-btn w-100">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};