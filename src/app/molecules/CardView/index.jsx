import React from 'react';
import { Row, Col } from 'antd';
import RequestCard from '../../atoms/RequestCard';

const CardView = (props) => {
  const { data, link } = props;
  return (
    <Row gutter={[24, 24]}>
      {data &&
        data.map((value, key) => (
          <Col key={key} span={8}>
            <RequestCard key={key} data={value} link={`${link}/${123}`} />
          </Col>
        ))}
    </Row>
  );
};

export default CardView;
