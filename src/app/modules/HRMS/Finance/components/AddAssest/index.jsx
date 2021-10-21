import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import FormGroup from '../../../../../molecules/FormGroup';
import { addAsset } from './FormFields';
import { updateAssets, addNewAsset, deleteAsset } from '../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const AddAsset = (props) => {
  const { data, onUpdateComplete } = props;
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const { Title } = Typography;
  useEffect(() => {
    if (data?.asset_no) {
      setValue('asset_no', { label: data?.asset_no, value: data?.asset_no });
      setValue('description', data?.description);
      setValue('start_date', data.start_date ? moment(data.start_date, 'YYYY-MM-DD') : '');
      setValue('end_date', data.end_date ? moment(data.end_date, 'YYYY-MM-DD') : '');
    }
  }, [data]);

  const onSubmitHandler = (values) => {
    const payload = {
      asset_no: values?.asset_no.value,
      start_date: moment(values?.start_date).format('YYYY-MM-DD'),
      end_date: moment(values?.end_date).format('YYYY-MM-DD'),
      description: values?.description,
      possession_status: 'In Staff Possession',
    };
    setLoad(true);
    data?.name
      ? updateAssets(data?.name, payload).then((response) => {
          if (response.status === 200) {
            message.success(`Asset ${data?.asset_no} update successfully`);
            a;
            setLoad(false);
            onUpdateComplete();
          }
        })
      : addNewAsset({ employee_id: id, assets: { ...payload } }).then((response) => {
          message.success(`New Asset added successfully`);
          setLoad(false);
          onUpdateComplete();
        });
  };

  const onDeleteHandler = () => {
    setLoad(true);
    deleteAsset(data.name, { status: '', possession_status: 'With Company' }).then((response) => {
      message.success(`Asset ${data.name} Deleted Seccussfully`);
      setLoad(false);
      onUpdateComplete();
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[24, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              Asset Details
            </Title>
          </Col>
          {addAsset().map((value, key) => (
            <FormGroup key={key} item={value} control={control} errors={errors} />
          ))}
          <Col span={24}>
            <Row gutter={24} justify="end">
              {data?.asset_no ? (
                <>
                  <Col>
                    <Button onClick={onDeleteHandler} size="large" type="primary" className="red-btn">
                      Delete Asset
                    </Button>
                  </Col>
                  <Col>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn">
                      Save Changes
                    </Button>
                  </Col>
                </>
              ) : (
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Add Asset
                  </Button>
                </Col>
              )}
              {/* <Col>
              <Button size="large" type="primary" htmlType="submit" className="red-btn">
                Delete Account
              </Button>
            </Col>
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                Save Changes
              </Button>
            </Col> */}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddAsset;
