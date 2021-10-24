import React, { Fragment } from 'react';
import { Descriptions, Row, Col, Button } from 'antd';
import { InputField } from '../../../../../../atoms/FormElement';
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import ApproveRejectButton from '../ApproveRejectButton';

    
export default (props) => {

    const { id, item, activeTab, onApproveReject, onRevert, onCancel } = props;

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
        <Row gutter={[20,20]}>
            <Col span={24}>
                <Descriptions className='reqData' bordered colon={false} column={1}>
                {item?.form_fields.map((fd, i) => (
                    <Fragment key={i}>
                    {/* <InputField
                    fieldname={fd?.field_label}
                    label={fd?.field_label}
                    control={control}
                    iProps={{ placeholder: 'Please state'}}
                    initValue={fd?.field_value ? fd?.field_value : ''}
                    /> */}
                    <Descriptions.Item key={fd?.field_label} label={fd?.field_label}>{fd?.field_value}</Descriptions.Item>
                    </Fragment>
                ))}
                {item?.approvers.map((fx) => {
                    return <Descriptions.Item className={`icon-size20 ${fx?.status == 'Approve' ? 'icon-green' : 'icon-red'}`} key={fx?.approver_id} label={fx?.approvers == 'Job Position' ? fx?.approver_detail : fx?.approvers}>{fx?.status} {fx?.status == 'Approve' ? <CheckCircleFilled /> : <CloseCircleFilled />}</Descriptions.Item>
                })}
                </Descriptions>
                
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]} className='justify-right'>
                {activeTab == 'pending' && <ApproveRejectButton data={item} currentID={id} onAction={onApproveReject} />}
                {activeTab =='archive' && revertBtn(item.approvers, item?.name)}
                {activeTab == 'yourrequests' && cancelBtn(item?.form_fields, item?.name)}
                </Row>
            </Col>
        </Row>
    )
}