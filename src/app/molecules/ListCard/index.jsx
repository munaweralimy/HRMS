import React from 'react';
import { Row, Col, Card, Table, Radio, Typography, Space } from 'antd';

const { Text, Title } = Typography;

export default (props) => {
  const {
    ListCol,
    ListData,
    filterData,
    pagination,
    onFilter,
    filterValue,
    filters,
    Search,
    onSearch,
    onRow,
    total,
    totaltitle,
    title,
    onChange,
    listClass,
  } = props;

  const searchProps = {
    field1: props.field1,
    field2: props.field2,
    field3: props.field3,
  };

  return (
    <Card bordered={false} className={`uni-card ${listClass ? listClass : ''}`}>
      <Row gutter={[30, 20]}>
        {title && (
          <Col span={24}>
            <Title level={4} className="c-default mb-0">
              {title}
            </Title>
          </Col>
        )}
        {total && (
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Text className="c-gray">Total</Text>
              <Title level={3} className="ag-fontSize24 mb-0">{`${total} ${totaltitle}`}</Title>
            </Space>
          </Col>
        )}
        {onFilter && (
          <Col span={24}>
            <Radio.Group
              size="large"
              className="radio-tabs"
              buttonStyle="solid"
              options={filters}
              onChange={onFilter}
              value={filterValue}
              optionType="button"
            />
          </Col>
        )}
        {onSearch && (
          <Col span={24}>
            <Search onSearch={onSearch} {...searchProps} />
          </Col>
        )}
        <Col span={24}>
          <Table
            onRow={onRow}
            className="custom-table"
            bordered={false}
            columns={ListCol}
            dataSource={filterData != null ? filterData : ListData}
            pagination={pagination}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Card>
  );
};
