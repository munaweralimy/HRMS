import React, { useState, useEffect } from 'react';
import { Input, Form, Descriptions, Space, Typography, Collapse, Row, Col, Button, Tabs, message } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import SmallStatusCard from '../../../../../atoms/SmallStatusCard';
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import { cancelRequest, updateRequest } from '../../ducks/services';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const ApproveRejectButton = ({data, currentD, onAction}) => {
    
  const [rejectEnable, setRejectEnable] = useState(false);
  let appr = data.approvers.find(y => y.approvers == 'Job Position');
  console.log('kkk', appr);
  // let x = data.form_fields.find(y => y.field_label == "Request For" && y.field_value == currentD)
  let x= 'dd';
  const onFinish = (val) => {
    onAction('Reject', data, val.remarks);
  }
  
  return (
    <>
    {!x && 
      <>
        {rejectEnable ?
        <>
          <Col span={24}>
            <Form onFinish={onFinish} layout='vertical' className='w-100'>
              <Row gutter={[20,20]}>
                <Col span={24}>
                  <Form.Item label='Remarks' name='remarks' className='mb-0 w-100'>
                    <Input.TextArea 
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button type='primary' htmlType='button' className='w-100 green-btn' size='large' onClick={() => onAction('Approve', data, null)}>Approve</Button>
                </Col>
                <Col span={12}>
                  <Button type='primary' htmlType='submit' className='w-100 red-btn' size='large'>Reject</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </>
        :
        <>
          {/* <Col span={12}>
            <Button type='primary' htmlType='button' className='w-100 green-btn' size='large' onClick={() => onAction('Approve', data, null)}>Approve</Button>
          </Col>
          <Col span={12}>
            <Button type='primary' htmlType='button' className='w-100 red-btn' size='large' onClick={() => setRejectEnable(true)}>Reject</Button>
          </Col> */}
        </>}
      </>
    }
    </>
  )
}

export default (props) => {
  
  const { data, selectedTab, selectedPanel, updateReqApi, id } = props;
  const [ activeTab, setActiveTab ] = useState(selectedTab);

  const panelHeader = (name, title, status) => {
      return <Space size={30}>
        <SmallStatusCard
          status={status.includes('Pending') ? 'Pending' : status}
          icon={
            (status == 'Pending' && <ClockCircleFilled />) ||
            (status == 'Approval' && <CheckCircleFilled />) ||
            (status == 'Rejected' && <CloseCircleFilled />)
          }
          iColor={
            (status == 'Pending' && 'b-pending') ||
            (status == 'Approval' && 'b-success') ||
            (status == 'Rejected' && 'b-error')
          }
        />
        <Space direction='vertical' size={5}>
          <Text className="smallFont12 c-white op-6">{name}</Text>
          <Title level={5} className='lineHeight20 mb-0'>{title}</Title>
        </Space>
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

  const onRevert = (requestor, name) => {
    let req =[];
    requestor.map(z => {
      if (z.approver_id == id) {
        req.push({
          approver_id: z.approver_id,
          status: 'Pending',
        })
      } else {
        req.push({
          approver_id: z.approver_id,
          status: z.status
        })
      }
    })

    const payload = {
      status: 'Pending',
      approvers: req,
    };

    updateRequest(payload, name)
      .then((response) => {
          message.success('Request Successfully Revert');
          updateReqApi();
      })
      .catch((error) => message.error(error));
  }

  const onCancel = async (item) => {
    cancelRequest(item)
    .then((response) => {
        message.success('Request Canceled')
        updateReqApi();
    })
    .catch((error) => message.error(error));
  }

  const onApproveReject = (status, item, remarks) => {

    // const { name, departments } = item;
    // let dep =[];
    // departments.map(z => {
    //   if (z.department == currentDept.department) {
    //     dep.push({
    //       department: z.department,
    //       status: status,
    //       remarks: remarks
    //     })
    //   } else {
    //     dep.push({
    //       department: z.department,
    //       status: z.department_status
    //     })
    //   }
    // })

    // const payload = {
    //   departments: dep,
    // };


    // updateRequest(payload, name)
    //   .then((response) => {
    //     status === 'Approve'
    //       ? message.success('Request Approve Successfully')
    //       : message.success('Request Reject Successfully');
    //       updateReqApi();
    //   })
    //   .catch((error) => message.error(error));
  };

  const cancelBtn = (fileds, name) => {
    console.log('xfields',x ,fileds, name)
    let x = fileds.find(y => y.field_label == "Requester ID" && y.field_value == id)
    if (x) {
      return (
        <Col flex='0 1 200px'>
          <Button type='primary' htmlType='button' size='large' className='w-100' onClick={() => onCancel(name)}>Cancel Requests</Button>
        </Col>
      )
    }
  }

  const revertBtn = (appr, name) => {
    let x = appr.find(y => y?.status == "Pending")
    if (!x) {
      return (
        <Col flex='0 1 200px'>
          <Button type='primary' htmlType='button' size='large' className='w-100' onClick={() => onRevert(appr, name)}>Revert</Button>
        </Col>
      )
    }
  }
  
  return (
      <Tabs activeKey={activeTab} type="card" className="gray-tabs" onChange={(e) => setActiveTab(e)}>
        {Object.entries(data).map(([key,value]) => (
          <TabPane tab={<span className='SentanceCase'>{key == 'yourrequests' ? 'Your Requests' :  key}</span>} key={key}>
            <Collapse accordion className='reqPanel' bordered={false} defaultActiveKey={selectedPanel} 
            expandIcon={({isActive}) => panelRight(isActive)}
            expandIconPosition='right'>
              {value && value.map(item => (
                <Panel className='ch-black' header={panelHeader(item?.department, item?.form_name, item?.status)} key={item?.name}>
                  <Row gutter={[20,20]}>
                    <Col span={24}>
                      <Descriptions className='reqData' bordered colon={false} column={1}>
                        {item?.form_fields.map((fd) => (
                          <Descriptions.Item key={fd?.field_label} label={fd?.field_label}>{fd?.field_value}</Descriptions.Item>
                        ))}
                        {item?.approvers.map((fx) => {
                          return <Descriptions.Item className={`icon-size20 ${fx?.status == 'Approve' ? 'icon-green' : 'icon-red'}`} key={fx?.approver_id} label={fx?.approvers}>{fx?.status} {fx?.status == 'Approve' ? <CheckCircleFilled /> : <CloseCircleFilled />}</Descriptions.Item>
                        })}
                      </Descriptions>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[20,20]} className='justify-right'>
                        {activeTab == 'pending' && <ApproveRejectButton data={item} currentD={id} onAction={onApproveReject} />}
                        {activeTab!='archive' && revertBtn(item.approvers, item?.name)}
                        {activeTab == 'yourrequests' && cancelBtn(item?.form_fields, item?.name)}
                      </Row>
                    </Col>
                  </Row>
                </Panel>
                ))}
            </Collapse>
          </TabPane>
        ))}
      </Tabs>
  );
};
