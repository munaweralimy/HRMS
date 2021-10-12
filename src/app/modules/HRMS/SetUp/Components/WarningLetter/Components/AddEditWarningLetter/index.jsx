import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, Card, Breadcrumb, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { warningLetterFilds } from './FormFields';
import HeadingChip from '../../../../../../../molecules/HeadingChip';
import { QuestionCircleFilled } from '@ant-design/icons';
import { TextAreaField } from '../../../../../../../atoms/FormElement';
import { showWarningLetter } from '../../../../ducks/actions';
import {
  getWarningLetterDetail,
  addSingleWarningLetter,
  updateWarningLetter,
  deleteWarningLetter,
} from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { letterData } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const closeForn = () => {
    dispatch(showWarningLetter({ name: '', warning_letter_tempalte: '', visible: false }));
  };

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      writing_letter_name: values?.writing_letter_name,
      letter_template: 'CCC Letter Template A',
      signature: values?.signature[0],
      signee: values?.signee.value,
      detail: values.detail,
    };
    letterData.name.length == 0
      ? addSingleWarningLetter(payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            closeForn();
          })
          .catch((error) => message.error('Race exists'))
      : updateWarningLetter(letterData.name, payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            closeForn();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteNationality = () => {
    setLoad(true);
    deleteWarningLetter(letterData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        closeForn();
      })
      .catch((error) => {
        message.error('Race Deleted Unsccessfully');
        closeForn();
      });
  };

  useEffect(() => {
    if (letterData.name.length > 0) {
      setLoad(true);
      getWarningLetterDetail(letterData.name).then((response) => {
        let data = response?.data?.data;
        setValue('writing_letter_name', data.writing_letter_name);
        setValue('letter_template', { label: data.letter_template, value: data.letter_template });
        setValue('signature', data.signature == '1' ? [1] : [0]);
        setValue('signee', { label: data.signee, value: data.signee });
        setValue('detail', data.detail);
        setLoad(false);
      });
    }
  }, [letterData]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item onClick={closeForn}>Setup</Breadcrumb.Item>
        <Breadcrumb.Item>Add New Warning Letter</Breadcrumb.Item>
      </Breadcrumb>

      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <HeadingChip title="Add New Warning Letter" />
          </Col>
          <Col span={24}>
            <Card bordered={false} className="uni-card">
              <Row gutter={[24, 30]}>
                {warningLetterFilds().map((item, idx) => (
                  <Fragment key={idx}>
                    <FormGroup item={item} control={control} errors={errors} />
                  </Fragment>
                ))}

                <Col span={24}>
                  <Card
                    className="small-card8 b-dark-gray"
                    extra={
                      <a href="#">
                        List of tags <QuestionCircleFilled className />
                      </a>
                    }
                  >
                    <Row gutter={24}>
                      <Col span={24}>
                        <TextAreaField
                          fieldname="detail"
                          label=""
                          control={control}
                          class="mb-0"
                          rules={{
                            required: 'detail required',
                          }}
                          iProps={{ placeholder: 'Type your letter', size: 'large' }}
                          initValue=""
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={24}>
                  <Row gutter={24} justify="end">
                    {letterData.name.length == 0 ? (
                      <>
                        <Col span={5}>
                          <Button
                            size="large"
                            type="primary"
                            htmlType="button"
                            className="black-btn w-100"
                            onClick={closeForn}
                          >
                            Close
                          </Button>
                        </Col>
                        <Col span={5}>
                          <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                            Save
                          </Button>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col span={5}>
                          <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                            Delete
                          </Button>
                        </Col>
                        <Col span={5}>
                          <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                            Save
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
