import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Anchor, Button, Space } from 'antd';
import { DownloadIcon } from '../../atoms/CustomIcons';
import { getFileName } from '../../../features/utility';
import { baseUrl } from '../../../configs/constants';

const { Text, Title } = Typography;
const { Link } = Anchor;

export default (props) => {
  const { docs, t } = props;
  const [document, setDocument] = useState([]);

  useEffect(() => {
    docs && setDocument(docs);
  }, [docs]);

  return (
    <Card bordered={false} className="uni-card">
      <Row gutter={[20, 20]}>
        <Col flex="auto">
          <Title level={4} className="mb-2 lineHeight40">
            Documents
          </Title>
        </Col>
        <Col>
          <Button htmlType="button" type="primary" className="green-btn">
            Download All
          </Button>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        {docs?.map((item, index) => (
          <Col md={12} sm={24} key={index}>
            <Space size={10} direction="vertical" className="w-100">
              <Text className="c-gray smallFont12">{item?.name}</Text>
              <Card bordered={false} className="download-link">
                <Text className={`d-name ${item?.url ? '' : 'c-gray'}`}>
                  {item.url ? getFileName(item?.url) : 'Not Available'}
                </Text>
                {item?.url && (
                  <Anchor affix={false}>
                    <Link target="_blank" href={`${baseUrl}${item?.url}`} title={<DownloadIcon />} />
                  </Anchor>
                )}
              </Card>
            </Space>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
