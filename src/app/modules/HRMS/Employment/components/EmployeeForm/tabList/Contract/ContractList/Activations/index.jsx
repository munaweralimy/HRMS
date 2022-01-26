import React from 'react';
import { Row, Col, Space, Card, Button, Typography, message } from 'antd';
import { PopupSuccess } from '../../../../../../../../../atoms/Popup';
import { getRequest, getApproverLead } from '../../../../../../../Requests/ducks/services';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { createRequest } from '../../../../../../../Requests/ducks/services';
import { contractApi } from '../../../../../../ducks/services';

const { Title, Text } = Typography;

const popup = {
    closable: false,
    className: 'black-modal',
    title: 'Email Activation Sent',
    content: '',
    width: 536,
};

const popup1 = {
    closable: false,
    className: 'black-modal',
    title: 'Card Activation Sent',
    content: '',
    width: 536,
};

export default (props) => {

    const { id, data, setLoad, updateApi, onBack } = props;
    const staffData = useSelector(state => state.advancement.advData)
    const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];

    const sendRequest = async (type) => {
      setLoad(true);
      const req = await getRequest(type);
      if (req) {
        console.log('Data', req)
      } else {
        setLoad(false);
        return false;
      }
      
      let approvetemp = [];
      let appr = await getApproverLead(id);
      req?.data?.message?.approvers.map(x => {
        let aid = '';
        if (x.approvers == 'Manager') {
          aid = appr.manager_id;
        } else if (x.approvers == 'Supervisor') {
          aid = appr.supervisor_id;
        } else if(x.approvers == 'Supervisor') {
          aid = appr.supervisor_id;
        }

        approvetemp.push({
            approvers: x.approvers,
            approver_detail: x.approver_detail || '',
            approver_id: aid,
            Status:"Pending",
            remarks:""
        })
      })

      let body1 = {
          form_name: req.data.message.form_name,
          sender: req.data.message.sender,
          category: req.data.message.category,
          approvers: approvetemp,
          status: 'Pending',
          form_fields: [
          { 
            field_label: "Requester",
            field_type: "Text",
            field_value:user.full_name
          },
          {
            field_label: "Requester ID",
            field_type: "Text",
            field_value:user.name
          },    
          {
            field_label: "Requester Team",
            field_type: "Text",
            field_value:user.team_name
          },
          {
            field_label: "Date",
            field_type: "Date",
            field_value: moment().format('YYYY-MM-DD')
          },
          {
            field_label: "Request For",
            field_type: "Text",
            field_value: staffData?.employee_name
          },
          {
            field_label: "Staff ID",
            field_type: "Text",
            field_value: id
          },
          {
            field_label: "Company",
            field_type: "Text",
            field_value:staffData?.company || ''
          },
          {
            field_label: "Request For Team",
            field_type: "Text",
            field_value:staffData?.team_name[0] || ''
          },
          {
            field_label: "Contract ID",
            field_type: "Text",
            field_value:data[0]?.value
          },
        ]
      }
      if (type == 'Email Activation') {
        body1.form_fields.push(
          {
            field_label: "New Work Email",
            field_type: "Text",
            field_value:""
          },
          {
            field_label: "Work Email Password",
            field_type: "Text",
            field_value:""
          }
        )
      }
      console.log('checking body',body1,appr.data.message)
          createRequest(body1).then(resi => {
            if (type == 'Email Activation') {
              contractApi({email_activation_status: 'Pending'}, data[0]?.value).then(xs => {
                updateApi();
                setLoad(false);
                PopupSuccess(popup);
                onBack();
              }).catch(e => {
                message.error('Something went wrong');
                setLoad(false);
              })
            } else {
              contractApi({card_activation_status: 'Pending'}, data[0]?.value).then(xs => {
                updateApi();
                setLoad(false);
                PopupSuccess(popup1);
                onBack();
              }).catch(e => {
                message.error('Something went wrong');
                setLoad(false);
              })
            }
              
          }).catch(e => {
            console.log('e',e)
            setLoad(false);
          })
    }

    return (
        <Row gutter={[20,30]}>
            <Col span={24}><Title level={4} className='mb-0 c-default'>Email & Card Activation</Title></Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]} align='middle'>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Email Activation</Title>
                                        <Text className='c-gray smallFont12'>Please ensure all of the fields are filled before sending request</Text>
                                    </Space>
                                </Col>
                                <Col>
                                
                                {data.find(x => x.field == 'email_activation_status').value == 'Pending' ?
                                  <Button htmlType='button' type='primary' size='large' className='black-btn'>Pending Request</Button>
                                  : data.find(x => x.field == 'email_activation_status').value != 'Active' ?
                                    <Button htmlType='button' type='primary' size='large' className='' onClick={() => sendRequest('Email Activation')}>Send Request</Button>
                                    :
                                    <Text>Email Activated</Text>
                                }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]}>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Card Activation</Title>
                                        <Text className='c-gray smallFont12'>Please ensure all of the fields are filled before sending request</Text>
                                    </Space>
                                </Col>
                                <Col>
                                {data.find(x => x.field == 'card_activation_status').value == 'Pending' ?
                                  <Button htmlType='button' type='primary' size='large' className='black-btn'>Pending Request</Button>
                                  :
                                  data.find(x => x.field == 'card_activation_status').value != 'Active' ?
                                  <Button htmlType='button' type='primary' size='large' className='' onClick={() => sendRequest('Card Activation')}>Send Request</Button>
                                  :
                                  <Text>Card Activated</Text>
                                }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}