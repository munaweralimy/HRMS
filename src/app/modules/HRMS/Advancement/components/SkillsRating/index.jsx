import React from 'react';
import { Space, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export const customIcon = {
  1: (
    <Space direction="vertical" size={5} align="center" className="w-100">
      <InfoCircleOutlined />
      <Typography.Title level={5} className="mb-0">
        1
      </Typography.Title>
    </Space>
  ),
  2: (
    <Space direction="vertical" size={5} align="center" className="w-100">
      <InfoCircleOutlined />
      <Typography.Title level={5} className="mb-0">
        2
      </Typography.Title>
    </Space>
  ),
  3: (
    <Space direction="vertical" size={5} align="center" className="w-100">
      <InfoCircleOutlined />
      <Typography.Title level={5} className="mb-0">
        3
      </Typography.Title>
    </Space>
  ),
  4: (
    <Space direction="vertical" size={5} align="center" className="w-100">
      <InfoCircleOutlined />
      <Typography.Title level={5} className="mb-0">
        4
      </Typography.Title>
    </Space>
  ),
  5: (
    <Space direction="vertical" size={5} align="center" className="w-100">
      <InfoCircleOutlined />
      <Typography.Title level={5} className="mb-0">
        5
      </Typography.Title>
    </Space>
  ),
};
