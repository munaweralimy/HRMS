import React from 'react';
import { Row, Col, Card, Table, Radio, Typography, Space, Button } from 'antd';

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
    blackCard,
    extraBtn,
    extraAction,
    btnClass,
    headclass
  } = props;

  const searchProps = {
    field1: props.field1,
    field2: props.field2,
    field3: props.field3,
  };

  return (
    <Card bordered={false} className={`uni-card ${listClass ? listClass : ''}`}>
      <Row gutter={[20, 30]}>
        {title && (
          <Col span={24}>
            <Title level={4} className={`c-default mb-0 ${headclass ? headclass : ''}`}>
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
        {filters && (
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
            scroll={{ x: props.scrolling ? props.scrolling : 1000 }}
            onRow={onRow}
            className={`custom-table ${props.classes ? props.classes : ''}`}
            bordered={false}
            columns={ListCol}
            dataSource={filterData != null ? filterData : ListData}
            pagination={pagination}
            onChange={onChange}
          />
        </Col>
        {extraBtn && 
        <Col span={24} className='text-right'>
          <Button type='primary' size='large' htmlType='button' className={btnClass ? btnClass : ''} onClick={extraAction}>{extraBtn}</Button>
        </Col>}
      </Row>
    </Card>
  );
};
