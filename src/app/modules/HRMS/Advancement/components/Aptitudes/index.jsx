import React, { useState, useEffect } from 'react';
import { Radar } from '@ant-design/charts';
import { Divider, Space, Card, Col, Spin, Row, Typography,Form, Button } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import { RatingStars } from '../RateCard/Rating';
import { RateField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default (props) => {
  
  const { data, updateApi, id } = props;
  const [load, setLoad] = useState(false);
  const { handleSubmit, setValue, control } = useForm();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if(Object.keys(data).length > 0) {
      setChartData([
        { name: 'Work Quality', rating: data.work_quality },
        { name: 'Work Speed', rating: data.work_speed },
        { name: 'Leadership', rating: data.leadership },
        { name: 'Critical Thinking', rating: data.critical_thinking },
        { name: 'Teamwork', rating: data.team_work },
      ]);
    }
  }, []);

  const config = {
    data: chartData.map((d) => ({ ...d, rating: d.rating })),
    xField: 'name',
    yField: 'rating',
    autoFit: true,
    color: '#02A574',
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

  const onFinish = (val) => {

  }
  
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20,30]}>
          <Col flex='auto'>
            <Space size={10} direction="vertical" className="w-100">
              <Title level={4} className="mb-0 c-default">Aptitudes</Title>
            </Space>
          </Col>
          <Col><Text className='c-gray'>Last Assessed : 3 Months Ago</Text></Col>
          <Col span={24}>
            <Card bordered={false} className="uni-card small-card8 b-black">
              <Space direction="vertical" align="center" className="w-100">
                <Radar {...config} />
              </Space>
              <Divider />

              <Row gutter={[20, 20]} justify='space-between'>
                <Col flex='0 1 285px'>
                  <RateField
                    class='ratingField green-rate mb-0'
                    fieldname="work_quality"
                    label="Work Quality"
                    control={control}
                    initValue={data?.work_quality || 0}
                    iProps={{ character: ({ index }) => RatingStars[index + 1] }}
                  />
                </Col>
                <Col flex='0 1 285px'>
                  <RateField
                    class='ratingField green-rate mb-0'
                    fieldname="work_speed"
                    label="Work Speed"
                    control={control}
                    initValue={data?.work_speed || 0}
                    iProps={{ character: ({ index }) => RatingStars[index + 1] }}
                  />
                </Col>
                <Col flex='0 1 285px'>
                  <RateField
                    class='ratingField green-rate mb-0'
                    fieldname="leadership"
                    label="Leadership"
                    control={control}
                    initValue={data?.leadership || 0}
                    iProps={{ character: ({ index }) => RatingStars[index + 1] }}
                  />
                </Col>
                <Col flex='0 1 285px'>
                  <RateField
                    class='ratingField green-rate mb-0'
                    fieldname="critical_thinking"
                    label="Critical Thinking"
                    control={control}
                    initValue={data.critical_thinking || 0}
                    iProps={{ character: ({ index }) => RatingStars[index + 1] }}
                  />
                </Col>
                <Col flex='0 1 285px'>
                  <RateField
                    class='ratingField green-rate mb-0'
                    fieldname="team_work"
                    label="Team Work"
                    control={control}
                    initValue={data?.team_work || 0}
                    iProps={{ character: ({ index }) => RatingStars[index + 1] }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Row gutter={24} justify='end'>
              <Col>
                <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};