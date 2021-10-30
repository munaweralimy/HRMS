import React, { useState, Fragment } from 'react';
import { Row, Col, Card, Spin, Form, Typography, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { formFields } from './FormFields';
import FormGroup from '../../../../../molecules/FormGroup';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const LateclockOut = (props) => {
  const { title, onClose, departmentField } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();

  const onFormSubmitHandler = (values) => {
    console.log({ values });
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

export default LateclockOut;
