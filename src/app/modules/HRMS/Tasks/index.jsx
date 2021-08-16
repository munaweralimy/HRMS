import React from 'react';
import { Row, Col } from 'antd';
import { useTranslate } from 'Translate';
import TaskTabs from './components/TaskTabs';

export default (props) => {
  const il8n = useTranslate();
  const { t } = il8n;

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <TaskTabs t={t} />
      </Col>
    </Row>
  );
};