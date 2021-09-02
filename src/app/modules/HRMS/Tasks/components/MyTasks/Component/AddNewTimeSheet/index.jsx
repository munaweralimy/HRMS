import React, {useEffect, useState} from 'react';
import { Typography, Col, Button, Form, Row, message, Space, Spin } from 'antd';
import {TextAreaField, SelectField, DateField, InputField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import { getProjectName } from '../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const {Title} = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { control, handleSubmit } = useForm();
  const projectName = useSelector(state => state.tasks.myProjectData);
  const { setAddVisible, id, updateApi } = props;

  useEffect(() => {
    dispatch(getProjectName());
  }, []);

  const onFinish = async (val) => {
    
    setLoad(true);

    const json = {
      timesheet: [{
        parent: id,
        parentfield: "timesheet",
        parenttype: "HRMS Tasks",
        status: "Pending",
        doctype: "HRMS Timesheet",
        project: val?.projectName?.value,
        hours: val?.totalHours,
        date: val?.timesheetDate ? moment(val?.timesheetDate).format('YYYY-MM-DD'): '',
        tasks: val?.task,
      }]
    }
    let url = `${apiMethod}/hrms.api.add_single_timesheet`;
    try {
        await axios.post(url, json);
        message.success('TimeSheet Added Successfully');
        setLoad(false);
        updateApi();
        setTimeout(() => setAddVisible(false), 1000)
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
            <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={() => setAddVisible(false)} htmlType="button"><LeftOutlined /> Timesheet List</Button>
            <Title level={4} className='c-default mb-0'>Create New Timesheet</Title>
          </Space>
        </Col>
          <Col span={8}>
            <DateField 
                fieldname='timesheetDate'
                label='Timesheet Date'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                initValue=''
            />
          </Col>

          <Col span={8}>
            <SelectField 
              fieldname='projectName'
              label='Project Name'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please select'}}
              initValue=''
              selectOption={
                projectName &&
                projectName?.map((e) => {
                    return { value: e.name, label: e.name };
                })
              }
            />
          </Col>

          <Col span={8}>
            <InputField 
                fieldname='totalHours'
                label='Total Hours'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please state', size: 'large'}}
                initValue=''
            />
          </Col>
          <Col span={24}>
            <TextAreaField
              fieldname='task'
              label='Task'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please state', size: 'large'}}
              initValue=''
            />  
          </Col>
          <Col span={24}>
            <Row gutter={[20, 20]} justify="end">
              <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className='w-100 black-btn' onClick={() => setAddVisible(false)}>Cancel</Button></Col>
              <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className='w-100 green-btn'>Save</Button></Col>
            </Row>
          </Col>
      </Row>
    </Form>
    </Spin>
  );
};