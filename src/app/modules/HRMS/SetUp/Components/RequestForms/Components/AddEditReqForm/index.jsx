import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import { formFields } from './FormFields';
import { UnorderedListOutlined } from '@ant-design/icons';
export default (props) => {
  const { title, onClose, onUpdate } = props;
  const { control, errors, reset, setValue, handleSubmit } = useForm();
  const { Title, Text } = Typography;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'form_fields',
  });
  const initQ = {
    approver_select: '',
  };
  const onFinish = (values) => {};

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>
        {formFields.map((item, idx) => (
          <Fragment key={idx}>
            {item.title && (
              <Col span={24}>
                <Title className="mb-0" level={4}>
                  {item.title}
                </Title>
                {item.subheader && <Text className="mb-0 c-gray">{item.subheader}</Text>}
              </Col>
            )}

            {item.type == 'array' ? (
              <Col span={24}>
                <Space size={15} direction="vertical" className="w-100">
                  {fields.map((elem, index) => (
                    <Row gutter={[24, 8]}>
                      {item.child.map((x, i) => (
                        <Fragment key={i}>
                          {x?.subheader && (
                            <Col span={24}>
                              <Row gutter={24} justify="space-between">
                                <Col>
                                  <Text className="mb-0 c-gray">{`${x.subheader} ${index + 1}`}</Text>
                                </Col>

                                <Col>
                                  <Button
                                    type="link"
                                    htmlType="button"
                                    className="p-0 h-auto c-gray-linkbtn"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          )}
                          <Col span={24}>
                            <Row gutter={24} justify="space-between">
                              <Col>
                                <UnorderedListOutlined />
                              </Col>
                              <FormGroup
                                elem={elem}
                                index={index}
                                parent={item}
                                item={x}
                                control={control}
                                errors={errors}
                              />
                            </Row>
                          </Col>
                        </Fragment>
                      ))}
                    </Row>
                  ))}

                  <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append(initQ)}>
                    + Add field
                  </Button>
                </Space>
              </Col>
            ) : (
              <FormGroup item={item} control={control} errors={errors} />
            )}
          </Fragment>
        ))}
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
    </Form>
  );
};
