import React, { useState } from 'react';
import { Row, Col, Typography, Radio, Space, Tag, Card, Form, Button } from 'antd';
import StatsCard from '../../../../components/Stats';
import EmployerStaus from '../../../../components/development';
import { customIcon } from '../../../../components/Rating';
import { RateField } from '../../../../components/FormElement';
import Aptitudes from '../../../../components/Aptitudes';
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

const EditManagment = () => {
  const { Title, Text } = Typography;
  const [ratingBox, setRatingBox] = useState([]);
  const { control, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employee_children',
  });
  const setIndexing = (index = { target: { value: 2 } }) => {
    const checked = [];
    for (let i = 1; i <= index.target.value; i++) {
      checked.push(<Radio value={index.target.value}></Radio>);
    }
    for (let j = index.target.value + 1; j <= 5; j++) {
      checked.push(<Radio value={j}></Radio>);
    }
    return checked;
  };

  const createCheckBox = (e) => {
    if (e) {
      setRatingBox(setIndexing(e));
    } else {
      setRatingBox(setIndexing());
    }
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
                        <Col>
                          <CloseCircleFilled />
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
                  <Button className="green-btn w-100">Save Changes</Button>
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
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditManagment;
