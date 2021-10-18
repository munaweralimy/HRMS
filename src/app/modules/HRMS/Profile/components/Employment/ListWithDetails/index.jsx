import React, { useState, useEffect } from 'react';
import ListCard from '../../../../../../molecules/ListCard';
import { Typography, Col, Button, Row, Descriptions, Space } from 'antd';
import moment from 'moment';
import { LeftOutlined } from '@ant-design/icons';

const {Title} = Typography;

export default ({details, updateApi}) => {

  const { title, key, heading, data, column, nodetail, detailTitle, onAction1,onAction2 } = details;
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  console.log('rowData', rowData)

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowDetail(true)
        setRowData(record)
      },
    };
  }

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo',pagination)
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(key, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey);
    } else {
      updateApi(key, pagination.current, pagination.pageSize, '', '');
    }
  }

    return (
        <>
        {!rowDetails ?
            <>
            <ListCard 
            title={heading}
            onRow={onClickRow}
            ListCol={column} 
            ListData={data} 
            pagination={{
              total: data?.count,
              current: page,
              pageSize: limit
            }}
            onChange={onTableChange}
            classes={`${!nodetail ? 'clickRow' : ''}`}
            scrolling={500}
            listClass="nospace-card"
            headclass='mt-1'
            />
            <Col span={24}>
              <Title level={4} className={`c-default mb-0`}>
                Term
              </Title>
            </Col>
            </>
            :
            <>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <Space direction='vertical' size={20}>
                    <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={() => {setRowDetail(false); props?.setRecord(null)}} htmlType="button"><LeftOutlined />Employment History</Button>
                    <Title level={4} className='c-default mb-0'>Contract Details</Title>
                  </Space>
                </Col>
                <Col span={24}>
                  <Descriptions className='reqData' bordered colon={false} column={1}>
                    <Descriptions.Item label="Contract Type">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Employment Type">Permanent</Descriptions.Item>
                    <Descriptions.Item label="From Date">Permanent</Descriptions.Item>
                    <Descriptions.Item label="To Date">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Endorser">Permanent</Descriptions.Item>
                  </Descriptions>
                </Col>


                <Col span={24}>
                  <Space direction='vertical' size={20}>
                    <Title level={4} className='c-default mb-0'>Employment Details</Title>
                  </Space>
                </Col>
                <Col span={24}>
                  <Descriptions className='reqData' bordered colon={false} column={1}>
                    <Descriptions.Item label="Staff Category">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Company">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Team">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Job Title">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Position Level">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Supervisor">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Download Contract">Permanent</Descriptions.Item>
                  </Descriptions>
                </Col>


                <Col span={24}>
                  <Space direction='vertical' size={20}>
                    <Title level={4} className='c-default mb-0'>Work Hours</Title>
                  </Space>
                </Col>
                <Col span={24}>
                  <Descriptions className='reqData' bordered colon={false} column={1}>
                    <Descriptions.Item label="Monday">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Tuesday">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Wednesday">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Thursday">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Friday">Permanent</Descriptions.Item>
                    <Descriptions.Item label="Saturday">Saturday</Descriptions.Item>
                    <Descriptions.Item label="Alternate Saturdays">Permanent</Descriptions.Item>
                  </Descriptions>
                </Col>



                  <Col span={24}>
                    {/* <Row gutter={[20, 20]} justify="end">
                      {onAction1 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className={`w-100 ${btnClass1 ? btnClass1 : ''}`} onClick={() => {onAction1(data[0].value); setRowDetail(false)}}>{btn1title}</Button></Col>}
                      {onAction2 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className={`w-100 ${btnClass2 ? btnClass2 : ''}`} onClick={() => {onAction2(data[0].value); setRowDetail(false)}}>{btn2title}</Button></Col>}
                    </Row> */}
                  </Col>
              </Row>
            </>
            }
        </>
    )
}