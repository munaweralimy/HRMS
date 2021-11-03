import React, { useState, useEffect } from 'react';
import { Descriptions, Space, Typography, Collapse, message } from 'antd';
import PendingReq from '../../../../../molecules/Description';
import { UpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default (props) => {
  
  const { data } = props;

  const [activePanel, setActivePanel] = useState('')

  const onPanelChange = (key) => {
    setActivePanel(key);
  }

  const panelHeader = (name, title) => {
      return <Space direction='vertical'>
        <Text className="smallFont12 c-white op-6">{name}</Text>
        <Title level={5} className='mb-0'>{title}</Title>
      </Space>
  }
 
  const panelRight = (isActive) => {
    return <div>
    <Space size={4}>
      <Title level={5} className='defaultFont mb-0'>{isActive ? 'Hide' : 'View Details'} </Title>
      <UpOutlined rotate={isActive ? 0 : 180}/>
    </Space>
    </div>
  }



  return (
    <Collapse accordion className='reqPanel' bordered={false} activeKey={activePanel} 
    onChange={onPanelChange} 
    expandIcon={({isActive}) => panelRight(isActive)}
    expandIconPosition='right'>
      {data && data.map((item, index) => (
        <Panel className={`${item.status=='Pending' ? 'ch-pending': 'ch-black'}`} header={panelHeader(item.department, item.form_name)} key={index}>
          {/* {item.status != 'Archive' ? */}
            <Descriptions className='reqData' bordered colon={false} column={1}>
              {item.form_fields.map((fd) => (
                <Descriptions.Item key={fd.field_label} label={fd.field_label}>{fd.field_value}</Descriptions.Item>
              ))}
              {item.departments.map((fx) => (
                <Descriptions.Item key={fx.department} label={fx.department}>{fx.department_status}</Descriptions.Item>
              ))}
            </Descriptions>
            {/* : */}
            {/* <Text>{}</Text> */}
        </Panel>
        ))}
    </Collapse>
  );
};
