import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Space, Form, Button, message, Spin } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import RateCard from '../RateCard';
import {LoadingOutlined} from '@ant-design/icons';
import { apiMethod } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default ({ data, id, updateApi }) => {

    const [load, setLoad] = useState(false);
    const { control, handleSubmit, setValue } = useForm();
    const { append, remove, fields } = useFieldArray({
      control,
      name: `other_skills`,
    });

    // useEffect(() => {
    //   if (Object.keys(data).length > 0) {
    //     let temp1 = [];
    //     let temp2 = [];
    //     data?.other_skills.map(x => {
    //       if(x.supervisor_assessment > 0 || x.self_staff_assessment > 0) {
    //         temp1.push(x)
    //       } else {
    //         temp2.push(x)
    //       }
    //     });
    //     setValue('other_skills', temp1);
    //     setTags(temp2);
    //   }
    // }, [data]);

    const onFinish = async (val) => {
        console.log('val', val);
        setLoad(true);

        // let job_related = [];
        // val.job_related_skills.map(x => {
        //   job_related.push({
        //     name: x.name,
        //     skill_name: x.skill_name,
        //     supervisor_assessment: x.supervisor_assessment,
        //     self_staff_assessment: x.self_staff_assessment
        //   });
        // })

        // tags.map(x => {
        //   job_related.push({
        //     name: x.name,
        //     skill_name: x.skill_name,
        //     supervisor_assessment: x.supervisor_assessment,
        //     self_staff_assessment: x.self_staff_assessment
        //   });
        // })

        // const body = {
        //   employee_id: id,
        //   job_related_skills: job_related
        // }

        // let url = `${apiMethod}/hrms.api.hrms_update_job_releated_skill`;
        // try {
        //   await axios.post(url, body);
        //   message.success('Assessment updated');
        //   updateApi();
        //   setLoad(false);
        // } catch(e) {
        //   const { response } = e;
        //   console.log(e);
        //   message.error('Something went wrong');
        //   setLoad(false);
        // }
    }

    const onAdd = (item) => {
      append({
        name: '',
        skill_name: '',
        supervisor_assessment: 0,
        self_staff_assessment: 0,
      })
    }

    const onRemove = (index, item) => {
      remove(index);
      tags.push(item);
    }

    return (
      <Spin indicator={antIcon} size="large" spinning={load}>
        <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20,30]}>
          <Col flex='auto'>
            <Space size={10} direction="vertical" className="w-100">
              <Title level={4} className="mb-0 c-default">Other Skills</Title>
            </Space>
          </Col>
          <Col><Text className='c-gray'>Last Assessed : 3 Months Ago</Text></Col>
          <Col span={24}>
            <Space size={20} direction='vertical' className='w-100'>
            {fields.map((item, index) => (
              <Fragment key={item.id}>
                <RateCard item={item} index={index} control={control} onRemove={onRemove} />
              </Fragment>
            ))}
            </Space>
          </Col>
          <Col span={24}>
            <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>+ Add other skills</Button>
          </Col>
          <Col span={24}>
            <Row gutter={24} justify='end'>
              <Col>
                <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        </Form>
      </Spin>
    )
}