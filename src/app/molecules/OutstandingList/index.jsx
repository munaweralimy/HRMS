import React from 'react';
import {Row, Col, Card, Table, Radio, Typography } from 'antd';
import PaymentChips from '../../atoms/PaymentChips'

const {Title} = Typography;

export default (props) => {

    const { ListCol, ListData, filterData, pagination, onFilter, filterValue, filters, Search, onSearch, outStanding, heading } = props;
    console.log('outStanding', outStanding, outStanding.length > 0)
    const searchProps = {
        field1: props.field1,
        field2: props.field2,
        field3: props.field3,
    }

    return (
        <>
            <Card bordered={false} className='uni-card'>
                <Title level={4}>{heading}</Title>
                <Row gutter={[30, 20]}>
                    {onFilter && 
                    <Col span={24}>
                        <Radio.Group size='large' className="radio-tabs" buttonStyle='solid' options={filters} onChange={onFilter} value={filterValue} optionType="button" />
                    </Col>
                    }
                    {onSearch && 
                    <Col span={24}>
                        <Search onSearch={onSearch} {...searchProps} />
                    </Col>
                    }
                    <Col span={24}>
                        {ListData.length > 0 && (<PaymentChips outStanding={outStanding}/>)}
                        <Table className="custom-table" bordered={false} columns={ListCol} dataSource={filterData != null ? filterData : ListData} pagination={pagination} />
                        
                    </Col>
                </Row>
            </Card>
        </>
    )
}