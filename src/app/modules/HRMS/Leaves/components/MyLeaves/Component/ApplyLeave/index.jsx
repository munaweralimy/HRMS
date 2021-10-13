import React, {useEffect, useState} from 'react';
import { Typography, Col, Button, Form, Row, message, Space, Spin } from 'antd';
import {TextAreaField, SelectField, DateField, InputField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import { getLeaveType, getLeaveData, getLeaveApprovers } from '../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const {Title} = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { control, handleSubmit, setValue } = useForm();
  const [forming, setForming] = useState([]);
  const leaveTypeData = useSelector(state => state.leaves.leaveTypeData);
  const { setAddVisible, id, updateApi, fullName, company } = props;
  const leaveInfoData = useSelector(state => state.leaves.leaveInfoData);
  const leaveApproversData = useSelector(state => state.leaves.leaveApproversData);

  useEffect(() => {
    dispatch(getLeaveType());
  }, []);


  const onLeaveChange = (e) => {
    dispatch(getLeaveData(e.label, company, id));
    dispatch(getLeaveApprovers(e.label, company, id));
  }
  console.log('leaveApproversData', leaveApproversData)
  const onFinish = async (val) => {
    setLoad(true);    
    const startDate = moment(val?.leaveStart);
    const endDate = moment(val?.leaveEnd);
    const daysDiff = endDate.diff(startDate, 'days');

    let approvers = [];
    leaveApproversData?.map(resp => {
      approvers.push({
        approver: resp?.approver,
        status: "Pending",
        doctype: "HRMS Leave Application Approver",
        approver_id: resp?.approver_id
      })
    })
    console.log('approvers', approvers)

    


    let temp = {
      employee_id: id,
      leave_type: val?.leaveType.label,
      total_leaves: leaveInfoData[0]?.total_leaves,
      available_leaves: leaveInfoData[0]?.available_leaves,
      leaves_taken: leaveInfoData[0]?.taken_leaves,
      role: '',
      job_title:'',
      leave_type_name: val?.leaveType.value,
      company: company,
      leave_period: val?.leavePeriod.value,
      start_date: val?.leaveStart ? moment(val?.leaveStart).format('YYYY-MM-DD'): '',
      end_date: val?.leaveEnd ? moment(val?.leaveEnd).format('YYYY-MM-DD'): '',
      total_leave_days: daysDiff,
      application_status: "Pending",
      reason: val?.reason,
      attachment: "/private/files/CMS2_03_AQA_Flowchart.pdf",
      doctype: "HRMS Leave Application",
      employee_name: fullName,
      //date_of_joining: "2020-03-01",
      leave_approvers: approvers,
    }

    console.log('val', temp)

    let url = `${apiMethod}/hrms.leaves_api.leave_create_with_validation`;
    try {
        await axios.post(url, temp);
        message.success('Leave Applied Successfully');
        setLoad(false);
        
        setTimeout(() => {setAddVisible(false); updateApi()}, 1000)
    } catch(e) {
        const { response } = e;
        message.error(e);
        setLoad(false);
    }
  }

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space direction='vertical' size={20}>
            <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={() => setAddVisible(false)} htmlType="button"><LeftOutlined /> Pending Leave Application</Button>
            <Title level={4} className='c-default mb-0'>Apply Leave</Title>
          </Space>
        </Col>
          <Col span={8}>
            <SelectField 
              fieldname='leaveType'
              label='Leave Type'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please select'}}
              initValue=''
              onChange={onLeaveChange}
              selectOption={
                leaveTypeData &&
                leaveTypeData?.map((e) => {
                    return { value: e.name, label: e.leave_type };
                })
              }
            />
          </Col>

          <Col span={8}>
            <DateField 
                fieldname='leaveStart'
                label='Leave Start'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                initValue=''
            />
          </Col>

          <Col span={8}>
            <DateField 
                fieldname='leaveEnd'
                label='Leave End'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                initValue=''
            />
          </Col>

          <Col span={8}>
            <SelectField 
              fieldname='leavePeriod'
              label='Leave Period'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please select'}}
              initValue=''
              selectOption={
                [
                  {value: 'Full Day', label: 'Full Day'},
                  {value: 'Half Day', label: 'Half Day'}
                ]
              }
            />
          </Col>

          <Col span={8}>
            <InputField 
                fieldname='reason'
                label='Reason'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please state', size: 'large'}}
                initValue=''
            />
          </Col>
          <Col span={24}>
            <Row gutter={[20, 20]} justify="end">
              <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className='w-100 black-btn' onClick={() => setAddVisible(false)}>Cancel</Button></Col>
              <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className='w-100 green-btn'>Apply</Button></Col>
            </Row>
          </Col>
      </Row>
    </Form>
    </Spin>
  );
};