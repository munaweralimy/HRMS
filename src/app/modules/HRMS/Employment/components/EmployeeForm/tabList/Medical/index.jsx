import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { employApi } from '../../../../ducks/services';
import Insurance from './Insurance';

const { Title } = Typography;
const medicalFields = [
  {
    type: 'input',
    label: 'Blood Type',
    name: 'blood_group',
    twocol: false,
    colWidth: '1 0 200px',
    placeholder: 'Blood Type',
    req: true,
    reqmessage: 'Please enter blood type',
  },
  {
    type: 'input',
    label: 'Height (cm)',
    name: 'height',
    twocol: false,
    colWidth: '1 0 200px',
    number: true,
    req: true,
    reqmessage: 'Please enter height',
  },
  {
    type: 'input',
    label: 'Weight (kg)',
    name: 'weight',
    twocol: false,
    colWidth: '1 0 200px',
    number: true,
    req: true,
    reqmessage: 'Please enter weight',
  },
  {
    type: 'textarea',
    label: 'Additional Notes',
    name: 'health_details',
    twocol: false,
    req: false,
  },
];

export default (props) => {

  const { mode, data, updateApi, id, setLoad, setForm, formObj } = props;
  const { control, errors, setValue, handleSubmit } = useForm();
  const [visisble, setVisible] = useState(true);

  useEffect(() => {
    if (mode == 'edit' && data && Object.keys(data).length > 0) {
      refreshForm();
    }
  }, [data]);

  const refreshForm = () => {
    setTimeout(() => {
      setValue('weight', data?.weight);
      setValue('height', data?.height);
      setValue('blood_group', data?.blood_group);
      setValue('health_details', data?.health_details);
    }, 1500)
  }
  
  const onFinish = async (val) => {
    setLoad(true);
    const body = {
        blood_group: val.blood_group,
        height: val.height,
        weight: val.weight,
        health_details: val.health_details
    }

    if (mode == 'edit') {
    employApi(body, id).then(res => {
      setLoad(false);
      updateApi();
      message.success('Medical Record Successfully Saved')
    }).catch(e => {
      console.log(e);
      setLoad(false);
      message.error(e);
    })
    } else {
      setForm({
        ...formObj,
        medical: body
      })
    }
  }

  return (
    <>
      <Col span={24}>
        <Insurance {...props} setVisible={setVisible} refresh={refreshForm} />
      </Col>
      {visisble &&
      <Col span={24}>
      <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={4} className="mb-0 c-default">Medical Record</Title>
          </Col>
          {medicalFields.map((item, index) => (
            <Fragment key={index}>
              {item?.subheader && (
                <Col span={24}>
                  <Title level={5} className="mb-0 c-default">
                    {item.subheader}
                  </Title>
                </Col>
              )}
              <FormGroup item={item} control={control} errors={errors} />
            </Fragment>
          ))}
          <Col span={24}>
            <Row gutter={20} justify='end'>
              <Col><Button type='primary' htmlType='submit' size='large' className='green-btn'>Save Changes</Button></Col>
            </Row>
          </Col>
        </Row>
      </Form>
      </Col>}
    </>
  );
};