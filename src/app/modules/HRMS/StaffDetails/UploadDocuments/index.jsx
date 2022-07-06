import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Spin, Form, Typography, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { formFields } from './FormFields';
import FormGroup from '../../../../molecules/FormGroup';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getFileName, uniquiFileName, getSingleUploadPrivate } from '../../../../../features/utility';
import { employDocumentUpload } from '../../Employment/ducks/services';
import { useParams } from "react-router-dom";

const antIcon = <LoadingOutlined spin />;
import moment from 'moment';

const UploadDocuments = (props) => {
  const { title, onClose, updateApi, setVisible } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const company = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company;
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const employeId = useParams()

  const onFormSubmitHandler = async (val) => {
    setLoad(true);
    console.log('values', val)
    let res = ''
    if (val.document) {
      let modifiedName = uniquiFileName(val.document?.file?.originFileObj.name)
      res = await getSingleUploadPrivate(modifiedName, 'image', val.document?.file?.originFileObj, 'Employee', employeId?.id);
    }

    const body = {
      employee_id: employeId?.id,
      type: val?.type?.value,
      document: res?.file_url,
      name1: res?.name
    }

    employDocumentUpload(body).then(res => {
      setLoad(false);
      updateApi();
      setVisible(false)
      message.success('Document Uploaded');
    });

  };


  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFormSubmitHandler)}>
        <Row gutter={[20, 30]} justify="center">
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              {formFields.map((item, idx) => (
                <Fragment key={idx}>
                  {item?.subheader && (
                    <Col span={24}>
                      <Text className="mb-0 c-gray">{item.subheader}</Text>
                    </Col>
                  )}
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={12}>
                <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                  Close
                </Button>
              </Col>
              <Col span={12}>
                <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default UploadDocuments;