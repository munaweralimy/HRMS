import React from 'react';
import { Radar } from '@ant-design/charts';
import { Divider, Space, Card, Row, Col } from 'antd';
import { RateField } from '../FormElement';
import { customIcon } from '../Rating';

const data = [
  { name: 'Work Quality', rating: 4 },
  { name: 'Work Speed', rating: 4 },
  { name: 'Leadership', rating: 1 },
  { name: 'Critical Thinking', rating: 5 },
  { name: 'Teamwork', rating: 2 },
];
const config = {
  data: data.map((d) => ({ ...d, rating: d.rating })),
  xField: 'name',
  yField: 'rating',
  meta: {
    rating: {
      alias: 'Rating',
      min: 0,
      nice: true,
    },
  },
  xAxis: {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  },
  yAxis: {
    label: false,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
    },
  },
  point: {},
  area: {},
};
const Aptitudes = (props) => {
  const { control, errors } = props;
  return (
    <Card bordered={false} className="uni-card small-card8 b-black">
      <Space direction="vertical" align="center" className="w-100">
        <Radar {...config} />
      </Space>
      <Divider />

      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={[20, 30]} align="middle" justify="space-between">
            <Col>
              <RateField
                fieldname="rate"
                label="Work Quality"
                control={control}
                initValue=""
                iProps={{ character: ({ index }) => customIcon[index + 1] }}
              />
            </Col>
            <Col>
              <RateField
                fieldname="rate"
                label="Work Speed"
                control={control}
                initValue=""
                iProps={{ character: ({ index }) => customIcon[index + 1] }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 30]} align="middle" justify="space-between">
            <Col>
              <RateField
                fieldname="rate"
                label="Leadership"
                control={control}
                initValue=""
                iProps={{ character: ({ index }) => customIcon[index + 1] }}
              />
            </Col>
            <Col>
              <RateField
                fieldname="rate"
                label="Critical Thinking"
                control={control}
                initValue=""
                iProps={{ character: ({ index }) => customIcon[index + 1] }}
              />
            </Col>
            <Col span={24}>
              <Row gutter={[20, 30]} align="middle" justify="space-between">
                <Col>
                  <RateField
                    fieldname="rate"
                    label="Team Work"
                    control={control}
                    initValue=""
                    iProps={{ character: ({ index }) => customIcon[index + 1] }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Aptitudes;
