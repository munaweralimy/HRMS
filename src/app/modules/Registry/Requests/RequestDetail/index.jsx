import React from 'react';
import { Row, Col, Form, Typography, Card, Descriptions, Space, Button } from 'antd';
import { LoadingOutlined, CheckCircleFilled } from '@ant-design/icons';
import SidarApplication from './component/sidebar';
import RequestInfo from '../components/RequestInfo';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default (props) => {
  const { control } = useForm();
  const i18n = useTranslate();
  const { t } = i18n;

  return (
    <>
      <Row gutter={[24, 24]} justify="center" align="middle" className="mb-2">
        <Col flex="auto">
          <Title level={3} className="text-white mb-0">
            Request Details
          </Title>
        </Col>
      </Row>
      <Form layout="vertical">
        <Row gutter={[24, 24]} className="heightAuto">
          <Col span={8}>
            <SidarApplication />
          </Col>

          <Col span={16}>
            <Row gutter={[24, 24]} className="heightAuto">
              <Col span={24}>
                <RequestInfo control={control} heading={'Requests'} t={t} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};
