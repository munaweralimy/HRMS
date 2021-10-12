import React, { useState, useEffect } from 'react';
import { Space, Button, Row, Col, Typography, Form, message, Upload, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { uniquiFileName, getSingleUpload } from '../../../../../../../../features/utility';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  addSingleLetterTemp,
  updateletterTemp,
  deleteletterTemp,
  getLetterTempDetail,
} from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default (props) => {
  const { title, onClose, templateData } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const [header, setHeader] = useState({
    headerloading: true,
    footerloading: true,
    imageUrlHeader: '',
    imageUrlFooter: '',
    fileObj: {},
  });
  const { control, errors, setValue, handleSubmit, reset } = useForm();

  const handleChange = (info, fileVal) => {
    console.log({ info, fileVal });
    if (fileVal === 'header') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        let tempsHeadandFoot = { ...header, headerloading: false, imageUrlHeader: imageUrl };
        setHeader(tempsHeadandFoot);
      });
    } else if (fileVal === 'footer') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        let tempsHeadandFoot = { ...header, footerloading: false, imageUrlFooter: imageUrl };
        setHeader(tempsHeadandFoot);
      });
    }
  };

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

  const uploadImage = async (file) => {
    let res = '';
    if (file?.file.originFileObj) {
      let modifiedName = uniquiFileName(file?.file.originFileObj.name);
      res = await getSingleUpload(
        modifiedName,
        'image',
        file?.file.originFileObj,
        'Letter Template',
        'CCC Letter Template A',
      );
    }
    return res;
  };
  const onDeleteTemplate = () => {
    setLoad(true);
    deleteletterTemp(templateData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => {
        message.error('Country Deleted Unsccessfully');
        onClose();
      });
  };
  const onFinish = async (val) => {
    setLoad(true);
    let letter_head = '';
    let letter_footer = '';
    if (val.header.file) {
      letter_head = await uploadImage(val.header);
    } else if (val.footer.file) {
      letter_footer = await uploadImage(val.footer);
    }

    const payload = {
      template_name: 'CCC Letter Template A',
      letter_head: letter_head?.file_url ? letter_head?.file_url : val.header,
      letter_footer: letter_footer?.file_url ? letter_footer?.file_url : val.footer,
      company: 'Limkokwing University Creative Technology',
    };
    templateData?.name.length == 0
      ? addSingleLetterTemp(payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        })
      : updateletterTemp(templateData.name, { ...payload, template_name: templateData.template_name }).then(
          (response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          },
        );
  };

  const onRemovePicture = (tempPart) => {
    console.log({ tempPart });
    if (tempPart === 'header') {
      let tempsHeadandFoot = { ...header, headerloading: true, imageUrlHeader: '' };
      setHeader(tempsHeadandFoot);
      setValue('header', '');
    } else if (tempPart === 'footer') {
      let tempsHeadandFoot = { ...header, footerloading: true, imageUrlFooter: '' };
      setHeader(tempsHeadandFoot);
      setValue('footer', '');
    }
  };

  useEffect(() => {
    if (templateData.name.length > 0) {
      setLoad(true);
      getLetterTempDetail(templateData.name).then((response) => {
        let data = response?.data?.data;
        let tempsHeadandFoot = {
          ...header,
          headerloading: data.letter_head.length > 0 ? false : true,
          footerloading: data.letter_footer.length > 0 ? false : true,
          imageUrlHeader: data.letter_head,
          imageUrlFooter: data.letter_footer,
        };
        setHeader(tempsHeadandFoot);
        setValue('header', data.letter_head);
        setValue('footer', data.letter_footer);
        setLoad(false);
      });
    } else {
      let tempsHeadandFoot = {
        ...header,
        headerloading: true,
        footerloading: true,
        imageUrlFooter: '',
        imageUrlHeader: '',
      };
      setHeader(tempsHeadandFoot);
      reset();
    }
  }, [templateData]);
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gugutter={24} justify="center" align="middle">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
              <Col>
                <Text className="mb-0 c-gray">
                  To ensure best fit please use the dimensions 210mm x 32mm for both header & footer with 15mm margin on
                  the side
                </Text>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row gutter={24} justify="space-between">
              <Col>
                <Text className="mb-0 c-gray">Letter Header</Text>
              </Col>
              {templateData.name.length > 0 && (
                <Col>
                  <Button
                    type="link"
                    htmlType="button"
                    className="p-0 h-auto c-gray-linkbtn"
                    onClick={() => onRemovePicture('header')}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Controller
              name="header"
              control={control}
              render={({ value, fileList, onChange }) => (
                <Upload
                  listType="picture-card"
                  className="uploadTemplate"
                  showUploadList={false}
                  accept="image"
                  maxCount={1}
                  fileList={fileList}
                  onChange={(e) => {
                    onChange(e);
                    handleChange(e, 'header');
                  }}
                  beforeUpload={beforeUpload}
                >
                  {!header.headerloading ? (
                    <img
                      src={
                        header?.imageUrlHeader.length < 100
                          ? `http://cms2dev.limkokwing.net${header.imageUrlHeader}`
                          : header.imageUrlHeader
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
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="space-between">
              <Col>
                <Text className="mb-0 c-gray">Letter Footer</Text>
              </Col>
              {templateData.name.length > 0 && (
                <Col>
                  <Button
                    type="link"
                    htmlType="button"
                    className="p-0 h-auto c-gray-linkbtn"
                    onClick={() => onRemovePicture('footer')}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Controller
              name="footer"
              control={control}
              render={({ value, fileList, onChange }) => (
                <Upload
                  listType="picture-card"
                  className="uploadTemplate"
                  showUploadList={false}
                  accept="image"
                  maxCount={1}
                  fileList={fileList}
                  onChange={(e) => {
                    onChange(e);
                    handleChange(e, 'footer');
                  }}
                  beforeUpload={beforeUpload}
                >
                  {!header.footerloading ? (
                    <img
                      src={
                        header?.imageUrlFooter.length < 100
                          ? `http://cms2dev.limkokwing.net${header.imageUrlFooter}`
                          : header.imageUrlFooter
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
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="center">
              {templateData.name.length == 0 ? (
                <>
                  <Col span={8}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
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
                    <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteTemplate}>
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
      </Form>
    </Spin>
  );
};
