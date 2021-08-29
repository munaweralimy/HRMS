import React, { useMemo, useState } from 'react';
import { Card, Row, Col, Typography, Rate, Radio, Space, Tag } from 'antd';
import ButtonRadio from '../../../../../../../../assets/img/radio-on-button.svg';
import SmallStatusCard from '../../../../../../../atoms/SmallStatusCard';

let arr = [
  { perentage: '65%', text: 'Front-end Developer', status: 'success' },
  { perentage: '48%', text: 'Project Manager', status: 'pending' },
  { perentage: '42%', text: 'Sales', status: 'pending' },
  { perentage: '37%', text: 'Animator', status: 'pending' },
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
    text: '0-3 Years of Tenureship',
  },
  {
    status: 'Eligible',
    iColor: 'info-tag b-success w-100',
    title: 'Senior Executive',
    text: '3-7 Years of Tenureship',
  },
];

const EditManagment = () => {
  const { Title, Text } = Typography;
  const [ratingBox, setRatingBox] = useState([]);

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
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Card className="small-card8 b-black" bordered={false}>
          <Space size={5} direction="vertical" className="w-100" align="center">
            <Title level={2} className="mb-0 c-success">
              76%
            </Title>
            <Text className="c-gray">Fit Index</Text>
            <Title level={4} className="mb-0 c-white">
              Graphic Designer
            </Title>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Title level={4} className="mb-0">
          Other Job Opportunities
        </Title>
      </Col>
      {arr.map((value, key) => (
        <Col span={6} key={key}>
          <Card className="small-card8 b-black" bordered={false}>
            <Space size={8} direction="vertical" className="w-100" align="center">
              <Title level={3} className={`mb-0 ${value.status === 'success' ? 'c-success' : 'c-pending'}`}>
                {value.perentage}
              </Title>
              <Text className="c-gray">{value.text}</Text>
            </Space>
          </Card>
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
          <Card className="small-card8 b-black" bordered={false}>
            <Space size={8} direction="vertical" className="w-100" align="center">
              <Tag className={value.iColor}>{value.status}</Tag>
              <Title level={5} className={`mb-0 c-white`}>
                {value.title}
              </Title>
              <Text className="c-gray">{value.text}</Text>
            </Space>
          </Card>
        </Col>
      ))}
      <Col span={24}>
        <Space size={8} direction="vertical" className="w-100" align="start">
          <Title level={4} className={`mb-0`}>
            Job Releated Skills
          </Title>
          <Text className="c-gray">Graphics Desinger</Text>
        </Space>
      </Col>
      <Col span={24}>
        <Radio.Group onChange={createCheckBox}>{ratingBox.length > 0 ? ratingBox : setIndexing()}</Radio.Group>
      </Col>
    </Row>
  );
};

export default EditManagment;
