import React, { useState, useEffect } from 'react';
import { Input, Form, Descriptions, Space, Typography, Collapse, Row, Col, Button, Tabs, message } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import SmallStatusCard from '../../../../../atoms/SmallStatusCard';
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import { cancelRequest, updateRequest } from '../../ducks/services';
import { contractApi, sendWarning } from '../../../Employment/ducks/services';
import { updateCarryForward, updateCarryForwardApprove } from '../../../Leaves/ducks/services';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const permit = JSON.parse(localStorage.getItem('access'));

const ApproveRejectButton = ({data, currentID, onAction}) => {
    
  const [rejectEnable, setRejectEnable] = useState(false);

  let pos = data.approvers.find(y => Object.keys(permit).find(z => z == y.approver_detail));
  let ind = data.approvers.find(y => y.approver_detail == currentID);
  let other = data.approvers.find(y => y.approver_id == currentID);

  const onFinish = (val) => {
    onAction('Reject', data, val.remarks, currentID, pos, ind);
  }
  
  return (
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
        {(pos && pos?.status == 'Pending' || ind && ind?.status == 'Pending' || other && other?.status == 'Pending') && <>
          <Col span={12}>
            <Button type='primary' htmlType='button' className='w-100 green-btn' size='large' onClick={() => onAction('Approve', data, null, currentID, pos, ind)}>Approve</Button>
          </Col>
          <Col span={12}>
            <Button type='primary' htmlType='button' className='w-100 red-btn' size='large' onClick={() => setRejectEnable(true)}>Reject</Button>
          </Col>
          </>}
        </>}
      </>
  )
}

export default (props) => {
  
  const { data, selectedTab, selectedPanel, updateReqApi, id } = props;
  const [ activeTab, setActiveTab ] = useState(selectedTab);

  const panelHeader = (appr, title, status) => {
    let x = '';
    appr.map(y => x += y.approvers == 'Job Position' ? y.approver_detail : y.approvers)
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
          <Text className="smallFont12 c-white op-6">{x}</Text>
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

  const onApproveReject = (status, item, remarks, currentID, pos, ind) => {

    console.log('chck', item, status, currentID, pos, ind)
    const { name, approvers, form_fields, category } = item;
    let contractid = null;
    let dep =[];
    approvers.map(z => {
      if (z.approvers == 'Job Position' && pos?.status == 'Pending') {
        dep.push({
          approvers: z.approvers,
          approver_detail: z.approver_detail,
          approvers_id: z.approver_id,
          status: status,
          remarks: remarks
        })
      } else if(z.approvers == 'Individual' && ind?.status == 'Pending') {
        dep.push({
          approvers: z.approvers,
          approvers: z.approver_detail,
          approvers_id: z.approver_id,
          status: status,
          remarks: remarks
        })
      } else if(z.approver_id == currentID) {
        dep.push({
          approvers: z.approvers,
          approvers: z.approver_detail,
          approvers_id: z.approver_id,
          status: status,
          remarks: remarks
        })
      } else {
        dep.push({
          approvers: z.approvers,
          approvers: z.approver_detail,
          approvers_id: z.approver_id,
          status: z.status
        })
      }
    })

    const payload = {
      approvers: dep,
    };

    console.log('ccc', payload, status, item, remarks)
    updateRequest(item.name, payload)
    .then((response) => {
        if (category == 'Email Activation') {
          contractid = form_fields.find(fx => fx.field_label == 'Contract ID').field_value;
          contractApi({email_activation_status: status === 'Approve' ? 'Active' : 'Inactive'}, contractid).then(xs => {
            status === 'Approve'
          ? message.success('Request Approve Successfully')
          : message.success('Request Reject Successfully');
          updateReqApi();
          })
        } if (category == 'Card Activation'){
          contractid = form_fields.find(fx => fx.field_label == 'Contract ID').field_value;
          contractApi({card_activation_status:  status === 'Approve' ? 'Active' : 'Inactive'}, contractid).then(xs => {
            status === 'Approve'
          ? message.success('Request Approve Successfully')
          : message.success('Request Reject Successfully');
          updateReqApi();
          })
        } else if(category == 'Warning Letter Approval') {
          const wbody = {
            employee_id: form_fields.find(fx => fx.field_label == 'Staff ID').field_value,
            warning_letter: form_fields.find(fx => fx.field_label == 'Warning Letter').field_value,
            status:"Active"
          }
          if (status === 'Approve')  {
            sendWarning(wbody).then(res => {
              message.success('Request Approve Successfully')
              
            }).catch(e => {
              console.log(e);
              setLoad(false);
              const {response} = e;
              message.error(response);
            })
          } else {
            message.success('Request Reject Successfully');
          }
        } else if(category == 'Show Cause Letter') {
          const wbody2 = {
            employee_id: form_fields.find(fx => fx.field_label == 'Staff ID').field_value,
            showcause_letter: form_fields.find(fx => fx.field_label == 'Warning Letter Type').field_value,
            status:"Active"
          }
          if (status === 'Approve')  {
            sendShowCause(wbody2).then(res => {
              message.success('Request Approve Successfully')
              
            }).catch(e => {
              console.log(e);
              setLoad(false);
              const {response} = e;
              message.error(response);
            })
          } else {
            message.success('Request Reject Successfully');
          }
        } else if(category == 'Carry Froward Leave Extension') {
          if (status === 'Approve')  {
              updateCarryForwardApprove(userdetail.name).then(xy => {
                  message.success('Request Approve Successfully')
              })
          } else {
              updateCarryForwardApprove(userdetail.name).then(xy => {
                message.success('Request Reject Successfully');
              })
          }
        }
      })
      .catch((error) => message.error(error));
  };

  const cancelBtn = (fileds, name) => {
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
                <Panel className='ch-black' header={panelHeader(item?.approvers, item?.form_name, item?.status)} key={item?.name}>
                  <Row gutter={[20,20]}>
                    <Col span={24}>
                      <Descriptions className='reqData' bordered colon={false} column={1}>
                        {item?.form_fields.map((fd) => (
                          <Descriptions.Item key={fd?.field_label} label={fd?.field_label}>{fd?.field_value}</Descriptions.Item>
                        ))}
                        {item?.approvers.map((fx) => {
                          return <Descriptions.Item className={`icon-size20 ${fx?.status == 'Approve' ? 'icon-green' : 'icon-red'}`} key={fx?.approver_id} label={fx?.approvers == 'Job Position' ? fx?.approver_detail : fx?.approvers}>{fx?.status} {fx?.status == 'Approve' ? <CheckCircleFilled /> : <CloseCircleFilled />}</Descriptions.Item>
                        })}
                      </Descriptions>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[20,20]} className='justify-right'>
                        {activeTab == 'pending' && <ApproveRejectButton data={item} currentD={id} onAction={onApproveReject} />}
                        {activeTab =='archive' && revertBtn(item.approvers, item?.name)}
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
