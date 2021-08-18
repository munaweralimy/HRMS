import React from 'react';
import { Typography, Col, Button, Row, Descriptions, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';


const {Title} = Typography;

export default (props) => {
  
  const { setRowDetail, backbtnTitle, btn1title, btn2title, onAction1, onAction2, data, mainTitle, btnClass1, btnClass2 } = props;

  return (
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space direction='vertical' size={20}>
            <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={() => setRowDetail(false)} htmlType="button"><LeftOutlined />{backbtnTitle}</Button>
            <Title level={4} className='c-default mb-0'>{mainTitle}</Title>
          </Space>
        </Col>
        <Col span={24}>
            <Descriptions className='reqData' bordered colon={false} column={1}>
              {data?.map((fd, index) => (
                <Descriptions.Item key={index} label={fd.label}><span className={fd.classi ? fd.classi : ''}>{fd.value}</span></Descriptions.Item>
              ))}
            </Descriptions>
        </Col>
          <Col span={24}>
            <Row gutter={[20, 20]} justify="end">
              {onAction1 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className={`w-100 ${btnClass1 ? btnClass1 : ''}`} onClick={onAction1}>{btn1title}</Button></Col>}
              {onAction2 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className={`w-100 ${btnClass2 ? btnClass2 : ''}`} onClick={onAction2}>{btn2title}</Button></Col>}
            </Row>
          </Col>
      </Row>
  );
};