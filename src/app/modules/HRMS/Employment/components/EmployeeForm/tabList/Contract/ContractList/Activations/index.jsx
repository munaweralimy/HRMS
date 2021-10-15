import React from 'react';
import { Row, Col, Space, Card, Button, Typography } from 'antd';
import { PopupSuccess } from '../../../../../../../../../atoms/Popup';
import { getRequest, getApproverLead } from '../../../../../../../Requests/ducks/services';
import { useSelector } from 'react-redux';
import moment from 'moment';

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

    const { id, data } = props;
    const staffData = useSelector(state => state.advancement.advData)
    const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];

    console.log('checking data', data)

    const sendRequest = async (type) => {
      const req = await getRequest(type);
      if (req) {
        console.log('Data', req)
      } else {
        return false;
      }
      
      let approvetemp = [];
      let appr = await getApproverLead(id);
      req?.data?.data?.approvers.map(x => {
        let aid = '';
        if (x.approvers == 'Manager') {
          aid = appr.manager_id;
        } else if (x.approvers == 'Supervisor') {
          aid = appr.supervisor_id;
        } else if(x.approvers == 'Supervisor') {
          aid = appr.supervisor_id;
        } else if(x.approvers == 'Individual') {
          aid = x.approvers_detail
        } else if(x.approvers == 'Job Position') {

        }
        approvetemp.push({
            approvers: x.approvers,
            approvers_detail: x.approvers_detail || '',
            approver_id: aid,
            Status:"Pending",
            remarks:""
        })
      })
      const body1 = {
          form_name: req.data.data.form_name,
          sender: req.data.data.sender,
          approvers: approvetemp,

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
          
        ]
      }
      if (type == 'Email Activation') {
        body1.push(
          {
            field_name: "New Work Email",
            field_type: "Text",
            field_value:""
          },
          {
            field_name: "Work Email Password",
            field_type: "Text",
            field_value:""
          }
        )
      }
      console.log('checking body',body1,appr.data.message)
        //   createRequest(body1).then(resi => {
        //       PopupSuccess(popup1);
        //   }).catch(e => {
        //     console.log('e',e)
        //   })
        // })
      // })
    }

    const sendCardRequest = () => {
        PopupSuccess(popup1);
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
                                <Col><Button htmlType='button' type='primary' size='large' className='' onClick={() => sendRequest('Email Activation')}>Send Request</Button></Col>
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
                                <Col><Button htmlType='button' type='primary' size='large' className='' onClick={() => sendRequest('Card Activation')}>Send Request</Button></Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}