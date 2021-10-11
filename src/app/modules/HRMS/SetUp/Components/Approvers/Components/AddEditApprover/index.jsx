import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Upload, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { uniquiFileName, getSingleUpload, getFileName } from '../../../../../../../../features/utility';
import { InputField } from '../../../../../../../atoms/FormElement';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import { addSingleApprover, updateApprover, deleteApprover, getApproverDetail } from '../../../../ducks/services';
import { PlusCircleFilled } from '@ant-design/icons';

export default (props) => {
  const { title, onClose, approver, item } = props;
  console.log({ approver });
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [image, setImage] = useState({ loading: true, imageUrl: '', fileObj: {} });
  const [data, setData] = useState([]);
  const [value1, setValue1] = useState();
  const { control, errors, setValue, handleSubmit, reset } = useForm();

  const onFinish = async (values) => {
    console.log({ values, image });
    let res = '';
    if (image?.fileObj) {
      let modifiedName = uniquiFileName(image?.fileObj.name);
      res = await getSingleUpload(modifiedName, 'image', image?.fileObj, 'HRMS Approver', values.approver_name);
    }
    const payload = {
      approver_id: values?.approver_name,
      signature: res?.file_url ? res?.file_url : image?.imageUrl,
      company: 'Limkokwing University Creative Technology',
    };
    approver.name.length == 0
      ? addSingleApprover(payload).then((response) => {
          message.success('success');
          onClose();
        })
      : updateApprover(approver.name, payload).then((response) => {
          message.success('updated');
          onClose();
        });
  };

  const onDeleteApprover = () => {
    deleteApprover(approver.name)
      .then((response) => {
        message.success('Country Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Country Deleted Unsccessfully');
        onClose();
      });
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (imageUrl) => {
      console.log({ imageUrl });
      setImage({
        imageUrl: imageUrl,
        fileObj: info.file.originFileObj,
        loading: false,
      });
    });
  };

  let timeout;
  let currentValue;

  function getData(value, callback) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    function callingFunc() {
      let url = `${apiMethod}/hrms.api.search_employee?company=Limkokwing University Creative Technology&search=${value}`;
      axios.get(url).then((d) => {
        if (currentValue === value) {
          const {
            data: { message },
          } = d;
          const data = [];
          message.forEach((r) => {
            console.log('kkk', r);
            data.push({
              value: r.name,
              text: r.employee_name,
            });
          });
          callback(data);
        }
      });
    }

    timeout = setTimeout(callingFunc, 300);
  }

  const beforeUpload = (file) => {
    console.log({ file });

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1.18;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleSearch = (value) => {
    console.log({ value });
    if (value) {
      getData(value, (data) => setData(data));
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    if (approver.approver_name.length > 0) {
      getApproverDetail(approver.approver_name).then((response) => {
        let data = response?.data?.data;
        setValue1(data.approver_name);
        setImage({ loading: false, imageUrl: data?.signature ? data?.signature : '' });
        setValue('approver_name', data.approver_id);
      });
    } else {
      setValue1('');
      setImage({ loading: true, imageUrl: '' });
      setValue('approver_name', '');
    }
  }, [approver]);

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={24} justify="center" align="middle">
            <Col>
              <Title level={3}>{title}</Title>
            </Col>
            <Col>
              <Text className="mb-0 c-gray">To ensure best fit. please use the dimensions50mmx25mm</Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 30]}>
            <Col span={24}>
              <InputField
                fieldname="approver_id"
                label=""
                class="readonly-transparent d-none"
                initValue={item?.name ? item?.name : ''}
                control={control}
                iProps={{ readOnly: true }}
              />
              {item?.skill_name ? (
                <InputField
                  fieldname="approver_name"
                  label=""
                  class="readonly-transparent"
                  initValue={item?.skill_name ? item?.skill_name : ''}
                  control={control}
                  iProps={{ readOnly: true }}
                />
              ) : (
                <Form.Item label="Aprover Name" className={'mb-0'}>
                  <Controller
                    name="approver_name"
                    control={control}
                    defaultValue={''}
                    render={({ value, onChange, onSearch }) => (
                      <Select
                        value={value1}
                        onChange={(e) => {
                          console.log({ e });
                          onChange(e);
                          setValue1(e);
                        }}
                        onSearch={(e) => handleSearch(e)}
                        placeholder={'Type staff name'}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        showSearch
                      >
                        {data.map((value) => (
                          <Option key={value.value}>{value.text}</Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
              )}
            </Col>

            <Col span={24}>
              <Form.Item label="Signature">
                <Controller
                  name="upload_file"
                  control={control}
                  render={({ value, fileList, onChange }) => (
                    <Upload
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      accept="image"
                      maxCount={1}
                      fileList={fileList}
                      onChange={handleChange}
                      beforeUpload={beforeUpload}
                    >
                      {!image.loading ? (
                        <img
                          src={
                            image?.imageUrl.length < 100
                              ? `http://cms2dev.limkokwing.net${image.imageUrl}`
                              : image.imageUrl
                          }
                          alt={<PlusCircleFilled />}
                          style={{ width: '100%' }}
                        />
                      ) : (
                        <PlusCircleFilled style={{ fontSize: '30px' }} />
                      )}
                    </Upload>
                  )}
                ></Controller>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row gutter={24} justify="center">
                {approver.name.length == 0 ? (
                  <>
                    <Col span={8}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className="black-btn w-100"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </Col>
                    <Col span={8}>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                        Add
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col span={8}>
                      <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteApprover}>
                        Delete
                      </Button>
                    </Col>
                    <Col span={8}>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                        Save
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
